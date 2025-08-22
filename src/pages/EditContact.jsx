import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContact } from "../context/ContactContext";
import FormData from "../components/FormData";

function EditContact() {
  const { id } = useParams();
  const navigate = useNavigate();

  const editMode = true;

  const { contacts, handleUpdateContact } = useContact();

  const contactsToEdit = contacts.find((contact) => contact.id === id);

  function handleSubmit(contact) {
    handleUpdateContact(contact);
    navigate("/");
  }

  return (
    <FormData
      isEdit={editMode}
      initialState={contactsToEdit}
      onSubmit={handleSubmit}
    />
  );
}

export default EditContact;
