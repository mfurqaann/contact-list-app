import { useNavigate } from "react-router-dom";
import FormData from "./FormData";
import { useContact } from "../context/ContactContext";

function NewForm() {
  const navigate = useNavigate();

  const { handleAddContact } = useContact();

  const isEdit = false;

  function handleSubmit(contact) {
    const newContact = { ...contact, id: crypto.randomUUID() };
    handleAddContact(newContact);
    navigate("/");
  }
  return <FormData isEdit={isEdit} onSubmit={handleSubmit} />;
}

export default NewForm;
