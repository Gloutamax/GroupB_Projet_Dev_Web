import { useState } from "react";
import Button from '../../components/button';

export default function RegisterForm(props) {
    const [loginSuccess, setLoginSuccess] = useState(false);
    async function handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const values = {
            login: form.login.value, 
            email: form.email.value, 
            password: form.password.value,
        };
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        const data = await response.json();
        if (response.ok) {
            setLoginSuccess(true);
            form.reset();
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input name="email" type="email" />
            <label>Login</label>
            <input name="login" />
            <label>Password</label>
            <input name="password" type="password" />
            <Button component="input" type="submit" title="S'enregistrer" />
            {loginSuccess && (
                <strong style={{ color: "green" }}>Register successfuly !</strong>
            )}
        </form>
    )
}