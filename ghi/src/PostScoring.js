import {useState} from "react";

// props for postscoring are being passed in mainpage
function PostScoring(props) {
    const [score, setScore] = useState(props.score)
    const [upvoteUsers, setUpvoteUsers] = useState(props.upvoteUsers)
    const [downvoteUsers, setDownvoteUsers] = useState(props.downvoteUsers)
    // const [currentUserId, setCurrentUserId] = useState(props.currentUserId)
    let post_id = '63c9bb657463225907cde86b'
    async function handleUpArrowClick() {
        console.log('activated')
        const url=`http://localhost:8001/api/postScore/upvote/${post_id}`;
            const fetchConfig ={
                method: "put",
                headers: {
                    "Content-Type": "application/json",
            }
        }
        const scoreEditResponse = await fetch(url, fetchConfig);
        console.log(scoreEditResponse)
        }
        
    function handleDownArrowClick() {
        // TODO: POST request to persist change in score(downvoteUsers array) when downarrow clicked
        setScore(score-1)
        setDownvoteUsers(downvoteUsers.concat(props.currentUserId))
    }
    // function handleUpArrowClick() {
    //     // TODO: PUT request to persist change in score(upvoteUsers array) when uparrow clicked
    //     setScore(score+1)
    //     setUpvoteUsers(upvoteUsers.concat(props.currentUserId))
    // }

    // function handleDownArrowClick() {
    //     // TODO: PUT request to persist change in score(downvoteUsers array) when downarrow clicked
    //     setScore(score-1)
    //     setDownvoteUsers(downvoteUsers.concat(props.currentUserId))
    // }
}

    return (
        <div className="card post-scoring-card" >
            <ul className="list-group list-group-flush">
                <button
                    onClick={() => handleUpArrowClick()}
                    type="button"
                    className="list-group-item list-group-item-primary list-group-item-action"
                    // disabled={props.upvoteUsers.includes(props.currentUserId)}
                    disabled={upvoteUsers.includes(props.currentUserId)}
                >
                    ^
                </button>
                <li className="list-group-item">{score}</li>
                <button
                    onClick={() => handleDownArrowClick()}
                    type="button"
                    className="list-group-item list-group-item-danger list-group-item-action"
                    // disabled={props.downvoteUsers.includes(props.currentUserId)}
                    disabled={downvoteUsers.includes(props.currentUserId)}
                >
                    v
                </button>
            </ul>
        </div>
    )
}
export default PostScoring;
