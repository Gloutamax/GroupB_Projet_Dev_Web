import { useEffect } from "react";
import { useState } from "react";
import Button from "../../components/button"; 
import UserService from "../../services/user-service";

function UserView({ user, setUser }) {
    const [editMode, setEditMode] = useState(false);

    async function handleEdit(event) {
        event.preventDefault(); // Correction: preventDefault au lieu de preventDeafault
        const form = event.currentTarget;
        const values = {
            username: form.username.value,
            email: form.email.value,
        };

        const content = await UserService.updateUser(user.id, values);
        setUser((prev) =>
        prev.map((u) => (u.id === content.id ? content : u))
        );
    }

    async function handleDelete() {
        await UserService.deleteUser(user.id);
        setUser((prev) => prev.filter((u) => u.id !== user.id))
    }

    return (
        <>
            <div data-test-id={user.id}>
                <span>{user.username}</span>
                <span style={{ marginLeft: 5 }}>{user.email}</span>
                <Button
                    variant="icon"
                    title="v"
                    onClick={() => setEditMode((prev) => !prev)}
                />
                <Button variant="delete" title="X" onClick={handleDelete} />
            </div>
            {editMode && (
                <form onSubmit={handleEdit}>
                    <input
                        name="username"
                        placeholder="username"
                        defaultValue={user.username}
                    />
                    <input
                        name="email"
                        placeholder="email"
                        defaultValue={user.email}
                    />
                    <textarea
                        name="password"
                        placeholder="password"
                        defaultValue={user.password}
                    ></textarea>
                    <Button title="Mettre à jour" type="submit" />
                </form>
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

    return (
        <div>
            {currentUser?.role === "ADMIN" && (
                <>
                    <h2>Create User</h2>
                    <form onSubmit={handleCreate}>
                        <input name="username" placeholder="username"/>
                        <input name="email" placeholder="email" type="email"/>
                        <input name="password" placeholder="password" type="password"/>
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
            {users.map((user) => (
                <UserView user={user} setUser={setUsers} key={user.id} />
            ))}
            {users.length === 0 && <p>No users found.</p>}
        </div>
    );
}