import {
    DatePicker, Select, SelectItem, Autocomplete,
    AutocompleteItem, Button
} from "@nextui-org/react"
import { useState } from "react"
import { today, getLocalTimeZone } from "@internationalized/date"
import { TbEyePlus } from "react-icons/tb";
import ModalNuevaCita from "./ModalNuevaCita";
import CardCitas from "./CardCitas";

const Agenda = () => {
    const [fecha, setfecha] = useState(today(getLocalTimeZone()))
    const [nuevaCita, setnuevaCita] = useState(false)
    return (
        <>
            <div className="flex flex-col md:flex-row" >
                <div className="w-full md:w-[25%] mr-5" >
                    <span>Fecha</span>
                    <DatePicker
                        color="primary"
                        value={fecha}
                        onChange={setfecha}

                    />
                </div>
                <div className="w-full md:w-[25%]  mr-5 " >
                    <span>Especialista</span>
                    <Select
                        size="md"
                        placeholder="Nombre especialista"
                    ></Select>
                </div>
                <div className="w-full md:w-[25%]  mr-5" >
                    <span>Nombre del paciente</span>
                    <Autocomplete
                        placeholder="Nombre del paciente"
                    ></Autocomplete>
                </div>
                <div className="w-full md:w-[25%]" >
                    <Button onClick={() => setnuevaCita(true)} color="primary" className="mt-6 float-end " endContent={<TbEyePlus />} >Agregar cita</Button>
                </div>
            </div>
            <div className="mt-10" >

                <CardCitas />
            </div>
            {nuevaCita && <ModalNuevaCita openModal={nuevaCita} setOpenModal={setnuevaCita} />}
        </>
    )
}

export default Agenda