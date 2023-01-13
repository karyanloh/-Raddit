import { useEffect, useState } from "react";

const mockedPostListForScoreFeat = [{post_id:1, score: 2, upvote_users: [1,2,3], downvote_users: [11,12,13]}]
const mockedCurrentUserIdForScoreFeat = 7


function MainPage(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    // useEffect(() => function handleLoginClick(e) {});

    return (
      <>
        {/* <div>
          {isLoggedIn ? (
            <LogoutButton onClick={handleLogoutClick} />
          ) : (
            ((<LoginButton onClick={handleLoginClick} />),
            (<SignUpButton onClick={handleSignupClick} />))
          )}
        </div>
        <button>Login</button> */}
        <div className="px-4 py-5 my-5 text-center">
          <h1 className="display-5 fw-bold">Raddit</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">All things Rad(or bad) Show Raddits</p>
            <ul>{mockedPostListForScoreFeat.map((post) => { return (
              <li key={post.post_id}>
                <h3>
                  Post ID: {post.post_id}
                </h3>
                <div>
                  <div className="card post-scoring-card" >
                    <ul className="list-group list-group-flush">
                      {/* <li className="list-group-item">^</li> */}
                      <button type="button" class="list-group-item list-group-item-primary list-group-item-action">^</button>
                      <li className="list-group-item">{post.score}</li>
                      <button type="button" class="list-group-item list-group-item-danger list-group-item-action">v</button>
                    </ul>
                  </div>
                </div>
              </li>
            )})}</ul>
          </div>
        </div>
      </>
    );
}

export default MainPage;
