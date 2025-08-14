import { v4 as uuidv4 } from "uuid";

export async function fetchContacts({ page = 1, results = 10, nat = 'us,dk,fr,gb', seed = 'abc' }) {
    const params = new URLSearchParams({
        results,
        page,
        nat,
        seed,
    });
    const response = await fetch(`https://randomuser.me/api/?${params}`);
    if (!response.ok) throw new Error("Network response error");
    const datas = await response.json();

    const mapContact = datas.results.map((data) => ({
        id: data.id.value ?? uuidv4(),
        fullname: `${data.name.title} ${data.name.first} ${data.name.last}`,
        gender: data.gender,
        nationality: data.nat,
        phone: data.phone,
        picture: data.picture.large,
        email: data.email,
    }));

    return mapContact
}