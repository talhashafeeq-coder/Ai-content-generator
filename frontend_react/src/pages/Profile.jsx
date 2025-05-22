import React, { useEffect, useState } from 'react';
import '../style/Profile.css';
import { useUser } from "../context/UserContext";

const Profile = () => {
  const { userId } = useUser(); // User ID ko context se le lo
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/user/v1/user/${userId}`);
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  if (loading) return <p>Loading profile...</p>;
  if (!user) return <p>User not found.</p>;

  return (
   <div className="profile-container">
  <h2 className="profile-heading">Welcome, {user.username}</h2>
  <div className="profile-box">
    <p><strong>Name:</strong> <b> {user.username}</b> </p>
    <p><strong>Email:</strong> <b> {user.email}</b></p>
  </div>
</div>
  );
};

export default Profile;
