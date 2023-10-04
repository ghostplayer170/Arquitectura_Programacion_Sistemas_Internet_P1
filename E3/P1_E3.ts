// Autor: Renato Agustin Montenegro Palma
// EJERCICIO 3

// Test Deno
import { assertEquals } from "https://deno.land/std@0.203.0/testing/asserts.ts";

const transformHour12to24 = (hour12: string): string => {
    // Se divide la cadena de entrada en la hora y am/pm
    const [hour, ampm] = hour12.split(" ");

    // Se divide la hora en horas y minutos, y se convierten a números
    const [hours, minutes] = hour.split(":").map(Number);

    // Variables auxiliares donde se convierten las horas y minutos a strings
    let hoursAux = String(hours);
    let minutesAux = String(minutes);

    // Si los minutos son menores a 10, se añade un cero al principio
    if(minutes < 10) minutesAux = `0${minutes}`;
    
    if (hours === 12) {
        // Caso especial 12am => 00XX
        if (ampm === "am") return `00${minutesAux}`;
        else return `12${minutesAux}`;

    } else {
        if (hours >= 0 && hours < 12 && minutes < 60 && minutes >= 0) {
            // Si la hora está dentro del rango válido (0-11) y los minutos son válidos (0-59)
            if (ampm === "pm") {
                // Si es pm, se suma 12 a las horas y se retorna en formato de 24 horas
                hoursAux = `${hours + 12}`;    
            } else {
                // Si es am, se verifica si las horas son menores a 10 y se retorna en formato de 24 horas
                if(hours < 10) hoursAux = `0${hours}`;
            }
            // Se retorna la hora en formato de 24 horas
            return hoursAux + minutesAux;
        } else {
            return "Error: Hora no valida."
        }
    }
};

// Importamos la función 'assertEquals' del módulo de aserciones de Deno
Deno.test("transformHour12to24", () => {
  
    // Definimos dos arreglos: uno con horas en formato 12 horas y otro con las correspondientes en formato 24 horas
    const hours12 = ["12:00 am","09:22 pm","12:03 pm","8:00 am","8:00 pm"] 
    const hours24 = ["0000","2122","1203","0800","2000"] 
    
    // Iteramos sobre cada hora en formato 12 horas y comparamos el resultado de transformarla a formato 24 horas con el valor esperado
    hours12.forEach((hour,index) => assertEquals(transformHour12to24(hour),hours24[index])) 
});






