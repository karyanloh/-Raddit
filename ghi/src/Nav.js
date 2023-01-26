import { NavLink, Link } from "react-router-dom";
import "./index.css";
import raddit from "./raddit_new.png";
import { useToken } from "./utils";

function Nav() {
  const [token, Login, logout] = useToken();
  console.log("required console log for lintr", Login);
  return (
    <>
      <div className="container-sm">
        <nav className="subnav w-100 h-5 p-3 shadow mb-5  mt-0 navbar navbar-expand-sm fixed-top">
          <img src={raddit} alt="Logo" className="pr-2" />
          <h1 className="text-black">raddit</h1>
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
                  <Link
                    className="dropdown-item"
                    onClick={() => {
                      window.location.href = "/raddit-new/subraddit/Music";
                    }}
                  >
                    Music
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    onClick={() => {
                      window.location.href = "/raddit-new/subraddit/Movies";
                    }}
                  >
                    Movies
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    onClick={() => {
                      window.location.href = "/raddit-new/subraddit/Tech";
                    }}
                  >
                    Technology
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    onClick={() => {
                      window.location.href = "/raddit-new/subraddit/Sports";
                    }}
                  >
                    Sports
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    onClick={() => {
                      window.location.href =
                        "/raddit-new/subraddit/Miscellaneous";
                    }}
                  >
                    Miscellaneous
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link text-dark" to="/post/new">
                Create Post
              </NavLink>
            </li>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ms-auto">
                {!token && (
                  <NavLink className="nav-link text-dark" to="/signup">
                    SignUp
                  </NavLink>
                )}
              </li>
              <li className="nav-item">
                {!token && (
                  <NavLink className="nav-link text-dark" to="/login">
                    Login
                  </NavLink>
                )}
              </li>

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
          </ul>
        </nav>
      </div>
    </>
  );
}
export default Nav;
