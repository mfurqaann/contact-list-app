import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import DetailContact from "./pages/DetailContact.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import { ContactProvider } from "./context/ContactContext.jsx";
import EditContact from "./pages/EditContact.jsx";
import NewContact from "./pages/NewContact.jsx";

createRoot(document.getElementById("root")).render(
  <ContactProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contacts/:id" element={<DetailContact />} />
        <Route path="/contacts/new" element={<NewContact />} />
        <Route path="/contacts/edit/:id" element={<EditContact />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </ContactProvider>
);
