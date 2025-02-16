
// NAVBAR SYSTEM
function toggleClearButton() {
    let searchBar = document.getElementById("searchBar");
    let clearButton = document.getElementById("clearSearch");

    clearButton.style.display = searchBar.value.length > 0 ? "block" : "none";
}

function clearSearch() {
    let searchBar = document.getElementById("searchBar");
    searchBar.value = ""; // Hapus teks dalam input
    toggleClearButton(); // Sembunyikan tombol X

    // Panggil cariLagu() tanpa menampilkan daftar isi
    let daftarIsi = document.querySelectorAll(".column");
    let daftarLagu = document.querySelectorAll("#daftarLagu1 li, #daftarLagu2 li");
    let lirikLagu = document.querySelectorAll(".lagu h4, .lagu pre");

    // Reset tampilan lagu tapi biarkan daftar isi tetap tersembunyi
    daftarLagu.forEach(li => li.style.display = "block");
    lirikLagu.forEach(lirik => lirik.parentElement.parentElement.style.display = "block");
}


document.addEventListener("DOMContentLoaded", function() {
    let daftarIsi = document.querySelectorAll(".column");
    let transposeButtons = document.querySelector("footer.bawah");
    
    // Sembunyikan daftar isi dan tombol transpose saat halaman dimuat
    daftarIsi.forEach(el => el.style.display = "none");
    transposeButtons.style.display = "none";

    // Tambahkan event listener untuk menangkap klik pada daftar isi
    document.querySelectorAll("#daftarLagu1 a, #daftarLagu2 a").forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Mencegah perilaku default anchor
            let targetID = this.getAttribute("href").substring(1); // Ambil ID dari href
            let targetElement = document.getElementById(targetID);

            if (targetElement) {
                // Pastikan daftar isi tampil sebelum scroll
                daftarIsi.forEach(el => el.style.display = "block");

                // Scroll ke elemen tujuan dengan efek smooth
                targetElement.scrollIntoView({ behavior: "smooth" });

                // Tambahkan efek highlight pada target agar lebih jelas
                targetElement.style.backgroundColor = "#013E62";
                targetElement.style.color = "#fff"; // Warna teks agar terlihat
                
                setTimeout(() => {
                    targetElement.style.backgroundColor = "transparent";
                    targetElement.style.color = "#000"; // Kembalikan ke warna teks default
                }, 1000);
            }
        });
    });
});


function cariLagu() {
    let input = document.getElementById("searchBar").value.toLowerCase();
    let daftarLagu = document.querySelectorAll("#daftarLagu1 li, #daftarLagu2 li");
    let lirikLagu = document.querySelectorAll(".lagu h4, .lagu pre");

    let found = false;

    // Cari di daftar lagu
    daftarLagu.forEach(function(li) {
        if (li.textContent.toLowerCase().includes(input)) {
            li.style.display = "block";
            found = true;
        } else {
            li.style.display = "none";
        }
    });

    // Cari di lirik lagu
    lirikLagu.forEach(function(lirik) {
        if (lirik.textContent.toLowerCase().includes(input)) {
            lirik.parentElement.parentElement.style.display = "block";
            found = true;
        } else {
            lirik.parentElement.parentElement.style.display = "none";
        }
    });

    // Tampilkan daftar isi jika ada hasil pencarian
    let daftarIsi = document.querySelectorAll(".column");
    daftarIsi.forEach(function(container) {
        if (found || input.length > 0) {
            container.style.display = "block";
        } else {
            container.style.display = "none";
        }
    });
}

function toggleDaftarIsi() {
    let daftarIsi = document.querySelectorAll(".column");
    daftarIsi.forEach(function(container) {
        if (container.style.display === "none") {
            container.style.display = "block";
        } else {
            container.style.display = "none";
        }
    });
}

function toggleTranspose() {
    let transposeButtons = document.querySelector("footer.bawah");
    if (transposeButtons.style.display === "none") {
        transposeButtons.style.display = "block";
    } else {
        transposeButtons.style.display = "none";
    }
}


// SEARCH


document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.querySelector("button[title='Cari Lagu']");
    const clearSearchButton = document.getElementById("clearSearch");
    const daftarIsi = document.getElementById("daftarLagu1"); // Pastikan ID sesuai
    const daftarIsi2 = document.getElementById("daftarLagu2"); // Untuk daftar isi kedua
    const toggleChordButton = document.getElementById("toggleChord");
    
    // 1. Klik tombol search, halaman langsung ke atas
    searchButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // 2. Jika tombol X di search ditekan, daftar isi akan disembunyikan
    clearSearchButton.addEventListener("click", function () {
        document.getElementById("searchBar").value = ""; // Mengosongkan input
        daftarIsi.style.display = "none";
        daftarIsi2.style.display = "none";
    });


});

// Baru

document.addEventListener("DOMContentLoaded", function () {
    const songText = document.getElementById("songText");

    // Format teks lagu untuk mendeteksi chord
    if (songText) {
        songText.innerHTML = formatSongText(songText.innerHTML);
    }

    // Ambil elemen chord yang telah diformat
    let transposeButtons = document.querySelector("footer.bawah");
    let toggleButton = document.getElementById("toggleChord");

    // Sembunyikan chord dan tombol transpose saat halaman dimuat
    transposeButtons.style.display = "none";

    // Toggle untuk menampilkan/menyembunyikan chord dan tombol transpose
    toggleButton.addEventListener("click", function () {
        let isHidden = chordElements[0].style.display === "none"; // Cek status pertama

        // Pastikan tombol transpose tetap bekerja setelah chord muncul
        if (isHidden) {
            updateTransposeListeners();
        }
    });

    updateTransposeListeners(); // Pastikan event listener tetap aktif
});


// HIDE BUTON CHORD

// Daftar akor dalam tangga nada
const chords = [
    "C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"
];

// Fungsi untuk menaikkan atau menurunkan chord
function transposeChord(chord, steps) {
    let baseChord = chord.match(/[A-G]#?/)[0]; // Ambil nada dasar
    let suffix = chord.replace(baseChord, ""); // Ambil akhiran (misal: m, 7, sus4)
    
    let index = chords.indexOf(baseChord);
    if (index === -1) return chord; // Jika tidak ditemukan, kembalikan aslinya
    
    let newIndex = (index + steps + 12) % 12; // Hitung indeks baru
    return chords[newIndex] + suffix;
}

// Fungsi untuk mendeteksi chord dalam teks dan menandainya
function formatSongText(text) {
    return text.replace(/\b[A-G]#?(m|maj|min|dim|aug|sus|7|9|11|13|add)?\b/g, match => {
        return `<span class="chord">${match}</span>`;
    });
}

// Fungsi untuk mengganti semua chord tanpa merusak lirik
function transposeAllChords(steps) {
    const songText = document.getElementById("songText");
    songText.innerHTML = songText.innerHTML.replace(/<span class="chord">(.*?)<\/span>/g, (match, chord) => {
        return `<span class="chord">${transposeChord(chord, steps)}</span>`;
    });
}

// Event listener untuk tombol transpose
document.addEventListener("DOMContentLoaded", function () {
    const songText = document.getElementById("songText");

    // Format awal untuk mendeteksi chord
    songText.innerHTML = formatSongText(songText.innerHTML);

    document.getElementById("transposeUp").addEventListener("click", function () {
        transposeAllChords(1);
    });

    document.getElementById("transposeDown").addEventListener("click", function () {
        transposeAllChords(-1);
    });
});


// CHORD


