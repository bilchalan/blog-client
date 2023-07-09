import React, { useEffect } from 'react';
import SignInSignUp from '../components/SignInSignUp';
import { useSignInMutation, useSignUpMutation } from '../api/authApi';
import { enqueueSnackbar } from 'notistack';
import { selectCurrentUser } from '../slice/authSlice';
import { useAppSelector } from '../../../app/hooks';
import { useLocation, useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const { user } = useAppSelector(selectCurrentUser);
  const location = useLocation();
  let from = '/';
  if (location.state) {
    from = location.state.from;
  }
  const [signIn] = useSignInMutation();
  const handleSignIn = async (email: string, password: string) => {
    await signIn({ email, password });
  };
  const [signUp, { isSuccess: signedUp }] = useSignUpMutation();
  const handleSignUp = async (
    name: string,
    email: string,
    password: string,
    avatar: string
  ) => {
    await signUp({ name, email, password, avatar });
  };
  useEffect(() => {
    if (user) {
      navigate(from);
    }
    if (signedUp) {
      enqueueSnackbar('User signed Up.', { variant: 'success' });
    }
  }, [user, navigate, signedUp]);

  return (
    <div className="auth">
      <SignInSignUp onSignIn={handleSignIn} onSignUp={handleSignUp} />
    </div>
  );
};

export default Auth;
