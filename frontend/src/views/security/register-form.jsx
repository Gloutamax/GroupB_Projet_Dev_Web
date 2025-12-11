import { useState } from 'react';
import Button from '../../components/button';

export default function RegisterForm() {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    async function handleRegister(event) {
        event.preventDefault();
        setError(null);
        setSuccess(null);

        const form = event.currentTarget;
        const userData = {
            username: form.username.value,
            email: form.email.value,
            password: form.password.value,
        };

        try {
            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Inscription réussie ! Vous pouvez maintenant vous connecter.');
                form.reset();
            } else {
                setError(data.email || data.username || data.password || 'Erreur lors de l\'inscription');
            }
        } catch (err) {
            setError('Erreur de connexion au serveur');
            console.error('Registration error:', err);
        }
    }

    return (
        <form onSubmit={handleRegister}>
            <input
                name="username"
                type="text"
                placeholder="Nom d'utilisateur"
                required
            />
            <input
                name="email"
                type="email"
                placeholder="Email"
                required
            />
            <input
                name="password"
                type="password"
                placeholder="Mot de passe"
                required
            />
            <Button title="S'enregistrer" type="submit" />
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    );
}