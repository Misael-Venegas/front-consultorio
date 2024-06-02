import jwt from 'jsonwebtoken'

function validarToken() {
    try {

        const token = localStorage.getItem('token')
        const decoded = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY)
        return { valid: true, decoded }
    } catch (error) {
        return { valid: false, error: 'Error token de autenticación corrupto' }
    }
}

module.exports = { validarToken }