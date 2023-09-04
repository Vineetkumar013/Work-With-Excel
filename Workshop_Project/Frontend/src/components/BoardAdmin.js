import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserDataTable() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [fileUploaded, setFileUploaded] = useState(false); 

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8900/api/v1/data`);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fileUploaded]);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:8900/api/v1/excel', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      document.getElementById('fileInput').value = '';
      setFile(null);
      setFileUploaded(true);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredData = data.filter((user) =>
    Object.values(user)
      .slice(1, -3)
      .some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const tableHeaders = [
    'Serial No.',
    'Name',
    'Email',
    'City',
    'Mobile',
    'Salary',
    'DOB',
    'Pincode',
    'Company',
    'Country',
    "Rebuttal",
  ];

  return (
    <div className="container mt-4">
      <div className='row'>
        <div className="col">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Upload Excel</h5>
              <input type="file" id="fileInput" onChange={handleFileChange} />
              <button className="btn btn-primary mt-3" onClick={handleUpload}>
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <table className="table table-striped custom-table">
              <thead>
                <tr>
                  {tableHeaders.map((header) => (
                    <th key={header}>{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td style={{ width: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</td>
                    <td>{user.city}</td>
                    <td>{user.mobile}</td>
                    <td>{user.salary}</td>
                    <td>{user.dob}</td>
                    <td>{user.pinCode}</td>
                    <td>{user.company}</td>
                    <td>{user.country}</td>
                    <td>{user.rebuttal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserDataTable;
