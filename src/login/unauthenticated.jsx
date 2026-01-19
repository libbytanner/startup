import React from 'react';
import Button from 'react-bootstrap/Button';
import { LoginFailed } from './loginFailed';

export function Unauthenticated(props) {
    const [username, setUsername] = React.useState(props.username);
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');

    async function login() {
      authenticate(`api/auth/login`)
    }

    async function create() {
      authenticate(`api/auth/create`)

    }


    async function authenticate(endpoint) {
      const response = await fetch(endpoint, {
        method: 'post',
        body: JSON.stringify({ username: username, password: password }), 
        headers: {
          'Content-type': 'application/json; charset=UTF-8', 
        },
      });
      if (response?.status === 200) {
        localStorage.setItem('username', username);
        props.onLogin(username);
      } else {
        const body = await response.json();
        setError(`Error: ${body.msg}`);
      }
    }

    return (
        <>
        <div className="login">
        <h1>Welcome to SoundScope!</h1>
        <p>Please log in or create an account</p>
        <div id="note_block">
          <p class="note">*Note: For just checking out the app, you can use:</p>
          <p class="note">username: example / password: 123</p>
        </div>
        <form method="get" to="ratings" className="login-form">
          <div className="input-group mb-3" id="username">
            <span className="input-group-text">✉</span>
            <input className="form-control" type="text" placeholder="janedoe123" onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className="input-group mb-3" id="password">
            <span className="input-group-text">ꗃ</span>
            <input className="form-control" type="password" placeholder="unbreakable password" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div className="button">
                <button type="button" className="btn btn-primary" onClick={() => login()} disabled={!username || !password}>
                    Login
                </button>
                <button type="button" className="btn btn-outline-primary" onClick={() => create()} disabled={!username || !password}>
                    Create Account
                </button>
              </div>
            </form>
            <LoginFailed message={error} onHide={() => setError(null)}/>
          </div>
        </>
    )
}