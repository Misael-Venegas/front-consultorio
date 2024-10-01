import React from 'react'
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell } from '@nextui-org/react'
const TablaProductosCantidadMinima = () => {
    return (
        <div className='my-8' >
            <h4 className='font-bold text-large' >Productos con stock bajo </h4>
            <Table>
                <TableHeader>
                    <TableColumn>#</TableColumn>
                    <TableColumn>Nombre</TableColumn>
                    <TableColumn>Código de barras</TableColumn>
                    <TableColumn>Cantidad </TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>

                        </TableCell>

                        <TableCell>

                        </TableCell>

                        <TableCell>

                        </TableCell>

                        <TableCell>

                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    )
}

export default TablaProductosCantidadMinima