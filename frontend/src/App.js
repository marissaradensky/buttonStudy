import logo from './logo.svg';
import React, { useEffect, useState, Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { questions } from "./constants/global";

function App() {
  const [getMessage, setGetMessage] = useState({});
  const [data, setData] = useState({});
  const [count, setCount] = useState(1);
  const [page, setPage] = useState("");
  const [pid, setPid] = useState(0);
  const [age, setAge] = useState(0);
  const [gen, setGen] = useState(0);
  const [race, setRace] = useState(0);
  const [hisp, setHisp] = useState(0);
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [num3, setNum3] = useState(0);
  const [atten1, setAtten1] = useState(0);
  const [atten2, setAtten2] = useState(0);
  const [prac, setPrac] = useState(0);
  const [qued, setQ] = useState(0);
  const [check1, setCheck1] = useState(0);
  const [check2, setCheck2] = useState(0);
  const [rank1, setRank1] = useState(0);
  const [rank2, setRank2] = useState(0);
  const [rank3, setRank3] = useState(0);
  const [why, setWhy] = useState(0);

  const unsetQ = () => {
    setQ(0);
    setCheck1(0);
    setCheck2(0);
  }

  const timeStamp = (event,type,message) => {
    if (message == null && (type == "gender-writein" || type == "num1" || type == "num2" || type == "num3" || type == "rank1" || type == "rank2" || type == "rank3" || type == "why")) {
      message = event.target.value;
    }
    var currentdate = new Date();
    var datetime = (currentdate.getMonth()+1) + "/"
                    + currentdate.getDate() + "/"
                    + currentdate.getFullYear() + " @ "
                    + currentdate.getHours() + ":";
    var mins = currentdate.getMinutes();
    if (mins < 10) {
      datetime += "0"+mins+":";
    }
    else {
      datetime += mins+":";
    }
    var seconds = currentdate.getSeconds();
    if (seconds < 10) {
      datetime += "0"+seconds;
    }
    else {
      datetime += seconds;
    }
    saveInput(type,message,datetime);
  }

  const saveInput = (type,message,datetime) => {
    fetch('http://localhost:3100/flask/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pid: pid,
        type: type,
        message: message,
        time: datetime
      }),
    })
      .then((res) => res.json())
      .then((result) => setData(result.rows))
      .catch((err) => console.log('error'))
  }

  useEffect(()=>{
    axios.get('http://localhost:3100/flask/hello').then(response => {
      console.log("SUCCESS", response)
      setGetMessage(response)
      setPid(parseInt(response["data"]["pid"])+1)
    }).catch(error => {
      console.log(error)
    })

  }, [])
  return (
    <div className="App">
      <header className="App-header">
        {page == "" &&
          <div>
            <p><b>Preliminary Questionnaire</b></p>
            <p>Please complete the following questions.</p>
            <p>What is your age?</p>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"age","18-24"); setAge(1)}} name="option" value="age1" id="age1"/> 18-24</div>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"age","25-29"); setAge(1)}} name="option" value="age2" id="age2"/> 25-29</div>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"age","30-39"); setAge(1)}} name="option" value="age3" id="age3"/> 30-39</div>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"age","40-49"); setAge(1)}} name="option" value="age4" id="age4"/> 40-49</div>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"age","50-59"); setAge(1)}} name="option" value="age5" id="age5"/> 50-59</div>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"age","60-69"); setAge(1)}} name="option" value="age6" id="age6"/> 60-69</div>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"age","70-79"); setAge(1)}} name="option" value="age7" id="age7"/> 70-79</div>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"age","80 or over"); setAge(1)}} name="option" value="age8" id="age8"/> 80 or over</div>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"age","Prefer not to say"); setAge(1)}} name="option" value="age9" id="age9"/> Prefer not to say</div>
            <p>What is your gender identity?</p>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"gender","man"); setGen(1)}} name="option1" value="man" id="man"/> Man</div>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"gender","non-binary"); setGen(1)}} name="option1" value="nb" id="nb"/> Non-binary</div>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"gender","woman"); setGen(1)}} name="option1" value="woman" id="woman"/> Woman</div>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"gender","other"); setGen(1)}} name="option1" value="other" id="other"/> Other: <input type="text" onChange={(e) => timeStamp(e,"gender-writein")} id="other" name="option1"/></div>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"gender","none"); setGen(1)}} name="option1" value="none" id="none"/> Prefer not to say</div>
            <p>What is your race?</p>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"race","american"); setRace(1)}} name="option2" value="amer" id="amer"/> American Indian or Alaska Native</div>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"race","black"); setRace(1)}} name="option2" value="black" id="black"/>Black or African American</div>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"race","white"); setRace(1)}} name="option2" value="white" id="white"/>White</div>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"race","asian"); setRace(1)}} name="option2" value="asian" id="asian"/>Asian</div>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"race","pacific"); setRace(1)}} name="option2" value="pac" id="pac"/>Native Hawaiian or Other Pacific Islander</div>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"race","two"); setRace(1)}} name="option2" value="mult" id="mult"/>Two or more races</div>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"race","none"); setRace(1)}} name="option2" value="none" id="none"/>Prefer not to say</div>
            <p>Are you Hispanic and/or Latinx?</p>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"hispanic","yes"); setHisp(1)}} name="option3" value="yes" id="yes"/>Yes</div>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"hispanic","no"); setHisp(1)}} name="option3" value="no" id="no"/>No</div>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"hispanic","none"); setHisp(1)}} name="option3" value="none" id="none"/>Prefer not to say</div>
            <br></br>
            <div><input type="button" onClick={(age > 0 && gen > 0 && race > 0 && hisp > 0) ? (e) => {setPage("numeracy"); timeStamp(e,"finishDemo",null)} : undefined} name="option" value="Next" id="next"/></div>
          </div>
        }
        {page == "numeracy" &&
          <div>
            <p><b>Preliminary Questionnaire</b></p>
            <p>Please complete the following questions. We will then move on to the main task instructions.</p>
            <p>Imagine that we flip a fair coin 1,000 times. What is your best guess about how many times the coin would come up heads in 1,000 flips?</p>
            <div><input type="text" onChange={(e) => {timeStamp(e,"num1",null); setNum1(1)}} id="num1" name="num1"/> times out of 1,000</div>
            <p>In the BIG BUCKS LOTTERY, the chances of winning a $10.00 prize is 1%. What is your best guess about how many people would win a $10.00 prize if 1,000 people each buy a single ticket to BIG BUCKS?</p>
            <div><input type="text" onChange={(e) => {timeStamp(e,"num2",null); setNum2(1)}} id="num2" name="num2"/> person(s) out of 1,000</div>
            <p>In the ACME PUBLISHING SWEEPSTAKES, the chance of winning a car is 1 in 1,000. What percent of tickets to ACME PUBLISHING SWEEPSTAKES win a car?</p>
            <div><input type="text" onChange={(e) => {timeStamp(e,"num3",null); setNum3(1)}} id="num3" name="num3"/>%</div>
            <br></br>
            <div><input type="button" onClick={(num1 > 0 && num2 > 0 && num3 > 0) ? (e) => {setPage("instructions"); timeStamp(e,"finishNum",null)} : undefined} name="option" value="Next" id="next"/></div>
          </div>
        }
        {page == "instructions" &&
          <div>
            <p><b>INSTRUCTIONS</b></p>
            <p>Next, for each of 30 questions, an AI assistant will provide its prediction and confidence. How the confidence is presented will vary.</p>
            <p>The AI will predict whether you should hit Button A or Button B. You will not be told anything else about Button A or Button B.</p>
            <p>You will have two options: 1) go along with the AI prediction or 2) pass. Each option will offer different amounts of points.</p>
            <p>Your goal is to earn as many points as possible, which will translate into extra money earnings (up to $5).</p>
            <p>Also, after every 10 questions, you will be asked to answer a question or two.</p>
            <br></br>
            <div><input type="button" onClick={(e) => {setPage("attention"); timeStamp(e,"finishInst",null)}} name="option" value="Next" id="next"/></div>
          </div>
        }
        {page == "attention" &&
          <div>
          <p><b>INSTRUCTION QUESTIONS</b></p>
          <p>What is your goal?</p>
          <div><input type="radio" onClick={(e) => {timeStamp(e,"attention1","wrong"); setAtten1(1)}} name="option" value="wrong1" id="ans11"/>To earn at least 15 points over the 30 questions</div>
          <div><input type="radio" onClick={(e) => {timeStamp(e,"attention1","correct"); setAtten1(1)}} name="option" value="right1" id="ans12"/>To earn as many points as possible over the 30 questions</div>
          <div><input type="radio" onClick={(e) => {timeStamp(e,"attention1","wrong"); setAtten1(1)}} name="option" value="wrong1" id="ans13"/>To avoid earning zero points on any question</div>
          <p>For each question, what will be provided from the AI?</p>
          <div><input type="radio" onClick={(e) => {timeStamp(e,"attention2","wrong"); setAtten2(1)}} name="option2" value="wrong2" id="ans21"/>A prediction</div>
          <div><input type="radio" onClick={(e) => {timeStamp(e,"attention2","wrong"); setAtten2(1)}} name="option2" value="wrong2" id="ans22"/>A prediction and explanation for the prediction</div>
          <div><input type="radio" onClick={(e) => {timeStamp(e,"attention2","correct"); setAtten2(1)}} name="option2" value="right2" id="ans23"/>A prediction and confidence in the prediction</div>
          <br></br>
          <div><input type="button" onClick={(atten1 > 0 && atten2 > 0) ? (e) => {setPage("tutorial"); timeStamp(e,"finishAtten",null)} : undefined} name="option" value="Next" id="next"/></div>
          </div>
        }
        {page == "tutorial" &&
          <div>
            <p><b>PRACTICE QUESTION</b></p>
            <p>The AI predicts that you should select <b>Button A</b>.</p>
            <p>Confidence:</p>
            <img src={require("./images/tutorial.jpg")} width="400" alt="pie chart confidence display"/>
            <p>Please decide whether to pass or to agree with the AI’s prediction.</p>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"practice","correct"); setPrac(1)}} name="option" value="agree" id="agree"/>Agree with AI (8 points if right; 0 points if wrong)</div>
            <div><input type="radio" onClick={(e) => {timeStamp(e,"practice","wrong"); setPrac(1)}}  name="option" value="pass" id="pass"/>Pass (5 points)</div>
            <br></br>
            <div><input type="button" onClick={prac > 0 ? (e) => {setPage("question"); timeStamp(e,"finishPrac",null)} : undefined} name="option" value="Next" id="next"/></div>
          </div>
        }
        {page == "question" &&
          <div>
            <p><b>QUESTION {count}</b></p>
            <p>The AI predicts that you should select <b>Button {questions[pid][count-1][5]}</b>.</p>
            <p>Confidence: {!questions[pid][count-1][2].includes("icon") && questions[pid][count-1][2]}</p>
            <div>{questions[pid][count-1][2].includes("icon") && <img src={require("./images/"+questions[pid][count-1][2])} width="400" alt="icon array showing 60 black dots and 40 gray dots"/>}</div>
            <p>Please decide whether to pass or to agree with the AI’s prediction.</p>
            <div><input type="radio" checked={check1} onClick={(e) => {timeStamp(e,"q"+count,questions[pid][count-1][3]); setQ(1); setCheck1(1); setCheck2(0)}} name="option" value="agree" id="agree" readOnly/>Agree with AI ({questions[pid][count-1][0]} points if right; 0 points if wrong)</div>
            <div><input type="radio" checked={check2} onClick={(e) => {timeStamp(e,"q"+count,questions[pid][count-1][4]); setQ(1); setCheck2(1); setCheck1(0)}} name="option" value="pass" id="pass" readOnly/>Pass ({questions[pid][count-1][1]} points)</div>
            <br></br>
            {count < 30 ? <div><input type="button" onClick={qued > 0 ? (e) => {setPage("question"); setCount(count+1); timeStamp(e,"finishQ"+count,null); unsetQ()} : undefined} name="option" value="Next" id="next"/></div> : <div><input type="button" onClick={(e) => {setPage("final"); timeStamp(e,"finishQ"+count)}} name="option" value="Next" id="next"/></div>}
          </div>
        }
        {page == "final" &&
          <div>
            <p><b>FINAL QUESTIONS</b></p>
            <p>Examples of each confidence format that you saw are shown below.</p>
            <p>
            {questions[pid][0][2].includes("%") && "Percentage: 60%"}
            {questions[pid][0][2].includes("out") && "Frequency: 60 out of 100"}
            {questions[pid][0][2].includes("icon") && "Icon Array:"}
            </p>
            {questions[pid][0][2].includes("icon") && <img src={require("./images/icon60.jpeg")} width="250" alt="icon array showing 60 black dots and 40 gray dots"/>}
            <p>
            {questions[pid][10][2].includes("%") && "Percentage: 60%"}
            {questions[pid][10][2].includes("out") && "Frequency: 60 out of 100"}
            {questions[pid][10][2].includes("icon") && "Icon Array:"}
            </p>
            {questions[pid][10][2].includes("icon") && <img src={require("./images/icon60.jpeg")} width="250" alt="icon array showing 60 black dots and 40 gray dots"/>}
            <p>
            {questions[pid][20][2].includes("%") && "Percentage: 60%"}
            {questions[pid][20][2].includes("out") && "Frequency: 60 out of 100"}
            {questions[pid][20][2].includes("icon") && "Icon Array:"}
            </p>
            {questions[pid][20][2].includes("icon") && <img src={require("./images/icon60.jpeg")} width="250" alt="icon array showing 60 black dots and 40 gray dots"/>}
            <p>Please list the confidence formats from your most favorite to least favorite. Please do not have any ties.</p>
            <div>Most Favorite: <input type="text" onChange={(e) => {timeStamp(e,"rank1",null); setRank1(1)}} id="rank1" name="rank1"/></div>
            <div>Second Favorite: <input type="text" onChange={(e) => {timeStamp(e,"rank2",null); setRank2(1)}} id="rank2" name="rank2"/></div>
            <div>Least Favorite: <input type="text" onChange={(e) => {timeStamp(e,"rank3",null); setRank3(1)}} id="rank3" name="rank3"/></div>
            <p>Please describe why your favorite is your favorite. (1-2 sentences)</p>
            <div><textarea id="fav" onChange={(e) => {timeStamp(e,"why",null); setWhy(1)}} name="fav" rows="4" cols="50"></textarea></div>
            <br></br>
            <div><input type="button" onClick={(rank1 > 0 && rank2 > 0 && rank3 > 0 && why > 0) ? (e) => {timeStamp(e,"finishFin"); setPage("end")} : undefined}name="option" value="Finish" id="finish"/></div>
          </div>
        }
        {page == "end" &&
          <div>
            <p><b>You have completed the study. Thank you for your participation!</b></p>
          </div>
        }
      </header>
    </div>
  );
}

export default App;
//
// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.setPage = this.setPage.bind(this);
//     this.state = {page: "", pid: 0, count: 0};
//   }
//
//   setPage(x,q) {
//     this.setState({page: x});
//     if(q) {
//       this.setState({count: this.state.count + 1});
//     }
//   };
//
//   render() {
//     const page = this.state.page;
//     const pid = this.state.pid;
//     return (
//       <div className="App">
//         <header className="App-header">
//           {page == "" &&
//             <div>
//               <p><b>Preliminary Questionnaire</b></p>
//               <p>Please complete the following preliminary questions. We will then move on to the main task instructions.</p>
//               <p>Imagine that we flip a fair coin 1,000 times. What is your best guess about how many times the coin would come up heads in 1,000 flips?</p>
//               <div><input type="text" id="num1" name="num1"/> times out of 1,000</div>
//               <p>In the BIG BUCKS LOTTERY, the chances of winning a $10.00 prize is 1%. What is your best guess about how many people would win a $10.00 prize if 1,000 people each buy a single ticket to BIG BUCKS?</p>
//               <div><input type="text" id="num2" name="num2"/> person(s) out of 1,000</div>
//               <p>In the ACME PUBLISHING SWEEPSTAKES, the chance of winning a car is 1 in 1,000. What percent of tickets to ACME PUBLISHING SWEEPSTAKES win a car?</p>
//               <div><input type="text" id="num3" name="num3"/>%</div>
//               <br></br>
//               <div><input type="button" onClick={() => this.setPage("instructions",false)} name="option" value="Next" id="next"/></div>
//             </div>
//           }
//           {page == "instructions" &&
//             <div>
//               <p><b>INSTRUCTIONS</b></p>
//               <p>Next, for each of 30 questions, an AI assistant will provide its prediction and confidence. How the confidence is presented will vary.</p>
//               <p>The AI will predict whether you should hit Button A or Button B. You will not be told anything else about Button A or Button B.</p>
//               <p>You will have two options: 1) go along with the AI prediction or 2) pass. Each option will offer different amounts of points.</p>
//               <p>Your goal is to earn as many points as possible, which will translate into extra money earnings (up to $5).</p>
//               <p>Also, after every 10 questions, you will be asked to answer a question or two.</p>
//               <br></br>
//               <div><input type="button" onClick={() => this.setPage("attention",false)} name="option" value="Next" id="next"/></div>
//             </div>
//           }
//           {page == "attention" &&
//             <div>
//             <p><b>INSTRUCTION QUESTIONS</b></p>
//             <p>What is your goal?</p>
//             <div>
//                 <input type="radio" name="option" value="wrong1" id="ans11"/>
//                 <label htmlFor="agree">To earn at least 15 points over the 30 questions</label>
//             </div>
//             <div>
//                 <input type="radio" name="option" value="right1" id="ans12"/>
//                 <label htmlFor="pass">To earn as many points as possible over the 30 questions</label>
//             </div>
//             <div>
//                 <input type="radio" name="option" value="wrong1" id="ans13"/>
//                 <label htmlFor="pass">To avoid earning zero points on any question</label>
//             </div>
//             <p>For each question, what will be provided from the AI?</p>
//             <div>
//                 <input type="radio" name="option2" value="wrong2" id="ans21"/>
//                 <label htmlFor="agree">A prediction</label>
//             </div>
//             <div>
//                 <input type="radio" name="option2" value="wrong2" id="ans22"/>
//                 <label htmlFor="pass">A prediction and explanation for the prediction</label>
//             </div>
//             <div>
//                 <input type="radio" name="option2" value="right2" id="ans23"/>
//                 <label htmlFor="pass">A prediction and confidence in the prediction</label>
//             </div>
//             <br></br>
//             <div><input type="button" onClick={() => this.setPage("tutorial",false)} name="option" value="Next" id="next"/></div>
//             </div>
//           }
//           {page == "tutorial" &&
//             <div>
//               <p><b>PRACTICE QUESTION</b></p>
//               <p>The AI predicts that you should select <b>Button A</b>.</p>
//               <p>Confidence:</p>
//               <img src={require("./images/tutorial.png")} width="200" alt="pie chart confidence display"/>
//               <p>Please decide whether to pass or to agree with the AI’s prediction.</p>
//               <div>
//                   <input type="radio" name="option" value="agree" id="agree"/>
//                   <label htmlFor="agree">Agree with AI (8 points if right; 0 points if wrong)</label>
//               </div>
//               <div>
//                   <input type="radio" name="option" value="pass" id="pass"/>
//                   <label htmlFor="pass">Pass (5 points)</label>
//               </div>
//               <br></br>
//               <div><input type="button" onClick={() => this.setPage("question",true)} name="option" value="Next" id="next"/></div>
//             </div>
//           }
//           {page == "question" &&
//             <div>
//               <p><b>QUESTION {this.state.count}</b></p>
//               <p>The AI predicts that you should select <b>Button {questions[pid][this.state.count-1][3]}</b>.</p>
//               <p>
//               Confidence: {questions[pid][this.state.count-1][2].includes("icon") ? <img src={require("./images/"+questions[pid][this.state.count-1][2])} width="250" alt="icon array showing 60 black dots and 40 gray dots"/> : questions[pid][this.state.count-1][2]}
//               </p>
//               <p>Please decide whether to pass or to agree with the AI’s prediction.</p>
//               <div>
//                   <input type="radio" name="option" value="agree" id="agree"/>
//                   <label htmlFor="agree">Agree with AI ({questions[pid][this.state.count-1][0]} points if right; 0 points if wrong)</label>
//               </div>
//               <div>
//                   <input type="radio" name="option" value="pass" id="pass"/>
//                   <label htmlFor="pass">Pass ({questions[pid][this.state.count-1][1]} points)</label>
//               </div>
//               <br></br>
//               {this.state.count < 30 ? <div><input type="button" onClick={() => this.setPage("question",true)} name="option" value="Next" id="next"/></div> : <div><input type="button" onClick={() => this.setPage("final",false)} name="option" value="Next" id="next"/></div>}
//             </div>
//           }
//           {page == "final" &&
//             <div>
//               <p><b>FINAL QUESTIONS</b></p>
//               <p>Examples of each confidence format that you saw are shown below.</p>
//               <p>
//               {questions[pid][0][2].includes("%") && "Percentage: 60%"}
//               {questions[pid][0][2].includes("out") && "Frequency: 60 out of 100"}
//               {questions[pid][0][2].includes("icon") && "Icon Array:"}
//               </p>
//               {questions[pid][0][2].includes("icon") && <img src={require("./images/icon60.jpeg")} width="250" alt="icon array showing 60 black dots and 40 gray dots"/>}
//               <p>
//               {questions[pid][10][2].includes("%") && "Percentage: 60%"}
//               {questions[pid][10][2].includes("out") && "Frequency: 60 out of 100"}
//               {questions[pid][10][2].includes("icon") && "Icon Array:"}
//               </p>
//               {questions[pid][10][2].includes("icon") && <img src={require("./images/icon60.jpeg")} width="250" alt="icon array showing 60 black dots and 40 gray dots"/>}
//               <p>
//               {questions[pid][20][2].includes("%") && "Percentage: 60%"}
//               {questions[pid][20][2].includes("out") && "Frequency: 60 out of 100"}
//               {questions[pid][20][2].includes("icon") && "Icon Array:"}
//               </p>
//               {questions[pid][20][2].includes("icon") && <img src={require("./images/icon60.jpeg")} width="250" alt="icon array showing 60 black dots and 40 gray dots"/>}
//               <p>Please list the confidence formats from your most favorite to least favorite. Please do not have any ties.</p>
//               <div>
//                     <textarea id="rank" name="rank" rows="4" cols="50">
//                     Most Favorite:
//                     Second Favorite:
//                     Least Favorite:
//                     </textarea>
//               </div>
//               <p>Please describe why your favorite is your favorite. (1-2 sentences)</p>
//               <div><textarea id="fav" name="fav" rows="4" cols="50"></textarea></div>
//               <br></br>
//               <div><input type="button" onClick="window.location.href='';" name="option" value="Finish" id="finish"/></div>
//             </div>
//           }
//         </header>
//       </div>
//     );
//   }
// }
//
// export default App;


// axios.post('http://localhost:5000/flask/hello').then(response => {
//   console.log("SUCCESS", response)
// }).catch(error => {
//   console.log(error)
// })
