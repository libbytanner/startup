import React from 'react';
import { useNavigate } from 'react-router-dom';

import './authenticated.css';

export function Authenticated(props) {
    const navigate = useNavigate();
    
    function logout() {
        localStorage.removeItem('username');
        console.log('logging out')
        console.log(localStorage.getItem('username'))
        props.onLogout();
    }

    return (
      <div className="login">
        <div className='playerName'> Welcome {props.username}</div>
        <div>
          <button className="btn btn-primary" onClick={() => navigate('/ratings')}>
            My Ratings
          </button>
          <button className="btn btn-outline-primary" onClick={() => logout()}>
            Logout
          </button>
        </div>
      </div>
    );
}
