// controllers/countryController.js 
import Country from '../models/country.js';

// GET all countries
export const getAllCountries = async (req, res) => {
    try {
        const countries = await Country.find();
        res.status(200).json(countries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//filter Countries w/ criteria
export const filterCountries = async (req, res) => {
    const { criterion, type, limit } = req.query;

    const validCriteria = ["Cost_of_Living_Index", "Quality_of_Life", "Adventure", "Heritage", "Restaurant_Price_Index"];

    if (!criterion || !validCriteria.includes(criterion)) {
        return res.status(400).json({ message: "Invalid or missing criterion parameter" });
    }

    const sortOrder = type === 'lowest' ? 1 : -1;

    try {
        console.log(`🔍 Filtering countries by ${criterion} in ${type} order...`);

        const countries = await Country.find({})
            .sort({ [criterion]: sortOrder })
            .limit(Number(limit) || 0); // ✅ Fix: Ensure limit works properly

        console.log("✅ Filtered results count:", countries.length);

        res.status(200).json(countries);
    } catch (error) {
        console.error("❌ Error in filterCountries:", error);
        res.status(500).json({ message: error.message });
    }
};

// POST create a new country
export const createCountry = async (req, res) => {
    try {
        console.log("🔍 Incoming request body:", req.body); 

        const { Country: countryName, Quality_of_Life, Adventure, Heritage, Cost_of_Living_Index, Restaurant_Price_Index } = req.body;

        // ✅ Ensure Country model is working
        console.log("✅ Checking Country model:", Country);
        console.log("✅ Available Model Methods:", Object.keys(Country));

        // ✅ Check if findOne() function exists
        if (typeof Country.findOne !== "function") {
            console.error("❌ Country.findOne is NOT a function!");
            return res.status(500).json({ message: "Internal Server Error: Country model is invalid" });
        }

        // ✅ Check if the country already exists
        const existingCountry = await Country.findOne({ Country: countryName.trim() });
        console.log("🔍 Existing country:", existingCountry);

        if (existingCountry) {
            return res.status(400).json({ message: "Country already exists" });
        }

        // ✅ Create and save new country
        const newCountry = new Country({
            Country: countryName.trim(),
            Quality_of_Life: Quality_of_Life || null,
            Adventure: Adventure || null,
            Heritage: Heritage || null,
            Cost_of_Living_Index: Cost_of_Living_Index || null,
            Restaurant_Price_Index: Restaurant_Price_Index || null
        });

        console.log("✅ New country object:", newCountry); 

        const savedCountry = await newCountry.save();
        res.status(201).json(savedCountry);
    } catch (error) {
        console.error("❌ Error in createCountry:", error);
        res.status(400).json({ message: "Invalid data: " + error.message });
    }
};

// PUT update a country
export const updateCountry = async (req, res) => {
    try {
        const updatedCountry = await Country.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedCountry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE a country
export const deleteCountry = async (req, res) => {
    try {
        await Country.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET country by ID
export const getCountryById = async (req, res) => {
    try {
        const { id } = req.params;

        // ✅ Check if ID is valid
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: "Invalid country ID" });
        }

        const country = await Country.findById(id);

        if (!country) {
            return res.status(404).json({ message: "Country not found" });
        }

        res.status(200).json(country);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET country by name
export const getCountryByName = async (req, res) => {
    try {
        const countryName = req.params.name;

        // ✅ Ensure case-insensitive search for the country name
        const country = await Country.findOne({ Country: { $regex: new RegExp(`^${countryName}$`, 'i') } });

        if (!country) {
            return res.status(404).json({ message: "Country not found" });
        }

        res.status(200).json(country);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


