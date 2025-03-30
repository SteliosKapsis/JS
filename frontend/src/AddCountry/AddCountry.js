import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddCountry.css'; // ✅ Import CSS for styling

function AddCountry() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country: '',
    adventure: '',
    heritage: '',
    qualityOfLife: '',
    costOfLiving: '',
    restaurantPriceIndex: ''
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.country.trim()) {
      setError('Country name is required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/v1/countries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Country: formData.country.trim(),
          Adventure: formData.adventure ? parseFloat(formData.adventure) : null,
          Heritage: formData.heritage ? parseFloat(formData.heritage) : null,
          Quality_of_Life: formData.qualityOfLife ? parseFloat(formData.qualityOfLife) : null,
          Cost_of_Living_Index: formData.costOfLiving ? parseFloat(formData.costOfLiving) : null,
          Restaurant_Price_Index: formData.restaurantPriceIndex ? parseFloat(formData.restaurantPriceIndex) : null
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Error adding country');
      }

      setSuccessMessage('✅ Country added successfully!');
      setError(null);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(err.message);
      setSuccessMessage(null);
    }
  };

  return (
    <div className="add-country-container">
      <div className="add-country-box">
        <h2 className="add-title">Add a New Country</h2>
        <form className="add-form" onSubmit={handleSubmit}>

          <div className="input-group">
            <label htmlFor="country">Country Name</label>
            <input
              type="text"
              id="country"
              name="country"
              placeholder="Country Name"
              className="add-input"
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="adventure">Adventure Score</label>
            <input
              type="number"
              id="adventure"
              name="adventure"
              placeholder="Adventure Score"
              className="add-input"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="heritage">Heritage Score</label>
            <input
              type="number"
              id="heritage"
              name="heritage"
              placeholder="Heritage Score"
              className="add-input"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="qualityOfLife">Quality of Life</label>
            <input
              type="number"
              id="qualityOfLife"
              name="qualityOfLife"
              placeholder="Quality of Life"
              className="add-input"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="costOfLiving">Cost of Living Index</label>
            <input
              type="number"
              id="costOfLiving"
              name="costOfLiving"
              placeholder="Cost of Living Index"
              className="add-input"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label htmlFor="restaurantPriceIndex">Restaurant Price Index</label>
            <input
              type="number"
              id="restaurantPriceIndex"
              name="restaurantPriceIndex"
              placeholder="Restaurant Price Index"
              className="add-input"
              onChange={handleChange}
            />
          </div>

          <button className="add-button" type="submit">Add Country</button>
        </form>

        {error && <p className="error-message">❌ {error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
}

export default AddCountry;
