import api from "./api";

export default {
  getUserReservations: async function () {
    const response = await api("/reservations/me");
    if (response.status === 401) {
      alert("You need to be connected");
      throw new Error("You need to be connected");
    }
    return await response.json();
  },

  getAllReservations: async function () {
    const response = await api("/reservations");
    if (response.status === 401) {
      alert("You need to be connected");
      throw new Error("You need to be connected");
    }
    return await response.json();
  },

  createReservation: async function (reservation) {
    const response = await api("/reservations", {
      method: "POST",
      body: JSON.stringify(reservation),
    });
    if (response.status === 401) {
      alert("You need to be connected");
      throw new Error("You need to be connected");
    }
    return await response.json();
  },

  getReservationById: async function (id) {
    const response = await api(`/reservations/${id}`);
    if (response.status === 401) {
      alert("You need to be connected");
      throw new Error("You need to be connected");
    }
    return await response.json();
  },

  updateReservation: async function (id, reservation) {
    const response = await api(`/reservations/${id}`, {
      method: "PATCH",
      body: JSON.stringify(reservation),
    });
    if (response.status === 401) {
      alert("You need to be connected");
      throw new Error("You need to be connected");
    }
    return await response.json();
  },

  deleteReservation: async function (id) {
    const response = await api(`/reservations/${id}`, {
      method: "DELETE",
    });
    if (response.status === 401) {
      alert("You need to be connected");
      throw new Error("You need to be connected");
    }
    return;
  },
};
