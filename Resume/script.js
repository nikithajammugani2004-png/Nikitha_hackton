// Animate skill bars on page load
window.addEventListener("load", () => {
    const skills = document.querySelectorAll(".skill-fill");

    skills.forEach(skill => {
        const width = skill.getAttribute("data-width");
        skill.style.width = width;
    });
});