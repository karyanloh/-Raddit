import { NavLink, Link } from "react-router-dom";
import "./index.css";
import raddit from "./raddit.png";
import { useToken } from "./utils";

function Nav() {
  const [token, login, logout] = useToken();
  return (
    <>
      <nav className="p-3 mb-2 bg-danger navbar navbar-expand-lg navbar-dark text-dark">
        <div className="container-fluid ">
          <img src={raddit} alt="Logo" />
          <h1 className="display-4 text-white">Raddit</h1>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item ms-auto">
              {!token && (
                <NavLink className="nav-link text-white" to="/signup">
                  SignUp
                </NavLink>
              )}
            </li>
            <li className="nav-item">
              {!token && (
                <NavLink className="nav-link text-white" to="/login">
                  Login
                </NavLink>
              )}
            </li>

            {/* TODO: hide logout if not logged in */}

            <li className="nav-item">
              {token && (
                <span
                  onClick={() => {
                    logout();
                  }}
                  role={"button"}
                  className="nav-link"
                >
                  Logout
                </span>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <nav className="w-50 p-3 shadow p-3 mb-5 bg-white rounded navbar navbar-expand-lg navbar-dark text-dark ">
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link text-dark"
                aria-current="page"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle text-dark"
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                to="/"
              >
                MySubRaddits
              </Link>
              <ul className="dropdown-menu dropdown-menu-right">
                <li>
                  <Link className="dropdown-item text-dark" to="/music">
                    Music
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-dark" to="/movies">
                    Movies
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-dark" to="/sports">
                    Sports
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item text-dark" to="/tech">
                    Technology
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-dark" to="/">
                What's Rad?
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-dark" to="/newpost">
                Create Post
              </NavLink>
            </li>
            {/* <li className="nav-item">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
              </li> */}
          </ul>
        </div>
      </nav>
    </>
  );
}
export default Nav;
