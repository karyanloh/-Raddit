import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useToken } from "./utils";
import "./App.css";
import LoginForm from "./login.js";
import MainPage from "./MainPage";
import SignUpForm from "./SignUpForm";
import Nav from "./Nav";
import CreatePostForm from "./CreatePost";
import PostDetail from "./postdetail";
import SubRaddit from "./subraddit";

function GetToken() {
  useToken();
  return null;
}


function App() {
  return (
    <BrowserRouter basename="raddit-new/">
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
            <Route path="subraddit">
              <Route path=":subraddit" element={<SubRaddit />} />
            </Route>
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
