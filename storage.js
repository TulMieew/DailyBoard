export function validasiInput(nilai) {
    if (nilai.trim() === "") {
        alert("Input tidak boleh kosong!");
        return false;
    }
    if (nilai.length > 100) {
        alert("Input tidak boleh lebih dari 100 karakter!");
        return false;
    }
    return true;
}

export function simpanKeStorage(kunci, data) {
    localStorage.setItem(kunci, JSON.stringify(data));
}

export function muatDariStorage(kunci, fallback = []) {
    const data = localStorage.getItem(kunci);
    return data ? JSON.parse(data) : fallback;
}

export function debounce(func, delay = 300) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}