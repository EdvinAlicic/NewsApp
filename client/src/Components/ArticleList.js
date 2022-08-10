import {useState, useEffect} from "react"
import axios from "axios";
import {Article} from "./Article.js"
import Modal from "react-modal"
import {AddArticle} from "./AddArticle"

export const ArticleList=()=>{
    const [items, setItems]=useState([]);
    const [modalIsOpen, setModalIsOpen]=useState(false);

    useEffect(()=>{
        axios.get("http://localhost:8080/articles").then(({data})=>setItems(data)).catch(error=>console.log(error))
    }, [])

    const menuItems=items.map((item, i)=>{
        return(
            <Article title={item.title} content={item.content} imageURL={item.imageURL} key={i}></Article>
        )
    })

    console.log(items);
    return(
        <>
        <div className="dodavanje-clanka">
        <button onClick={()=>{setModalIsOpen(true)}} className="dugme-dodavanje-clanka">Add article</button>
        </div>
        <Modal isOpen={modalIsOpen} onRequestClose={(() => { setModalIsOpen(false) })} style={{ overlay: { backgroundColor: "#8080805c", }, content: { marginTop: "50px", text:"center", width: "", left: "50%", transform: "translateX(-50%)", borderRadius: "10px", overflowY: "hidden" } }} >
            <AddArticle></AddArticle>
        </Modal>
        {menuItems}
        </>
    );
}