import axios from "axios"
import {useState, useEffect} from "react"
import {useParams} from "react-router-dom"
import {useNavigate} from "react-router"
import Modal from "react-modal"
import {EditArticle} from "./EditArticle.js"

export const ArticleDetails=()=>{
    const params=useParams();
    const navigate=useNavigate();
    const [item, setItem]=useState([]);
    const [modalIsOpen, setModalIsOpen]=useState(false);

    useEffect(()=>{
        axios.get("http://localhost:8080/articles/" + params.articleTitle).then(({data})=>setItem(data)).catch(error=>console.log(error));
    }, [])

    const deleteItem=()=>{
        axios.delete("http://localhost:8080/articles/" + params.articleTitle).then((res)=>{
            const message=res.data;
            navigate("/articles");
        }).catch(function(error){
            console.log(error);
        })
    }

    console.log(item)
    return(
        <>
        <div className="clanak-detalji">
            <h1>{item.title}</h1>
            <img src={item.imageURL}></img>
            <p>{item.content}</p>
            <button onClick={deleteItem} className="dugme-delete">Delete</button>
            <button onClick={()=>{setModalIsOpen(true)}} className="dugme-edit">Edit</button>
            <Modal isOpen={modalIsOpen} onRequestClose={(() => { setModalIsOpen(false) })} style={{ overlay: { backgroundColor: "#8080805c", }, content: { marginTop: "50px", text:"center", width: "", left: "50%", transform: "translateX(-50%)", borderRadius: "10px", overflowY: "hidden" } }} >
                <EditArticle title={item.title} content={item.content} imageURL={item.imageURL}></EditArticle>
        </Modal>
        </div>
        </>
    )
}