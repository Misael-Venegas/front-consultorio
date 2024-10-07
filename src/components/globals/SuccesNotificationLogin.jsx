import React from 'react'

const NotificationAlertSucces = ({ mensaje }) => {
    return (
        <>
            {    /*    <div className="fixed top-4 right-4 z-50 p-4 rounded shadow-lg transition-opacity duration-300 ease-in-out 'bg-green-100 text-green-700'" role="alert">
            {mensaje}
        </div>*/
            }
            < div className="p-4 mt-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-red-400" >
                {mensaje}
            </div >
        </>

    )
}

export default NotificationAlertSucces