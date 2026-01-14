document.querySelectorAll(".project-card button").forEach(button => {
    button.addEventListener("click", () => {
        const project = button.dataset.project;

        alert(
            "Project: " + project + "\n\n" +
            "Here you can later add:\n" +
            "- Videos\n" +
            "- Screenshots\n" +
            "- GitHub links\n" +
            "- Roblox place links"
        );
    });
});


const grid = document.querySelector(".projects-grid");
const cards = Array.from(grid.children);

cards
    .sort((a, b) => new Date(b.dataset.date) - new Date(a.dataset.date))
    .forEach(card => grid.appendChild(card));
