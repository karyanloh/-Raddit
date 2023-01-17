import {useState} from "react";

// props for postscoring are being passed in mainpage
function PostScoring(props) {
    const [score, setScore] = useState(props.score)
    const [upvoteUsers, setUpvoteUsers] = useState(props.upvoteUsers)
    const [downvoteUsers, setDownvoteUsers] = useState(props.downvoteUsers)
    // const [currentUserId, setCurrentUserId] = useState(props.currentUserId)

    async function handleUpArrowClick() {
        // TODO: POST request to persist change in score(upvoteUsers array) when uparrow clicked
        try {
            const response = await fetch('https://localhost:8001/api/postscore{id}', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.ok) {
                throw new Error(`Error! status: ${response.status}`)
            }
            const result = await response.json()

            // console.log('result: ', JSON.stringify(result, null, 1))

        // TODO: check if we dont need to check if its in upvote users,  we need to check if its in downvote
        setScore(score+1)
        setUpvoteUsers(upvoteUsers.concat(props.currentUserId))
    } catch (err) {
        console.log('error')
        // setErr(err.message)
    } finally {
        setScore(true)
    }
    }
    function handleDownArrowClick() {
        // TODO: POST request to persist change in score(downvoteUsers array) when downarrow clicked
        setScore(score-1)
        setDownvoteUsers(downvoteUsers.concat(props.currentUserId))
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
export default PostScoring
