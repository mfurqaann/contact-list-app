import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

function FormData({ isEdit, initialState, onSubmit }) {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    gender: "",
    nationality: "",
    picture: "",
  });

  const [didEdit, setDidEdit] = useState({
    fullname: false,
    email: false,
    phone: false,
    gender: false,
    nationality: false,
    picture: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (initialState) {
      setFormData(initialState);
    }
    setLoading(false);
  }, [initialState]);

  const isInvalidFullName =
    didEdit.fullname && formData.fullname.trim().length === 0;
  const isInvalidEmail = didEdit.email && !formData.email.includes("@");
  const isInvalidPhone =
    didEdit.phone &&
    formData.phone.trim().length === 0 &&
    !isNaN(formData.phone);
  const isInvalidGender = didEdit.gender && formData.gender.trim().length === 0;
  const isInvalidNationality =
    didEdit.nationality && formData.nationality.trim().length === 0;
  const isInvalidPicture =
    didEdit.picture && formData.picture.trim().length === 0;

  function handleChangeInput(e) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleChangeSelect(identifier, value) {
    setFormData((prev) => ({ ...prev, [identifier]: value }));
  }

  function handleBlur(identifier) {
    setDidEdit((prev) => ({ ...prev, [identifier]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }
  return (
    <div className="container mx-auto space-y-3">
      <h1 className="text-2xl font-bold mt-3">
        {!isEdit ? "New Contact" : "Edit Contact"}
      </h1>
      <hr />
      <form className="max-w-lg" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label htmlFor="fullname">Name</label>
          <Input
            id="fullname"
            type="text"
            name="fullname"
            onChange={handleChangeInput}
            onBlur={() => handleBlur("fullname")}
            value={formData?.fullname}
          />

          <div>
            {isInvalidFullName && (
              <p className="text-red-500">Name is required</p>
            )}
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="email">Email</label>
          <Input
            id="email"
            name="email"
            onChange={handleChangeInput}
            onBlur={() => handleBlur("email")}
            value={formData.email}
          />
          <div>
            {isInvalidEmail && <p className="text-red-500">Email is Invalid</p>}
          </div>
        </div>
        <div className="mb-5">
          <label htmlFor="phone">Phone</label>
          <Input
            id="phone"
            name="phone"
            onChange={handleChangeInput}
            onBlur={() => handleBlur("phone")}
            value={formData.phone}
          />
          <div>
            {isInvalidPhone && <p className="text-red-500">Phone is invalid</p>}
          </div>
        </div>
        <div className="mb-5">
          <label>Gender</label>
          <Select
            key={formData.gender}
            onValueChange={(value) => handleChangeSelect("gender", value)}
            name="gender"
            value={formData.gender}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Gender</SelectLabel>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div>
            {isInvalidGender && (
              <p className="text-red-500">Gender is required</p>
            )}
          </div>
        </div>
        <div className="mb-5">
          <label>Nationality</label>
          <Select
            key={formData.nationality}
            onValueChange={(value) => handleChangeSelect("nationality", value)}
            name="nationality"
            value={formData.nationality}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Nationality" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Nationality</SelectLabel>
                <SelectItem value="US">United States</SelectItem>
                <SelectItem value="FR">France</SelectItem>
                <SelectItem value="DK">Denmark</SelectItem>
                <SelectItem value="GB">United Kingdom</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div>
            {isInvalidNationality && (
              <p className="text-red-500">Nationality is required</p>
            )}
          </div>
        </div>
        <div className="mb-5">
          <label>Picture URL</label>
          <Input
            id="picture"
            name="picture"
            value={formData.picture}
            onChange={handleChangeInput}
            onBlur={() => handleBlur("picture")}
          />
          <div>
            {isInvalidPicture && (
              <p className="text-red-500">Picture URL is required</p>
            )}
          </div>
        </div>
        <Button>Submit</Button>
      </form>
    </div>
  );
}

export default FormData;
