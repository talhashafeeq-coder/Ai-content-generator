import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; 
const UserContext = createContext();
const HistoryContext = createContext();

function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Invalid token:', e);
    return null;
  }
}

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [histories, setHistories] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = parseJwt(token);
      if (decoded?.sub) {
        setUserId(decoded.sub);
        console.log('User ID from token:', decoded.sub);
      }
    }
  }, []);

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        setLoading(true);
        const res = await axios.get('http://localhost:5000/history/v1/histories');
        setHistories(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistories();
  }, [refresh]);

  const triggerRefresh = () => setRefresh(prev => !prev);

  const deleteHistory = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:5000/history/v1/historyDelete/${id}`);
      if (res.status === 200) triggerRefresh();
    } catch (err) {
      console.error("Delete error:", err.message);
    }
  };

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      <HistoryContext.Provider value={{ histories, triggerRefresh, loading, deleteHistory, error }}>
        {children}
      </HistoryContext.Provider>
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
export const useHistory = () => useContext(HistoryContext);
