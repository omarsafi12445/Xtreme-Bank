import React, { useState, useEffect } from 'react';
import './ModifyUser.css';


const ModifyUser = () => {
  const [userId, setUserId] = useState(4);
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [comptes, setComptes] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:8085/Ebank/getClient/1');
        if (response.ok) {
          const userData = await response.json();
          setNom(userData.nom);
          setPrenom(userData.prenom);
          setEmail(userData.email);
          setComptes(userData.comptes);
        } else {
          console.log('Failed to fetch user data');
          // Handle error
        }
      } catch (error) {
        console.log('An error occurred', error);
        // Handle error
      }
    };

    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: userId,
      nom: nom,
      prenom: prenom,
      email: email,
      comptes: comptes, // Include the existing account details in the payload
    };

    try {
      const response = await fetch('http://localhost:8085/Ebank/modifierClient', {
        method: 'PUT', // Use the appropriate method here (PUT, PATCH, etc.)
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('User updated successfully');
        // Handle success
      } else {
        console.log('Failed to update user');
        // Handle error
      }
    } catch (error) {
      console.log('An error occurred', error);
      // Handle error
    }
  };

  return (
    <div>
    <h1>Modify your data</h1>
    <div className="form-container">
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="nom">Nom:</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="prenom">Prenom:</label>
          <input
            type="text"
            id="prenom"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">
          Update User
        </button>
      </form>
    </div>
    </div>
  );
};

export default ModifyUser;
