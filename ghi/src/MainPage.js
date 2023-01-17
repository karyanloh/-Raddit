import { useEffect, useState } from "react";
import { useAuthContext } from "./utils";

function MainPage(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { token } = useAuthContext();

  // return (
  //   <div>
  //     "test":
  //     {token}
  //   </div>
  // );

  //   useEffect(() => function handleLoginClick(e) {});
  return (
    <>
      <div className="px-4 py-5 my-5 text-center">
        <h1 className="display-5 fw-bold">Raddit</h1>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">All things Rad(or bad) Show Raddits</p>
        </div>
      </div>
      <div>
        {/* {isLoggedIn ? (
          <LogoutButton onClick={handleLogoutClick} />
        ) : (
          ((<LoginButton onClick={handleLoginClick} />),
          (<SignUpButton onClick={handleSignupClick} />))
        )} */}
      </div>
      {/* <div className="navbar-buttons">
        <button>Login</button>
        <button>Sign Up</button>
        <button>Logout</button>
      </div> */}
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Post title</h5>
          <p className="card-text">Post description</p>
          <a href="#" className="card-link">
            Link to post detail
          </a>
          <a href="#" className="card-link">
            Link to comments/post details
          </a>
          <div className="btn-group-vertical mb-3">
            <button type="button" className="btn btn-outline-success">
              Rad
            </button>
            <button type="button" className="btn btn-outline-danger">
              Bad
            </button>
          </div>

          <p className="vote-count">votes</p>
        </div>
      </div>
    </>
  );
}

export default MainPage;
