const lanterna = document.getElementById('lanterna');

document.addEventListener('mousemove', (e) => {
    const x = e.pageX;
    const y = e.pageY;
    
    lanterna.style.background = `radial-gradient(circle 150px at ${x}px ${y}px, transparent 0%, rgba(0, 0, 0, 0.95) 100%)`;
});

