// import {useState} from "react";
// const api_url = `${process.env.REACT_APP_CONTENT_SERVICE_API_HOST}/`

// // props for postscoring are being passed in mainpage
// function PostScoring(props) {
//     const [score, setScore] = useState(props.score)
//     const [upvoteUsers, setUpvoteUsers] = useState(props.upvoteUsers)
//     const [downvoteUsers, setDownvoteUsers] = useState(props.downvoteUsers)
//     // const [currentUserId, setCurrentUserId] = useState(props.currentUserId)
//     let post_id = '63c9bb657463225907cde86b'
//     async function handleUpArrowClick() {
//         const url=`http://localhost:8001/api/postScore/upvote/${post_id}`;
//             const fetchConfig ={
//                 method: "put",
//                 headers: {
//                     "Content-Type": "application/json",
//             }
//         }
//         const scoreEditResponse = await fetch(url, fetchConfig);
//         }

//     async function handleDownArrowClick() {
//         const url=`http://localhost:8001/api/postScore/downvote/${post_id}`;
//             const fetchConfig ={
//                 method: "put",
//                 headers: {
//                     "Content-Type": "application/json",
//             }
//         }
//         const scoreEditResponse = await fetch(url, fetchConfig);
//         }


//     return (
//         <div className="card post-scoring-card" >
//             <ul className="list-group list-group-flush">
//                 <button
//                     onClick={() => handleUpArrowClick()}
//                     type="button"
//                     className="list-group-item list-group-item-primary list-group-item-action"
//                     disabled={upvoteUsers.includes(props.currentUserId)}
//                 >
//                     ^
//                 </button>

//                 <button
//                     onClick={() => handleDownArrowClick()}
//                     type="button"
//                     className="list-group-item list-group-item-danger list-group-item-action"
//                     disabled={downvoteUsers.includes(props.currentUserId)}
//                 >
//                     v
//                 </button>
//             </ul>
//         </div>
//     )
// }
// export default PostScoring;
