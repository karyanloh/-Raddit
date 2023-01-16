import { NavLink } from "react-router-dom";
import "./index.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
                Raddit
            </NavLink>
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">MySubRaddits</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">What's Rad?</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">New</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/newpost">Create Post</NavLink>
                    </li>
                    <li className="nav-item">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                    </li>

                    {/* TODO: hide signup/login if logged in */}

                    <li className="nav-item ms-auto">
                        <NavLink className="nav-link" to="/signup">SignUp</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/login">Login</NavLink>
                    </li>

                    {/* TODO: hide logout if not logged in */}

                    <li className="nav-item">
                        <NavLink className="nav-link" to="/logout">Logout</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  );
}
export default Nav;
