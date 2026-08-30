const grid = document.querySelector(".projects-grid");
const cards = Array.from(grid.children);

cards
    .sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date))
    .forEach(card => grid.appendChild(card));
