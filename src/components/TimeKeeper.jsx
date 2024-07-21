import React from 'react';

function monthName(monthNumber) {
    switch (monthNumber) {
        case 1:
            return "Enero";
        case 2:
            return "Febrero";
        case 3:
            return "Marzo";
        case 4:
            return "Abril";
        case 5:
            return "Mayo";
        case 6:
            return "Junio";
        case 7:
            return "Julio";
        case 8:
            return "Agosto";
        case 9:
            return "Septiembre";
        case 10:
            return "Octubre";
        case 11:
            return "Noviembre";
        case 12:
            return "Diciembre";
        default:
            return "{OUT OF RANGE MONTH!!!}"
    }
};

function dayName(dayNumber) {
    switch (dayNumber) {
        case 0:
            return "Domingo";
        case 1:
            return "Lunes";
        case 2:
            return "Martes";
        case 3:
            return "Miércoles";
        case 4:
            return "Jueves";
        case 5:
            return "Viernes";
        case 6:
            return "Sábado";
        default:
            return "{OUT OF RANGE DAY!!!}"
    }
};

function TimeKeeper() {

    let newDate = new Date()
    let dayNumber = newDate.getDay();
    let monthNumber = newDate.getMonth() + 1;
    let day = dayName(dayNumber);
    let date = newDate.getDate();
    let year = newDate.getFullYear();
    let month = monthName(monthNumber);

    return (
        <div className="flex items-center justify-center flex-col text-center pb-6">
            <p className="text-lg max-w-xl mb-6">
                Hoy es <i>{day}</i>, <b>{date}</b> de <b>{month}</b>, <b>{year}</b>.
            </p>
        </div>
    )
}

export default TimeKeeper;