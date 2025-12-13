import { useState } from 'react';
import './App.css';
import Button from './components/button';
import RegisterForm from "./views/security/register-form";
import LoginForm from "./views/security/login-form";
import UserView from "./views/user/user";

function App() {
  const token = localStorage.getItem("token");
  let userDecoded = null;
  if (token) {
    const [, payloadEncoded] = token.split(".");
    userDecoded = JSON.parse(atob(payloadEncoded));
    console.log("User decoded:", userDecoded); 
  }
  const [user, setUser] = useState(userDecoded);

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <>
      <div className="header">
        <h1>Welcome to the material location website</h1>
      </div>
      <div className="login">
        {user === null && (
          <>
            <h2>Register</h2>
            <RegisterForm />
            <h2>Login</h2>
            <LoginForm setUser={setUser} />
          </>
        )}
        {user && (
          <>
            <h2>Hello, {user.username || 'User'}</h2>
            <Button
              variant="delete"
              title="Se déconnecter"
              onClick={handleLogout}
            />
            <UserView />
          </>
        )}
      </div>
    </>
  );
}

export default App;