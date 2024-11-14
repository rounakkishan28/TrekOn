import City from "../models/city-model.js";

// Get cities
const getCities = async (req, res) => {
    try {
        const cities = await City.find({});
        if(cities) res.json({ success: true, cities });
        res.json({ success: false, message: 'Cities not found.' });
    } catch (error) {
        res.json({ success: false, message: 'Failed to fetch cities.', error });
    }
};

// Add City
const addCity = async (req, res) => {
    try {
        const { name, description, country } = req.body;
        const image = `${req.file.filename}`;
        const city = await City.create({ name, description, image, country });
        res.json({ success: true, city });
    } catch (error) {
        res.json({ success: false, message: 'Failed to add city.' });
    }
};

export { getCities, addCity };