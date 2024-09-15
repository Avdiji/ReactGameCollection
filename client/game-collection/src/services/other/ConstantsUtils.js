/**
 * Function fetches a string value from the passed key.
 * 
 * @param {string} constantKey 
 * @returns A string-value to the corresponding Key.
 */
export async function getConstantValue(constantKey) {
    const response = await fetch('http://localhost:8080/constants.json');
    const data = await response.json();
    return data[constantKey];
}