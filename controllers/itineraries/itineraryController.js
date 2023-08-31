import City from '../../models/City.js';
import Itinerary from '../../models/Itineraries.js';

const itineraryController = {
    getAllItineraries: async (req, res, next) => {
        try {
            const allItineraries = await Itinerary.find();

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
        const { id } = req.params
        try {
            const city = await City.findById(id).populate('itineraries');
            if (!city) {
                return res.status(404).json({
                    success: false,
                    message: 'City not found'
                });
            }

            const itineraries = await Itinerary.find({ _id: { $in: city.itineraries } }); // Buscamos los itinerarios por sus IDs en el array
            return res.status(200).json({
                success: true,
                message: 'Retrieved itineraries successfully for one city',
                response: itineraries
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
        const { id } = req.params;
        try {
            const city = await City.findById(id);
            if (!city) {
                return res.status(404).json({
                    success: false,
                    message: 'City not found'
                });
            }

            const newItineraryData = req.body; // Datos del nuevo itinerario
            const newItinerary = new Itinerary(newItineraryData); // Crea un nuevo documento de itinerario
            await newItinerary.save(); // Guarda el nuevo itinerario en la colección

            city.itineraries.push(newItinerary._id); // Agrega la referencia del itinerario al array de IDs
            await city.save(); // Guarda la ciudad actualizada

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

            const itinerary = await Itinerary.findById(itineraryId);
            if (!itinerary) {
                return res.status(404).json({
                    success: false,
                    message: 'Itinerary not found'
                });
            }

            const updatedItineraryData = req.body;
            Object.assign(itinerary, updatedItineraryData);
            await itinerary.save();

            return res.status(200).json({
                success: true,
                message: 'Itinerary updated successfully',
                itinerary
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

            const itineraryIndex = city.itineraries.indexOf(itineraryId);
            if (itineraryIndex === -1) {
                return res.status(404).json({
                    success: false,
                    message: 'Itinerary not found'
                });
            }

            city.itineraries.splice(itineraryIndex, 1);
            await city.save();

            // Ahora, también eliminamos el itinerario de la colección de itinerarios
            await Itinerary.findByIdAndDelete(itineraryId);

            return res.status(200).json({
                success: true,
                message: 'Itinerary deleted successfully'
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
