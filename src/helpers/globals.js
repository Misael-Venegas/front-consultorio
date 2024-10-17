const meses = [
    { key: 1, mes: 'Enero' },
    { key: 2, mes: 'Febrero' },
    { key: 3, mes: 'Marzo' },
    { key: 4, mes: 'Abril' },
    { key: 5, mes: 'Mayo' },
    { key: 6, mes: 'Junio' },
    { key: 7, mes: 'Julio' },
    { key: 8, mes: 'Agosto' },
    { key: 9, mes: 'Septiembre' },
    { key: 10, mes: 'Octubre' },
    { key: 11, mes: 'Nobiembre' },
    { key: 12, mes: 'Diciembre' }
]

const obtenerAnhios = () => {
    const anhioActual = new Date().getFullYear();
    const arrayAnnhios = Array.from({ length: anhioActual - 2023 + 1 }, (_, i) => 2023 + i);
    return { anhioActual, arrayAnnhios };
}

const listaAnhos = obtenerAnhios()

module.exports = { meses, listaAnhos }