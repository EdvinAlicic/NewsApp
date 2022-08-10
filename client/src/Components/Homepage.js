import {Link} from "react-router-dom"

export const Homepage=()=>{
    return(
        <div className="pocetna-stranica" >
            <h1>Dobrodošli na naš informativni portal</h1>
            <Link to="/login"><button className="dugme-login">Login</button></Link>
            <Link to="/register"><button className="dugme-register">Register</button></Link>
            <Link to="/articles"><p className="guest">Continue as guest</p></Link>
    </div>
    )
}