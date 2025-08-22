import { useNavigate } from "react-router-dom";
import { useContact } from "../context/ContactContext";
import FormData from "../components/FormData";

function NewContact() {
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

export default NewContact;
