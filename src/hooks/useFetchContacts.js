import { useCallback, useEffect, useMemo, useState } from "react";
import { fetchContacts } from "../api/contactApi";

export default function useFetchContacts() {
    const [contacts, setContacts] = useState([]);
    const [selectedGenders, setSelectedGenders] = useState([]);
    const [selectedNationalities, setSelectedNationalities] = useState([]);
    const [countFilter, setCountFilter] = useState(0);
    const [selectPage, setSelectPage] = useState(1);

    useEffect(() => {
        let isMounted = true

        async function fetch() {
            const contacts = await fetchContacts({ page: selectPage, results: 20, seed: 'abc' });
            if (isMounted) {
                setContacts(contacts)
            }
        }
        fetch();
        return () => {
            isMounted = false;
        }
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
    }, [])

    const handleCheckboxNationality = useCallback((nationality) => {
        setSelectedNationalities((prev) =>
            prev.includes(nationality)
                ? prev.filter((nat) => nat !== nationality)
                : [...prev, nationality]
        );
    }, [])

    const filteredData = useMemo(() => {
        return contacts.filter((contact) => {
            const matchGender =
                selectedGenders.length === 0 ||
                selectedGenders.includes(contact.gender.toLowerCase());
            const matchNationality =
                selectedNationalities.length === 0 ||
                selectedNationalities.includes(contact.nationality.toLowerCase());

            return matchGender && matchNationality;
        })

    }, [contacts, selectedGenders, selectedNationalities])

    return {
        countFilter,
        selectPage,
        setSelectPage,
        filteredData,
        handleCheckboxGender,
        handleCheckboxNationality,
    }
}