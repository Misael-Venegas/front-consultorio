
const peticionGet = async (urlApi, autorizacion) => {
    const url = process.env.NEXT_PUBLIC_API_URL
    const token = sessionStorage.getItem('token')

    const response = await fetch(`${url}${urlApi}`, {
        method: 'GET',
        headers: {
            'Authorization': autorizacion ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
        }
    })

    return response
}

const peticionesPost = async (apiUrl, autorizacion, parametros) => {
    const url = process.env.NEXT_PUBLIC_API_URL
    const token = sessionStorage.getItem('token')

    const response = await fetch(`${url}${apiUrl}`, {
        method: 'POST',
        headers: {
            'Authorization': autorizacion ? `Bearer ${token}` : '',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(parametros)
    })
    return response
}

module.exports = { peticionGet, peticionesPost }