import { ambilKutipan, ambilCuaca } from "./api.js";
import { validasiInput, debounce } from "./storage.js";
import { inisialisasiTugas, tambahTugas, renderTugas } from "./tugas.js";
import { inisialisasiCatatan, tambahCatatan } from "./catatan.js";

const app = document.getElementById("app");

// Header
const judul = document.createElement("h2");
judul.textContent = "Selamat Datang di DailyBoard!";
app.appendChild(judul);

const statusText = document.createElement("p");
statusText.id = "status";
app.appendChild(statusText);

// Section Kutipan
const sectionKutipan = document.createElement("section");
sectionKutipan.className = "section-kutipan";
sectionKutipan.innerHTML = "<h3>Kata-Kata Hari Ini</h3>";
app.appendChild(sectionKutipan);

const widgetContainer = document.createElement("div");
widgetContainer.className = "widget-container";
app.appendChild(widgetContainer);

const pKutipan = document.createElement("p");
pKutipan.id = "kutipan-harian";
pKutipan.textContent = "Memuat kutipan...";
sectionKutipan.appendChild(pKutipan);

const tombolRefreshKutipan = document.createElement("button");
tombolRefreshKutipan.textContent = " Refresh";
sectionKutipan.appendChild(tombolRefreshKutipan);

tombolRefreshKutipan.addEventListener("click", () => {
    ambilKutipan(pKutipan);
});

// Toggle Tema
const toggleTema = document.createElement("button");
toggleTema.id = "toggleTema";
app.appendChild(toggleTema);

function perbaruiLabelTema() {
    const modeAktif = document.body.classList.contains("dark-mode");
    toggleTema.textContent = modeAktif ? "Light Mode" : "Dark Mode";
}

toggleTema.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const modeAktif = document.body.classList.contains("dark-mode");
    localStorage.setItem("tema", modeAktif ? "dark" : "light");
    perbaruiLabelTema();
});

// Section Tugas
const sectionTugas = document.createElement("section");
sectionTugas.innerHTML = "<h3>Tugas</h3>";
widgetContainer.appendChild(sectionTugas);

const inputCari = document.createElement("input");
inputCari.placeholder = "Cari tugas...";
inputCari.id = "input-cari-tugas";
sectionTugas.appendChild(inputCari);
sectionTugas.appendChild(document.createElement("br"));

const input1 = document.createElement("input");
input1.placeholder = "Tambah tugas baru...";
sectionTugas.appendChild(input1);

const tombol1 = document.createElement("button");
tombol1.textContent = "Tambah";
sectionTugas.appendChild(tombol1);

tombol1.addEventListener("click", () => {
    if (validasiInput(input1.value)) {
        tambahTugas(input1.value);
        input1.value = "";
    }
});

input1.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        if (validasiInput(input1.value)) {
            tambahTugas(input1.value);
            input1.value = "";
        }
    }
});

sectionTugas.appendChild(document.createElement("br"));

const containerFilter = document.createElement("div");
containerFilter.style.marginTop = "10px";

const filterSemua = document.createElement("button");
filterSemua.textContent = "Semua";
filterSemua.addEventListener("click", () => renderTugas("semua"));

const filterSelesai = document.createElement("button");
filterSelesai.textContent = "Selesai";
filterSelesai.addEventListener("click", () => renderTugas("selesai"));

const filterBelum = document.createElement("button");
filterBelum.textContent = "Belum Selesai";
filterBelum.addEventListener("click", () => renderTugas("belum"));

containerFilter.appendChild(filterSemua);
containerFilter.appendChild(filterSelesai);
containerFilter.appendChild(filterBelum);
sectionTugas.appendChild(containerFilter);

const ulTugas = document.createElement("ul");
ulTugas.id = "daftar-tugas";
sectionTugas.appendChild(ulTugas);

const cariTugasDebounced = debounce(() => renderTugas(), 300);
inputCari.addEventListener("input", cariTugasDebounced);

// Section Catatan
const sectionCatatan = document.createElement("section");
sectionCatatan.innerHTML = "<h3>Catatan</h3>";
widgetContainer.appendChild(sectionCatatan);

const textareaCatatan = document.createElement("textarea");
textareaCatatan.id = "input-catatan";
textareaCatatan.placeholder = "Tulis catatan singkat...";
textareaCatatan.rows = 3;
sectionCatatan.appendChild(textareaCatatan);

const tombol2 = document.createElement("button");
tombol2.textContent = "Tambah";
sectionCatatan.appendChild(tombol2);

tombol2.addEventListener("click", () => {
    if (validasiInput(textareaCatatan.value)) {
        tambahCatatan(textareaCatatan.value);
        textareaCatatan.value = "";
    }
});

const containerCatatan = document.createElement("div");
containerCatatan.id = "daftar-catatan";
sectionCatatan.appendChild(containerCatatan);

// Section Cuaca
const sectionCuaca = document.createElement("section");
sectionCuaca.innerHTML = "<h3>Cuaca</h3>";
widgetContainer.appendChild(sectionCuaca);

const input3 = document.createElement("input");
input3.placeholder = "Masukkan kota...";
sectionCuaca.appendChild(input3);

const tombol3 = document.createElement("button");
tombol3.textContent = "Cari Cuaca";
sectionCuaca.appendChild(tombol3);

const divCuaca = document.createElement("div");
divCuaca.id = "cuaca-harian";
divCuaca.textContent = "Memuat cuaca...";
sectionCuaca.appendChild(divCuaca);

tombol3.addEventListener("click", () => {
    if (validasiInput(input3.value)) {
        ambilCuaca(input3.value, divCuaca);
        input3.value = "";
    }
});

async function muatSemuaWidget() {
    statusText.textContent = "Memuat data...";
    await Promise.all([ambilKutipan(pKutipan), ambilCuaca("Jakarta", divCuaca)]);
    statusText.textContent = "Data berhasil dimuat!";
}

// Inisialisasi Event
window.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("tema") === "dark") {
        document.body.classList.add("dark-mode");
    }
    perbaruiLabelTema();
    inisialisasiTugas();
    inisialisasiCatatan();
    muatSemuaWidget();
});