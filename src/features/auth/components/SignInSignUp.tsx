import React, { useState } from 'react';

interface AuthPageProps {
  onSignIn: (email: string, password: string) => void;
  onSignUp: (
    name: string,
    email: string,
    password: string,
    avatar: string
  ) => void;
}
const SignInSignUp = ({ onSignIn, onSignUp }: AuthPageProps) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [avatar, setAvatar] = useState<string>('');
  const [isSignIn, setIsSignIn] = useState<boolean>(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSignIn) {
      onSignIn(email, password);
    } else {
      onSignUp(name, email, password, avatar);
    }
  };
  return (
    <div>
      <h1>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
      <form onSubmit={handleSubmit}>
        {!isSignIn && (
          <div>
            <label>Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!isSignIn && (
          <div>
            <label>Avatar: </label>
            <input
              type="text"
              value={avatar}
              onChange={(e) => setAvatar(e.target.value)}
            />
          </div>
        )}
        <button type="submit">{isSignIn ? 'SignIn' : 'SignUp'}</button>
      </form>
      <p>
        {isSignIn ? "Don't have an account?" : 'Already have an account?'}
        <br />
        <button type="button" onClick={() => setIsSignIn(!isSignIn)}>
          {isSignIn ? 'SignUp' : 'SignIn'}
        </button>
      </p>
    </div>
  );
};

export default SignInSignUp;
