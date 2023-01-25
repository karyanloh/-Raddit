import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useToken } from "./utils";
// import Construct from "./Construct.js";
// import ErrorNotification from "./ErrorNotification";
import "./App.css";
import LoginForm from "./login.js";
import MainPage from "./MainPage";
import SignUpForm from "./SignUpForm";
import Nav from "./Nav";
import CreatePostForm from "./CreatePost";
import PostDetail from "./postdetail";
import SubRaddit from "./subraddit";

function GetToken() {
  // Get token from JWT cookie (if already logged in)
  useToken();
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GetToken />
        <Nav />
        <div className="container-fluid">
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="post">
              <Route index path="new" element={<CreatePostForm />} />
              <Route path=":id" element={<PostDetail />} />
            </Route>
            <Route path="signup" element={<SignUpForm />} />
            <Route path=":subraddit" element={<SubRaddit />} />
            {/* <Route path="logout" element={<LogOutButton />} /> */}
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
// function App() {
//   const [launch_info, setLaunchInfo] = useState([]);
//   const [error, setError] = useState(null);

//   return (
//     <div>
//       <ErrorNotification error={error} />
//       <Construct info={launch_info} />
//     </div>
//   );
// }
