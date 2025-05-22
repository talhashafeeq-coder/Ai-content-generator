import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import MainApi from "./main-api";
import Sidebar from "./Sidebar";
import { useUser } from "../context/UserContext";
import "../style/Blogwith_history.css";

export default function Blogwith_history() {
  const { userId } = useUser();
  const [selectedHistory, setSelectedHistory] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };
  // useEffect(() => {
  //   console.log("User ID from id:", { userId });
  // }, [userId]);

  return (
    <div className="d-flex vh-100 position-relative">
      <button
        className={`toggle-btn btn btn-dark`}
        onClick={toggleSidebar}
        aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
      >
        {sidebarOpen ? (
          <FaTimes className="icon animated-icon" />
        ) : (
          <FaBars className="icon animated-icon" />
        )}
      </button>
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="sidebar bg-dark text-white p-3 sidebar-open">
          <Sidebar onSelectHistory={setSelectedHistory} />
        </div>
      )}

      {/* Main content */}
      <div className={`main-content flex-grow-1 p-4 ${!sidebarOpen ? "full-width" : ""}`}>
        <MainApi selectedHistory={selectedHistory} />
      </div>
    </div>
  );
}
