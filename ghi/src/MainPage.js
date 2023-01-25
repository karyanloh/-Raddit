import { useEffect, useState } from "react";
import "./index.css";
import { useAuthContext } from "./utils";

const api_url = `${process.env.REACT_APP_CONTENT_SERVICE_API_HOST}/`;
console.log(api_url);
function MainPage() {
  const displayThreshold = 10;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { token, account } = useAuthContext();
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
      for (let i = 0; i < displayThreshold; i++) {
        if (combinedArray.length < displayThreshold) {
          newArr.push(combinedArray[i]);
        }
        newArr.push(combinedArray[i]);
      }
      setDisplayArr(newArr);
    }
  }, [combinedArray.length]);

  useEffect(() => {
    let newArr = displayArr;
    if (loadMore == true) {
      let remainder = combinedArray.length - newArr.length;
      if (remainder >= displayThreshold) {
        let starter = newArr.length;
        for (let i = starter; i < starter + displayThreshold; i++) {
          newArr.push(combinedArray[i]);
        }
        setLoadMore(false);
      } else {
        for (
          let i = combinedArray.length - remainder;
          i < combinedArray.length;
          i++
        ) {
          newArr.push(combinedArray[i]);
        }
        setLoadMore(false);
      }
    }

    setDisplayArr(newArr);
    setIsLoading(false);
  }, [loadMore]);

  ///////////////// combine post and score array
  useEffect(() => {
    (async () => {
      console.log("$$$$", post);
      console.log("$$$$$   ", score);
      if (post.length !== 0 && score.length !== 0) {
        console.log(post.length, score.length);

        let combinedArray = await combineData(post, score);
        setCombinedArray(combinedArray);
        console.log(combinedArray);
        //////set combined arr use disp[lay arr to loop through stuff to display]
      }
    })();
  }, [score.length]);

  async function getData() {
    try {
      const postUrl = `${api_url}api/posts/`;
      const postResponse = await fetch(postUrl);
      const postData = await postResponse.json();

      const scoreUrl = `${api_url}api/postScore/`;
      const scoreResponse = await fetch(scoreUrl);
      const scoreData = await scoreResponse.json();

      if (postResponse.ok && scoreResponse.ok) {
        setPost(postData.posts);
        setScore(scoreData.scores);
        setIsLoading(false);
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
    console.log(scoreMap);
    for (let j = 0; j < postArr.length; j++) {
      console.log(postArr[j].id);
      if (scoreMap[postArr[j].id] !== undefined) {
        // console.log(scoreMap[postArr[j].id])
        combinedArray.push(postArr[j]);
        combinedArray[j]["score"] = scoreMap[postArr[j].id];
      }
    }
    // console.log("*******", combinedArray);
    return combinedArray;
  }

  function handleLoadMore() {
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
              {/* <div className="btn-group-vertical mb-3 ">
                <button
                  type="button"
                  className="btn btn-outline-success text-left"
                >
                  Rad
                </button>
                <div className="score text-center">{p.score}</div>
                <button
                  type="button"
                  className="btn btn-outline-danger text-left"
                >
                  Bad
                </button>
              </div> */}
              <table className="btn-group-vertical mb-3 ">
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-success text-left"
                  >
                    Rad
                  </button>
                </td>
                <td>
                  <button type="button" className="btn text-left" disabled>
                    {p.score}
                  </button>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger text-left"
                  >
                    Bad
                  </button>
                </td>
              </table>
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
