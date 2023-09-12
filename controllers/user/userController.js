import User from "../../models/user.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
const authController = {

    signUp: async (req, res, next) => {
        try {

            const passwordHash = bcrypt.hashSync(req.body.password, 10)
            console.log(passwordHash)

            let body = { ...req.body }
            body.password = passwordHash

            const newUser = await User.create(body)

            const token = jwt.sign({ email: newUser.email, photo: newUser.photo }, process.env.SECRET_KEY, { expiresIn: '2h' })
            let { email, photo } = newUser
            return res.status(201).json({
                success: true,
                userData: { email, photo },
                token: token,
                message: 'Sign up successfully'
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    },

    signIn: async (req, res, next) => {
        try {

            let { email: emailBody, password } = req.body

            const userInDB = await User.findOne({ email: emailBody })

            if (!userInDB) {
                return res.status(400).json({
                    success: false,
                    message: "No user exists with this email",
                });
            }

            let passwordValidated = bcrypt.compareSync(password, userInDB.password)

            if (!passwordValidated) {
                return res.status(400).json({
                    success: false,
                    message: "The email/password is incorrect",
                });
            }

            let { email, photo } = userInDB
            const token = jwt.sign({ email, photo }, process.env.SECRET_KEY, { expiresIn: '2h' })
            return res.status(200).json({
                success: true,
                userData: { email, photo },
                token: token,
                message: 'Sign in successfully'
            })

        } catch (error) {
            console.log(error);
            next(error)
        }
    },

    loginWithToken: (req, res) => {
        const { email, name, photo } = req.user
        res.status(200).json({
            success: true,
            userData: { email, name, photo },
            message: 'Sign in successfully',
        })
    }

}

export default authController;