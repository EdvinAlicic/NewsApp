import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"


export const EditArticle=(props)=>{
    
    const [title, setTitle] = useState(props.title);
    const [content, setContent] = useState(props.content);
    const [imageURL, setImageURL] = useState(props.imageURL);
    const navigate=useNavigate();

    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    };

    const contentChangeHandler = (event) => {
        setContent(event.target.value);
    };

    const imageURLChangeHandler = (event) => {
        setImageURL(event.target.value);
    };

    const editArticle = (e) => {
        e.preventDefault();
        axios.put("http://localhost:8080/articles/" + props.title, {
            title: title,
            content: content,
            imageURL: imageURL
        })
            .then((res) => {
                const message = res.data;
                console.log(message);
                navigate("/articles");
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return(
        <>
        <h1 class="forma-naslov">Edit article</h1>
        <form>
            <input onChange={titleChangeHandler} type="text" placeholder="Title" className="input-naslov" value={title}></input>
            <br></br>
            <textarea onChange={contentChangeHandler} type="text" placeholder="Content" className="input-sadrzaj" value={content}></textarea>
            <br></br>
            <input onChange={imageURLChangeHandler} type="text" placeholder="ImageURL" className="input-slika" value={imageURL}></input>
            <div className="dugme-center">
            <button onClick={editArticle} className="forma-dugme">Edit article</button>
            </div>
        </form>
        </>
    )
}