document.addEventListener("DOMContentLoaded", function() {
    let daftarIsi = document.querySelectorAll(".column");
    let transposeButtons = document.querySelector("footer.bawah");
    
    // Sembunyikan daftar isi dan tombol transpose saat halaman dimuat
    daftarIsi.forEach(el => el.style.display = "none");
    transposeButtons.style.display = "none";
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



// TRANSPOSEEEEEEEEEEEEEEEEEEEEE CHORDDDDDDDDDDDDDDDDDDDDDD

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
