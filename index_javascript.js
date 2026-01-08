const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let particles = [];
const mouse = { x: null, y: null, radius: 150 };

// 1. Initial Target Color is White (255, 255, 255)
let globalTargetColor = { r: 255, g: 255, b: 255 };

class Pixel {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2;
        
        // Random velocity for floating effect
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        
        // Spawn color: White
        this.r = 255;
        this.g = 255;
        this.b = 255;
    }

    update() {
        // Move pixels
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off screen edges
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

        // COLOR LERPING: Move current color toward globalTargetColor
        // 0.05 is the "Tween" speed. Lower is slower/smoother.
        this.r += (globalTargetColor.r - this.r) * 0.05;
        this.g += (globalTargetColor.g - this.g) * 0.05;
        this.b += (globalTargetColor.b - this.b) * 0.05;

        // Mouse Interaction: Grow when mouse is near
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            // Grows based on proximity
            this.size = 15 * (1 - distance / mouse.radius) + 2;
        } else {
            // Shrinks back to normal floating size
            if (this.size > 3) this.size -= 0.1;
        }
    }

    draw() {
        // Floor the numbers to keep them valid RGB values
        ctx.fillStyle = `rgb(${Math.floor(this.r)}, ${Math.floor(this.g)}, ${Math.floor(this.b)})`;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

// 2. SECTION COLORS: Matches the IDs in your HTML
const sectionColors = {
    'home': { r: 255, g: 255, b: 255 },      // White
    'about': { r: 255, g: 0, b: 122 },     // Neon Pink
    'projects': { r: 0, g: 209, b: 255 },  // Electric Blue
    'pricing': { r: 255, g: 165, b: 0 },   // Orange
    'contact': { r: 180, g: 100, b: 255 }  // Purple
};

// 3. SCROLL DETECTION: Changes globalTargetColor based on visible section
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const color = sectionColors[entry.target.id];
            if (color) {
                globalTargetColor = color;
            }
        }
    });
}, { threshold: 0.5 }); // Trigger when section is 50% on screen

// Watch all section elements
document.querySelectorAll('section').forEach(s => observer.observe(s));

// --- ENGINE SETUP ---

function init() {
    particles = [];
    const particleCount = 120;
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Pixel(Math.random() * canvas.width, Math.random() * canvas.height));
    }
}

function animate() {
    // Semi-transparent background creates a faint trail effect
    ctx.fillStyle = 'rgba(26, 26, 26, 0.4)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animate);
}

// --- EVENT LISTENERS ---

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

// Click "Speed Boost" (Like an explosion without spawning new parts)
window.addEventListener('mousedown', () => {
    particles.forEach(p => { p.vx *= 4; p.vy *= 4; });
});

window.addEventListener('mouseup', () => {
    setTimeout(() => {
        particles.forEach(p => { p.vx /= 4; p.vy /= 4; });
    }, 200);
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init(); // Respawn particles to fit new screen size
});

// Start the engine
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
init();
animate();


//Typewriter effect
const words = [
    "Roblox Scripter",
    "Programmer",
    "Software Engineering Student",
    "Continuous Learner",
    "Focused on Improvement",
    "Open to Free Commissions (For Now)"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

const typingSpeed = 90;
const deletingSpeed = 50;
const holdDelay = 1200;

const el = document.getElementById("typewriter");

function typewriter() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
        el.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentWord.length) {
            setTimeout(() => (isDeleting = true), holdDelay);
        }
    } else {
        el.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }

    setTimeout(
        typewriter,
        isDeleting ? deletingSpeed : typingSpeed
    );
}

typewriter();
