import React, { useState, useEffect } from 'react';
import './ClientBalance.css';

const ClientBalance = () => {
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClientInfo = async () => {
      try {
        const response = await fetch('http://localhost:8085/Ebank/getClient/1');
        if (response.ok) {
          const clientData = await response.json();
          setClient(clientData);
        } else {
          setError('Failed to fetch client data');
        }
      } catch (error) {
        setError('An error occurred while fetching client data');
      } finally {
        setLoading(false);
      }
    };

    fetchClientInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!client) {
    return null;
  }

  return (
    <div className="client-balance">
      <h1 className="heading">Bienvenue, {client.prenom} {client.nom}! Vous avez 1 compte(s):</h1>
      <div className="account-list">
        {client.comptes.map((compte) => (
          <div key={compte.idCompte} className="account-item">
            <h3 className="account-info">
              Votre compte est de type: <span className="locked-field">{compte.type}</span>
            </h3>
            <h3 className="account-info">
              Code: <span className="locked-field">{compte.code}</span>
            </h3>
            <h3 className="account-info">
              Solde: <span className="locked-field">{compte.solde}</span>
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientBalance;
