const spotlight = document.getElementById("spotlight");

document.addEventListener("mousemove", (e) => {
    const x = e.clientX;
    const y = e.clientY;

    spotlight.style.background = `
        radial-gradient(
            circle 120px at ${x}px ${y}px,
            transparent 0px,
            transparent 120px,
            black 121px
        )
    `;
});