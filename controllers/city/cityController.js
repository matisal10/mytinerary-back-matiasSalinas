import { get } from 'mongoose'
import City from '../../models/City.js'

const cityController = {
    getAllCities: async (req, res, next) => {
        try {
            let all = await City.find()
            res.setHeader('Cache-Control', 'max-age=3600');
            return res.status(200).json({
                success: true,
                response: all,
                message: "Ok"
            })
            

        } catch (error) {
            console.log(error)
            next(error)
            return res.status(500).json({
                success: false,
                message: 'error'
            })
        }
    },

    getOneCity: async (req, res, next) => {
        const { id } = req.params
        let city;
        try {
            city = await City.findById(id)
            // res.setHeader('Cache-Control', 'max-age=3600');
            return res.status(200).json({
                success: true,
                response: city
            })
        } catch (err) {
            console.log(err)
            next(error)
            return res.status(500).json({
                success: false,
                message: 'error'
            })
        }
    },

    searchCityByName:async (req, res, next) =>{
        try {
            let cityName = req.params.name;
            if(cityName){
                let cities = await City.find({name: new RegExp(cityName,'i')})
                return res.status(200).json({
                    success: true,
                    message: 'City Find successfully',
                    cities
                });
            }

            
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Error find city'
            });
        }
    },
    
    updateCity: async (req, res, next) => {
        const { id } = req.params;
        try {
            const updatedCity = await City.findOneAndUpdate(
                { _id: id },
                { $set: req.body },
                { new: true }
            );
    
            if (!updatedCity) {
                return res.status(500).json({
                    success: false,
                    message: 'Error updating city'
                });
            }
    
            return res.status(200).json({
                success: true,
                message: 'City updated successfully',
                updatedCity
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: 'Error updating city'
            });
        }
    },

    createCity: async (req, res, next) => {
        try {

            const city =await City.create(req.body)
            console.log(req.body)
            return res.status(201).json({
                success: true,
                message: 'Created!',
                city
            })

        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success: false,
                message: 'error'
            })
        }
    },

    deleteCity: async (req, res, next) => {
        const { id } = req.params;
        try {
            const deleteCity = await City.findByIdAndDelete(id)
            if (!deleteCity) {
                return res.status(500).json({
                    success: false,
                    message: 'Error deleting city'
                });
            }
    
            return res.status(200).json({
                success: true,
                message: 'City deleted successfully',
                deleteCity
            });
        } catch (error) {
            console.log(error);
            next(error)
            return res.status(500).json({
                success: false,
                message: 'Error deleting city'
            });
        }
        
    }


}

export default cityController