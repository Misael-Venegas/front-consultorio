const meses = [
    { key: "1", label: 'Enero' },
    { key: "2", label: 'Febrero' },
    { key: "3", label: 'Marzo' },
    { key: "4", label: 'Abril' },
    { key: "5", label: 'Mayo' },
    { key: "6", label: 'Junio' },
    { key: "7", label: 'Julio' },
    { key: "8", label: 'Agosto' },
    { key: "9", label: 'Septiembre' },
    { key: "10", label: 'Octubre' },
    { key: "11", label: 'Nobiembre' },
    { key: "12", label: 'Diciembre' }
]

const obtenerAnhios = () => {
    const anhioActual = new Date().getFullYear();
    const arrayAnnhios = Array.from({ length: anhioActual - 2023 + 1 }, (_, i) => {
        const year = 2023 + i
        return { key: year.toString(), label: year.toString() }
    });
    return { anhioActual, arrayAnnhios };
}

const listaAnhos = obtenerAnhios()

const formatearFecha = (date) => {
    try {
        let fecha = date ? new Date(date) : new Date()
        const formatoFecha = fecha.getDate().toString().padStart(2, '0') + "-" + (fecha.getMonth() + 1).toString().padStart(2, '0') + "-" + fecha.getFullYear()
        return formatoFecha
    } catch (error) {
        throw new Error(error.message)
    }
}

const calcularEdad = (fechaNacimiento) => {
    if (!fechaNacimiento) return null; // Validar entrada

    const fechaActual = new Date();
    const fechaNacimientoUsuario = new Date(fechaNacimiento);

    // Calcular edad base
    let edad = fechaActual.getFullYear() - fechaNacimientoUsuario.getFullYear();

    // Verificar si el cumpleaños ya ocurrió este año
    const mesActual = fechaActual.getMonth();
    const diaActual = fechaActual.getDate();
    const mesNacimiento = fechaNacimientoUsuario.getMonth();
    const diaNacimiento = fechaNacimientoUsuario.getDate();

    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && diaActual < diaNacimiento)) {
        edad--;
    }

    return edad;
};

module.exports = { meses, listaAnhos, formatearFecha, calcularEdad }