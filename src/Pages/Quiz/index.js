import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTopic } from "../../services/topicServices";
import { getListQuestion } from "../../services/questionServices";
import { getCookie } from "../../helper/cookie";
import { createAnswer } from "../../services/answerService";

function Quiz (){
    const param = useParams();
    const navigate = useNavigate()
    const [topic, setTopic] = useState([]);
    const [listQuestion, setListQuestion ] = useState([]);

    useEffect(()=>{
        const fetchApi = async ()=>{
            const response = await getTopic(param.id);
            setTopic(response)
        }
        fetchApi()
    },[param.id])
    useEffect(()=>{
        const fetchApi = async ()=>{
            const response = await getListQuestion(param.id);
            setListQuestion(response);
        }
        fetchApi()
    },[param.id])
    const handleSubmit = async (e)=>{
        e.preventDefault();
        const selectAnswer = [];
        for(let i = 0; i< e.target.elements.length ; i++){
            if(e.target.elements[i].checked === true){
                selectAnswer.push({
                    questionId : parseInt(e.target.elements[i].name),
                    answer : parseInt(e.target.elements[i].value),
                })
            }
        }
        const options = {
            userId: parseInt(getCookie("id")),
            topicId: parseInt(param.id),
            answers: selectAnswer
        }
        const response = await createAnswer(options);
        if(response){
            navigate("/result/" + response.id);
        }
        else{
            alert("Nop bai ko thanh cong")
        }
    }

    return(
        <>
            {topic  && <h2>Chu de ve: {topic.name}</h2>}

            {listQuestion.length > 0 && 
            <div className="quiz">
                <form onSubmit={handleSubmit}>
                    {listQuestion.map((item,i)=>(
                        <div className="quiz__item" key={item.id}>
                            <p>Cau {i + 1} : {item.question}</p>
                            {item.answers.map((answer,index)=>(
                                <div key={index}>
                                    <input type="radio" value={index} name={item.id} id={`quiz-${item.id}-${index}`} required/>
                                    <label htmlFor={`quiz-${item.id}-${index}`}>{answer}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button className="button">Nop bai</button>
                </form>
            </div>}
        </>
    )
}
export default Quiz;