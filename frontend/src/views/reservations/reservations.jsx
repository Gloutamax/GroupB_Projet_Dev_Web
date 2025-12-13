import { useEffect, useState } from "react";
import Button from "../../components/Button";
import reservationService from "../../services/reservation-service";

function ReservationView({ reservation, setReservations, isAdmin }) {
  const [editMode, setEditMode] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return "Non définie";
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR");
  };

  async function handleEdit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = {
      startDate: form.startDate.value,
      endDate: form.endDate.value,
    };
    const content = await reservationService.updateReservation(reservation.id, values);
    setReservations((prev) =>
      prev.map((r) => (r.id === content.id ? content : r))
    );
    setEditMode(false);
  }

  async function handleDelete() {
    if (confirm(`Supprimer la réservation #${reservation.id} ?`)) {
      await reservationService.deleteReservation(reservation.id);
      setReservations((prev) => prev.filter((r) => r.id !== reservation.id));
    }
  }

  return (
    <>
      <tr data-test-id={reservation.id}>
        <td>#{reservation.id}</td>
        {isAdmin && <td>{reservation.User?.username} (id:{reservation.User?.id})</td>}
        <td>{reservation.Materiel?.name || "N/A"}</td>
        <td>{reservation.Materiel?.description || "Aucune description"}</td>
        <td>
          Du {formatDate(reservation.startDate)} au {formatDate(reservation.endDate)}
        </td>
        {isAdmin && (
          <td>
            <Button
              title="Modifier"
              onClick={() => setEditMode((prev) => !prev)}
            />
            <Button variant="delete" title="Supprimer" onClick={handleDelete} />
          </td>
        )}
      </tr>
      {isAdmin && editMode && (
        <tr>
          <td colSpan={isAdmin ? 6 : 5}>
            <form onSubmit={handleEdit}>
              <input
                name="startDate"
                type="date"
                placeholder="Date de début"
                defaultValue={reservation.startDate?.split("T")[0]}
              />
              <input
                name="endDate"
                type="date"
                placeholder="Date de fin"
                defaultValue={reservation.endDate?.split("T")[0]}
              />
              <Button title="Mettre à jour" type="submit" />
            </form>
          </td>
        </tr>
      )}
    </>
  );
}

export default function ReservationList() {
  const [reservations, setReservations] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const [, payloadEncoded] = token.split(".");
      const userDecoded = JSON.parse(atob(payloadEncoded));
      setCurrentUser(userDecoded);

      if (userDecoded.role === "ADMIN") {
        reservationService
          .getAllReservations()
          .then((data) => setReservations(Array.isArray(data) ? data : []))
          .catch((e) => alert(e));
      } else {
        reservationService
          .getUserReservations()
          .then((data) => setReservations(Array.isArray(data) ? data : []))
          .catch((e) => alert(e));
      }
    }
  }, []);

  return (
    <div>
      <h2>
        {currentUser?.role === "ADMIN"
          ? `Toutes les réservations (${reservations.length})`
          : `Mes réservations (${reservations.length})`}
      </h2>
      {reservations.length > 0 ? (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              {currentUser?.role === "ADMIN" && <th>Utilisateur</th>}
              <th>Matériel</th>
              <th>Description</th>
              <th>Période</th>
              {currentUser?.role === "ADMIN" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <ReservationView
                key={reservation.id}
                reservation={reservation}
                setReservations={setReservations}
                isAdmin={currentUser?.role === "ADMIN"}
              />
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucune réservation disponible.</p>
      )}
    </div>
  );
}
