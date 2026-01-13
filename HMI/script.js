/**
 * ================================================================
 *   Human Machine Interaction (HMI) Lab - Interactive Logic
 * ================================================================
 *   Author: Amey Thakur
 *   GitHub: https://github.com/Amey-Thakur
 *   Course: Human Machine Interaction (HMI) Lab
 *   Roll No: 50
 *   Batch: B3
 *   Repository: https://github.com/Amey-Thakur/HUMAN-MACHINE-INTERACTION-AND-HUMAN-MACHINE-INTERACTION-LAB
 *   License: CC BY 4.0
 * ================================================================
 */

// =========================================
//   CONSOLE EASTER EGG 🥚
// =========================================
console.log(
    "%c🖱️ HMI Lab Portfolio",
    "font-size: 28px; font-weight: bold; color: #2563eb; text-shadow: 2px 2px 0 #0f172a;"
);
console.log(
    "%c👋 Hey developer! Checking the interactions?",
    "font-size: 14px; color: #64748b;"
);
console.log(
    "%c🔗 https://github.com/Amey-Thakur/HUMAN-MACHINE-INTERACTION-AND-HUMAN-MACHINE-INTERACTION-LAB",
    "font-size: 12px; color: #2563eb;"
);
console.log(
    "%c⚠️ This portfolio is protected. Please respect the author's work!",
    "font-size: 12px; color: #f59e0b; font-weight: bold;"
);

// =========================================
//   SECURITY FEATURES 🔒
// =========================================

// 1. Disable Right Click (Context Menu)
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
}, false);

// 2. Disable Text Selection (Strict)
document.onselectstart = function () {
    return false;
};

// 3. Disable Keyboard Shortcuts (F12, Ctrl+U, etc.)
document.addEventListener('keydown', (e) => {
    // F12 key
    if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        return false;
    }

    // Ctrl+Shift+I/J/C
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C' || e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) {
        e.preventDefault();
        return false;
    }

    // Ctrl+U (View Source)
    if (e.ctrlKey && (e.key === 'U' || e.keyCode === 85)) {
        e.preventDefault();
        return false;
    }

    // Ctrl+S (Save Page)
    if (e.ctrlKey && (e.key === 'S' || e.keyCode === 83)) {
        e.preventDefault();
        return false;
    }

    // Ctrl+P (Print)
    if (e.ctrlKey && (e.key === 'P' || e.keyCode === 80)) {
        e.preventDefault();
        return false;
    }
}, false);

// 4. Disable Dragging Images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });
});


// =========================================
//   CORE UI LOGIC
// =========================================

const toggleBtn = document.getElementById('theme-toggle');
const themeIcon = toggleBtn ? toggleBtn.querySelector('i') : null;
const htmlElement = document.documentElement;
const backToTopBtn = document.getElementById("btn-back-to-top");

// --- Back to Top Logic ---
if (backToTopBtn) {
    window.onscroll = function () {
        scrollFunction();
    };

    backToTopBtn.addEventListener("click", backToTop);
}

function scrollFunction() {
    if (!backToTopBtn) return;
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        backToTopBtn.style.display = "flex";
    } else {
        backToTopBtn.style.display = "none";
    }
}

function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

// --- Theme Toggle Logic ---
if (toggleBtn) {
    const savedTheme = localStorage.getItem('theme') || 'light';
    htmlElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);

    toggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });
}

function updateIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// =========================================
//   COMMAND PALETTE LOGIC ⌘
// =========================================
const cmdOverlay = document.getElementById('cmd-overlay');
const cmdInput = document.getElementById('cmd-input');
const cmdResults = document.getElementById('cmd-results');
const kbdHint = document.getElementById('kbd-hint');

// Search Data
const searchItems = [
    { title: 'Math Sprint Game (Exp 2)', url: 'HMI-2/index.html', icon: 'fas fa-calculator', type: 'Experiment' },
    { title: 'Registration Interface (Exp 3)', url: 'HMI-3/form.html', icon: 'fas fa-file-signature', type: 'Experiment' },
    { title: 'ATVM Simulator (Exp 4)', url: 'HMI-4/index.html', icon: 'fas fa-subway', type: 'Experiment' },
    { title: 'Cloud Services Portal (Exp 6)', url: 'HMI-6/index.html', icon: 'fas fa-cloud-upload-alt', type: 'Experiment' },
    { title: 'HMI Repository', url: 'https://github.com/Amey-Thakur/HUMAN-MACHINE-INTERACTION-AND-HUMAN-MACHINE-INTERACTION-LAB', icon: 'fab fa-github', type: 'Link' },
    { title: 'Amey Thakur Profile', url: 'https://github.com/Amey-Thakur', icon: 'fas fa-user-graduate', type: 'Link' },
    { title: 'Toggle Theme', action: 'toggleTheme', icon: 'fas fa-adjust', type: 'Action' },
];

// Open/Close Handlers
document.addEventListener('keydown', (e) => {
    // Toggle Theme (Shift + T)
    if (e.key.toLowerCase() === 't' && e.shiftKey && !e.ctrlKey && !e.metaKey && document.activeElement.tagName !== 'INPUT') {
        const toggleBtn = document.getElementById('theme-toggle');
        if (toggleBtn) toggleBtn.click();
    }

    // Ctrl+K to Open
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openCmd();
    }
    // Esc to Close
    if (e.key === 'Escape') {
        closeCmd();
    }
});

// Click outside to close
if (cmdOverlay) {
    cmdOverlay.addEventListener('click', (e) => {
        if (e.target === cmdOverlay) {
            closeCmd();
        }
    });

    // Populate Initial Results
    renderResults(searchItems);

    // Filter Logic
    cmdInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filtered = searchItems.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.type.toLowerCase().includes(query)
        );
        renderResults(filtered);
    });
}

function openCmd() {
    if (!cmdOverlay) return;
    cmdOverlay.classList.add('active');
    cmdInput.value = '';
    renderResults(searchItems);
    setTimeout(() => cmdInput.focus(), 100);
}

function closeCmd() {
    if (!cmdOverlay) return;
    cmdOverlay.classList.remove('active');
}

function renderResults(items) {
    if (!cmdResults) return;
    cmdResults.innerHTML = '';

    if (items.length === 0) {
        cmdResults.innerHTML = '<div class="cmd-item" style="cursor:default; color:var(--text-secondary);">No results found</div>';
        return;
    }

    items.forEach(item => {
        const el = document.createElement('div');
        el.className = 'cmd-item';
        el.setAttribute('role', 'button');

        el.addEventListener('click', () => {
            if (item.action === 'toggleTheme') {
                const toggleBtn = document.getElementById('theme-toggle');
                if (toggleBtn) toggleBtn.click();
            } else if (item.url.startsWith('http')) {
                window.open(item.url, '_blank');
            } else {
                window.location.href = item.url;
            }
            closeCmd();
        });

        // Icon
        const iconDiv = document.createElement('div');
        iconDiv.className = 'cmd-item-icon';
        iconDiv.innerHTML = `<i class="${item.icon}"></i>`;

        // Text
        const textDiv = document.createElement('div');
        textDiv.className = 'cmd-item-text';
        textDiv.textContent = item.title;

        // Type Badge
        const typeDiv = document.createElement('div');
        typeDiv.className = 'cmd-item-type';
        typeDiv.textContent = item.type;

        el.appendChild(iconDiv);
        el.appendChild(textDiv);
        el.appendChild(typeDiv);

        cmdResults.appendChild(el);
    });
}

// Auto-hide keyboard hint after 8 seconds (gave user more time)
setTimeout(() => {
    if (kbdHint) {
        kbdHint.classList.add('hidden');
        // Remove from DOM after transition
        setTimeout(() => kbdHint.remove(), 600);
    }
}, 8000);

// =========================================
//   STATS COUNTER ANIMATION
// =========================================
const stats = document.querySelectorAll('.stat-number');
let hasAnimated = false;

function animateStats() {
    if (hasAnimated) return;

    const statsContainer = document.querySelector('.stats-container');
    if (!statsContainer) return;

    const sectionTop = statsContainer.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 50) {
        stats.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const suffix = stat.getAttribute('data-suffix') || '';
            const increment = target / 50; // Speed of animation

            let current = 0;
            const updateCount = () => {
                if (current < target) {
                    current = Math.ceil(current + increment);
                    if (current > target) current = target;
                    stat.innerText = current + suffix;
                    setTimeout(updateCount, 30);
                } else {
                    stat.innerText = target + suffix;
                }
            };
            updateCount();
        });
        hasAnimated = true;
    }
}

window.addEventListener('scroll', animateStats);
animateStats(); // Trigger once on load

// =========================================
//   SCROLL REVEAL ANIMATIONS
// =========================================
function reveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', reveal);
reveal(); // Trigger once on load

