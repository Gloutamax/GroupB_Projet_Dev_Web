import { useEffect } from "react";
import { useState } from "react";
import Button from "../../components/Button"; 
import UserService from "../../services/user-service";

function UserView({ user, setUser, currentUserId, onSelfDelete }) {
    const [editMode, setEditMode] = useState(false);

    async function handleEdit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const values = {
            username: form.username.value,
            email: form.email.value,
        };
        
        // Ajouter le mot de passe seulement s'il est renseigné
        if (form.password.value) {
            values.password = form.password.value;
        }

        try {
            const content = await UserService.updateUser(user.id, values);
            setUser((prev) =>
                prev.map((u) => (u.id === content.id ? content : u))
            );
            setEditMode(false);
        } catch (error) {
            alert("Erreur lors de la mise à jour");
            console.error(error);
        }
    }

    async function handleDelete() {
        if (confirm(`Êtes-vous sûr de vouloir supprimer l'utilisateur ${user.username} ?`)) {
            try {
                await UserService.deleteUser(user.id);
                
                // Si l'utilisateur supprime son propre compte
                if (user.id === currentUserId) {
                    onSelfDelete();
                } else {
                    setUser((prev) => prev.filter((u) => u.id !== user.id));
                }
            } catch (error) {
                alert("Erreur lors de la suppression");
                console.error(error);
            }
        }
    }

    return (
        <>
            <tr data-test-id={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                    <Button
                        title="Modifier"
                        onClick={() => setEditMode((prev) => !prev)}
                        style={{ marginRight: '5px' }}
                    />
                    <Button variant="delete" title="Supprimer" onClick={handleDelete} />
                </td>
            </tr>
            {editMode && (
                <tr>
                    <td colSpan="5">
                        <form onSubmit={handleEdit} style={{ padding: '10px', backgroundColor: '#f0f0f0' }}>
                            <input
                                name="username"
                                placeholder="username"
                                defaultValue={user.username}
                                style={{ marginRight: '10px' }}
                            />
                            <input
                                name="email"
                                placeholder="email"
                                defaultValue={user.email}
                                style={{ marginRight: '10px' }}
                            />
                            <input
                                name="password"
                                type="password"
                                placeholder="nouveau mot de passe (optionnel)"
                                style={{ marginRight: '10px' }}
                            />
                            <Button title="Mettre à jour" type="submit" />
                        </form>
                    </td>
                </tr>
            )}
        </>
    );
}

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        console.log("Loading user data...");
        
        // Récupérer l'utilisateur connecté depuis le token
        const token = localStorage.getItem("token");
        if (token) {
            const [, payloadEncoded] = token.split(".");
            const userDecoded = JSON.parse(atob(payloadEncoded));
            setCurrentUser(userDecoded);
            
            // Si admin, charger tous les utilisateurs
            if (userDecoded.role === "ADMIN") {
                UserService
                    .getAllUsers()
                    .then((data) => {
                        console.log("Users data:", data);
                        setUsers(Array.isArray(data) ? data : []);
                    })
                    .then(() => console.log("Users loaded"))
                    .catch((e) => alert(e));
            } else {
                // Si USER, charger uniquement ses propres données
                UserService
                    .getUser()
                    .then((data) => {
                        console.log("User data:", data);
                        setUsers([data]); // Mettre l'utilisateur dans un tableau pour utiliser map
                    })
                    .then(() => console.log("User loaded"))
                    .catch((e) => alert(e));
            }
        }
    }, []);

    async function handleCreate(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const values = {
            username: form.username.value,
            email: form.email.value,
            password: form.password.value,
        };
        const content = await UserService.createUser(values);
        setUsers((prev) => [...prev, content]);
        form.reset();
    }

    function handleSelfDelete() {
        // Déconnecter l'utilisateur
        localStorage.removeItem("token");
        alert("Votre compte a été supprimé avec succès. Vous allez être redirigé vers la page de connexion.");
        // Recharger la page pour revenir à l'état non connecté
        window.location.reload();
    }

    return (
        <div style={{ padding: '20px' }}>
            {currentUser?.role === "ADMIN" && (
                <>
                    <h2>Create User</h2>
                    <form onSubmit={handleCreate} style={{ marginBottom: '20px' }}>
                        <input 
                            name="username" 
                            placeholder="username"
                            style={{ marginRight: '10px' }}
                        />
                        <input 
                            name="email" 
                            placeholder="email" 
                            type="email"
                            style={{ marginRight: '10px' }}
                        />
                        <input 
                            name="password" 
                            placeholder="password" 
                            type="password"
                            style={{ marginRight: '10px' }}
                        />
                        <Button title="Create" type="submit"/>
                    </form>
                </>
            )}
            <h2>
                {currentUser?.role === "ADMIN" 
                    ? `User List (${users.length})`
                    : "My Profile"
                }
            </h2>
            {users.length > 0 ? (
                <table style={{ 
                    width: '100%', 
                    borderCollapse: 'collapse',
                    marginTop: '20px'
                }}>
                    <thead>
                        <tr style={{ backgroundColor: '#1a52ccff' }}>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Username</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Role</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <UserView 
                                user={user} 
                                setUser={setUsers} 
                                currentUserId={currentUser?.user_id}
                                onSelfDelete={handleSelfDelete}
                                key={user.id} 
                            />
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
}