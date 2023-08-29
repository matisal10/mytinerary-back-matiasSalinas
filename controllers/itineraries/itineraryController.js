import City from '../../models/City.js';

const itineraryController = {
    getAllItineraries: async (req, res, next) => {
        try {
            const cities = await City.find();
            const allItineraries = cities.reduce((itineraries, city) => {
                itineraries.push(...city.itineraries);
                return itineraries;
            }, []);

            return res.status(200).json({
                success: true,
                message: 'Retrieved all itineraries successfully',
                itineraries: allItineraries
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Error retrieving itineraries'
            });
        }
    },

    getAllItinerariesForCity: async (req, res, next) => {
        const { cityId } = req.params;
        try {
            const city = await City.findById(cityId);
            if (!city) {
                return res.status(404).json({
                    success: false,
                    message: 'City not found'
                });
            }
            const itineraries = city.itineraries;

            return res.status(200).json({
                success: true,
                message: 'Retrieved itineraries successfully',
                itineraries
            });
        } catch (error) {
            console.log(error);
            next(error);
            return res.status(500).json({
                success: false,
                message: 'Error retrieving itineraries'
            });
        }
    },

    createItineraryForCity: async (req, res, next) => {
        const { cityId } = req.params;
        try {
            const city = await City.findById(cityId);
            if (!city) {
                return res.status(404).json({
                    success: false,
                    message: 'City not found'
                });
            }

            const newItinerary = req.body;
            city.itineraries.push(newItinerary);
            await city.save();

            return res.status(201).json({
                success: true,
                message: 'Itinerary created successfully',
                itinerary: newItinerary
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Error creating itinerary'
            });
        }
    },

    updateItinerary: async (req, res, next) => {
        const { cityId, itineraryId } = req.params;
        try {
            const city = await City.findById(cityId);
            if (!city) {
                return res.status(404).json({
                    success: false,
                    message: 'City not found'
                });
            }

            const updatedItineraryIndex = city.itineraries.findIndex(itinerary => itinerary._id.toString() === itineraryId);
            if (updatedItineraryIndex === -1) {
                return res.status(404).json({
                    success: false,
                    message: 'Itinerary not found'
                });
            }

            city.itineraries[updatedItineraryIndex] = { ...city.itineraries[updatedItineraryIndex], ...req.body };
            await city.save();

            return res.status(200).json({
                success: true,
                message: 'Itinerary updated successfully',
                itinerary: city.itineraries[updatedItineraryIndex]
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Error updating itinerary'
            });
        }
    },

    deleteItinerary: async (req, res, next) => {
        const { cityId, itineraryId } = req.params;
        try {
            const city = await City.findById(cityId);
            if (!city) {
                return res.status(404).json({
                    success: false,
                    message: 'City not found'
                });
            }

            const deletedItinerary = city.itineraries.id(itineraryId);
            if (!deletedItinerary) {
                return res.status(404).json({
                    success: false,
                    message: 'Itinerary not found'
                });
            }

            deletedItinerary.remove();
            await city.save();

            return res.status(200).json({
                success: true,
                message: 'Itinerary deleted successfully',
                deletedItinerary
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Error deleting itinerary'
            });
        }
    }
};

export default itineraryController;
