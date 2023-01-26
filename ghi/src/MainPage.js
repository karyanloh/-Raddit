import { useEffect, useState } from "react";
import "./index.css";
import { useAuthContext } from "./utils";

const api_url = `${process.env.REACT_APP_CONTENT_SERVICE_API_HOST}`;

function MainPage() {
  let { token, account } = useAuthContext();
  const displayThreshold = 10;
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState([]);
  const [score, setScore] = useState([]);
  const [displayArr, setDisplayArr] = useState([]);
  const [combinedArray, setCombinedArray] = useState([]);
  const [loadMore, setLoadMore] = useState(false);

  // component did mount this should fetch data from backend
  useEffect(() => {
    getData();
  }, []);

  // for initial loading of posts
  useEffect(() => {
    if (combinedArray.length > 0) {
      let newArr = [];
      //to handle if post is less than display threshold set
      if (combinedArray.length < displayThreshold) {
        for (let i = 0; i < combinedArray.length; i++) {
          newArr.push(combinedArray[i]);
        }
      } else {
        //if post is more than display threshold
        for (let i = 0; i < displayThreshold; i++) {
          newArr.push(combinedArray[i]);
        }
      }
      setDisplayArr(newArr);
      setIsLoading(false);
    }
  }, [combinedArray]);

  useEffect(() => {
    if (!loadMore) return;
    let newArr = [...displayArr];
    let remainder = combinedArray.length - newArr.length;
    if (remainder >= displayThreshold) {
      let starter = newArr.length;
      for (let i = starter; i < starter + displayThreshold; i++) {
        newArr.push(combinedArray[i]);
      }
    } else {
      for (
        let i = combinedArray.length - remainder;
        i < combinedArray.length;
        i++
      ) {
        newArr.push(combinedArray[i]);
      }
    }
    setDisplayArr(newArr);
    setLoadMore(false);
  }, [loadMore, combinedArray, displayArr]);

  useEffect(() => {
    if (post.length === 0 || score.length === 0) return;
    let combinedArray = combineData(post, score);
    setCombinedArray(combinedArray);
  }, [score, post]);

  async function getData() {
    try {
      const postUrl = `${api_url}api/posts`;
      const postResponse = await fetch(postUrl);
      const postData = await postResponse.json();

      const scoreUrl = `${api_url}api/postScore`;
      const scoreResponse = await fetch(scoreUrl);
      const scoreData = await scoreResponse.json();

      if (postResponse.ok && scoreResponse.ok) {
        setPost(postData.posts);
        setScore(scoreData.scores);
      }
    } catch (error) {
      console.error(error);
      setPost({ error: "Error fetching post" });
    }
  }

  function combineData(postArr, scoreArr) {
    let combinedArray = [];
    let scoreMap = {};
    for (let i = 0; i < scoreArr.length; i++) {
      scoreMap[scoreArr[i].post_id] = scoreArr[i].score;
    }
    for (let j = 0; j < postArr.length; j++) {
      if (scoreMap[postArr[j].id] !== undefined) {
        combinedArray.push(postArr[j]);
        combinedArray[j]["score"] = scoreMap[postArr[j].id];
      }
    }
    return combinedArray;
  }

  function handleLoadMore() {
    setLoadMore(true);
  }

  async function handleUpArrowClick(id) {
    account = { account };
    const url = `${api_url}api/postScore/upvote/${id}`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(account),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await fetch(url, fetchConfig);
    window.location.reload();
  }

  async function handleDownArrowClick(id) {
    account = { account };
    const url = `${api_url}api/postScore/downvote/${id}`;
    const fetchConfig = {
      method: "put",
      body: JSON.stringify(account),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await fetch(url, fetchConfig);
    window.location.reload();
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
                  onClick={() => handleUpArrowClick(p.id)}
                  type="button"
                  className="btn btn-outline-success text-left"
                >
                  <i className="fa fa-chevron-up pr-2"></i>
                  Rad
                </button>
                <button type="button" className="btn text-left" disabled>
                  Votes: {p.score}
                </button>
                <button
                  onClick={() => handleDownArrowClick(p.id)}
                  type="button"
                  className="btn btn-outline-danger text-left"
                >
                  <i className="fa fa-chevron-down pr-2"></i>
                  <span>Bad</span>
                </button>
              </div>
              <div className="post">
                <a href={`post/${p.id}`} className="card-link">
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
