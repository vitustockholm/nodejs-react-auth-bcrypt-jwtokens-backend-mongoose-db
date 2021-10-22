import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails } from '../redux/actions/userActions';

const AccountPAge = () => {
  // Hooks
  // - - state
  const { user, loading, error } = useSelector((state) => state.userDetails);

  console.log(user, loading, error);

  const dispatch = useDispatch();

  // - - side effects
  useEffect(() => {
    dispatch(getUserDetails('profile'));
  }, []);

  return (
    <main>
      <section>
        <h1>Account</h1>
      </section>
      <section>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <ul>
            <li>{user?.name}</li>
            <li>{user?.email}</li>
          </ul>
        )}
      </section>
    </main>
  );
};

export default AccountPAge;
