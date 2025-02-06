import React from 'react';
import '../forms.css'

export function Login() {
  return (
    <main className="text-center">
          <div className="login">
            <h1>Welcome to SoundScope!</h1>
            <p>Please log in or create an account</p>
            <form method="get" action="userRatings.html" className="login-form">
              <div className="input-group mb-3" id="email">
                <span className="input-group-text" id="basic-addon1">✉</span>
                <input className="form-control" type="text" placeholder="janedoe@place.com" />
              </div>
              <div className="input-group mb-3" id="password">
                <span className="input-group-text" id="basic-addon1">ꗃ</span>
                <input className="form-control" type="password" placeholder="unbreakable password" />
              </div>
              <div className="button">
                <button type="submit" className="btn btn-primary">Login</button>
                <button type="submit" className="btn btn-outline-primary">Create Account</button>
              </div>
            </form>
          </div>
        </main>
  );
}