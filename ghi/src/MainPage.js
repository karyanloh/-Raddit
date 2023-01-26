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

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (combinedArray.length > 0) {
      let newArr = [];
      if (combinedArray.length < displayThreshold) {
        for (let i = 0; i < combinedArray.length; i++) {
          newArr.push(combinedArray[i]);
        }
      } else {
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
    const url = `${api_url}api/postScore/upvote/${id}/${account}`;
    const fetchConfig = {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    await fetch(url, fetchConfig);
    window.location.reload();
  }

  async function handleDownArrowClick(id) {
    const url = `${api_url}api/postScore/downvote/${id}/${account}`;
    const fetchConfig = {
      method: "put",
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
      <div className="container">
        <ul className="list-group">
          {displayArr.map((p) => {
            return (
              <li
                className="list-group-item list-group-item-dark border border-dark"
                key={p.id}
              >
                <div className="row">
                  <div className="col-sm-1">
                    <button
                      onClick={() => handleUpArrowClick(p.id)}
                      type="button"
                      className="btn btn-outline-success text-left"
                    >
                      <i className="fa fa-chevron-up pr-2"></i>
                      Rad
                    </button>
                    <br />
                    <span className="badge badge-info">{p.score}</span>
                    <br />
                    <button
                      onClick={() => handleDownArrowClick(p.id)}
                      type="button"
                      className="btn btn-outline-danger text-left"
                    >
                      <i className="fa fa-chevron-down pr-2"></i>
                      <span>Bad</span>
                    </button>
                  </div>
                  <div className="col-sm-11">
                    <a href={`post/${p.id}`}>{p.title}</a>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        {displayArr.length < post.length ? (
          <button onClick={handleLoadMore} className="btn btn-primary">
            Load more
          </button>
        ) : null}
      </div>
    );
  }
}

export default MainPage;
