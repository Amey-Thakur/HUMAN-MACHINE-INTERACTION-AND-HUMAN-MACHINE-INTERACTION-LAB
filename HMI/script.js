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

// =========================================
//   SERVICE WORKER REGISTRATION
// =========================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then((registration) => {
                console.log('✅ Service Worker registered:', registration.scope);
            })
            .catch((error) => {
                console.log('❌ Service Worker registration failed:', error);
            });
    });
}

// =========================================
//   PWA INSTALL PROMPT
// =========================================
let deferredPrompt;
const pwaInstallBtn = document.getElementById('pwa-install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    if (pwaInstallBtn) {
        pwaInstallBtn.style.display = 'flex';
    }
});

if (pwaInstallBtn) {
    pwaInstallBtn.addEventListener('click', async () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            console.log(`PWA Install: ${outcome}`);
            deferredPrompt = null;
            pwaInstallBtn.style.display = 'none';
        }
    });
}

window.addEventListener('appinstalled', () => {
    console.log('✅ PWA installed successfully');
    if (pwaInstallBtn) {
        pwaInstallBtn.style.display = 'none';
    }
});

// =========================================
//   SHARE FUNCTIONALITY
// =========================================
const shareBtn = document.getElementById('share-btn');

if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
        const shareData = {
            title: 'HMI Lab Portfolio — Amey Thakur & Mega Satish',
            text: 'HMI Lab Portfolio — Amey Thakur & Mega Satish',
            url: window.location.href
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
                console.log('✅ Shared successfully');
            } else {
                // Fallback: Copy to clipboard
                await navigator.clipboard.writeText(window.location.href);
                alert('Link copied to clipboard!');
            }
        } catch (error) {
            console.log('Share error:', error);
        }
    });
}

// =========================================
//   INTERACTIVE CHESS GAME
// =========================================
(function initChessGame() {
    const boardEl = document.getElementById('chessboard');
    if (!boardEl) return;

    // Chess piece Unicode symbols
    const PIECES = {
        K: '♔', Q: '♕', R: '♖', B: '♗', N: '♘', P: '♙',
        k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟'
    };

    // Initial board state (FEN-like)
    const INITIAL_BOARD = [
        ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['', '', '', '', '', '', '', ''],
        ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
        ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
    ];

    let board = JSON.parse(JSON.stringify(INITIAL_BOARD));
    let currentTurn = 'white';
    let selectedSquare = null;
    let validMoves = [];
    let moveHistory = [];
    let capturedWhite = [];
    let capturedBlack = [];
    let lastMove = null;
    let soundEnabled = true;
    let gameOver = false;
    let gameMode = 'ai'; // 'ai' or '2p' - default to AI mode
    let playerColor = 'white'; // Player's color when playing vs AI
    let undoStack = []; // Store board states for undo
    let redoStack = []; // Store board states for redo

    // Piece values for AI evaluation
    const PIECE_VALUES = { p: 10, n: 30, b: 30, r: 50, q: 90, k: 900 };

    // Piece-Square Tables (PST) - higher means better positional advantage
    const PST = {
        p: [[0, 0, 0, 0, 0, 0, 0, 0], [50, 50, 50, 50, 50, 50, 50, 50], [10, 10, 20, 30, 30, 20, 10, 10], [5, 5, 10, 25, 25, 10, 5, 5], [0, 0, 0, 20, 20, 0, 0, 0], [5, -5, -10, 0, 0, -10, -5, 5], [5, 10, 10, -20, -20, 10, 10, 5], [0, 0, 0, 0, 0, 0, 0, 0]],
        n: [[-50, -40, -30, -30, -30, -30, -40, -50], [-40, -20, 0, 0, 0, 0, -20, -40], [-30, 0, 10, 15, 15, 10, 0, -30], [-30, 5, 15, 20, 20, 15, 5, -30], [-30, 0, 15, 20, 20, 15, 0, -30], [-30, 5, 10, 15, 15, 10, 5, -30], [-40, -20, 0, 5, 5, 0, -20, -40], [-50, -40, -30, -30, -30, -30, -40, -50]],
        b: [[-20, -10, -10, -10, -10, -10, -10, -20], [-10, 0, 0, 0, 0, 0, 0, -10], [-10, 0, 5, 10, 10, 5, 0, -10], [-10, 5, 5, 10, 10, 5, 5, -10], [-10, 0, 10, 10, 10, 10, 0, -10], [-10, 10, 10, 10, 10, 10, 10, -10], [-10, 5, 0, 0, 0, 0, 5, -10], [-20, -10, -10, -10, -10, -10, -10, -20]],
        r: [[0, 0, 0, 0, 0, 0, 0, 0], [5, 10, 10, 10, 10, 10, 10, 5], [-5, 0, 0, 0, 0, 0, 0, -5], [-5, 0, 0, 0, 0, 0, 0, -5], [-5, 0, 0, 0, 0, 0, 0, -5], [-5, 0, 0, 0, 0, 0, 0, -5], [-5, 0, 0, 0, 0, 0, 0, -5], [0, 0, 0, 5, 5, 0, 0, 0]],
        q: [[-20, -10, -10, -5, -5, -10, -10, -20], [-10, 0, 0, 0, 0, 0, 0, -10], [-10, 0, 5, 5, 5, 5, 0, -10], [-5, 0, 5, 5, 5, 5, 0, -5], [0, 0, 5, 5, 5, 5, 0, -5], [-10, 5, 5, 5, 5, 5, 0, -10], [-10, 0, 5, 0, 0, 0, 0, -10], [-20, -10, -10, -5, -5, -10, -10, -20]],
        k: [[-30, -40, -40, -50, -50, -40, -40, -30], [-30, -40, -40, -50, -50, -40, -40, -30], [-30, -40, -40, -50, -50, -40, -40, -30], [-30, -40, -40, -50, -50, -40, -40, -30], [-20, -30, -30, -40, -40, -30, -30, -20], [-10, -20, -20, -20, -20, -20, -20, -10], [20, 20, 0, 0, 0, 0, 20, 20], [20, 30, 10, 0, 0, 10, 30, 20]]
    };

    // Audio Context for sounds
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    function fireConfetti() {
        console.log("🎊 [HMI] Preparing robust confetti celebration...");

        // Ensure we find the library
        const confLib = window.confetti;
        if (typeof confLib !== 'function') {
            console.error("❌ [HMI] Confetti library not found!");
            return;
        }

        // Create a dedicated canvas for confetti to guarantee visibility
        const canvas = document.createElement('canvas');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '999999';
        canvas.style.pointerEvents = 'none';
        document.body.appendChild(canvas);

        const myConfetti = confLib.create(canvas, {
            resize: true,
            useWorker: false
        });

        // Fire multiple bursts
        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            zIndex: 999999
        };

        function fire(particleRatio, opts) {
            myConfetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        console.log("🚀 [HMI] Launching confetti bursts!");

        // Immediate burst
        fire(0.25, { spread: 26, startVelocity: 55 });
        fire(0.2, { spread: 60 });
        fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
        fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
        fire(0.1, { spread: 120, startVelocity: 45 });

        // Side bursts
        setTimeout(() => {
            myConfetti({ ...defaults, particleCount: 100, spread: 70, origin: { x: 0.1, y: 0.6 } });
            myConfetti({ ...defaults, particleCount: 100, spread: 70, origin: { x: 0.9, y: 0.6 } });
        }, 300);

        // Cleanup canvas after animation
        setTimeout(() => {
            document.body.removeChild(canvas);
        }, 6000);
    }

    function playSound(type) {
        if (!soundEnabled) return;
        if (audioCtx.state === 'suspended') audioCtx.resume();

        const now = audioCtx.currentTime;

        if (type === 'move') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.type = 'sine';
            osc.frequency.setValueAtTime(600, now);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        } else if (type === 'capture') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(300, now);
            osc.frequency.exponentialRampToValueAtTime(150, now + 0.15);
            gain.gain.setValueAtTime(0.15, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
            osc.start(now);
            osc.stop(now + 0.15);
        } else if (type === 'check') {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(800, now);
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);

            // Second tone for dissonance
            const osc2 = audioCtx.createOscillator();
            const gain2 = audioCtx.createGain();
            osc2.connect(gain2);
            gain2.connect(audioCtx.destination);
            osc2.type = 'sawtooth';
            osc2.frequency.setValueAtTime(750, now); // Dissonant interval
            gain2.gain.setValueAtTime(0.1, now);
            gain2.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc2.start(now);
            osc2.stop(now + 0.3);

        } else if (type === 'win') {
            // Major Triad Arpeggio (C Major)
            const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
            notes.forEach((freq, i) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.connect(gain);
                gain.connect(audioCtx.destination);

                osc.type = 'triangle';
                osc.frequency.value = freq;

                const startTime = now + (i * 0.15);
                const duration = 0.3;

                gain.gain.setValueAtTime(0, startTime);
                gain.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

                osc.start(startTime);
                osc.stop(startTime + duration);
            });
        }
    }

    function isWhite(piece) {
        return piece && piece === piece.toUpperCase();
    }

    function isBlack(piece) {
        return piece && piece === piece.toLowerCase();
    }

    function isCurrentPlayerPiece(piece) {
        return currentTurn === 'white' ? isWhite(piece) : isBlack(piece);
    }

    function getValidMoves(row, col) {
        const piece = board[row][col];
        if (!piece) return [];

        const moves = [];
        const type = piece.toLowerCase();
        const isW = isWhite(piece);
        const dir = isW ? -1 : 1;

        // Helper to add move if valid
        const addMove = (r, c, capture = false) => {
            if (r >= 0 && r < 8 && c >= 0 && c < 8) {
                const target = board[r][c];
                if (!target || (capture && (isW ? isBlack(target) : isWhite(target)))) {
                    moves.push({ row: r, col: c, capture: !!target });
                }
            }
        };

        // Pawn moves
        if (type === 'p') {
            const startRow = isW ? 6 : 1;
            // Forward
            if (!board[row + dir]?.[col]) {
                moves.push({ row: row + dir, col, capture: false });
                // Double move from start
                if (row === startRow && !board[row + dir * 2]?.[col]) {
                    moves.push({ row: row + dir * 2, col, capture: false });
                }
            }
            // Captures
            [-1, 1].forEach(dc => {
                const nr = row + dir, nc = col + dc;
                if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
                    const target = board[nr][nc];
                    if (target && (isW ? isBlack(target) : isWhite(target))) {
                        moves.push({ row: nr, col: nc, capture: true });
                    }
                }
            });
        }

        // Knight moves
        if (type === 'n') {
            [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]].forEach(([dr, dc]) => {
                const nr = row + dr, nc = col + dc;
                if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
                    const target = board[nr][nc];
                    if (!target || (isW ? isBlack(target) : isWhite(target))) {
                        moves.push({ row: nr, col: nc, capture: !!target });
                    }
                }
            });
        }

        // Rook moves (+ Queen)
        if (type === 'r' || type === 'q') {
            [[0, 1], [0, -1], [1, 0], [-1, 0]].forEach(([dr, dc]) => {
                for (let i = 1; i < 8; i++) {
                    const nr = row + dr * i, nc = col + dc * i;
                    if (nr < 0 || nr >= 8 || nc < 0 || nc >= 8) break;
                    const target = board[nr][nc];
                    if (!target) {
                        moves.push({ row: nr, col: nc, capture: false });
                    } else if (isW ? isBlack(target) : isWhite(target)) {
                        moves.push({ row: nr, col: nc, capture: true });
                        break;
                    } else break;
                }
            });
        }

        // Bishop moves (+ Queen)
        if (type === 'b' || type === 'q') {
            [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([dr, dc]) => {
                for (let i = 1; i < 8; i++) {
                    const nr = row + dr * i, nc = col + dc * i;
                    if (nr < 0 || nr >= 8 || nc < 0 || nc >= 8) break;
                    const target = board[nr][nc];
                    if (!target) {
                        moves.push({ row: nr, col: nc, capture: false });
                    } else if (isW ? isBlack(target) : isWhite(target)) {
                        moves.push({ row: nr, col: nc, capture: true });
                        break;
                    } else break;
                }
            });
        }

        // King moves
        if (type === 'k') {
            [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([dr, dc]) => {
                const nr = row + dr, nc = col + dc;
                if (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
                    const target = board[nr][nc];
                    if (!target || (isW ? isBlack(target) : isWhite(target))) {
                        moves.push({ row: nr, col: nc, capture: !!target });
                    }
                }
            });
        }

        return moves;
    }

    function getLegalMoves(row, col) {
        const piece = board[row][col];
        if (!piece) return [];

        const isW = isWhite(piece);
        const pseudoMoves = getValidMoves(row, col);

        return pseudoMoves.filter(move => {
            // 1. Explicitly check if move captures a king (Never allowed in chess)
            const target = board[move.row][move.col];
            if (target && target.toLowerCase() === 'k') return false;

            // 2. Simulate move to see if own king is in check
            const backup = board[move.row][move.col];
            const orig = board[row][col];

            board[move.row][move.col] = orig;
            board[row][col] = '';

            const resultsInCheck = isKingInCheck(isW);

            // Restore
            board[row][col] = orig;
            board[move.row][move.col] = backup;

            return !resultsInCheck;
        });
    }

    function findKing(isWhiteKing) {
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                if (board[r][c] === (isWhiteKing ? 'K' : 'k')) {
                    return { row: r, col: c };
                }
            }
        }
        return null;
    }

    function isKingInCheck(isWhiteKing) {
        const king = findKing(isWhiteKing);
        if (!king) return false;

        // Check if any opponent piece can attack the king
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = board[r][c];
                if (piece && (isWhiteKing ? isBlack(piece) : isWhite(piece))) {
                    // Important: uses pseudo-move generation to check if king square is attacked
                    const moves = getValidMoves(r, c);
                    if (moves.some(m => m.row === king.row && m.col === king.col)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function renderBoard() {
        boardEl.innerHTML = '';
        const inCheck = isKingInCheck(currentTurn === 'white');
        const kingPos = findKing(currentTurn === 'white');

        // Flip board when playing as black
        const flipBoard = playerColor === 'black' && gameMode === 'ai';

        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                // Calculate actual board position (flipped if playing as black)
                const displayRow = flipBoard ? 7 - r : r;
                const displayCol = flipBoard ? 7 - c : c;

                const square = document.createElement('div');
                square.className = `chess-square ${(displayRow + displayCol) % 2 === 0 ? 'light' : 'dark'}`;
                square.dataset.row = displayRow;
                square.dataset.col = displayCol;

                const piece = board[displayRow][displayCol];
                if (piece) {
                    const pieceSpan = document.createElement('span');
                    pieceSpan.className = 'piece';
                    pieceSpan.textContent = PIECES[piece];
                    pieceSpan.dataset.piece = piece; // Store original key (e.g., 'K', 'p')

                    // Add cursor pointer for player's pieces
                    if (isCurrentPlayerPiece(piece) && !gameOver) {
                        pieceSpan.style.cursor = 'pointer';
                    }

                    // Add animation to the piece that just moved
                    if (lastMove && lastMove.to.row === displayRow && lastMove.to.col === displayCol) {
                        pieceSpan.classList.add('piece-animate');
                    }

                    square.appendChild(pieceSpan);
                }

                // Selection highlight
                if (selectedSquare && selectedSquare.row === displayRow && selectedSquare.col === displayCol) {
                    square.classList.add('selected');
                }

                // Valid move indicators
                const validMove = validMoves.find(m => m.row === displayRow && m.col === displayCol);
                if (validMove) {
                    square.classList.add(validMove.capture ? 'valid-capture' : 'valid-move');
                }

                // Last move highlight
                if (lastMove && ((lastMove.from.row === displayRow && lastMove.from.col === displayCol) ||
                    (lastMove.to.row === displayRow && lastMove.to.col === displayCol))) {
                    square.classList.add('last-move');
                }

                // Check highlight
                if (inCheck && kingPos && kingPos.row === displayRow && kingPos.col === displayCol) {
                    square.classList.add('check');
                }

                square.addEventListener('click', () => handleSquareClick(displayRow, displayCol));
                boardEl.appendChild(square);
            }
        }

        // Update turn indicator
        const turnDot = document.getElementById('turn-dot');
        const turnText = document.getElementById('turn-text');
        if (turnDot) turnDot.className = `turn-dot ${currentTurn}`;
        if (turnText) turnText.textContent = `${currentTurn === 'white' ? "White's" : "Black's"} Turn`;

        // Update game status
        updateGameStatus();
    }

    function hasLegalMoves(isWhiteTurn) {
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = board[r][c];
                if (piece && (isWhiteTurn ? isWhite(piece) : isBlack(piece))) {
                    const moves = getLegalMoves(r, c);
                    if (moves.length > 0) return true;
                }
            }
        }
        return false;
    }

    function updateGameStatus() {
        const statusEl = document.getElementById('game-status');
        if (!statusEl) return;

        const inCheck = isKingInCheck(currentTurn === 'white');
        const hasLegal = hasLegalMoves(currentTurn === 'white');

        if (!hasLegal) {
            if (inCheck) {
                statusEl.textContent = `Checkmate! ${currentTurn === 'white' ? 'Black' : 'White'} wins! 🎉`;
                statusEl.className = 'game-status checkmate';
                gameOver = true;
                // Trigger confetti and sound
                fireConfetti();
                playSound('win');
            } else {
                statusEl.textContent = 'Stalemate! Draw.';
                statusEl.className = 'game-status';
                gameOver = true;
            }
        } else if (inCheck) {
            statusEl.textContent = 'Check!';
            statusEl.className = 'game-status';
            playSound('check');
        } else {
            statusEl.textContent = '';
            statusEl.className = 'game-status';
        }
    }

    function handleSquareClick(row, col) {
        if (gameOver) return;

        const piece = board[row][col];

        // If a piece is already selected
        if (selectedSquare) {
            const move = validMoves.find(m => m.row === row && m.col === col);

            if (move) {
                // Save current state before move (for undo)
                undoStack.push({
                    board: JSON.parse(JSON.stringify(board)),
                    currentTurn: currentTurn,
                    moveHistory: [...moveHistory],
                    capturedWhite: [...capturedWhite],
                    capturedBlack: [...capturedBlack],
                    lastMove: lastMove
                });
                redoStack = []; // Clear redo stack on new move

                // Execute move
                const movingPiece = board[selectedSquare.row][selectedSquare.col];
                const capturedPiece = board[row][col];

                // Handle capture
                if (capturedPiece) {
                    if (isWhite(capturedPiece)) {
                        capturedBlack.push(capturedPiece);
                    } else {
                        capturedWhite.push(capturedPiece);
                    }
                    playSound('capture');
                } else {
                    playSound('move');
                }

                // Move piece
                board[row][col] = movingPiece;
                board[selectedSquare.row][selectedSquare.col] = '';

                // Pawn promotion (auto-promote to Queen)
                if (movingPiece.toLowerCase() === 'p' && (row === 0 || row === 7)) {
                    board[row][col] = isWhite(movingPiece) ? 'Q' : 'q';
                }

                // Record move
                lastMove = { from: { row: selectedSquare.row, col: selectedSquare.col }, to: { row, col } };
                const notation = getNotation(selectedSquare.row, selectedSquare.col, row, col, movingPiece, !!capturedPiece);
                moveHistory.push({ turn: currentTurn, notation });

                // Switch turn
                currentTurn = currentTurn === 'white' ? 'black' : 'white';
                selectedSquare = null;
                validMoves = [];

                renderBoard();
                updateMoveHistory();
                updateCapturedPieces();

                // Trigger AI move if in AI mode and it's AI's turn
                if (gameMode === 'ai' && currentTurn !== playerColor && !gameOver) {
                    setTimeout(makeAIMove, 500);
                }
            } else if (isCurrentPlayerPiece(piece)) {
                // Select different piece
                selectedSquare = { row, col };
                validMoves = getLegalMoves(row, col);
                renderBoard();
            } else {
                // Deselect
                selectedSquare = null;
                validMoves = [];
                renderBoard();
            }
        } else if (isCurrentPlayerPiece(piece)) {
            // Select piece
            selectedSquare = { row, col };
            validMoves = getLegalMoves(row, col);
            renderBoard();
        }
    }

    function getNotation(fromR, fromC, toR, toC, piece, isCapture) {
        const files = 'abcdefgh';
        const ranks = '87654321';
        const p = piece.toLowerCase() === 'p' ? '' : piece.toUpperCase();
        const cap = isCapture ? 'x' : '';
        return `${p}${files[fromC]}${ranks[fromR]}${cap}${files[toC]}${ranks[toR]}`;
    }

    function updateMoveHistory() {
        const historyEl = document.getElementById('move-history');
        if (!historyEl) return;

        historyEl.innerHTML = '';
        for (let i = 0; i < moveHistory.length; i += 2) {
            const moveNum = Math.floor(i / 2) + 1;
            const white = moveHistory[i]?.notation || '';
            const black = moveHistory[i + 1]?.notation || '';
            const entry = document.createElement('div');
            entry.className = 'move-entry';
            entry.innerHTML = `<span class="move-number">${moveNum}.</span><span>${white}</span><span>${black}</span>`;
            historyEl.appendChild(entry);
        }
        historyEl.scrollTop = historyEl.scrollHeight;
    }

    function updateCapturedPieces() {
        const whiteEl = document.getElementById('white-captured');
        const blackEl = document.getElementById('black-captured');

        if (whiteEl) whiteEl.textContent = capturedWhite.map(p => PIECES[p]).join('');
        if (blackEl) blackEl.textContent = capturedBlack.map(p => PIECES[p]).join('');
    }

    function newGame() {
        board = JSON.parse(JSON.stringify(INITIAL_BOARD));
        currentTurn = 'white';
        selectedSquare = null;
        validMoves = [];
        moveHistory = [];
        capturedWhite = [];
        capturedBlack = [];
        lastMove = null;
        gameOver = false;

        renderBoard();
        updateMoveHistory();
        updateCapturedPieces();

        const statusEl = document.getElementById('game-status');
        if (statusEl) {
            statusEl.textContent = '';
            statusEl.className = 'game-status';
        }
        undoStack = [];
        redoStack = [];
    }

    // Undo Move Function
    function undoMove() {
        if (undoStack.length === 0 || gameOver) return;

        // Save current state to redo stack
        redoStack.push({
            board: JSON.parse(JSON.stringify(board)),
            currentTurn: currentTurn,
            moveHistory: [...moveHistory],
            capturedWhite: [...capturedWhite],
            capturedBlack: [...capturedBlack],
            lastMove: lastMove
        });

        // Restore previous state
        const prevState = undoStack.pop();
        board = JSON.parse(JSON.stringify(prevState.board));
        currentTurn = prevState.currentTurn;
        moveHistory = [...prevState.moveHistory];
        capturedWhite = [...prevState.capturedWhite];
        capturedBlack = [...prevState.capturedBlack];
        lastMove = prevState.lastMove;
        selectedSquare = null;
        validMoves = [];

        renderBoard();
        updateMoveHistory();
        updateCapturedPieces();
        playSound('move');
    }

    // Redo Move Function
    function redoMove() {
        if (redoStack.length === 0 || gameOver) return;

        // Save current state to undo stack
        undoStack.push({
            board: JSON.parse(JSON.stringify(board)),
            currentTurn: currentTurn,
            moveHistory: [...moveHistory],
            capturedWhite: [...capturedWhite],
            capturedBlack: [...capturedBlack],
            lastMove: lastMove
        });

        // Restore next state
        const nextState = redoStack.pop();
        board = JSON.parse(JSON.stringify(nextState.board));
        currentTurn = nextState.currentTurn;
        moveHistory = [...nextState.moveHistory];
        capturedWhite = [...nextState.capturedWhite];
        capturedBlack = [...nextState.capturedBlack];
        lastMove = nextState.lastMove;
        selectedSquare = null;
        validMoves = [];

        renderBoard();
        updateMoveHistory();
        updateCapturedPieces();
        playSound('move');
    }

    // AI Move Logic
    function evaluateBoard() {
        let totalScore = 0;
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = board[r][c];
                if (piece) {
                    const type = piece.toLowerCase();
                    const isWhitePiece = isWhite(piece);

                    // Base material score
                    let score = PIECE_VALUES[type] || 0;

                    // Positional score from PST
                    // For black pieces, flip the table row
                    const table = PST[type];
                    if (table) {
                        const tableRow = isWhitePiece ? 7 - r : r;
                        score += table[tableRow][c] / 10; // Normalized bonus
                    }

                    totalScore += isWhitePiece ? -score : score;
                }
            }
        }
        return totalScore;
    }

    function minimax(depth, isMaximizing, alpha, beta) {
        if (depth === 0) return evaluateBoard();

        const moves = getAllMoves(!isMaximizing);
        if (moves.length === 0) {
            if (isKingInCheck(!isMaximizing)) return isMaximizing ? -Infinity : Infinity;
            return 0; // Draw
        }

        // Add variety to equal quality moves
        moves.sort(() => Math.random() - 0.5);

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (const move of moves) {
                const backup = board[move.to.row][move.to.col];
                const orig = board[move.from.row][move.from.col];
                board[move.to.row][move.to.col] = orig;
                board[move.from.row][move.from.col] = '';

                const score = minimax(depth - 1, false, alpha, beta);

                board[move.from.row][move.from.col] = orig;
                board[move.to.row][move.to.col] = backup;

                bestScore = Math.max(bestScore, score);
                alpha = Math.max(alpha, bestScore);
                if (beta <= alpha) break;
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (const move of moves) {
                const backup = board[move.to.row][move.to.col];
                const orig = board[move.from.row][move.from.col];
                board[move.to.row][move.to.col] = orig;
                board[move.from.row][move.from.col] = '';

                const score = minimax(depth - 1, true, alpha, beta);

                board[move.from.row][move.from.col] = orig;
                board[move.to.row][move.to.col] = backup;

                bestScore = Math.min(bestScore, score);
                beta = Math.min(beta, bestScore);
                if (beta <= alpha) break;
            }
            return bestScore;
        }
    }

    function getAllMoves(forWhite) {
        const moves = [];
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = board[r][c];
                if (piece && (forWhite ? isWhite(piece) : isBlack(piece))) {
                    const pieceMoves = getLegalMoves(r, c);
                    pieceMoves.forEach(m => {
                        moves.push({ from: { row: r, col: c }, to: m });
                    });
                }
            }
        }
        return moves;
    }

    function makeAIMove() {
        const aiColor = playerColor === 'white' ? 'black' : 'white';
        if (gameOver || currentTurn !== aiColor || gameMode !== 'ai') return;

        // Simple AI: Pick best move based on material evaluation
        const aiPlaysWhite = aiColor === 'white';
        const moves = getAllMoves(aiPlaysWhite);
        if (moves.length === 0) return;

        // Shuffle moves to prevent repetitive patterns and make game feel more "alive"
        moves.sort(() => Math.random() - 0.5);

        let bestMove = null;
        let bestScore = aiPlaysWhite ? Infinity : -Infinity;

        // Alpha-Beta Search at depth 2
        for (const move of moves) {
            const backup = board[move.to.row][move.to.col];
            const orig = board[move.from.row][move.from.col];

            board[move.to.row][move.to.col] = orig;
            board[move.from.row][move.from.col] = '';

            // Evaluate move using Minimax depth 2
            // Since minimax returns evaluation from board perspective (Black positive),
            // AI wants to maximize this if it's Black, and minimize it if it's White.
            let score = minimax(1, !aiPlaysWhite, -Infinity, Infinity);

            if (aiPlaysWhite) {
                // White AI wants to MINIMIZE totalScore
                if (bestMove === null || score < bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            } else {
                // Black AI wants to MAXIMIZE totalScore
                if (bestMove === null || score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            }

            board[move.from.row][move.from.col] = orig;
            board[move.to.row][move.to.col] = backup;
        }

        if (bestMove) {
            // Execute AI move
            const movingPiece = board[bestMove.from.row][bestMove.from.col];
            const capturedPiece = board[bestMove.to.row][bestMove.to.col];

            if (capturedPiece) {
                if (isWhite(capturedPiece)) {
                    capturedBlack.push(capturedPiece);
                } else {
                    capturedWhite.push(capturedPiece);
                }
                playSound('capture');
            } else {
                playSound('move');
            }

            board[bestMove.to.row][bestMove.to.col] = movingPiece;
            board[bestMove.from.row][bestMove.from.col] = '';

            // Pawn promotion
            // White (Row 6 -> 0), Black (Row 1 -> 7)
            const promotionRow = aiPlaysWhite ? 0 : 7;
            if (movingPiece.toLowerCase() === 'p' && bestMove.to.row === promotionRow) {
                board[bestMove.to.row][bestMove.to.col] = aiPlaysWhite ? 'Q' : 'q';
            }

            lastMove = bestMove;
            const notation = getNotation(bestMove.from.row, bestMove.from.col, bestMove.to.row, bestMove.to.col, movingPiece, !!capturedPiece);
            moveHistory.push({ turn: aiColor, notation });

            currentTurn = playerColor;
            selectedSquare = null;
            validMoves = [];

            renderBoard();
            updateMoveHistory();
            updateCapturedPieces();
        }
    }

    // Event Listeners
    document.getElementById('new-game-btn')?.addEventListener('click', newGame);
    document.getElementById('undo-btn')?.addEventListener('click', undoMove);
    document.getElementById('redo-btn')?.addEventListener('click', redoMove);
    document.getElementById('sound-toggle')?.addEventListener('click', function () {
        soundEnabled = !soundEnabled;
        this.innerHTML = soundEnabled ? '<i class="fas fa-volume-up"></i>' : '<i class="fas fa-volume-mute"></i>';
        this.style.opacity = soundEnabled ? '1' : '0.5';
    });

    // Game Mode Buttons
    document.getElementById('mode-2p')?.addEventListener('click', function () {
        gameMode = '2p';
        document.getElementById('mode-2p')?.classList.add('active');
        document.getElementById('mode-ai')?.classList.remove('active');
        // Hide color selector for 2P mode
        const colorSelector = document.getElementById('color-selector');
        if (colorSelector) {
            colorSelector.style.display = 'none';
        }
        newGame();
    });

    document.getElementById('mode-ai')?.addEventListener('click', function () {
        // Show color selection
        const colorSelector = document.getElementById('color-selector');
        if (colorSelector) {
            colorSelector.style.display = 'flex';
        }
        gameMode = 'ai';
        document.getElementById('mode-ai')?.classList.add('active');
        document.getElementById('mode-2p')?.classList.remove('active');
    });

    // Color Selection Buttons
    document.getElementById('play-white')?.addEventListener('click', function () {
        playerColor = 'white';
        document.getElementById('color-selector').style.display = 'none';
        newGame();
    });

    document.getElementById('play-black')?.addEventListener('click', function () {
        playerColor = 'black';
        document.getElementById('color-selector').style.display = 'none';
        newGame();
        // AI makes the first move as white
        setTimeout(makeAIMove, 500);
    });

    // Share Button
    document.getElementById('share-chess-btn')?.addEventListener('click', shareChessGame);

    // Initialize
    renderBoard();
    updateCapturedPieces();

    // =========================================
    //   CHESS SHARE FUNCTIONALITY (Inside Scope)
    // =========================================
    let currentChessImageBlob = null;

    async function shareChessGame() {
        const modal = document.getElementById('chess-share-modal');
        const previewContainer = document.getElementById('chess-share-preview');

        if (!modal || !previewContainer) return;

        // Pro Loading State
        previewContainer.innerHTML = `
            <div class="text-center p-5">
                <div class="pro-spinner mb-3"></div>
                <p style="color: var(--text-secondary); font-family: -apple-system, sans-serif; font-weight: 500;">Generating High-Def Capture...</p>
            </div>
            <style>
                .pro-spinner { width: 32px; height: 32px; border: 3px solid rgba(0,0,0,0.1); border-top-color: #2563eb; border-radius: 50%; animation: pro-spin 0.8s linear infinite; margin: 0 auto; }
                @keyframes pro-spin { to { transform: rotate(360deg); } }
            </style>`;

        modal.classList.add('active');

        try {
            const originalBoard = document.querySelector('.chessboard');
            if (!originalBoard) throw new Error("Board not found");

            // 1. Off-screen Staging (Visible to browser rendering but out of user viewport)
            const stage = document.createElement('div');
            // Using visibility: visible and opacity: 1 but absolute position far away
            stage.style.cssText = "position: absolute; top: -10000px; left: -10000px; width: 800px; background: #ffffff; visibility: visible; opacity: 1; z-index: -1000;";
            document.body.appendChild(stage);

            // 2. High-Contrast Pro Card
            const card = document.createElement('div');
            card.style.cssText = "background: #ffffff; padding: 45px; border-radius: 36px; box-shadow: 0 40px 80px rgba(0,0,0,0.15); display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: -apple-system, system-ui, sans-serif;";

            // 3. Exact Multi-Project Card Theme
            const boardBox = document.createElement('div');
            boardBox.style.cssText = "background: #ffffff; padding: 2px; border-radius: 8px; border: 2px solid #2563eb; box-shadow: 0 10px 30px rgba(0,0,0,0.05); line-height: 0;";

            const grid = document.createElement('div');
            grid.style.cssText = "display: grid; grid-template-columns: repeat(8, 60px); grid-template-rows: repeat(8, 60px); width: 480px; height: 480px; background: #ffffff; border-radius: 4px; overflow: hidden;";

            // Exact Piece Mapping from Screenshot (Outline for White, Solid for Black)
            const THEME_PIECES = {
                'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
                'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
            };

            const cells = originalBoard.querySelectorAll('.chess-square');
            cells.forEach((cell, index) => {
                const r = Math.floor(index / 8);
                const c = index % 8;
                const isLight = (r + c) % 2 === 0;

                const sq = document.createElement('div');
                sq.style.cssText = `width: 60px; height: 60px; display: flex; align-items: center; justify-content: center; background-color: ${isLight ? '#ffffff' : '#f1f5f9'}; margin: 0; padding: 0;`;

                const origPiece = cell.querySelector('.piece');
                if (origPiece) {
                    const pk = origPiece.dataset.piece;
                    const isW = pk === pk.toUpperCase();

                    const pSpan = document.createElement('span');
                    pSpan.textContent = THEME_PIECES[pk] || '';
                    pSpan.style.cssText = `
                        font-size: 52px;
                        line-height: 60px;
                        color: #1e293b;
                        font-weight: normal;
                        display: block;
                        text-align: center;
                        -webkit-font-smoothing: antialiased;
                    `;
                    sq.appendChild(pSpan);
                }
                grid.appendChild(sq);
            });

            // 2b. Professional Header (Authorship at top)
            const header = document.createElement('div');
            header.style.cssText = "margin-bottom: 30px; text-align: center; width: 100%;";

            const bTxt = document.createElement('div');
            bTxt.textContent = "♚ Created by Amey Thakur & Mega Satish";
            bTxt.style.cssText = "font-size: 20px; font-weight: 700; color: #1e293b; letter-spacing: -0.02em;";

            header.appendChild(bTxt);
            card.appendChild(header);

            card.appendChild(boardBox);

            // 4. Integrated Footer (Lab Portolio & Link at bottom)
            const footer = document.createElement('div');
            footer.style.cssText = "padding-top: 30px; text-align: center; width: 100%;";

            const lTxt = document.createElement('div');
            lTxt.textContent = "HMI LAB PORTFOLIO";
            lTxt.style.cssText = "font-size: 11px; font-weight: 500; color: #64748b; text-transform: uppercase; letter-spacing: 0.15em; margin-bottom: 3px;";

            const uTxt = document.createElement('div');
            uTxt.textContent = (window.location.host + window.location.pathname).replace(/\/$/, '');
            uTxt.style.cssText = "font-size: 10px; font-weight: 400; color: #94a3b8; font-family: monospace; letter-spacing: 0.05em;";

            footer.appendChild(lTxt);
            footer.appendChild(uTxt);
            card.appendChild(footer);

            stage.appendChild(card);

            // 5. High-Resolution Capture
            const canvas = await html2canvas(card, {
                scale: 3,
                backgroundColor: '#ffffff',
                useCORS: true,
                logging: false,
                imageTimeout: 0,
                removeContainer: true
            });

            // Cleanup
            document.body.removeChild(stage);

            // 6. Surface Result
            previewContainer.innerHTML = '';
            const img = document.createElement('img');
            img.src = canvas.toDataURL('image/png', 1.0);
            img.style.cssText = "max-width: 100%; max-height: 50vh; border-radius: 20px; box-shadow: 0 20px 40px rgba(0,0,0,0.1); border: 1px solid #f1f5f9;";
            previewContainer.appendChild(img);

            canvas.toBlob(blob => {
                currentChessImageBlob = blob;
            }, 'image/png');

        } catch (err) {
            console.error("Capture failure:", err);
            previewContainer.innerHTML = `<div class="p-5 text-center text-danger"><p>Capture failed: ${err.message}</p></div>`;
        }
    }

    function closeChessShareModal() {
        const modal = document.getElementById('chess-share-modal');
        if (modal) modal.classList.remove('active');
    }

    function downloadChessImage() {
        if (!currentChessImageBlob) return;

        const url = URL.createObjectURL(currentChessImageBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `HMI_Chess_Game.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    function copyChessLink() {
        const url = window.location.href;
        const shareText = "Play this awesome Chess Game created by Amey Thakur & Mega Satish! " + url;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText).then(() => {
                const btn = document.querySelector('.chess-share-btn.copy');
                if (btn) {
                    const originalContent = btn.innerHTML;
                    btn.innerHTML = '<i class="fas fa-check me-2"></i>Copied!';
                    setTimeout(() => btn.innerHTML = originalContent, 2000);
                }
            });
        }
    }

    async function shareChessNative() {
        if (navigator.share && currentChessImageBlob) {
            try {
                const file = new File([currentChessImageBlob], 'chess_game.png', { type: 'image/png' });
                if (navigator.canShare && navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        title: 'HMI Chess Game',
                        text: 'Check out this Chess Game!',
                        files: [file]
                    });
                }
            } catch (err) {
                console.log('Error sharing:', err);
            }
        }
    }

    // Expose share functions to window for onclick handlers
    window.shareChessGame = shareChessGame;
    window.closeChessShareModal = closeChessShareModal;
    window.downloadChessImage = downloadChessImage;
    window.copyChessLink = copyChessLink;
    window.shareChessNative = shareChessNative;

})();

