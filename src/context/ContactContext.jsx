import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import { fetchContacts } from "../api/contactApi";

export const ContactContext = createContext({
  contacts: [],
  countFilter: 0,
  selectPage: 1,
  handleCheckboxGender: () => {},
  handleCheckboxNationality: () => {},
  handleDeleteContact: () => {},
  handleAddContact: () => {},
  handleUpdateContact: () => {},
  setSelectPage: () => {},
});

function contactReducer(state, action) {
  switch (action.type) {
    case "ADD_CONTACT":
      return { contacts: [action.payload, ...state] };
    case "INIT_CONTACT":
      return { contacts: action.payload };
    case "DELETE_CONTACT":
      const deletedContact = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
      return { contacts: deletedContact };
    case "UPDATE_CONTACT":
      const updateContact = state.contacts.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );

      return { contacts: updateContact };
    default:
      return { contacts: [] };
  }
}

export function ContactProvider({ children }) {
  const [isEdit, setIsEdit] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedNationalities, setSelectedNationalities] = useState([]);
  const [countFilter, setCountFilter] = useState(0);
  const [selectPage, setSelectPage] = useState(1);

  const [contactsState, contactDispatch] = useReducer(contactReducer, {
    contacts: [],
  });

  useEffect(() => {
    let isMounted = true;

    async function fetch() {
      const contacts = await fetchContacts({
        page: selectPage,
        results: 20,
        seed: "abc",
      });
      if (isMounted) {
        contactDispatch({ type: "INIT_CONTACT", payload: contacts });
      }
    }
    fetch();
    return () => {
      isMounted = false;
    };
  }, [selectPage]);

  useEffect(() => {
    const activeFilters = [selectedGenders, selectedNationalities].filter(
      (arr) => arr.length
    ).length;

    setCountFilter(activeFilters);
  }, [selectedGenders, selectedNationalities]);

  const handleCheckboxGender = useCallback((gender) => {
    setSelectedGenders((prev) =>
      prev.includes(gender)
        ? prev.filter((g) => g !== gender)
        : [...prev, gender]
    );
  }, []);

  const handleCheckboxNationality = useCallback((nationality) => {
    setSelectedNationalities((prev) =>
      prev.includes(nationality)
        ? prev.filter((nat) => nat !== nationality)
        : [...prev, nationality]
    );
  }, []);

  function handleDeleteContact(id) {
    contactDispatch({ type: "DELETE_CONTACT", payload: id });
  }

  function handleAddContact(contact) {
    contactDispatch({ type: "ADD_CONTACT", payload: contact });
  }

  function handleUpdateContact(dataUpdate) {
    contactDispatch({ type: "UPDATE_CONTACT", payload: dataUpdate });
  }

  const filteredData = useMemo(() => {
    return contactsState.contacts.filter((contact) => {
      const matchGender =
        selectedGenders.length === 0 ||
        selectedGenders.includes(contact.gender.toLowerCase());
      const matchNationality =
        selectedNationalities.length === 0 ||
        selectedNationalities.includes(contact.nationality.toLowerCase());

      return matchGender && matchNationality;
    });
  }, [contactsState.contacts, selectedGenders, selectedNationalities]);

  const ctxValue = {
    contacts: filteredData,
    countFilter,
    selectPage,
    handleCheckboxGender,
    handleCheckboxNationality,
    handleDeleteContact,
    handleAddContact,
    handleUpdateContact,
    setSelectPage,
  };

  return (
    <ContactContext.Provider value={ctxValue}>
      {children}
    </ContactContext.Provider>
  );
}

export const useContact = () => useContext(ContactContext);
