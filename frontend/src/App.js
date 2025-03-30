import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CountryList from './CountryList/CountryList';
import AddCountry from './AddCountry/AddCountry';
import EditCountry from './EditCountry/EditCountry';
import CountrySearch from './CountrySearch/CountrySearch.js';
import NotFound from './NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CountryList />} />  {/* ✅ Show all countries */}
          <Route path="/add-country" element={<AddCountry />} />  {/* ✅ Add a new country */}
          <Route path="/edit/:id" element={<EditCountry />} />  {/* ✅ Edit a country */}
          <Route path="/search/:name" element={<CountrySearch />} />  {/* ✅ Search for a country */}
          <Route path="*" element={<NotFound />} />  {/* ✅ 404 page */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
