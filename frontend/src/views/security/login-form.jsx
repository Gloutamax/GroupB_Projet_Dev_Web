import { useState } from 'react';
import Button from '../../components/button';

export default function LoginForm({ setUser }) {
    const [invalidLogin, setInvalidLogin] = useState(false);
    async function handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget; 
        const values = {
            email: form.email.value,
            password: form.password.value,
        };
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        if (response.status === 401) {
            setInvalidLogin(true);
        } else {
            setInvalidLogin(false);
            const data = await response.json();
            const token = data.token;
            localStorage.setItem("token", token);
            const [, payloadEncoded] = token.split(".");
            const payload = JSON.parse(atob(payloadEncoded));
            setUser(payload);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {invalidLogin && <p style={{ color: "red" }}>invalidLogin</p>}
            <label>Email</label>
            <input name="email" type="email" />
            <label>Password</label>
            <input name="password" type ="password" />
            <Button component="input" type="submit" title="Se connecter" />
        </form>
    );
}