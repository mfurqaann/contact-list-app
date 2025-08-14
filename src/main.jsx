import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import NewForm from "./components/NewForm.jsx";
import DetailContact from "./components/DetailContact.jsx";
import PageNotFound from "./components/PageNotFound.jsx";
import { ContactProvider } from "./context/ContactContext.jsx";
import EditForm from "./components/EditForm.jsx";

createRoot(document.getElementById("root")).render(
  <ContactProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/contacts/:id" element={<DetailContact />} />
        <Route path="/contacts/new" element={<NewForm />} />
        <Route path="/contacts/edit/:id" element={<EditForm />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  </ContactProvider>
);
