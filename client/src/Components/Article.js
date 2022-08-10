import {Link} from "react-router-dom"

export const Article=(props)=>{
    return(
        <div className="clanak">
            <h1>{props.title}</h1>
            <img src={props.imageURL} className="slika"></img>
            <br></br>
            <Link to={`/articles/${props.title}`}><button className="details">Details</button></Link>
        </div>
    )
}