
const validator = (schema) => (req, res, next) => {
    if (req.method !== 'POST') {
        // No validamos solicitudes que no sean POST
        return next();
    }

    const validation = schema.validate(req.body, { abortEarly: false })
    

    if (validation.error) {
        console.log(validation)
        return res.status(400).json({ message: validation.error.message })
    }
    return next()

}

export default validator