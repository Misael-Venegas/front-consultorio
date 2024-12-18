import {
    DatePicker, Select, SelectItem, Autocomplete,
    AutocompleteItem, Button
} from "@nextui-org/react"
import { useEffect, useState } from "react"
import { today, getLocalTimeZone } from "@internationalized/date"
import { TbEyePlus } from "react-icons/tb";
import ModalNuevaCita from "./ModalNuevaCita";
import CardCitas from "./CardCitas";
import { useNotification } from "@/helpers/NotificationContext";
import { peticionGet } from "@/helpers/peticionesAPI";

const Agenda = () => {
    const { showNotification } = useNotification()
    const [fecha, setfecha] = useState(today(getLocalTimeZone()))
    const [nombreEspecialista, setnombreEspecialista] = useState("")
    const [nuevaCita, setnuevaCita] = useState(false)
    const [actualizarCards, setactualizarCards] = useState(3.1416)
    const [datosConsultas, setDatosConsultas] = useState([])
    const [arrayEspecialistas, setarrayEspecialistas] = useState([])
    useEffect(() => {
        obtnerDatosConsultas()
        obtenerEspecialistas()
    }, [actualizarCards, fecha])

    const obtnerDatosConsultas = async () => {
        try {
            const response = await peticionGet(`obtener-citas/${fecha}`, true)
            if (!response.ok) {
                const dataError = await response.json()
                throw new Error(dataError.message)
            }
            const data = await response.json()
            setDatosConsultas(data)

        } catch (error) {
            showNotification(error.message, 'error')
        }
    }

    const obtenerEspecialistas = async () => {
        try {
            const response = await peticionGet('obtener-especialistas', true)
            if (!response.ok) {
                const dataError = await response.json()
                throw new Error(dataError.message)
            }
            const data = await response.json()

            setarrayEspecialistas(data)
        } catch (error) {
            showNotification(error.message, 'error')
        }
    }
    const filtrarCitasPorEspecialista = async (e) => {
        try {
            const response = await peticionGet(`obtener-citas-por-especialista/${e.target.value}`, true)
            if (!response.ok) {
                const dataError = await response.json()
                throw new Error(dataError.message)
            }
            const data = await response.json()
            setDatosConsultas(data)

        } catch (error) {
            showNotification(error.message, 'error')
        }
    }
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
                        onChange={(e) => filtrarCitasPorEspecialista(e)}
                    >
                        {
                            arrayEspecialistas.map((especialista, key) => {
                                return <SelectItem key={especialista.id} >
                                    {especialista.nombre}
                                </SelectItem>
                            })
                        }
                    </Select>
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

                <CardCitas datosConsultas={datosConsultas} setActualizarCita={setactualizarCards} especialistas={arrayEspecialistas} />
            </div>
            {nuevaCita && <ModalNuevaCita openModal={nuevaCita} setOpenModal={setnuevaCita} setActualizarCards={setactualizarCards} especialistas={arrayEspecialistas} />}
        </>
    )
}

export default Agenda 