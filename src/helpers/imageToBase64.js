async function convertirImagen(image) {
    try {
        let imagenBase64 = null

        if (image) {
            const reader = new FileReader()
            imagenBase64 = await new Promise((resolve, reject) => {
                reader.onload = () => resolve(reader.result.split(',')[1])
                reader.onerror = reject
                reader.readAsDataURL(image)
            })
        }
        return imagenBase64
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = { convertirImagen }