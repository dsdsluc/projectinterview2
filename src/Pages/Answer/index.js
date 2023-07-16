import { getlistAnswer } from "../../services/answerService";
import { useEffect, useState } from "react";
import { getListTopic } from "../../services/topicServices";
import { Link } from "react-router-dom";

function Answer(){
    const [data, setData ] =useState([])
    useEffect(()=>{
        const fetchApi = async ()=>{
            const listAnswer = await getlistAnswer();
            const listTopic = await getListTopic();
            let result = [];
            for(let i = 0; i < listAnswer.length ; i++){
                result.push(
                    {
                        ...listAnswer[i],
                        ...listTopic.find(item=>(item.id === listAnswer[i].topicId)),
                        id: listAnswer[i].id

                    }
                )
            }
            setData(result.reverse())
        }
        fetchApi()
    },[])
    console.log(data)

    return(
        <>
            {data.length > 0 &&
            <>
                <h2>Danh sach chu de da on luyen</h2>
                <div className="answer">
                    <table className="table">
                        <thead className="thead">
                            <tr>
                                <th>
                                    Id
                                </th>
                                <th>
                                    Chu de
                                </th>
                                <th>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {data.map(item=>(
                                <tr key={item.id} >
                                    <td>
                                        {item.id}
                                    </td>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>
                                        <Link to={"/result/" + item.id}>
                                            <button className="button">Xem chi tiet</button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </>
                
            }
        </>
    )
}
export default Answer;