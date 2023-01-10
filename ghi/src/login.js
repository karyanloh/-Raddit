import { useState } from "react"

function LoginForm(props){
    const[email,setEmail] = useState('')
    const[username,setUsername] = useState('')
    const[password,setPassword] = useState('');

    return (
         <form>
            <div className="mb-3">
                <label htmlfor="email">Email address</label>
                <input value={email} onChange={e => setEmail(e.target.value)} required type = "email" className="form-control" id="email" placeholder="name@example.com"/>
            </div>
            <div className="mb-3">
                <label htmlfor="username">User Name</label>
                <input value={username} onChange={e => setUsername(e.target.value)} required type = "text" className="form-control" id="username" placeholder="Enter ursername"/>
            </div>
            <div className="mb-3">
                <label htmlfor="password">Password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} required type = "password" className="form-control" id="password" placeholder="Enter password"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>

    );
}

export default LoginForm;
