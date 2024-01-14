import React, { useState, useEffect } from 'react';
import { Row, Col, Form, FormGroup, Label, Input, Button, Card, CardTitle, CardBody, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';

const Actions = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [withdrawalMessage, setWithdrawalMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  
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

  // Function to handle withdrawal submission
  const handleWithdrawal = () => {
    if (!selectedClient) {
      alert('Please select a client to withdraw from');
      return;
    }
    if (withdrawalAmount <= 0) {
      alert('Please enter a valid withdrawal amount');
      return;
    }

    const withdrawalData = {
      montant: withdrawalAmount,
      typeTransaction: 'RETRAIT',
      dateTransaction: new Date().toISOString(),
      expediteur: {
        idCompte: selectedClient.comptes[0].idCompte,
        type: selectedClient.comptes[0].type,
        code: selectedClient.comptes[0].code,
        solde: selectedClient.comptes[0].solde ,
      }
    };

    axios.put('http://localhost:8085/Ebank/ajouterRetrait', withdrawalData)
      .then(response => {
        console.log(response.data);
        setWithdrawalMessage(response.data);
        toggleModal();
        setSelectedClient(null);
        setWithdrawalAmount(0);
      })
      .catch(error => {
        console.log(error);
        alert('Withdrawal failed. Please try again later.');
      });
  };

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

  return (
    <div>
      <Row>
        <Col>
          <h3>Select a client:</h3>
          <Form>
            <FormGroup>
              <Label for="selectClient">Client:</Label>
              <Input
                type="select"
                name="selectClient"
                id="selectClient"
                value={selectedClient ? selectedClient.id : ''}
                onChange={(e) => {
                  const client = clients.find((c) => c.id === parseInt(e.target.value));
                  setSelectedClient(client);
                }}
              >
                <option value="">-- Select a client --</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.nom} {client.prenom}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Form>
        </Col>
      </Row>
      {selectedClient && (
        <Row>
          <Col>
            <Card>
              <CardBody>
                <CardTitle tag="h5">
                  Withdrawal from {selectedClient.nom} {selectedClient.prenom}'s account:
                </CardTitle>
                <Form>
                  <FormGroup>
                    <Label for="withdrawalAmount">Amount:</Label>
                    <Input
                      type="number"
                      name="withdrawalAmount"
                      id="withdrawalAmount"
                      value={withdrawalAmount}
                      onChange={(e) => setWithdrawalAmount(parseInt(e.target.value))}
                    />
                  </FormGroup>
                  <Button color="primary" onClick={handleWithdrawal}>
                    Withdraw
                  </Button>
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

export default Actions;

