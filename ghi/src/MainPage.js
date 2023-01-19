import { useState } from "react";
import { useAuthContext } from "./utils";

function MainPage(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { token, account } = useAuthContext();

  return (
    <>
      <>
        <div className="px-4 py-5 my-5 text-center">
          <h1 className="display-5 fw-bold">Raddit</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">All things Rad(or bad) Show Raddits</p>
          </div>
        </div>
        {console.log(props.posts)}

        {props.posts[0].map((post) => {
          console.log(post);
          return (
            <div className="card-body" key={post.id}>
              <div>
                <div className="card">
                  <h5 className="card-title">{post.title}</h5>
                  <a href="#">
                    <p className="card-text">{post.description}</p>
                  </a>
                  <a href="#" className="card-link">
                    Link to comments/post details
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        <div className="">
          <h5 className="">Post title</h5>
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
      </>
      {/* <div>"test2":{account}</div> */}
    </>
  );
}

export default MainPage;
