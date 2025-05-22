import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "../context/UserContext";
import '../style/Sidebar.css';

export default function Sidebar({ onSelectHistory }) {
  const { histories, loading, error, triggerRefresh, deleteHistory ,} = useHistory();
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this history?")) {
      deleteHistory(id);
      triggerRefresh();
      alert("History deleted successfully.");
      setOpenMenuId(null);
    }
  };

  const handleEdit = (id) => {
    alert(`Edit clicked for history id: ${id}`);
    setOpenMenuId(null);
  };

  return (
    <div className="sidebar-container">
      <h3 className="sidebar-title">History Entries</h3>

      <button className="new-text-button" onClick={() => onSelectHistory(null)}>
        + New Text
      </button>

      <ul className="history-list">
        {histories.map((history) => (
          <li
            key={history.id}
            className="history-item"
            title={history.input_question}
          >
            <p className="history-text" onClick={() => onSelectHistory(history)}>
              {history.input_question}
            </p>

            <div
              className="menu-wrapper"
              ref={openMenuId === history.id ? menuRef : null}
            >
              <button
                className="menu-button"
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenMenuId(openMenuId === history.id ? null : history.id);
                }}
                aria-label="Options"
              >
                &#x22EE;
              </button>

              {openMenuId === history.id && (
                <ul className="menu-dropdown" onClick={(e) => e.stopPropagation()}>
                  <li className="menu-item edit-item" onClick={() => handleEdit(history.id)}>
                    ✏️ Edit
                  </li>
                  <li className="menu-item delete-item" onClick={() => handleDelete(history.id)}>
                    🗑️ Delete
                  </li>
                </ul>
              )}
            </div>
          </li>
        ))}

        {!loading && histories.length === 0 && (
          <li className="no-history">No history found.</li>
        )}
      </ul>
    </div>
  );
}
