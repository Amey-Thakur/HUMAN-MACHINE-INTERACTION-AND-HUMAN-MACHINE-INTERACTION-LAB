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

    // Audio Context for sounds
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    function fireConfetti() {
        // Use window.confetti to be certain we access the global library
        const _confetti = window.confetti || confetti;

        if (typeof _confetti !== 'function') {
            console.warn('Confetti library logic fallback - manual trigger failed');
            return;
        }

        const count = 200;
        const defaults = {
            origin: { y: 0.7 },
            zIndex: 10002
        };

        function fire(particleRatio, opts) {
            _confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        // Slight delay to ensure DOM is ready and sounds started
        setTimeout(() => {
            fire(0.25, {
                spread: 26,
                startVelocity: 55,
            });
            fire(0.2, {
                spread: 60,
            });
            fire(0.35, {
                spread: 100,
                decay: 0.91,
                scalar: 0.8
            });
            fire(0.1, {
                spread: 120,
                startVelocity: 25,
                decay: 0.92,
                scalar: 1.2
            });
            fire(0.1, {
                spread: 120,
                startVelocity: 45,
            });
        }, 300);
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
                    const moves = getValidMoves(r, c);
                    if (moves.some(m => m.row === king.row && m.col === king.col)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    function hasLegalMoves(isWhiteTurn) {
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = board[r][c];
                if (piece && (isWhiteTurn ? isWhite(piece) : isBlack(piece))) {
                    const moves = getValidMoves(r, c);
                    for (const move of moves) {
                        // Simulate move
                        const backup = board[move.row][move.col];
                        const orig = board[r][c];
                        board[move.row][move.col] = orig;
                        board[r][c] = '';

                        const stillInCheck = isKingInCheck(isWhiteTurn);

                        // Restore
                        board[r][c] = orig;
                        board[move.row][move.col] = backup;

                        if (!stillInCheck) return true;
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
                validMoves = getValidMoves(row, col);
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
            validMoves = getValidMoves(row, col);
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
        let score = 0;
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = board[r][c];
                if (piece) {
                    const value = PIECE_VALUES[piece.toLowerCase()] || 0;
                    score += isWhite(piece) ? -value : value;
                }
            }
        }
        return score;
    }

    function getAllMoves(forWhite) {
        const moves = [];
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                const piece = board[r][c];
                if (piece && (forWhite ? isWhite(piece) : isBlack(piece))) {
                    const pieceMoves = getValidMoves(r, c);
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

        let bestMove = null;
        let bestScore = -Infinity;

        for (const move of moves) {
            // Simulate move
            const backup = board[move.to.row][move.to.col];
            const orig = board[move.from.row][move.from.col];
            board[move.to.row][move.to.col] = orig;
            board[move.from.row][move.from.col] = '';

            // Check if move leaves king in check
            if (!isKingInCheck(aiPlaysWhite)) {
                let score = evaluateBoard();
                if (aiPlaysWhite) score = -score; // Flip for white AI
                score += (backup ? PIECE_VALUES[backup.toLowerCase()] * 2 : 0);
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            }

            // Restore
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
            const promotionRow = aiPlaysWhite ? 7 : 0;
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
})();

// =========================================
//   CHESS SHARE FUNCTIONALITY
// =========================================
let currentChessImageBlob = null;

async function shareChessGame() {
    const modal = document.getElementById('chess-share-modal');
    const previewContainer = document.getElementById('chess-share-preview');

    if (!modal || !previewContainer) return;

    // Show loading
    previewContainer.innerHTML = '<div class="text-center p-5"><i class="fas fa-spinner fa-spin fa-2x" style="color: var(--accent-color);"></i><p class="mt-3" style="color: var(--text-secondary);">Generating preview...</p></div>';

    // Show Modal
    modal.classList.add('active');

    try {
        // Target the chessboard
        const targetEl = document.querySelector('.chessboard');
        if (!targetEl) throw new Error("Chessboard not found");

        // Create a wrapper for capture to hold board + footer
        const wrapper = document.createElement('div');
        const isDarkMode = document.body.classList.contains('dark-mode');

        wrapper.style.width = targetEl.offsetWidth + 'px';
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        // Force solid background to prevent fading
        wrapper.style.backgroundColor = isDarkMode ? '#0f172a' : '#ffffff';
        wrapper.style.borderRadius = '12px';
        wrapper.style.overflow = 'hidden';
        wrapper.style.boxShadow = 'none';

        // Insert wrapper
        targetEl.parentNode.insertBefore(wrapper, targetEl);
        wrapper.appendChild(targetEl);

        // Add footer
        const tempFooter = document.createElement('div');
        tempFooter.innerHTML = 'Created by Amey Thakur & Mega Satish';
        Object.assign(tempFooter.style, {
            background: isDarkMode ? '#1e293b' : '#f1f5f9',
            color: isDarkMode ? '#cbd5e1' : '#475569',
            padding: '12px',
            textAlign: 'center',
            fontSize: '12px',
            fontFamily: "'Poppins', sans-serif",
            letterSpacing: '0.5px',
            borderTop: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0'
        });
        wrapper.appendChild(tempFooter);

        // Apply temporary high-contrast styling to board squares for clear image
        const squares = targetEl.querySelectorAll('.chess-square');
        const stateMap = new Map(); // Consistent variable name

        squares.forEach((sq) => {
            const pieceSpan = sq.querySelector('.piece');
            stateMap.set(sq, {
                bg: sq.style.backgroundColor,
                color: sq.style.color,
                opacity: sq.style.opacity,
                spanColor: pieceSpan ? pieceSpan.style.color : null,
                spanShadow: pieceSpan ? pieceSpan.style.textShadow : null,
                spanWeight: pieceSpan ? pieceSpan.style.fontWeight : null,
                spanOpacity: pieceSpan ? pieceSpan.style.opacity : null
            });

            // 1. Force Board Square Colors (Solid, No Transparency)
            // Use standard clean colors (Blue/White theme)
            if (sq.classList.contains('light')) {
                sq.style.backgroundColor = '#f1f5f9'; // Slate 100
            } else {
                sq.style.backgroundColor = '#93c5fd'; // Blue 300
            }
            sq.style.opacity = '1';

            // 2. Force Piece Styling (High Contrast)
            if (pieceSpan) {
                // Force all pieces to be Solid Black/Dark Grey for maximum contrast
                // This makes White pieces (Outlines) look like Dark Outlines (Clear)
                // And Black pieces (Filled) look like Solid Dark (Clear)
                pieceSpan.style.color = '#1e293b'; // Slate 800
                pieceSpan.style.textShadow = 'none';
                pieceSpan.style.fontWeight = 'bold';
                pieceSpan.style.opacity = '1';
            }
        });

        // Capture
        const canvas = await html2canvas(wrapper, {
            scale: 4, // Ultra quality
            backgroundColor: '#ffffff',
            useCORS: true,
            logging: false,
            imageTimeout: 0
        });

        // Restore original state
        squares.forEach(sq => {
            const saved = stateMap.get(sq);
            if (!saved) return;

            sq.style.backgroundColor = saved.bg;
            sq.style.color = saved.color;
            sq.style.opacity = saved.opacity;

            const pieceSpan = sq.querySelector('.piece');
            if (pieceSpan) {
                pieceSpan.style.color = saved.spanColor;
                pieceSpan.style.textShadow = saved.spanShadow;
                pieceSpan.style.fontWeight = saved.spanWeight;
                pieceSpan.style.opacity = saved.spanOpacity;
            }
        });

        // Cleanup: Restore board
        wrapper.parentNode.insertBefore(targetEl, wrapper);
        wrapper.remove();

        // Display in preview
        previewContainer.innerHTML = '';
        const img = document.createElement('img');
        img.src = canvas.toDataURL('image/png');
        img.style.maxWidth = '100%';
        img.style.maxHeight = '40vh';
        img.style.width = 'auto';
        img.style.borderRadius = '8px';
        previewContainer.appendChild(img);

        // Store blob
        canvas.toBlob(blob => {
            currentChessImageBlob = blob;
        });

    } catch (err) {
        console.error("Capture failed:", err);
        previewContainer.innerHTML = `<div class="text-center p-4" style="color: #ef4444;">
            <i class="fas fa-exclamation-circle me-2"></i>Failed to generate preview.<br>
            <small>${err.message}</small>
        </div>`;
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
    a.download = `HMI_Chess_Game_By_Amey_and_Mega.png`;
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
                btn.style.backgroundColor = '#22c55e';
                btn.style.color = '#fff';
                btn.style.borderColor = '#22c55e';

                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.backgroundColor = '';
                    btn.style.color = '';
                    btn.style.borderColor = '';
                }, 2000);
            }
        });
    } else {
        // Fallback
        const textArea = document.createElement("textarea");
        textArea.value = shareText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        textArea.remove();
        alert("Link copied to clipboard!");
    }
}

async function shareChessNative() {
    if (navigator.share && currentChessImageBlob) {
        try {
            const file = new File([currentChessImageBlob], 'chess_game_amey_mega.png', { type: 'image/png' });
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                await navigator.share({
                    title: 'HMI Chess Game',
                    text: 'Check out this Chess Game created by Amey Thakur & Mega Satish!',
                    files: [file]
                });
            } else {
                await navigator.share({
                    title: 'HMI Chess Game',
                    text: 'Check out this Chess Game created by Amey Thakur & Mega Satish!',
                    url: window.location.href
                });
            }
        } catch (err) {
            console.log('Error sharing:', err);
        }
    } else {
        alert("Web Share API not supported on this device/browser.");
    }
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    const modal = document.getElementById('chess-share-modal');
    if (e.target === modal) {
        closeChessShareModal();
    }
});
