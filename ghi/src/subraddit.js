import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
const api_url = `${process.env.REACT_APP_CONTENT_SERVICE_API_HOST}`

function SubRaddit() {
  const displayThreshold = 1;
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState({});
  const {subraddit} = useParams();
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




  const getData = useCallback(async () => {
    try {
      const postUrl = `${api_url}api/subraddit/${subraddit}`;
      const postResponse = await fetch(postUrl);
      const postData = await postResponse.json();
      setPost(postData.posts);
      setIsLoading(false);

    } catch (error) {
      console.error(error);
      setPost({ error: "Error fetching post" });
    }
  }, [subraddit]);

  function handleLoadMore() {
    console.log("setLoadmore");
    setLoadMore(true);
  }


  if (isLoading) {
    return (
      <div className="spinner-border" animation="border" variant="primary" />
    );
  } else {
    return (
      <>
        <>
          <div className="px-4 py-5 my-5 text-center">
            <h1 className="display-5 fw-bold">{subraddit}</h1>
            <div className="col-lg-6 mx-auto">
              <p className="lead mb-4">
                All the posts for the {subraddit} subraddit
              </p>
            </div>
          </div>

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
                  <a href={`/raddit-new/post/${p.id}`} className="card-link">
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
      </>
    );
  }
}

export default SubRaddit;
