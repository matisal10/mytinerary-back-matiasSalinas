import City from '../../models/City.js'

export default async (req, res) => {
    try {
        await City.read(req.body)
        return res.status(200).json({
            success: true,
            message: 'Created!'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: 'error'
        })
    }
}