import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from '@nextui-org/react'
import { BsThreeDots } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNotification } from '@/helpers/NotificationContext';
import { useState } from 'react';
import ConfirmDialog from '../globals/ConfirmDialog';
const MenuOpcionsUsuarios = ({ datosUsuario }) => {
    const [openConfirmDialog, setopenConfirmDialog] = useState(false)
    const [confirmDele, setconfirmDele] = useState(false)


    const { showNotification } = useNotification()


    const eliminarUsuario = async _ => {
        console.log(datosUsuario)
        //eliminarUsuario
        const token = localStorage.getItem('token')
        const urlAPI = process.env.NEXT_PUBLIC_API_URL
        try {



        } catch (error) {
            showNotification(error.message)
        }
    }

    if (confirmDele) {
        console.log(seElimina)
    }
    return (
        <>

            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="light"
                        isIconOnly={true}
                    >
                        <BsThreeDots />

                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="edit" textValue='Editar'> <span className='inline-flex' >Editar <MdEdit /> </span>  </DropdownItem>
                    <DropdownItem key="delete" className="text-danger " color="danger" textValue='Elimiar' onClick={() => setopenConfirmDialog(true)} >
                        <span className='inline-flex' >Elimiar <MdDelete /></span>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>

            <ConfirmDialog openModal={openConfirmDialog} setConfirmDialog={setconfirmDele} setOpenModal={setopenConfirmDialog} text={'De verdad deseas eliminar este usuario?'} />
        </>
    )
}

export default MenuOpcionsUsuarios