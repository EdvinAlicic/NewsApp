import axios from "axios";
import {useState} from "react"
import {Navigate, useNavigate} from "react-router-dom"

export const Login=()=>{
    const [username, setUserName]=useState("");
    const [password, setPassword]=useState("");
    const [errorMessage, setErrorMessage]=useState("");
    const navigate=useNavigate();

    const userNameChangeHandler=(event)=>{
        setUserName(event.target.value)
    }

    const passwordChangeHandler=(event)=>{
        setPassword(event.target.value)
    }

    const login=(e)=>{
        e.preventDefault();
        if(username === '' || password === ''){
            setErrorMessage("Molimo vas popunite polja")
        }else{
            axios.get('http://localhost:8080/users/' + username)
            .then((res)=>{
                const message=res.data
                console.log(message)
                if(message.length===0){
                    setErrorMessage("Korisnik nije pronađen")
                }else if(password==message[0].password){
                    navigate("/articles")
                }else{
                    setErrorMessage("Incorrect password")
                }
            }).catch(function(error){
                console.log(error);
            })
        }
    }

    return(
        <>
        <form className="login-forma">
            <h1>Prijavite se</h1>
            <input onChange={userNameChangeHandler} type="text" placeholder="Username"></input>
            <br></br>
            <input onChange={passwordChangeHandler} type="password" placeholder="Password"></input>
            <br></br>
            <button onClick={login}>Login</button>
        </form>
        <p className="error">{errorMessage}</p>
        </>
    )
}