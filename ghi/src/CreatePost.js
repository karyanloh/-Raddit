import { useState } from 'react';
// import { Link } from 'react-router-dom';



function CreatePost(props) {

    // useEffect(() => {
    //     async function getData() {
    //         const url = `${process.env.REACT_APP_CONTENT_SERVICE_API_HOST}/api/posts`;
    //         const response = await fetch(url);
    //         const data = await response.json();

    //         if (response.ok) {
    //             setPost(data.user);
    //         } else {
    //             setError(data.message);
    //             setOwners([]);
    //         }
    //     }
    //     getData();
    // })

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [subraddit, setSubraddit] = useState("");
    const [user, setUser] = useState("");
    const data = {
        'title': title,
        'description': description,
        'subraddit': subraddit,
        'user_id': user
    }

    async function post(data){
        const url = `http://localhost:8001/api/posts`;
        const fetchConfig = {
            method: 'post',
            body: JSON.stringify(data),
            headers: {
            "Content-Type": "application/json",
        },
        }
        const response = await fetch(url,fetchConfig)
        }



    return (
        <div className="d-flex justify-content-center" >
            <div className="shadow-none p-3 mb-5 bg-dark rounded p-4 mt-4" >
                <h1 style={{color: "white"}}>Create a new post !</h1>
                <form>
                    <div className="form-floating " >
                        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required type="text" name="Title" id="Title" className="form-control" />
                        <label htmlFor="Title">Title</label>
                    </div>
                    <div className="form-group mb-4 ">
                        <label htmlFor="exampleFormControlTextarea1" >Example textarea</label>
                        <textarea type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="10" placeholder="Description"/>
                    </div>
                    <div className="form-group mb-4 ">
                        <label htmlFor="exampleFormControlTextarea1" >Example textarea</label>
                        <textarea type="text" value={user} onChange={(e) => setUser(e.target.value)} className="form-control" id="exampleFormControlTextarea1"  placeholder="User"/>
                    </div>
                    <div className="mb-3 ">
                        <input value={subraddit} onChange={(e) => setSubraddit(e.target.value)} placeholder="SubRaddit" required type="text" name="subraddit" id="subraddit" className="form-control" />
                        <label htmlFor="SubRaddit">SubRaddit</label>
                            {/* <select  placeholder="SubRaddit" required name="SubRaddit" id="SubRaddit" className="form-select">
                                <option value="">Choose a SubRaddit</option>
                            </select> */}
                        </div>
                        <button onClick={() => post(data)} className="btn btn-light">Create</button>
                </form>
            </div>
        </div>
    )
}

export default CreatePost;
