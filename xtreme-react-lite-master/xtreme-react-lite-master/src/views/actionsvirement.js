import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button, Card, CardTitle, CardBody, Modal, ModalHeader, ModalBody } from 'reactstrap';
import axios from 'axios';

const Actionsvirement = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient1, setSelectedClient1] = useState(null);
  const [selectedClient2, setSelectedClient2] = useState(null);
  const [VirementAmount, setVirementAmount] = useState(0);
  const [withdrawalMessage, setWithdrawalMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  // Function to toggle the modal
  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  // Function to close the modal after 3 seconds
  useEffect(() => {
    if (modalOpen) {
      setTimeout(() => {
        toggleModal();
      }, 6000);
    }
  }, [modalOpen]);
  // Fetch clients data on page load
  useEffect(() => {
    axios.get('http://localhost:8085/Ebank/getClients')
      .then(response => {
        setClients(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Function to handle Virement submission
  const handleVirement = () => {
    if (!selectedClient1) {
      alert('Please select a client to withdraw from');
      return;
    }
    if (!selectedClient2) {
      alert('Please select a client to withdraw to');
      return;
    }
    if (VirementAmount <= 0) {
      alert('Please enter a valid Virement amount');
      return;
    }

    const VirementData = {
      montant: VirementAmount,
      typeTransaction: 'VIREMENT',
      dateTransaction: new Date().toISOString(),
      expediteur: {
        idCompte: selectedClient1.comptes[0].idCompte,
        type: selectedClient1.comptes[0].type,
        code: selectedClient1.comptes[0].code,
        solde: selectedClient1.comptes[0].solde , 
      },
      destinataire: {
        idCompte: selectedClient2.comptes[0].idCompte,
        type: selectedClient2.comptes[0].type,
        code: selectedClient2.comptes[0].code,
        solde: selectedClient2.comptes[0].solde ,
      }
      
    };

    axios.put('http://localhost:8085/Ebank/ajouterVirement', VirementData)
      .then(response => {
        console.log(response.data);
        setWithdrawalMessage(response.data);
        toggleModal();
        setSelectedClient1(null);
        setSelectedClient2(null);
        setVirementAmount(0);
      })
      .catch(error => {
        console.log(error);
        alert('Virement failed. Please try again later.');
      });
  };

  return (
    <div>
      <Row>
        <Col>
          <h3>Select a client:</h3>
          <Form>
            <FormGroup>
              <Label for="selectClient1">Client1:</Label>
              <Input type="select" name="selectClient1" id="selectClient1" value={selectedClient1 ? selectedClient1.id : ''} onChange={(e) => {
                const client = clients.find(c => c.id === parseInt(e.target.value));
                setSelectedClient1(client);
              }}>
                <option value="">-- Select a client --</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>{client.nom} {client.prenom}</option>
                ))}
              </Input>
            </FormGroup>
          </Form>
        </Col>
        <Col>
          <h3>Select a client:</h3>
          <Form>
            <FormGroup>
              <Label for="selectClient2">Client2:</Label>
              <Input type="select" name="selectClient2" id="selectClient2" value={selectedClient2 ? selectedClient2.id : ''} onChange={(e) => {
                const client = clients.find(c => c.id === parseInt(e.target.value));
                setSelectedClient2(client);
              }}>
                <option value="">-- Select a client --</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>{client.nom} {client.prenom}</option>
                ))}
              </Input>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      {selectedClient1 && selectedClient2 &&  (
        <Row>
          <Col>
            <Card>
              <CardBody>
                <CardTitle tag="h5">Virement from {selectedClient1.nom} {selectedClient1.prenom}'s account to {selectedClient2.nom} {selectedClient2.prenom}'s account </CardTitle>
                <Form>
                  <FormGroup>
                    <Label for="VirementAmount">Amount:</Label>
                    <Input type="number" name="VirementAmount" id="VirementAmount" value={VirementAmount} onChange={(e) => setVirementAmount(parseInt(e.target.value))} />
                  </FormGroup>
                  <Button color="primary" onClick={handleVirement}>Verser</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Withdrawal Status</ModalHeader>
        <ModalBody>
          <p>{withdrawalMessage}</p>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Actionsvirement;
