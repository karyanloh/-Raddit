import { useEffect, useState } from "react";
import { useAuthContext } from "./utils";
import "./index.css";

function MainPage() {
  const [isLoading, setIsLoading] = useState(true);
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
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setPost({ error: "Error fetching post" });
    }
  }
  if (isLoading) {
    return (
      <div className="spinner-border" animation="border" variant="primary" />
    );
  } else {
    return (
      <>
        {post.map((p) => {
          return (
            <div className=" card-group text-blue ml-3 mb-8" key={p.id}>
              {/* <div className="card"> */}
              <div className="btn-group-vertical mb-3 ">
                <button
                  type="button"
                  className="btn btn-outline-success text-left"
                >
                  Rad
                </button>
                <button
                  type="button"
                  className="btn btn-outline-danger text-left"
                >
                  Bad
                </button>
              </div>
              <div className="post">
                <a href={`/post/${p.id}`} className="card-link">
                  <p className="card-title">{p.title}</p>
                </a>
              </div>
            </div>
          );
        })}
      </>
    );
  }
}

export default MainPage;
