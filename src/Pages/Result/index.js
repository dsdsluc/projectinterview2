import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAnswer } from "../../services/answerService";
import { getListQuestion } from "../../services/questionServices";
import { getTopic } from "../../services/topicServices";
function Result() {
  const params = useParams();
  const [data, setData] = useState([]);
  const [infor, setInfor] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const dataAnswer = await getAnswer(params.id);
      const dataQuestion = await getListQuestion(dataAnswer.topicId);
      const topicTitle = await getTopic(dataAnswer.topicId);
      let result = [];
      let infor = {
        totalAnswers: dataQuestion.length,
        topicId: dataAnswer.topicId,
        countTrue: 0,
        countFalse: 0,
        percentRight: 0,
        topicName: topicTitle.name,
      };
      for (let i = 0; i < dataQuestion.length; i++) {
        result.push({
          ...dataQuestion[i],
          ...dataAnswer.answers.find(
            (item) => item.questionId === dataQuestion[i].id
          ),
        });
      }
      for (let i = 0; i < result.length; i++) {
        if (result[i].answer === result[i].correctAnswer) {
          infor.countTrue++;
        } else {
          infor.countFalse++;
        }
      }
      infor.percentRight = parseInt(
        ((infor.countTrue / infor.totalAnswers) * 100).toFixed(0)
      );
      setData(result);
      setInfor(infor);
    };
    fetchApi();
  }, [params.id]);
  console.log(data);
  return (
    <>
      {infor && (
        <div className="title">
          <h2> Ket qua chu de : {infor.topicName}</h2>
          <div>
            <span>
              Dung: <strong>{infor.countTrue}</strong>
            </span>
            <span>
              {" "}
              | Sai: <strong>{infor.countFalse}</strong>
            </span>
            <span>
              {" "}
              | Tong so cau: <strong>{infor.totalAnswers}</strong>
            </span>
            <span>
              {" "}
              | Ty le dung: <strong>{infor.percentRight}%</strong>
            </span>
          </div>
        </div>
      )}
      {data.length > 0 && (
        <div className="quiz">
          {data.map((item, index) => (
            <div className="quiz__item" key={item.id}>
              <p>
                Cau {index + 1}: {item.question}  
                {item.answer === item.correctAnswer ? (
                  <span className="true">Dung</span>
                ) : (
                  <span className="false">Sai</span>
                )}
              </p>
              {item.answers.map((answer, i)=>{
                let check = false;
                let className ="" ;
                if(item.answer === i){
                    check = true;
                    className = "selected--false"
                }
                if(item.correctAnswer === i){
                    className = "selected--right"
                }
                return(
                    <div key={i}>
                        <input type="radio" defaultChecked ={check} disabled />
                        <label className={className}>{answer}</label>
                    </div>
                )
              })}
            </div>
          ))}
        </div>
      )}
      {infor && 
      <Link to={"/quiz/" +infor.topicId}>
            <button className="button">
                Lam lai
            </button>
        </Link>}
    </>
  );
}
export default Result;
