import express from 'express';
import { 
  getAllCountries,
  getCountryById,  
  getCountryByName,
  filterCountries,
  createCountry,
  updateCountry,
  deleteCountry
} from '../controllers/countryController.js';

const router = express.Router();

// ✅ Route for getting all countries & creating a new country
router.route('/')
  .get(getAllCountries)
  .post(createCountry);

// ✅ Route for searching a country by name
router.route('/search/:name')
  .get(getCountryByName);

// ✅ Route for filtering countries
router.route('/filter')
  .get(filterCountries);

// ✅ Route for getting a country by ID, updating, and deleting
router.route('/:id')
  .get(getCountryById)
  .put(updateCountry)
  .delete(deleteCountry);

export default router;


