import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeList = ({ onEmployeeClick }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    axios.get('https://api.saray.net/api/people')
      .then(response => setEmployees(response.data))
      .catch(error => console.error("Error fetching employee data: ", error));
  }, []);

  return (
    <div>
      {employees.map((employee) => (
        <div
          key={employee.id}
          onClick={() => onEmployeeClick(employee.id)}
          style={{ display: 'flex', marginBottom: '10px', cursor: 'pointer' }}
        >
          <img
            src={`https://api.saray.net/images/${employee.avatar}.jpg`}
            alt={employee.firstName}
            style={{ width: '50px', height: '50px', borderRadius: '50%' }}
          />
          <div style={{ marginLeft: '20px', flex: 1 }}>
            <h3>{employee.firstName} {employee.lastName}</h3>
          </div>
          <div>{employee.position}</div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
