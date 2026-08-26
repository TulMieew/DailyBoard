import { validasiInput, simpanKeStorage, muatDariStorage } from "./storage.js";

let daftarCatatan = [];
let catatanSedangDiedit = null;

export function inisialisasiCatatan() {
    daftarCatatan = muatDariStorage("daftarCatatan");
    renderCatatan();
}

export function tambahCatatan(isi) {
    daftarCatatan.push({ 
        id: Date.now(), 
        isi: isi.trim(), 
        tanggal: new Date().toLocaleDateString() 
    });
    simpanKeStorage("daftarCatatan", daftarCatatan);
    renderCatatan();
}

function editCatatan(id, isiBaru) {
    daftarCatatan = daftarCatatan.map((c) =>
        c.id === id ? { ...c, isi: isiBaru.trim() } : c
    );
    simpanKeStorage("daftarCatatan", daftarCatatan);
    renderCatatan();
}

function hapusCatatan(id) {
    daftarCatatan = daftarCatatan.filter((c) => c.id !== id);
    if (catatanSedangDiedit === id) catatanSedangDiedit = null;
    simpanKeStorage("daftarCatatan", daftarCatatan);
    renderCatatan();
}

export function renderCatatan() {
    const container = document.getElementById("daftar-catatan");
    if (!container) return;
    container.innerHTML = "";

    daftarCatatan.forEach((catatan) => {
        const div = document.createElement("div");
        div.className = "catatan-item";

        if (catatanSedangDiedit === catatan.id) {
            const textareaEdit = document.createElement("textarea");
            textareaEdit.className = "textarea-edit-inline";
            textareaEdit.rows = 3;
            textareaEdit.value = catatan.isi;

            const simpanEdit = () => {
                if (validasiInput(textareaEdit.value)) {
                    editCatatan(catatan.id, textareaEdit.value);
                    catatanSedangDiedit = null;
                    renderCatatan();
                }
            };

            textareaEdit.addEventListener("keydown", (e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    simpanEdit();
                }
                if (e.key === "Escape") {
                    catatanSedangDiedit = null;
                    renderCatatan();
                }
            });
            textareaEdit.addEventListener("blur", simpanEdit);

            div.appendChild(textareaEdit);
            container.appendChild(div);
            textareaEdit.focus();
            textareaEdit.select();
            return;
        }

        const p = document.createElement("p");
        p.textContent = catatan.isi;
        p.addEventListener("dblclick", () => {
            catatanSedangDiedit = catatan.id;
            renderCatatan();
        });

        const small = document.createElement("small");
        small.textContent = catatan.tanggal;

        div.appendChild(p);
        div.appendChild(small);

        const tombolEdit = document.createElement("button");
        tombolEdit.textContent = "Edit";
        tombolEdit.addEventListener("click", () => {
            catatanSedangDiedit = catatan.id;
            renderCatatan();
        });
        div.appendChild(tombolEdit);

        const tombolHapus = document.createElement("button");
        tombolHapus.textContent = "Hapus";
        tombolHapus.addEventListener("click", () => {
            hapusCatatan(catatan.id);
        });

        div.appendChild(tombolHapus);
        container.appendChild(div);
    });
}