import { useState } from "react";
import axios from "axios";

export const AddArticle = (props) => {

  function refreshPage() {
    window.location.reload(false);
  }

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageURL, setImageURL] = useState("");

    const titleChangeHandler = (event) => {
        setTitle(event.target.value);
    };

    const contentChangeHandler = (event) => {
        setContent(event.target.value);
    };

    const imageURLChangeHandler = (event) => {
        setImageURL(event.target.value);
    };

    const addArticle = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8080/articles", {
            title: title,
            content: content,
            imageURL: imageURL
        })
            .then((res) => {
                refreshPage();
                const message = res.data;
                console.log(message);
                props.onClose();
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return(
        <>
        <h1 class="forma-naslov">Add article</h1>
        <form>
            <input onChange={titleChangeHandler} type="text" placeholder="Title" className="input-naslov"></input>
            <br></br>
            <textarea onChange={contentChangeHandler} type="text" placeholder="Content" className="input-sadrzaj"></textarea>
            <br></br>
            <input onChange={imageURLChangeHandler} type="text" placeholder="ImageURL" className="input-slika"></input>
            <div className="dugme-center">
            <button onClick={addArticle} className="forma-dugme">Add article</button>
            </div>
        </form>
        </>
    )
}