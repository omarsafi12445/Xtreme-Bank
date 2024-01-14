import React, { useState, useEffect } from 'react';
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
} from 'reactstrap';
import ReactPaginate from 'react-paginate';

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [perPage] = useState(10); // Number of transactions per page
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('http://localhost:8085/Ebank/getTransactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleFilterClick = () => {
    if (filterDate.trim() !== '') {
      const selectedDate = new Date(filterDate);
      selectedDate.setDate(selectedDate.getDate());
      const filtered = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.dateTransaction);
        return (
          transactionDate.getFullYear() === selectedDate.getFullYear() &&
          transactionDate.getMonth() === selectedDate.getMonth() &&
          transactionDate.getDate() === selectedDate.getDate()
        );
      });
      setFilteredTransactions(filtered);
      setCurrentPage(0); // Reset to first page after filtering
    }
  };

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * perPage;
  const currentPageTransactions = filteredTransactions.slice(offset, offset + perPage);
  const pageCount = Math.ceil(filteredTransactions.length / perPage);

  const handleDateChange = (event) => {
    setFilterDate(event.target.value);
  };

  return (
    <div>
      <h1>Transactions</h1>
      <div className="filter-container">
        <FormGroup>
          <Label for="filterDate">Filter by Date:</Label>
          <Input
            type="date"
            name="filterDate"
            id="filterDate"
            value={filterDate}
            onChange={handleDateChange}
          />
        </FormGroup>
        <Button color="primary" onClick={handleFilterClick}>
          Filter
        </Button>
      </div>
      <Table bordered striped>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Date</th>
            <th>Sender Account</th>
            <th>Recipient Account</th>
          </tr>
        </thead>
        <tbody>
          {currentPageTransactions.map((transaction) => (
            <tr key={transaction.idTransaction}>
              <td>{transaction.idTransaction}</td>
              <td>{transaction.montant}</td>
              <td>{transaction.typeTransaction}</td>
              <td>{transaction.dateTransaction}</td>
              <td>{transaction.expediteur ? transaction.expediteur.idCompte : 'N/A'}</td>
              <td>{transaction.destinataire ? transaction.destinataire.idCompte : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <div className="pagination-container">
        <ReactPaginate
          previousLabel={'Previous'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageChange}
          containerClassName={'pagination'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
};

export default TransactionPage;
