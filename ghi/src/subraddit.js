import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

function SubRaddit() {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState({});
  const {subraddit} = useParams();
  
  const getData = useCallback(async () => {
    try {
      const postUrl = `http://localhost:8001/api/subraddit/${subraddit}`;
      const postResponse = await fetch(postUrl);
      const postData = await postResponse.json();
      setPost(postData.posts);
      setIsLoading(false);

    } catch (error) {
      console.error(error);
      setPost({ error: "Error fetching post" });
    }
  }, [subraddit]);
  useEffect(() => {
    getData();
  }, [getData]);
  
  
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

          {post.map((p) => {
            return (
              <div className="card-body" key={p.id}>
                <div>
                  <div className="card">
                    <h5 className="card-title">{p.title}</h5>
                    <a href="/#">
                      <p className="card-text">{p.description}</p>
                    </a>
                    <a href="/#" className="card-link">
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
            <a href="/#" className="card-link">
              Link to post detail
            </a>
            <a href="/#" className="card-link">
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
}

export default SubRaddit;
