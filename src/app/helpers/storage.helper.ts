
export function setLocalStorage(key: string, data: object): void {
    const dataAsString = JSON.stringify(data);
    localStorage.setItem(key, dataAsString);
}

export function getLocalStorage(key: string): string | null {
    const data: string | null = localStorage.getItem(key);
    return JSON.parse(data ? data : 'null');
}

export function getLocalStorageAsString(key: string): string | null {
    const data: string | null = localStorage.getItem(key);
    return data ? data : 'null';
}

export function setSessionStorage(key: string, data: object): void {
    const dataAsString = JSON.stringify(data);
    sessionStorage.setItem(key, dataAsString);
}

export function getSessionStorage(key: string): string {
    const data: string | null = sessionStorage.getItem(key);
    return JSON.parse(data ? data : 'null');
}

export function getSessionStorageAsString(key: string): string | null {
    const data: string | null = sessionStorage.getItem(key);
    return data ? data : 'null';
}
