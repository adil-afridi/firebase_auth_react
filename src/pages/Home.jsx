import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';




function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSignUp() {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Sign-up successful
        console.log('Sign Up:', userCredential.user);
        setErrorMessage('');
        setIsSignUpActive(false); // Redirect to sign-in after sign-up
      })
      .catch((error) => {
        // Handle sign-up errors
        setErrorMessage(error.message);
      });
  }

  function handleSignIn() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Sign-in successful
        console.log('Sign In:', userCredential.user);
        setErrorMessage('');
        alert('Sign In Successful');
        navigate('/Private')
        
      })
      .catch((error) => {
        // Handle sign-in errors
        setErrorMessage(error.message);
      });
  }

  return (
    <form>
      {isSignUpActive ? <legend>Sign Up</legend> : <legend>Sign In</legend>}
      <fieldset>
        <div className="input-group">
          <div className="input">
            
            <input
              type="email"
              id="email"
              placeholder="Type your email.."
              value={email}
              onChange={handleEmailChange}
            />

          </div>
          <div className="input">
            <input
              type="password"
              id="password"
              placeholder="Type your password.."
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
        </div>
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {isSignUpActive ? (
          <button type="button" onClick={handleSignUp}>
            Sign Up
          </button>
        ) : (
          <button type="button" onClick={handleSignIn}>
            Sign In
          </button>
        )}
      </fieldset>
      {isSignUpActive ? (
        <p>
          Already have an account?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsSignUpActive(false);
              setErrorMessage('');
            }}
          >
            Sign In
          </a>
        </p>
      ) : (
        <p>
          Do not have an account?{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setIsSignUpActive(true);
              setErrorMessage('');
            }}
          >
            Sign Up
          </a>
        </p>
      )}
    </form>
  );
}

export default Home;
