import React, { useState, useEffect } from 'react';
import './ReclamationForm.css'; // Import the CSS file

const ReclamationForm = () => {
  const [raison, setRaison] = useState('');
  const [description, setDescription] = useState('');
  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [isReclamationDone, setReclamationDone] = useState(false);

  useEffect(() => {
    // Fetch client data from http://localhost:8085/Ebank/getClient/4
    fetch('http://localhost:8085/Ebank/getClient/1')
      .then(response => response.json())
      .then(data => {
        setNom(data.nom);
        setPrenom(data.prenom);
        setEmail(data.email);
      })
      .catch(error => {
        // Handle any error that occurs during the request
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Fetch request to create the reclamation
    fetch('http://localhost:8085/Ebank/addReclamation', {
      method: 'POST',
      body: JSON.stringify({
        id: 0,
        raison: raison,
        description: description,
        clients: [
          {
            id: 0,
            nom: nom,
            prenom: prenom,
            email: email,
            comptes: [
              {
                idCompte: 0,
                type: 'COURANT',
                code: 0,
                solde: 0
              }
            ]
          }
        ]
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        // Handle the response here
        if (response.status === 200) {
          setReclamationDone(true);
        } else {
          setReclamationDone(false);
        }
      })
      .catch(error => {
        // Handle any error that occurs during the request
        setReclamationDone(false);
      });
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="raison">Raison:</label>
          <input
            type="text"
            id="raison"
            value={raison}
            onChange={(event) => setRaison(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="nom">Nom:</label>
          <input
            type="text"
            id="nom"
            value={nom}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="prenom">Prénom:</label>
          <input
            type="text"
            id="prenom"
            value={prenom}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            disabled
          />
        </div>

        <button type="submit">Create Reclamation</button>
      </form>

      {isReclamationDone && (
        <div className="popup">
                    <p>Reclamation successfully created!</p>
        </div>
      )}
    </div>
  );
};

export default ReclamationForm;

