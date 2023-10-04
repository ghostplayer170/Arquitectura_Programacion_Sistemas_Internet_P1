// Autor: Renato Agustin Montenegro Palma
// EJERCICIO 2

// Test Deno
import { assertEquals } from "https://deno.land/std@0.203.0/testing/asserts.ts";

// Función 'securityPassword' que evalúa la seguridad de una contraseña
const securityPassword = (pass: string): number => {
    let securityLevel = 0;  // Inicializa el nivel de seguridad en 0
    const arr: Array<string> = pass.split("");  // Divide la password en un array de caracteres
    
    // Comprueba si la contraseña tiene al menos una letra
    const hasLetter: boolean = arr.some(elem => isNaN(parseInt(elem)));
    // const hasLetter: boolean = arr.some(elem => /[a-zA-Z]/.test(elem)); // Forma alternativa utilizando Regex

    // Comprueba si la contraseña tiene al menos un número
    const hasNumber: boolean = arr.some(elem => !isNaN(parseInt(elem)));
    //const hasNumber: boolean = arr.some(elem => /[0-9]/.test(elem)); // Forma alternativa utilizando Regex

    // Comprueba si la contraseña tiene al menos un carácter especial
    const hasSpecialChar: boolean = arr.some(elem => /[!@#$%^&*(),.?":{}|<>-_º/\\ª']/.test(elem));
    
    // Función que verifica si un caracter es un número
    const isNumber = (elem: string): boolean => !isNaN(parseInt(elem));

    // Si tiene una letra y un número, aumenta la seguridad
    if (hasLetter && hasNumber) securityLevel += 1;

    for (let i = 0; i < arr.length - 2; i++) {
        // Si hay tres números consecutivos, disminuye el nivel de seguridad
        if (isNumber(arr[i]) && isNumber(arr[i + 1]) && isNumber(arr[i + 2])) {
            securityLevel -= 1;
            break;
        }
    }

    if (arr.length > 20) securityLevel += 2;  // Si la contraseña tiene más de 20 caracteres, aumenta la seguridad

    if (arr.length < 10) securityLevel -= 1;  // Si la contraseña tiene menos de 10 caracteres, disminuye la seguridad

    if (hasSpecialChar) securityLevel += 1;  // Si hay al menos un carácter especial, aumenta la seguridad

    return securityLevel;  // Devuelve el nivel de seguridad calculado
}

// Importamos la función 'assertEquals' del módulo de aserciones de Deno
Deno.test("securityPassword", () => {
    // Menos de 10 caracteres -1, Tres números seguidos -1
    assertEquals(securityPassword("123"), -2);
    // Caracteres especiales +1, Más de 20 caracteres +2, Una letra y un número +1
    assertEquals(securityPassword("ASDFLOCKJPSASDJAD3JO$$"), 4);
    // Caracteres especiales +1, Una letra y un número +1, Menos de 10 caracteres -1, Tres números seguidos -1
    assertEquals(securityPassword("hol123\\"), 0);
  });