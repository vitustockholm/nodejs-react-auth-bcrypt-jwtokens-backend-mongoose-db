import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { signupUser } from '../redux/actions/userActions';

const SignupPage = () => {
  // Hooks
  //  - state
  // - - - global state
  const { loading, user, error } = useSelector((state) => state.signup);

  const { user: logedUser } = useSelector((state) => state.login);

  const dispatch = useDispatch();
  console.log(logedUser);
  // - - - local state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  // - - redirects [from react-router]
  const history = useHistory();
  // - - side effects
  useEffect(() => {
    if (user || logedUser) history.push('/account');
  }, [user, history, logedUser]);

  // Custom Functions
  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Password do not match');
      setPassword('');
      setConfirmPassword('');

      return;
    } else {
      dispatch(signupUser(name, email, password));
    }
  };
  return (
    <main>
      <section>
        <h1>Sign up</h1>
      </section>
      <section>
        <form onSubmit={submitHandler}>
          <div>
            <label htmlFor='name'>Name:</label>
            <br />
            <input
              type='text'
              value={name}
              id='name'
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='email'>Email:</label>
            <br />
            <input
              type='text'
              value={email}
              id='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='password'>Password:</label>
            <br />
            <input
              type='text'
              value={password}
              id='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='confirmPassword'>Confirm Pass:</label>
            <br />
            <input
              type='text'
              value={confirmPassword}
              id='confirmPassword'
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <input type='submit' value='Sign Up' />
          </div>
        </form>
        {message && <p>{message}</p>}

        {error && <p>{error}</p>}
        {loading && <p>Loading....</p>}
      </section>
    </main>
  );
};

export default SignupPage;
