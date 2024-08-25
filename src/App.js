import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [filterOptions, setFilterOptions] = useState([]);

  // Options for filtering
  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' }
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const jsonData = JSON.parse(input); // Parse JSON input
      const res = await axios.post('http://localhost:5000/api/bfhl', jsonData); // Send to backend
      setResponse(res.data); // Set response data
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        alert(`Server error: ${error.response.data.message}`);
      } else if (error.request) {
        // Request was made but no response received
        alert('No response from server. Please try again later.');
      } else {
        // Something happened in setting up the request
        alert('Invalid JSON or request error. Please check the format and try again.');
      }
      console.error('Error:', error); // Log error details
    }
  };

  // Handle filter changes
  const handleFilterChange = (selectedOptions) => {
    setFilterOptions(selectedOptions);
  };

  // Render filtered response data
  const renderFilteredResponse = () => {
    if (!response) return null;

    const filteredData = filterOptions.map((option) => ({
      label: option.label,
      data: response[option.value] || []
    }));

    return (
      <div>
        {filteredData.map((item) => (
          <div key={item.label}>
            <strong>{item.label}: </strong>{item.data.join(', ')}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>JSON Input to API</h1>
      <textarea
        rows="5"
        cols="50"
        value={input}
        onChange={handleInputChange}
        placeholder='Enter JSON here... e.g. {"data": ["M", "1", "334", "4", "B", "Z", "a"]}'
      />
      <br />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <>
          <h2>Multi-Filter</h2>
          <Select
            options={options}
            isMulti
            onChange={handleFilterChange}
          />
          <h2>Filtered Response</h2>
          {renderFilteredResponse()}
        </>
      )}
    </div>
  );
}

export default App;
