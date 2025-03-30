import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CountrySearch() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError('Please enter a country name.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/v1/countries/search/${searchTerm}`);
      if (!response.ok) {
        throw new Error('Country not found');
      }
      const data = await response.json();
      setCountry(data);
      setError(null);
    } catch (err) {
      setCountry(null);
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Search for a Country</h2>
      
      {/* ✅ Search Input Box */}
      <input
        type="text"
        placeholder="Enter country name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>🔍 Search</button>

      {/* ✅ Error Message */}
      {error && <p className="error" style={{ color: 'red' }}>❌ {error}</p>}

      {/* ✅ Display Country Info */}
      {country && (
        <div>
          <h3>{country.Country}</h3>
          <p><strong>Quality of Life:</strong> {country.Quality_of_Life || 'N/A'}</p>
          <p><strong>Adventure Score:</strong> {country.Adventure || 'N/A'}</p>
          <p><strong>Heritage Score:</strong> {country.Heritage || 'N/A'}</p>
          <p><strong>Cost of Living Index:</strong> {country.Cost_of_Living_Index || 'N/A'}</p>
          <p><strong>Restaurant Price Index:</strong> {country.Restaurant_Price_Index || 'N/A'}</p>
        </div>
      )}

      {/* ✅ Go Back Button */}
      <button onClick={() => navigate('/')}>⬅ Go Back</button>
    </div>
  );
}

export default CountrySearch;
