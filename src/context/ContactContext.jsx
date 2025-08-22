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
      return { ...state, contacts: [action.payload, ...state.contacts] };
    case "INIT_CONTACT":
      return { ...state, contacts: action.payload };
    case "DELETE_CONTACT":
      const deletedContact = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
      return { ...state, contacts: deletedContact };
    case "UPDATE_CONTACT":
      const updateContact = state.contacts.map((contact) =>
        contact.id === action.payload.id ? action.payload : contact
      );

      return { ...state, contacts: updateContact };

    case "CHECKBOX_GENDER":
      return {
        ...state,
        genders: state.genders.includes(action.payload)
          ? state.genders.filter((g) => g !== action.payload)
          : [...state.genders, action.payload],
      };
    case "CHECKBOX_NATIONALITY":
      return {
        ...state,
        nationality: state.nationality.includes(action.payload)
          ? state.nationality.filter((n) => n !== action.payload)
          : [...state.nationality, action.payload],
      };

    default:
      return { genders: [], contacts: [] };
  }
}

export function ContactProvider({ children }) {
  const [countFilter, setCountFilter] = useState(0);
  const [selectPage, setSelectPage] = useState(1);

  const [contactsState, contactDispatch] = useReducer(contactReducer, {
    contacts: [],
    genders: [],
    nationality: [],
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
    const activeFilters = [
      contactsState.genders,
      contactsState.nationality,
    ].filter((arr) => arr.length).length;

    setCountFilter(activeFilters);
  }, [contactsState.genders, contactsState.nationality]);

  const handleCheckboxGender = useCallback((gender) => {
    contactDispatch({ type: "CHECKBOX_GENDER", payload: gender });
  }, []);

  const handleCheckboxNationality = useCallback((nationality) => {
    contactDispatch({ type: "CHECKBOX_NATIONALITY", payload: nationality });
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
        contactsState.genders.length === 0 ||
        contactsState.genders.includes(contact.gender.toLowerCase());
      const matchNationality =
        contactsState.nationality.length === 0 ||
        contactsState.nationality.includes(contact.nationality.toLowerCase());

      return matchGender && matchNationality;
    });
  }, [
    contactsState.contacts,
    contactsState.genders,
    contactsState.nationality,
  ]);

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
