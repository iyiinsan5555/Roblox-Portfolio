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
