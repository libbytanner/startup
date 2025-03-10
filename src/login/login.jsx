import React from 'react';
import '../forms.css'

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ username, authState, onAuthChange }) {
  return (
    <main className="text-center">
      <div>
        {authState === AuthState.Authenticated && (
          <Authenticated username={username} onLogout={() => onAuthChange(username, AuthState.Unauthenticated )}/>
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            username={username} 
            onLogin={(loginUsername) => {
              onAuthChange(loginUsername, AuthState.Authenticated)
              console.log('change auth state');
            }} 
          />
        )}
      </div>
    </main>
  );
}