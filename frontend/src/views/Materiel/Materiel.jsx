import React, { useState } from "react";
import Button from "C:/Users/Lenovo/Documents/ESILV 2ème année/Développement web/PROJET/GroupB_Projet_Dev_Web/frontend/src/components";
import MaterielService from "../../services/materiel-service";

function MaterielView({ materiel, setMateriels }) {
  const [editMode, setEditMode] = useState(false);

  async function handleEdit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = {
      nom: form.nom.value,
      description: form.description.value,
      etat: form.etat.value,
    };

    try {
      const content = await MaterielService.updateMateriel(materiel.id, values);
      setMateriels((prev) =>
        prev.map((m) => (m.id === content.id ? content : m))
      );
      setEditMode(false);
    } catch (error) {
      alert("Erreur lors de la mise à jour du matériel");
      console.error(error);
    }
  }

  async function handleDelete() {
    if (confirm(`Supprimer le matériel ${materiel.nom} ?`)) {
      try {
        await MaterielService.deleteMateriel(materiel.id);
        setMateriels((prev) => prev.filter((m) => m.id !== materiel.id));
      } catch (error) {
        alert("Erreur lors de la suppression");
        console.error(error);
      }
    }
  }

  return (
    <>
      <tr>
        <td>{materiel.id}</td>
        <td>{materiel.nom}</td>
        <td>{materiel.description}</td>
        <td>{materiel.etat}</td>
        <td>
          <Button title="Modifier" onClick={() => setEditMode(!editMode)} />
          <Button variant="delete" title="Supprimer" onClick={handleDelete} />
        </td>
      </tr>
      {editMode && (
        <tr>
          <td colSpan="5">
            <form onSubmit={handleEdit}>
              <input name="nom" defaultValue={materiel.nom} />
              <input name="description" defaultValue={materiel.description} />
              <input name="etat" defaultValue={materiel.etat} />
              <Button title="Mettre à jour" type="submit" />
            </form>
          </td>
        </tr>
      )}
    </>
  );
}

export default MaterielView;
