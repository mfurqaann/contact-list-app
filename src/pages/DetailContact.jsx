import { useNavigate, useParams } from "react-router-dom";
import { useContact } from "../context/ContactContext";

import { Button } from "@/components/ui/button";
import AlertDelete from "../components/AlertDelete";

function DetailContact() {
  const { id } = useParams();
  let navigate = useNavigate();

  const { contacts, handleDeleteContact } = useContact();

  const detailData = contacts.find((contact) => contact.id === id);

  function handleDelete(id) {
    handleDeleteContact(id);
    navigate("/");
  }

  function handleEdit(id) {
    navigate(`/contacts/edit/${id}`);
  }

  return (
    <div className="max-w-[960px] mx-auto border-solid border-4 p-4">
      {detailData && (
        <>
          <h2 className="text-2xl">{detailData.fullName}</h2>
          <hr className="my-3" />
          <div className="profile flex justify-center md:justify-start flex-wrap md:flex-nowrap gap-3">
            <img
              src={detailData.picture}
              className="w-[200px] h-[200px] border-solid border-2"
            />

            <div className="profile-info">
              <div className="flex my-3">
                <strong className="w-[150px]">Email</strong>
                <span>{detailData.email}</span>
              </div>
              <hr />
              <div className="flex my-3">
                <strong className="w-[150px]">Phone</strong>
                <span>{detailData.phone}</span>
              </div>
              <hr />
              <div className="flex my-3">
                <strong className="w-[150px]">Gender</strong>
                <span>{detailData.gender}</span>
              </div>
              <hr />
              <div className="flex my-3">
                <strong className="w-[150px]">Nationality</strong>
                <span>{detailData.nationality}</span>
              </div>
              <hr />
              <div className="flex gap-4 my-3">
                <Button
                  onClick={() => handleEdit(detailData.id)}
                  className="bg-yellow-500 text-black cursor-pointer hover:bg-yellow-600"
                >
                  Edit
                </Button>
                <AlertDelete onClickDelete={() => handleDelete(detailData.id)}>
                  <Button variant="destructive" className="cursor-pointer">
                    Delete
                  </Button>
                </AlertDelete>
              </div>
              <hr />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DetailContact;
