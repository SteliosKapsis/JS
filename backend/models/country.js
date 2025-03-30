import mongoose from 'mongoose';

const countrySchema = new mongoose.Schema({
    Country: { type: String, required: true, trim: true, unique: true },
    Quality_of_Life: { type: Number, default: null },
    Adventure: { type: Number, default: null },
    Heritage: { type: Number, default: null },
    Cost_of_Living_Index: { type: Number, default: null },
    Restaurant_Price_Index: { type: Number, default: null }
});

// ✅ Make sure the model is correctly named and exported
const Country = mongoose.models.Country || mongoose.model('Country', countrySchema);

export default Country;
