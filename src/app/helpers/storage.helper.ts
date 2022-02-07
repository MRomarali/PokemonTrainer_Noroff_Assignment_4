
/**
 * Helper function to set data to local storage.
 * 
 * @param key which element in local storage to edit / add.
 * @param data data in element to replace / add.
 */
export function setLocalStorage(key: string, data: object): void {
    const dataAsString = JSON.stringify(data);
    localStorage.setItem(key, dataAsString);
}

/**
 * Helper function to get data from local storage.
 * 
 * @param key which element in local storage to get.
 * @returns the object value of the data.
 */
export function getLocalStorage(key: string): string | null {
    const data: string | null = localStorage.getItem(key);
    return JSON.parse(data ? data : 'null');
}

/**
 * Helper function to get data from local storage.
 * 
 * @param key which element in local storage to get.
 * @returns the string value of the data.
 */
export function getLocalStorageAsString(key: string): string | null {
    const data: string | null = localStorage.getItem(key);
    return data ? data : 'null';
}

/**
 * Helper function to set data to session storage.
 * 
 * @param key which element in session storage to edit / add.
 * @param data data in element to replace / add.
 */
export function setSessionStorage(key: string, data: object): void {
    const dataAsString = JSON.stringify(data);
    sessionStorage.setItem(key, dataAsString);
}

/**
 * Helper function to get data from session storage.
 * 
 * @param key which element in session storage to get.
 * @returns the object value of the data.
 */
export function getSessionStorage(key: string): string {
    const data: string | null = sessionStorage.getItem(key);
    return JSON.parse(data ? data : 'null');
}

/**
 * Helper function to get data from session storage.
 * 
 * @param key which element in session storage to get.
 * @returns the string value of the data.
 */
export function getSessionStorageAsString(key: string): string | null {
    const data: string | null = sessionStorage.getItem(key);
    return data ? data : 'null';
}
