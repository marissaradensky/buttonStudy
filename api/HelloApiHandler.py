from flask_restful import Api, Resource, reqparse
import sqlite3

class HelloApiHandler(Resource):
  def get(self):
    con = sqlite3.connect("new.db")
    cur = con.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS responses(pid, question, answer, time)")
    pid = -1
    lastRow = None
    for row in cur.execute("SELECT * FROM responses WHERE question='finishFin';"):
        lastRow = row
    if lastRow is not None:
        pid = lastRow[0]
    con.close()
    return {
      'resultStatus': 'SUCCESS',
      'message': "Hello Api Handler",
      'pid': pid
      }

  def post(self):
    print(self)
    parser = reqparse.RequestParser()
    parser.add_argument('pid', type=str)
    parser.add_argument('type', type=str)
    parser.add_argument('message', type=str)
    parser.add_argument('time', type=str)

    args = parser.parse_args()

    print(args)
    # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')

    request_pid = args['pid']
    request_type = args['type']
    request_json = args['message']
    request_time = args['time']
    # ret_status, ret_msg = ReturnData(request_type, request_json)
    # currently just returning the req straight
    ret_status = request_type
    ret_msg = request_json

    if ret_msg:
      message = "Your Message Requested: {}".format(ret_msg)
    else:
      message = "No Msg"

    final_ret = {"status": "Success", "message": message}

    con = sqlite3.connect("new.db")
    cur = con.cursor()
    cur.execute("CREATE TABLE IF NOT EXISTS responses(pid, question, answer, time)")
    data = [args["pid"],args["type"],args["message"],args["time"]]
    cur.execute("INSERT INTO responses VALUES(?,?,?,?)",data)
    con.commit()
    for row in cur.execute("SELECT pid, question, answer, time FROM responses"):
        print(row)
    con.close()

    return final_ret
