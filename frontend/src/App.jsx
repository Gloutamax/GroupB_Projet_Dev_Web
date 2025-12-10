import { useState } from 'react';
import './App.css';
import Button from './components/button';
import RegisterForm from "./views/security/register-form";
import LoginForm from "./views/security/login-form";
// TODO: Importation de la vue Utilisateur
// TODO: Importation de la vue Administrateur

function App() {
  const token = localStorage.getItem("token");
  let userDecoded = null;
  if (token) {
    const [, payloadEncoded] = token.split(".");
    userDecoded = JSON.parse(atob(payloadEncoded));
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
            <h2>Hello, {user.username}</h2>
            <Button
              variant="delete"
              title="Se déconnecter"
              onClick={handleLogout}
            />
            {/* TODO : Afficher ici vue utilisateur (à ajuster ensuite) */}
          </>
        )}
      </div>
    </>
  );
}

export default App;
