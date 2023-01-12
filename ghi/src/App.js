import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
// import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import LoginForm from "./login.js";
import MainPage from "./MainPage";
import SignupForm from "./signup";
import CreatePostForm from "./CreatePost";
import Nav from "./Nav";
// import { AuthProvider, useToken } from "./utils.js";


// function GetToken() {
//   // Get token from JWT cookie (if already logged in)
//   useToken();
//   return null;
// }

function App() {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <div className="container">
          <Routes>
            {/* <Route path="/">
              <Route index element={<MainPage />} />
            </Route> */}
            <Route path="/" element={<MainPage />} />
            <Route path="login">
              <Route index element={<LoginForm />} />
            </Route>
            <Route path="newpost">
              <Route index element={<CreatePostForm />} />
            </Route>
            <Route path="posts">
              <Route index element={<CreatePostForm />} />
            </Route>
            <Route path="signup">
              <Route index element={<SignupForm />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>{" "}
    </div>
  );
}

export default App;


// function App() {
//   const [launch_info, setLaunchInfo] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function getData() {
//       let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
//       console.log('fastapi url: ', url);
//       let response = await fetch(url);
//       console.log("------- hello? -------");
//       let data = await response.json();

//       if (response.ok) {
//         console.log("got launch data!");
//         setLaunchInfo(data.launch_details);
//       } else {
//         console.log("drat! something happened");
//         setError(data.message);
//       }
//     }
//     getData();
//   }, [])

//   return (
//     <div>
//       <ErrorNotification error={error} />
//       <Construct info={launch_info} />
//     </div>
//   );
// }

// export default App;

// function App() {
//   const [launch_info, setLaunchInfo] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function getData() {
//       let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
//       console.log('fastapi url: ', url);
//       let response = await fetch(url);
//       console.log("------- hello? -------");
//       let data = await response.json();

//       if (response.ok) {
//         console.log("got launch data!");
//         setLaunchInfo(data.launch_details);
//       } else {
//         console.log("drat! something happened");
//         setError(data.message);
//       }
//     }
//     getData();
//   }, [])

//   return (
//     <div>
//       <ErrorNotification error={error} />
//       <Construct info={launch_info} />
//     </div>
//   );
// }

// export default App;