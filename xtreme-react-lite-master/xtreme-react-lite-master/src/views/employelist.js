import React, { useEffect, useState } from 'react'
import {
  Row,
  Col,
  Table,
  Card,
  CardTitle,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Label,
  Input
} from 'reactstrap'

const Employelist = () => {
  const [employees, setEmployees] = useState([])
  const [modal, setModal] = useState(false)
  const [newEmployee, setNewEmployee] = useState({
    nom: '',
    prenom: '',
    email: ''
  })
  const [isUpdating, setIsUpdating] = useState(false)
  const [updateEmployee, setUpdateEmployee] = useState(null)

  const toggleModal = () => {
    setModal(!modal)
    setNewEmployee({ nom: '', prenom: '', email: '' })
    setIsUpdating(false)
    setUpdateEmployee(null)
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setNewEmployee({ ...newEmployee, [name]: value })
  }

  const editEmployee = employee => {
    setNewEmployee({ ...employee })
    setIsUpdating(true)
    setUpdateEmployee(employee)
    setModal(true)
  }

  const handleFormSubmit = event => {
    event.preventDefault()

    if (isUpdating) {
      // Update existing employee
      fetch('http://localhost:8085/Ebank/modifierEmploye', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEmployee)
      })
        .then(response => response.json())
        .then(data => {
          const updatedEmployees = employees.map(employee => {
            if (employee.id === data.id) {
              return data
            }
            return employee
          })
          setEmployees(updatedEmployees)
          setModal(false)
          setIsUpdating(false)
          setUpdateEmployee(null)
          setNewEmployee({ nom: '', prenom: '', email: '' })
        })
        .catch(error => console.error(error))
    } else {
      // Add new employee
      fetch('http://localhost:8085/Ebank/addEmploye', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEmployee)
      })
        .then(response => response.json())
        .then(data => {
          setEmployees([...employees, data])
          setModal(false)
          setNewEmployee({ nom: '', prenom: '', email: '' })
        })
        .catch(error => console.error(error))
    }
  }

  function deleteItem (id) {
    fetch(`http://localhost:8085/Ebank/supprimerEmploye/${id}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          const updatedEmployees = employees.filter(
            customer => customer.id !== id
          )
          setEmployees(updatedEmployees)
          setModal(false)
        } else {
          throw new Error('Failed to delete the employe.')
        }
      })
      .catch(error => console.log(error))
  }
  useEffect(() => {
    fetch('http://localhost:8085/Ebank/getEmployes')
      .then(response => response.json())
      .then(data => setEmployees(data))
  }, [])

  return (
    <Col lg='12'>
      <Card>
        <CardTitle tag='h6' className='border-bottom p-3 mb-0'>
          <i className='bi bi-card-text me-2'></i>
          Employee list
        </CardTitle>
        <CardBody>
          <Table bordered striped>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(employee => (
                <tr key={employee.id}>
                  <th scope='row'>{employee.id}</th>
                  <td>{employee.nom}</td>
                  <td>{employee.prenom}</td>
                  <td>{employee.email}</td>
                  <td>
                    <div className='d-flex justify-content-center'>
                      <Button
                        className='btn me-2'
                        color='info'
                        onClick={() => editEmployee(employee)}
                      >
                        Update
                      </Button>
                      <Button
                        className='btn'
                        color='danger'
                        onClick={() => deleteItem(employee.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Button color='primary' onClick={toggleModal}>
            Add Employee
          </Button>
          <Modal isOpen={modal} toggle={toggleModal}>
            <ModalHeader toggle={toggleModal}>
              {isUpdating ? 'Update Employee' : 'Add Employee'}
            </ModalHeader>
            <ModalBody>
              <FormGroup>
                <Label for='nom'>First Name</Label>
                <Input
                  type='text'
                  name='nom'
                  id='nom'
                  value={newEmployee.nom}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for='prenom'>Last Name</Label>
                <Input
                  type='text'
                  name='prenom'
                  id='prenom'
                  value={newEmployee.prenom}
                  onChange={handleInputChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for='email'>Email</Label>
                <Input
                  type='email'
                  name='email'
                  id='email'
                  value={newEmployee.email}
                  onChange={handleInputChange}
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color='primary' onClick={handleFormSubmit}>
                {isUpdating ? 'Update' : 'Add'}
              </Button>
              <Button color='secondary' onClick={toggleModal}>
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </CardBody>
      </Card>
    </Col>
  )
}

export default Employelist
