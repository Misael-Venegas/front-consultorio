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

module.exports = { meses, listaAnhos }