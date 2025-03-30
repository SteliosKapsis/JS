import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CountryList.css';

function CountryList() {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState('');
  const [selectedCriterion, setSelectedCriterion] = useState('Quality_of_Life'); // ✅ Default sorting criterion
  const [sortOrder, setSortOrder] = useState('descending'); // ✅ Default order
  const [error, setError] = useState(null);

  // ✅ Fetch countries from API
  useEffect(() => {
    axios.get('http://localhost:5000/api/v1/countries')
      .then((response) => setCountries(response.data))
      .catch(() => setError('Error fetching countries'));
  }, []);

  // ✅ Handle country deletion
  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/v1/countries/${id}`)
      .then(() => setCountries(countries.filter((c) => c._id !== id)))
      .catch(() => setError('Error deleting country'));
  };

  // ✅ Sort countries
  const sortCountries = (countriesList) => {
    return [...countriesList].sort((a, b) => {
      const valueA = a[selectedCriterion] ?? 0;
      const valueB = b[selectedCriterion] ?? 0;

      return sortOrder === 'ascending' ? valueA - valueB : valueB - valueA;
    });
  };

  // ✅ Filter and sort countries
  const filteredCountries = sortCountries(
    countries.filter((c) => c.Country.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div className="country-list">
      {/* ✅ Top Section: Search, Sorting, and Add Country Button */}
      <div className="controls">
        <input
          type="text"
          placeholder="Search for a country..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

        {/* ✅ Criterion Selection Dropdown */}
        <select value={selectedCriterion} onChange={(e) => setSelectedCriterion(e.target.value)}>
          <option value="Quality_of_Life">Quality of Life</option>
          <option value="Adventure">Adventure</option>
          <option value="Heritage">Heritage</option>
          <option value="Cost_of_Living_Index">Cost of Living Index</option>
          <option value="Restaurant_Price_Index">Restaurant Price Index</option>
        </select>

        {/* ✅ Order Selection Dropdown */}
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>

        {/* ✅ Add Country Button */}
        <button className="add" onClick={() => navigate(`/add-country`)}>Add Country</button>
      </div>

      {/* ✅ Display Countries */}
      {error && <p className="error">{error}</p>}
      {filteredCountries.length === 0 ? (
        <p>No countries found</p>
      ) : (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country._id}>
              <h3>{country.Country}</h3>
              <p><strong>Quality of Life:</strong> {country.Quality_of_Life || 'N/A'}</p>
              <p><strong>Adventure Score:</strong> {country.Adventure || 'N/A'}</p>
              <p><strong>Heritage Score:</strong> {country.Heritage || 'N/A'}</p>
              <p><strong>Cost of Living Index:</strong> {country.Cost_of_Living_Index || 'N/A'}</p>
              <p><strong>Restaurant Price Index:</strong> {country.Restaurant_Price_Index || 'N/A'}</p>

              {/* ✅ Edit & Delete Buttons */}
              <button className="edit" onClick={() => navigate(`/edit/${country._id}`)}>Edit</button>
              <button className="delete" onClick={() => handleDelete(country._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CountryList;
