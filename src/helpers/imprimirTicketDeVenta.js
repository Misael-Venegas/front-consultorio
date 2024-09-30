export const imprimirTicket = async (total, listaDeProductos, metodoPago) => {
    try {
        const obtenerFecha = getFormatoFecha()

        // Verificar si QZ Tray está disponible
        if (!window.qz) {
            throw new Error('QZ Tray no está cargado');
        }
        // Conectar a QZ Tray
        await window.qz.websocket.connect();

        // Configurar la impresora
        const config = window.qz.configs.create('XP-58');

        // Contenido del ticket para imprimir

        var data = [
            {
                type: 'pixel',
                format: 'image', //'pdf'
                flavor: 'file',
                data: '/assets/Images/logo_eyeconic 2.PNG'
            }]
        // Enviar el ticket para impresión
        await window.qz.print(config, data);
        data = [{ type: 'raw', format: 'plain', data: `${obtenerFecha} \n` }]
        data.push({ type: 'raw', format: 'plain', data: '\x1B\x61\x01' });
        data.push({ type: 'raw', format: 'plain', data: 'Eyeconic Salud Visual \n' })
        data.push({ type: 'raw', format: 'plain', data: 'GAVA930328GS5 \n' })
        data.push({ type: 'raw', format: 'plain', data: 'Av. Lázaro cardenas #31 Col. Universal, Chilpancingo de los Bravo Guerrero 39080 \n' })
        data.push({ type: 'raw', format: 'plain', data: 'eyeconicoptica@gmail.com \n' })
        data.push({ type: 'raw', format: 'plain', data: '7471382978 \n\n' })

        data.push({ type: 'raw', format: 'plain', data: '------------------------------- \n' })
        // Formato de tabla para los productos
        data.push({ type: 'raw', format: 'plain', data: '\x1B\x45\x01' }); // Negrita ON
        data.push({ type: 'raw', format: 'plain', data: 'Producto      Cant  Desc  Precio\n' });
        data.push({ type: 'raw', format: 'plain', data: '\x1B\x45\x00' }); // Negrita OFF

        listaDeProductos.forEach(producto => {
            const nombreProducto = producto.nombre_producto.padEnd(11, ' '); // Ajustar el nombre a 12 caracteres
            const cantidad = `X${producto.cantidad}`.padEnd(5, ' ');
            const descuento = `${producto.descuento}%`.padEnd(6, ' ');
            const precio = `$${producto.precioFinal.toFixed(2)}`;
            data.push({ 
                type: 'raw', 
                format: 'plain', 
                data: `${nombreProducto}${cantidad}${descuento}${precio}\n` 
            });
        });

        data.push({ type: 'raw', format: 'plain', data: '------------------------------- \n\n' })
        data.push({ type: 'raw', format: 'plain', data: '\x1B\x45\x01' }); // Negrita ON
        data.push({ type: 'raw', format: 'plain', data: '\x1D\x21\x11' }); // Texto grande
        data.push({ type: 'raw', format: 'plain', data: `Total: $${total}\n` })
        data.push({ type: 'raw', format: 'plain', data: '\x1D\x21\x00' }); // Volver al tamaño normal
        data.push({ type: 'raw', format: 'plain', data: '\x1B\x45\x00' }); // Negrita OFF
        data.push({ type: 'raw', format: 'plain', data: `Método de pago: ${metodoPago}\n` })

        data.push({ type: 'raw', format: 'plain', data: '¡Gracias por su compra!\n' })
        data.push({ type: 'raw', format: 'plain', data: '\x1B\x61\x00' });
        data.push({ type: 'raw', format: 'plain', data: '\n\n\n' })
        data.push({ type: 'raw', format: 'plain', data: '\x1D\x56\x41' })
        //console.log(data)
        await window.qz.print(config, data);
    } catch (error) {
        console.error('Error al intentar imprimir: ', error);
    } finally {
        if (window.qz) {
            window.qz.websocket.disconnect(); // Desconectar después de imprimir
        }
    }
}



const getFormatoFecha = () => {
    const fecha = new Date()
    const formatoFecha = fecha.getDate().toString().padStart(2, '0') + '/' + (fecha.getMonth() + 1).toString().padStart(2, '0') + '/' + fecha.getFullYear()
    const formatoHoras = fecha.getHours().toString().padStart(2, '0') + ':' + fecha.getMinutes().toString().padStart(2, '0')
    return formatoFecha + ' ' + formatoHoras
}