import React from 'react';
import Button from 'react-bootstrap/Button';

export function Unauthenticated(props) {
    const [username, setUsername] = React.useState(props.username);
    const [password, setPassword] = React.useState('');

    async function loginUser() {
        localStorage.setItem('username', username);
        props.onLogin(username)
    }

    async function createUser() {
        localStorage.setItem('username', username);
        props.onLogin(username);
      }

    return (
        <>
        <div className="login">
        <h1>Welcome to SoundScope!</h1>
        <p>Please log in or create an account</p>
        <form method="get" to="ratings" className="login-form">
          <div className="input-group mb-3" id="email">
            <span className="input-group-text">✉</span>
            <input className="form-control" type="text" placeholder="janedoe@place.com" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className="input-group mb-3" id="password">
            <span className="input-group-text">ꗃ</span>
            <input className="form-control" type="password" placeholder="unbreakable password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className="button">
                <button type="submit" className="btn btn-primary" onClick={() => loginUser()} disabled={!username || !password}>
                    Login
                </button>
                <button type="submit" className="btn btn-outline-primary" onClick={() => createUser()} disabled={!username || !password}>
                    Create Account
                </button>
              </div>
            </form>
          </div>
        </>
    )
}