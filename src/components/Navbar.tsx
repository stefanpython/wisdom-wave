import "./Navbar.css"
import { Link } from "react-router-dom"

const Navbar = () => {

    return (
        <div className="navbar">
        <div className="navbar-left">
          <img className="logo" src="./security.png" alt="logo" />
          <span className="navbar-title">
           Wizdom Wave
          </span>
        </div>
  
        <div className="navbar-right">
         
          <ul className="desktop-links">
           
          </ul>
  
        
        </div>
      </div>
    )
}

export default Navbar