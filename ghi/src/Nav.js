import { NavLink, Link } from "react-router-dom";
import "./index.css";
import raddit from "./raddit_new.png";
import { useToken } from "./utils";

function Nav() {
  const [token, login, logout] = useToken();
  return (
    <>
      <nav className="nav-bg h-18 p-3 mb-2 navbar navbar-expand-lg navbar-dark text-dark">
        <div className="d-flex flex-column justify-content-center align-items-center"></div>
        <div className="container-fluid ">
          <img src={raddit} alt="Logo" className="pr-2" />
          <h1 className="text-black">raddit</h1>
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
      <nav className="subnav w-100 h-10 p-3 shadow mb-5 navbar navbar-expand-sm ">
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
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      window.location.href = "/Music";
                    }}
                  >
                    Music
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      window.location.href = "/Movies";
                    }}
                  >
                    Movies
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      window.location.href = "/Tech";
                    }}
                  >
                    Technology
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      window.location.href = "/Sports";
                    }}
                  >
                    Sports
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    onClick={() => {
                      window.location.href = "/Miscellaneous";
                    }}
                  >
                    Miscellaneous
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-dark" to="/post/new">
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
