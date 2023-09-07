import User from "../models/user.js"

export const emailExists = async (req, res, next) => {

    const existe = await User.findOne({ email: req.body.email })
    if (!existe) {
        return next()
    }

    return res.status(400).json({
        success: false,
        message: 'Email already exists'
    })
}