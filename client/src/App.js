import './App.css';
import {Homepage} from './Components/Homepage.js'
import {ArticleList} from './Components/ArticleList.js'
import './Components/styles/styles.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {ArticleDetails} from "./Components/ArticleDetails.js"
import {Registration} from "./Components/Registration.js"
import {Login} from "./Components/Login.js"


function App() {
  return(
    <>
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage></Homepage>}></Route>
        <Route exact path="/articles" element={<ArticleList></ArticleList>}></Route>
        <Route exact path="/articles/:articleTitle" element={<ArticleDetails></ArticleDetails>}></Route>
        <Route exact path="/register" element={<Registration></Registration>}></Route>
        <Route exact path="/login" element={<Login></Login>}></Route>
      </Routes>
    </Router>
    </>
  )
}

export default App;