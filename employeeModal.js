import React, { useState } from 'react';
import EmployeeList from './employeeList';
import axios from 'axios';

const App = () => {
  const [modalData, setModalData] = useState(null);

  const handleEmployeeClick = (id) => {
    axios.get(`https://api.saray.net/api/people/${id}`)
      .then(response => setModalData(response.data))
      .catch(error => console.error("Error fetching employee details: ", error));
  };

  const closeModal = () => {
    setModalData(null);
  };

  return (
    <div>
      <h1>Employee Directory</h1>
      <EmployeeList onEmployeeClick={handleEmployeeClick} />
      
      {modalData && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
          <h2>{modalData.firstName} {modalData.lastName}</h2>
          <img
            src={`https://api.saray.net/images/${modalData.avatar}.jpg`}
            alt={modalData.firstName}
            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
          />
          <div><strong>Gender:</strong> {modalData.gender}</div>
          <div><strong>Email:</strong> {modalData.email}</div>
          <div><strong>Phone:</strong> {modalData.phone}</div>
          <div><strong>Address:</strong> {modalData.address.road}, {modalData.address.city}, {modalData.address.country}</div>
          <div><strong>Birthday:</strong> {modalData.birthday}</div>
          <div><strong>Position:</strong> {modalData.position}</div>
          <div><strong>Role:</strong> {modalData.role}</div>
          <div><strong>Team:</strong> {modalData.team.name}</div>
          <button onClick={closeModal}>Close</button>
        </div>
      )}
    </div>
  );
};

export default App;
