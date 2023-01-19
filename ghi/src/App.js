import { useEffect, useState } from "react";
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

function GetToken() {
  // Get token from JWT cookie (if already logged in)
  useToken();
  return null;
}

function App() {
  const [post, setPost] = useState({});
  const [comments, setComment] = useState({});
  const [votes, setVote] = useState();
  useEffect(() => {
    async function getData() {
      let postUrl = `${process.env.REACT_APP_CONTENT_SERVICE_API_HOST}/api/posts/`;
      let postResponse = await fetch(postUrl);
      let postData = await postResponse.json();
      let commentsUrl = `${process.env.REACT_APP_CONTENT_SERVICE_API_HOST}/api/comments/`;
      let commentsResponse = await fetch(commentsUrl);
      let commentsData = await commentsResponse.json();
      if (postResponse.ok && commentsResponse.ok) {
        console.log("got post data!");
        setPost(postData.posts);
        setComment(commentsData.comments);
      } else {
        console.log("error occurred fetching data");
        // setError(data.message);
      }
    }
    getData();
  }, []);
  return (
    <BrowserRouter>
      <AuthProvider>
        <GetToken />
        <Nav />
        <div className="container">
          <Routes>
            <Route
              path="/"
              element={
                <MainPage post={post} comments={comments} votes={votes} />
              }
            />
            {/* <Route index element={<MainPage1 />} />
              <Route index element={<MainPage2 />} />
              <Route index element={<MainPage3 />} />
              <Route index element={<MainPage4 />} /> */}
            <Route path="login" element={<LoginForm />} />
            <Route path="post">
              <Route index path="new" element={<CreatePostForm />} />
              <Route path=":id" element={<PostDetail />} />
            </Route>
            <Route path="signup" element={<SignUpForm />} />
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
