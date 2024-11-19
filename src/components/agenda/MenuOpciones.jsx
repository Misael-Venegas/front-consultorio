import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { FaChevronDown } from 'react-icons/fa6'
import { MdDelete, MdEdit } from 'react-icons/md'

const MenuOpciones = () => {
    return (
        <>
            <Dropdown>
                <DropdownTrigger>
                    <Button
                        variant="light"
                        isIconOnly={true}
                    >
                        <FaChevronDown />
                    </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Static Actions">
                    <DropdownItem key="edit" textValue='Editar'
                       
                    >
                        <span className='inline-flex'>Editar <MdEdit /> </span>
                    </DropdownItem>
                    <DropdownItem
                        key="delete"
                        className="text-danger"
                        color="danger"
                        textValue='Eliminar'
                       
                    >
                        <span className='inline-flex'>Eliminar <MdDelete /></span>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </>
    )
}

export default MenuOpciones