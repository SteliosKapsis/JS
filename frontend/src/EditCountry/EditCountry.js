import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EditCountry.css';

function EditCountry() {
  const { id: countryId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    country: '',
    qualityOfLife: '',
    adventure: '',
    heritage: '',
    costOfLiving: '',
    restaurantPriceIndex: ''
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/countries/${countryId}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          country: data.Country || '',
          qualityOfLife: data.Quality_of_Life || '',
          adventure: data.Adventure || '',
          heritage: data.Heritage || '',
          costOfLiving: data.Cost_of_Living_Index || '',
          restaurantPriceIndex: data.Restaurant_Price_Index || ''
        });
      })
      .catch(() => setError('Failed to load country details'));
  }, [countryId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/v1/countries/${countryId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          Quality_of_Life: formData.qualityOfLife ? parseFloat(formData.qualityOfLife) : null,
          Adventure: formData.adventure ? parseFloat(formData.adventure) : null,
          Heritage: formData.heritage ? parseFloat(formData.heritage) : null,
          Cost_of_Living_Index: formData.costOfLiving ? parseFloat(formData.costOfLiving) : null,
          Restaurant_Price_Index: formData.restaurantPriceIndex ? parseFloat(formData.restaurantPriceIndex) : null
        }),
      });

      if (!response.ok) throw new Error('Failed to update country');

      setSuccessMessage('✅ Country updated successfully!');
      setTimeout(() => navigate('/'), 1500); // Redirect after 1.5 sec
    } catch {
      setError('Error updating country');
    }
  };

  return (
    <div className="edit-country-container">
      <div className="edit-country-box">
        <h2 className="edit-title">Edit Country</h2>
        <form className="edit-form" onSubmit={handleSubmit}>

          {/* ✅ Country Name (READ-ONLY) */}
          <div className="input-group">
            <label htmlFor="country">Country Name</label>
            <input
              className="edit-input"
              type="text"
              id="country"
              name="country"
              value={formData.country}
              readOnly /* ✅ Make it read-only */
            />
          </div>

          <div className="input-group">
            <label htmlFor="adventure">Adventure Score</label>
            <input className="edit-input" type="number" id="adventure" name="adventure" value={formData.adventure} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label htmlFor="heritage">Heritage Score</label>
            <input className="edit-input" type="number" id="heritage" name="heritage" value={formData.heritage} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label htmlFor="qualityOfLife">Quality of Life</label>
            <input className="edit-input" type="number" id="qualityOfLife" name="qualityOfLife" value={formData.qualityOfLife} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label htmlFor="costOfLiving">Cost of Living Index</label>
            <input className="edit-input" type="number" id="costOfLiving" name="costOfLiving" value={formData.costOfLiving} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label htmlFor="restaurantPriceIndex">Restaurant Price Index</label>
            <input className="edit-input" type="number" id="restaurantPriceIndex" name="restaurantPriceIndex" value={formData.restaurantPriceIndex} onChange={handleChange} />
          </div>

          <button className="edit-button" type="submit">Update Country</button>
        </form>

        {error && <p className="error-message">❌ {error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
}

export default EditCountry;

