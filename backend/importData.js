import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Country from './models/country.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'data', 'Merged_Country_Data.json');
const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ Connection ERROR:', err));

const importData = async () => {
  try {
    await Country.deleteMany();
    await Country.insertMany(jsonData);
    console.log('✅ Data Entry completed successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Data Entry ERROR:', error);
    mongoose.connection.close();
  }
};

importData();
