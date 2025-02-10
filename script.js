function cariLagu() {
    let input = document.getElementById('searchBar').value.toLowerCase();
    let items = document.querySelectorAll('ul li');

    items.forEach(item => {
        let text = item.textContent.toLowerCase();
        item.classList.toggle('hidden', !text.includes(input));
    });
}