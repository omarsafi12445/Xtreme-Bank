import React, { useEffect, useState } from 'react';
import {
    
    Table,
   
  } from 'reactstrap'
function ReclamationTable() {
  const [reclamations, setReclamations] = useState([]);

  useEffect(() => {
    fetchReclamations();
  }, []);

  const fetchReclamations = async () => {
    try {
      const response = await fetch('http://localhost:8085/Ebank/getReclamation');
      const data = await response.json();
      setReclamations(data);
    } catch (error) {
      console.error('Error fetching reclamations:', error);
    }
  };

  return (
    <Table bordered striped>
      <thead>
        <tr>
          <th>Reason</th>
          <th>Description</th>
          <th>Owner</th>
        </tr>
      </thead>
      <tbody>
        {reclamations.map((reclamation) => (
          <tr key={reclamation.id}>
            <td>{reclamation.raison}</td>
            <td>{reclamation.description}</td>
            <td>{reclamation.clients[0]?.nom} {reclamation.clients[0]?.prenom}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default ReclamationTable;
