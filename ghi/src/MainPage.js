import { useEffect, useState } from "react";

function MainPage(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //   useEffect(() => function handleLoginClick(e) {});

  //   return (
  //     <>
  //       <div>
  //         {isLoggedIn ? (
  //           <LogoutButton onClick={handleLogoutClick} />
  //         ) : (
  //           ((<LoginButton onClick={handleLoginClick} />),
  //           (<SignUpButton onClick={handleSignupClick} />))
  //         )}
  //       </div>
  //       <button>Login</button>
  //       <div className="px-4 py-5 my-5 text-center">
  //         <h1 className="display-5 fw-bold">Raddit</h1>
  //         <div className="col-lg-6 mx-auto">
  //           <p className="lead mb-4">All things Rad(or bad) Show Raddits</p>
  //         </div>
  //       </div>
  //     </>
  //   );
}

export default MainPage;

export default MainPage;
