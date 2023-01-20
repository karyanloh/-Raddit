import { useEffect, useState } from "react";
import { useAuthContext } from "./utils";

function MainPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { token, account } = useAuthContext();
  const [post, setPost] = useState({});

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
        try {
            const postUrl = `http://localhost:8001/api/posts/`;
            const postResponse = await fetch(postUrl);
            const postData = await postResponse.json();
            setPost(postData.posts);
            setIsLoading(false)
        } catch (error) {
            console.error(error);
            setPost({ error: 'Error fetching post' });
        }
    }
  console.log("post", post)

    if (isLoading) {
        return <div className="spinner-border" animation="border" variant="primary" />;
    }
    else {
  return (
    <>
      <>
        <div className="px-4 py-5 my-5 text-center header">
          <h1 className="display-5 fw-bold">Raddit</h1>
          <div className="col-lg-6 mx-auto">
            <p className="lead mb-4">All things Rad(or bad) Show Raddits</p>
          </div>
        </div>

        <div className="container">
          <div className="row">
            {post.map((p) => {
              return (
                <div className="card-body col-md-4" key={p.id}>
                  <div className="card">
                    <h5 className="card-title">{p.title}</h5>
                    <div className="btn-group-vertical mb-3">
                      <button type="button" className="btn btn-outline-success">
                        Rad
                      </button>
                      <button type="button" className="btn btn-outline-danger">
                        Bad
                      </button>
                    </div>

                    <p className="vote-count">votes</p>
                    <a href={`/post/${p.id}`} className="card-link">
                      Link to comments/post details
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </>
    </>
  );
      }
}

export default MainPage;
