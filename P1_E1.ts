//Autor: Renato Agustin Montenegro Palma
//EJERCICIO 1

// Test Deno
import { assertEquals } from "https://deno.land/std@0.203.0/testing/asserts.ts";

// Función 'bubbleSortRecursive' que implementa Bubble Sort de manera recursiva
function bubbleSortRecursive (arr: Array<number>, size: number): Array<number> {
    if (size === 1) return arr;  // Caso base: si el tamaño del subarray es 1, ya se encuentra ordenado
    for(let i = 0 ; i < arr.length ; i++){
        if(arr[i-1] > arr[i]){    // Compara elementos adyacentes y los intercambia si están en el orden incorrecto
            [arr[i-1], arr[i]] = [arr[i], arr[i-1]]; // Swap utilizando "asignación por desestructuración"
            // Alternativamente, se puede usar la función 'swap' // swap(arr, i-1, i);
        }
    }
    return bubbleSortRecursive(arr, size - 1);  
}

// Función 'bubbleSortArr' que inicia la función de ordenación
const bubbleSortArr = (arr: Array<number>) => {
    return bubbleSortRecursive(arr, arr.length); 
}

// Importamos la función 'assertEquals' del módulo de aserciones de Deno
Deno.test("bubbleSortRecursive", () => {
    const arr = [63, 4, 2, 5, 46, 1];
    const sortedArr = bubbleSortArr([...arr]); // [...arr] Hacemos una copia del array para no modificar el original
    arr.sort((a,b) => a - b); // Ordenamos el array original con sort
    assertEquals(arr, sortedArr); // Comparamos array original ordenado con su copia ordenada
});

Deno.test("bubbleSortRecursive", () => {
    const arr = [1, 4, 2, 5, 6, 1];
    const sortedArr = bubbleSortArr([...arr]); // [...arr] Hacemos una copia del array para no modificar el original
    arr.sort((a,b) => a - b); // Ordenamos el array original con sort
    assertEquals(arr, sortedArr); // Comparamos array original ordenado con su copia ordenada
});