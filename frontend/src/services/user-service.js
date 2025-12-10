import api from "./api";

export default {
    getUser: async function () {
        const response = await api("/user");
        if (response.status === 401) {
            alert("You need to be connected");
            throw new Error("You need to be connected");
        }
        return await response.json();
    },
    createUser: async function (userData) {
        const response = await api("/users", {
            method: "POST",
            body: JSON.stringify(userData),
        });
        if (response.status === 401) {
            alert("You need to be connected");
            throw new Error("You need to be connected");
        }
        return await response.json();
    },
    deleteUser: async function (user_id) {
        const response = await api(`/users/${user_id}`, {
            method: "DELETE",
        });
        if (response.status === 401) {
            alert("You need to be connected");
            throw new Error("You need to be connected");
        }
        return;
    },
    updateUser: async function (user_id, userData) {
        const response = await api(`/users/${user_id}`, {
            method: "PATCH",
            body: JSON.stringify(userData),
        });
        if (response.status === 401) {
            alert("You need to be connected");
            throw new Error("You need to be connected");
        }
        return await response.json(); 
    }
}