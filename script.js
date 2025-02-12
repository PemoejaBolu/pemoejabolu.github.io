function cariLagu() {
    let input = document.getElementById('searchBar').value.toLowerCase();
    let items = document.querySelectorAll('ul li');

    items.forEach(item => {
        let text = item.textContent.toLowerCase();
        item.classList.toggle('hidden', !text.includes(input));
    });
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

