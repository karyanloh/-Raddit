import { useEffect, useState } from "react";
import "./index.css";
const api_url = `${process.env.REACT_APP_CONTENT_SERVICE_API_HOST}/`;
console.log(api_url);
function MainPage() {
  const displayThreshold = 3;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { token, account } = useAuthContext();
  const [post, setPost] = useState([]);
  const [displayArr, setDisplayArr] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (post.length > 0) {
      let newArr = [];
      for (let i = 0; i < displayThreshold; i++) {
        newArr.push(post[i]);
      }
      setDisplayArr(newArr);
    }
  }, [post.length]);

  useEffect(() => {
    let newArr = displayArr;
    if (loadMore == true) {
      let remainder = post.length - newArr.length;
      if (remainder >= displayThreshold) {
        let starter = newArr.length;
        for (let i = starter; i < starter + displayThreshold; i++) {
          newArr.push(post[i]);
        }
        setLoadMore(false);
      } else {
        for (let i = post.length - remainder; i < post.length; i++) {
          newArr.push(post[i]);
        }
        setLoadMore(false);
      }
    }

    setDisplayArr(newArr);
    setIsLoading(false);
  }, [loadMore]);

  async function getData() {
    try {
      const postUrl = `${api_url}api/posts/`;
      const postResponse = await fetch(postUrl);
      const postData = await postResponse.json();
      setPost(postData.posts);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setPost({ error: "Error fetching post" });
    }
  }

  function handleLoadMore() {
    console.log("setLoadmore");
    setLoadMore(true);
  }

  if (isLoading) {
    return (
      <div
        className="spinner-border d-flex justify-content-center"
        animation="border"
        variant="primary"
      />
    );
  } else {
    return (
      <>
        {displayArr.map((p) => {
          return (
            <div className=" card-group text-blue ml-3 mb-8" key={p.id}>
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
        {displayArr.length < post.length ? (
          <button onClick={handleLoadMore}>Load more</button>
        ) : null}
      </>
    );
  }
}

export default MainPage;
