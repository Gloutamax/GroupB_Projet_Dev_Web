import { useEffect } from "react";
import { useState } from "react";
import Button from "../../components/button"; 
import UserService from "../../services/user-service";

function UserView({ user, setUser }) {
    const [editMode, setEditMode] = useState(false);

    async function handleEdit(event) {
        event.preventDeafault();
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

    useEffect(() => {
        console.log("Loading users...");
        UserService
            .getUser()
            .then((data) => setUsers(data))
            .then(() => alert("Users loaded"))
            .catch((e) => alert(e));
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
            <h2>Create User</h2>
            <form onSubmit={handleCreate}>
                <input name="username" placeholder="username"/>
                <input name="email" placeholder="email" type="email"/>
                <input name="password" placeholder="password" type="password"/>
                <Button title="Create" type="submit"/>
            </form>
            <h2>User List ({users.length})</h2>
            {users.map((user) => (
                <UserView user={user} setUser={setUsers} key={user.id} />
            ))}
            {users.length === 0 && <p>No users found.</p>}
        </div>
    );
}