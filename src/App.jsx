import { Checkbox } from "@/components/ui/checkbox";

import TableContacts from "./components/TableContacts";
import { useContact } from "./context/ContactContext";

function App() {
  const {
    contacts,
    handleCheckboxGender,
    handleCheckboxNationality,
    selectPage,
    setSelectPage,
    countFilter,
  } = useContact();

  return (
    <div className="max-w-[960px] mx-auto">
      <div className="grid sm:grid-cols-6 gap-5 p-5">
        {/* Sidebar Filter */}
        <div className="sm:col-span-2 h-fit bg-white border rounded-lg p-4 shadow-md space-y-6">
          {/* Filter Count */}
          <div className="text-sm text-gray-500">Filter {countFilter}</div>

          {/* Gender Filter */}
          <div>
            <h3 className="font-bold text-lg mb-2">Gender</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  onCheckedChange={() => handleCheckboxGender("male")}
                  id="male"
                />
                <label htmlFor="male">Male</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  onCheckedChange={() => handleCheckboxGender("female")}
                  id="female"
                />
                <label htmlFor="female">Female</label>
              </div>
            </div>
          </div>

          {/* Nationality Filter */}
          <div>
            <h3 className="font-bold text-lg mb-2">Nationality</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox
                  onCheckedChange={() => handleCheckboxNationality("us")}
                  id="us"
                />
                <label htmlFor="us">US</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  onCheckedChange={() => handleCheckboxNationality("dk")}
                  id="dk"
                />
                <label htmlFor="dk">DK</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  onCheckedChange={() => handleCheckboxNationality("fr")}
                  id="fr"
                />
                <label htmlFor="fr">FR</label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  onCheckedChange={() => handleCheckboxNationality("gb")}
                  id="gb"
                />
                <label htmlFor="gb">GB</label>
              </div>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="sm:col-span-4 min-h-[300px]">
          <p className="text-2xl font-bold">Contact List</p>
          <TableContacts
            selectPage={selectPage}
            setSelectPage={setSelectPage}
            contacts={contacts}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
