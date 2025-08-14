import React from "react";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-xl font-semibold text-gray-800">
            My Website
          </Link>

          <ul className="md:flex space-x-6 text-gray-700">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "font-bold" : "")}
            >
              Contact List
            </NavLink>
            <NavLink
              to="/contacts/new"
              className={({ isActive }) => (isActive ? "font-bold" : "")}
            >
              Add New Contact
            </NavLink>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
