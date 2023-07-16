import { useEffect, useState } from "react"
import { getListTopic } from "../../services/topicServices";
import { Link } from "react-router-dom"

function Topic (){
    const [dataTopic, setDataTopic] = useState([]);
    useEffect(()=>{
        const fetchApi = async ()=>{
            const response = await getListTopic();
            setDataTopic(response);
        }
        fetchApi();
    },[])
    console.log(dataTopic)

    return(
        <>
            {dataTopic &&

                <div className="topic">
                    <h2>Danh sach on luyen</h2>
                    <table className="table">
                        <thead className="thead">
                            <tr>
                                <th>
                                    ID
                                </th>
                                <th>
                                    Ten Chu de
                                </th>
                                <th>
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {dataTopic.map(item=>(
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td><Link to={"/quiz/" + item.id}>Lam bai</Link></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            }
        </>
    )
}
export default Topic;