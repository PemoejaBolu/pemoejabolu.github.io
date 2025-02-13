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
                targetElement.style.backgroundColor = "yellow";
                setTimeout(() => {
                    targetElement.style.backgroundColor = "transparent";
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
