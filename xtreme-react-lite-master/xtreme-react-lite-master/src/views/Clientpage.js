import React, { useState, useEffect } from 'react';

const ClientInfoPage = () => {
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
    <div>
      <h1>Client Information</h1>
      <ul>
        <li>
          <h3>ID: <input type="text" value={client.id} readOnly /></h3>
        </li>
        <li>
          <h3>Nom: <input type="text" value={client.nom} readOnly /></h3>
        </li>
        <li>
          <h3>Prénom: <input type="text" value={client.prenom} readOnly /></h3>
        </li>
        <li>
          <h3>Email: <input type="text" value={client.email} readOnly /></h3>
        </li>
      </ul>
    </div>
  );
};

export default ClientInfoPage;
