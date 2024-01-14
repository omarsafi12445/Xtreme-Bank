import React, { useEffect, useState } from 'react';
import { Row, Col, Table, Card, CardTitle, CardBody, Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [modal, setModal] = useState(false);
  const [newCustomer, setNewCustomer] = useState({ id: 0, nom: '', prenom: '', email: '', comptes: [{ idCompte: 0, type: 'COURANT', code: 0, solde: 0 }] });
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateCustomerId, setUpdateCustomerId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8085/Ebank/getClients')
      .then(response => response.json())
      .then(data => setCustomers(data));
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  }

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  }

  const handleAccountInputChange = (index, event) => {
    const { name, value } = event.target;
    const updatedComptes = newCustomer.comptes.map((compte, i) => {
      if (i === index) {
        return { ...compte, [name]: value };
      }
      return compte;
    });
    setNewCustomer({ ...newCustomer, comptes: updatedComptes });
  }

  const handleFormSubmit = event => {
    event.preventDefault();
  
    if (isUpdating) {
      // Update existing customer
      fetch('http://localhost:8085/Ebank/modifierClient', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: updateCustomerId, ...newCustomer })
      })
        .then(response => response.json())
        .then(data => {
          const updatedCustomers = customers.map(customer => {
            if (customer.id === data.id) {
              return data;
            }
            return customer;
          });
          setCustomers(updatedCustomers);
          setModal(false);
          setIsUpdating(false);
          setUpdateCustomerId(null);
          setNewCustomer({ id: 0, nom: '', prenom: '', email: '', comptes: [{ idCompte: 0, type: 'COURANT', code: 0, solde: 0 }] });
        })
        .catch(error => console.error(error));
    } else {
      // Add new customer
      fetch('http://localhost:8085/Ebank/addClient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCustomer)
      })
        .then(response => response.json())
        .then(data => {
          setCustomers([...customers, data]);
          setModal(false);
          setNewCustomer({ id: 0, nom: '', prenom: '', email: '', comptes: [{ idCompte: 0, type: 'COURANT', code: 0, solde: 0 }] });
        })
        .catch(error => console.error(error));
    }
  };
  const handleUpdateClick = (customerId) => {
    const customerToUpdate = customers.find(customer => customer.id=== customerId);
    if (customerToUpdate) {
    setNewCustomer(customerToUpdate);
    setIsUpdating(true);
    setUpdateCustomerId(customerId);
    setModal(true);
    }
    }
    
    function deleteItem(id) {
      fetch(`http://localhost:8085/Ebank/supprimerClient/${id}`, {
        method: "DELETE"
      })
        .then(response => {
          if (response.ok) {
            const updatedCustomers = customers.filter(customer => customer.id !== id);
            setCustomers(updatedCustomers);
            setModal(false);
          } else {
            throw new Error('Failed to delete the customer.');
          }
        })
        .catch(error => console.log(error));
    }
    

    return (
      <Col lg="12">
      <Card>
        <CardTitle tag="h6" className="border-bottom p-3 mb-0">
          <i className="bi bi-card-text me-2"></i>
          Customer list
        </CardTitle>
        <CardBody>
    <Table bordered striped>
    <thead>
    <tr>
    <th>ID</th>
    <th>Nom</th>
    <th>Prénom</th>
    <th>Email</th>
    <th>Comptes</th>
    <th>Actions</th>
    </tr>
    </thead>
    <tbody>
    {customers.map(customer => (
    <tr key={customer.id}>
    <td>{customer.id}</td>
    <td>{customer.nom}</td>
    <td>{customer.prenom}</td>
    <td>{customer.email}</td>
    <td>
    <Table bordered striped>
    <thead>
    <tr>
    <th>Type</th>
    <th>Code</th>
    <th>Solde</th>
    </tr>
    </thead>
    <tbody>
    {customer.comptes.map(compte => (
    <tr key={compte.idCompte}>
    <td>{compte.type}</td>
    <td>{compte.code}</td>
    <td>{compte.solde}</td>
    </tr>
    ))}
    </tbody>
    </Table>
    </td>
    <td>
    <Button color="primary" onClick={() => handleUpdateClick(customer.id)}>Update</Button>
    <Button color="danger" onClick={() => deleteItem(customer.id)}>Delete</Button>
    </td>
    </tr>
    ))}
    </tbody>
    </Table>
    <Button color="primary" onClick={toggleModal}>Add Customer</Button>
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>{isUpdating ? 'Update Customer' : 'Add Customer'}</ModalHeader>
          <ModalBody>

    <FormGroup>
    <Label for="nom">First Name</Label>
    <Input type="text" name="nom" id="nom" value={newCustomer.nom} onChange={handleInputChange} />
    </FormGroup>
    <FormGroup>
    <Label for="prenom">Last Name</Label>
    <Input type="text" name="prenom" id="prenom" value={newCustomer.prenom} onChange={handleInputChange} />
    </FormGroup>
    <FormGroup>
    <Label for="email">Email</Label>
    <Input type="email" name="email" id="email" value={newCustomer.email} onChange={handleInputChange} />
    </FormGroup>
    <FormGroup>
    <Label for="accountType">Account Type</Label>
    <Input type="text" name="type" id="accountType" value={newCustomer.comptes[0].type} onChange={event => handleAccountInputChange(0, event)} />
    </FormGroup>
    <FormGroup>
    <Label for="accountCode">Account Code</Label>
    
    <Input type="number" name="code" id="accountCode" value={newCustomer.comptes[0].code} onChange={event => handleAccountInputChange(0, event)} />
            </FormGroup>
            <FormGroup>
              <Label for="accountBalance">Account Balance</Label>
              <Input type="number" name="solde" id="accountBalance" value={newCustomer.comptes[0].solde} onChange={event => handleAccountInputChange(0, event)} />
            </FormGroup>
            </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleFormSubmit}>{isUpdating ? 'Update' : 'Add'}</Button>
            <Button color="secondary" onClick={toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </CardBody>
    </Card>
  </Col>
);
    }
export default CustomerList;
