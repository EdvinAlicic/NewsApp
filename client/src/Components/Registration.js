import axios from "axios";
import {useState} from "react"

export const Registration=()=>{
    const [name, setName]=useState("");
    const [surname, setSurname]=useState("");
    const [username, setUserName]=useState("");
    const [password, setPassword]=useState("");
    const [errorMessage, setErrorMessage]=useState("");

    const nameChangeHandler=(event)=>{
        setName(event.target.value)
    }

    const surnameChangeHandler=(event)=>{
        setSurname(event.target.value)
    }

    const userNameChangeHandler=(event)=>{
        setUserName(event.target.value)
    }

    const passwordChangeHandler=(event)=>{
        setPassword(event.target.value)
    }

    const addUser=(e)=>{
        e.preventDefault();
        if(name === '' || surname === '' || username === '' || password === ''){
            setErrorMessage("Molimo vas popunite polja")
        }else{
            axios.post('http://localhost:8080/users', {
                name: name,
                surname: surname,
                username: username,
                password: password
            }).then((res)=>{
                const message=res.data
                console.log(message)
                if(message==="Korisnik s tim username već postoji."){
                    setErrorMessage(message);
                }else{
                    setErrorMessage("Korisnik uspješno dodan");
                }
            }).catch(function(error){
                console.log(error);
            })
        }
    }

    return(
        <>
        <form className="register-forma">
        <input onChange={nameChangeHandler} type="text" placeholder="Name"></input>
            <br></br>
            <input onChange={surnameChangeHandler} type="text" placeholder="Surname"></input>
            <br></br>
            <input onChange={userNameChangeHandler} type="text" placeholder="Username"></input>
            <br></br>
            <input onChange={passwordChangeHandler} type="password" placeholder="Password"></input>
            <br></br>
            <button onClick={addUser}>Register</button>
        </form>
        <p className="error">{errorMessage}</p>
        </>
    )
}