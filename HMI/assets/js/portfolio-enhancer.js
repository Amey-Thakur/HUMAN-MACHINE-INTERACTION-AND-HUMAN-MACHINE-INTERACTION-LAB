(function () {
    // 1. Define Experiment Data
    const repoBase = "https://github.com/Amey-Thakur/HUMAN-MACHINE-INTERACTION-AND-HUMAN-MACHINE-INTERACTION-LAB/tree/main/HMI/";
    const experiments = {
        "HMI-2": {
            id: "02",
            title: "Math Sprint Game",
            date: "11/02/2022",
            stack: ["HTML5", "CSS3", "JavaScript"],
            desc: "An interactive, gamified application for children to test mathematical speed (Addition, Subtraction, Multiplication). Features real-time scoring and dynamic difficulty.",
            path: "HMI-2/index.html"
        },
        "HMI-3": {
            id: "03",
            title: "Registration Interface",
            date: "18/02/2022",
            stack: ["Legacy HTML", "Form Validation", "A11y (Basic)"],
            desc: "A formal data entry GUI emphasizing form usability. Demonstrates client-side validation logic and error recovery mechanisms.",
            path: "HMI-3/form.html"
        },
        "HMI-4": {
            id: "04",
            title: "ATVM Simulator",
            date: "25/02/2022",
            stack: ["AngularJS", "Bootstrap", "Simulation"],
            desc: "A simulation of an Automated Ticket Vending Machine (ATVM) interface. Focuses on kiosk usability, touch targets, and task flow efficiency.",
            path: "HMI-4/index.html"
        },
        "HMI-6": {
            id: "06",
            title: "Cloud Services Portal",
            date: "13/03/2022",
            stack: ["Bootstrap 5", "Responsive Design", "PaaS"],
            desc: "A comprehensive corporate website for a Cloud Service Provider. showcases modern responsive layouts, sticky navigation, and service cards.",
            path: "HMI-6/index.html"
        }
    };

    // 2. Detect Current Experiment
    let currentExp = null;
    const path = window.location.pathname;

    if (path.includes("HMI-2")) currentExp = experiments["HMI-2"];
    else if (path.includes("HMI-3")) currentExp = experiments["HMI-3"];
    else if (path.includes("HMI-4")) currentExp = experiments["HMI-4"];
    else if (path.includes("HMI-6")) currentExp = experiments["HMI-6"];

    if (!currentExp) return; // Exit if not a recognized experiment

    // 3. Inject CSS
    const style = document.createElement('style');
    style.innerHTML = `
        .enhancer-btn {
            position: fixed;
            bottom: 80px; /* Stacked above Back button */
            right: 20px;
            width: 50px;
            height: 50px;
            background: #ffffff;
            color: #2563eb;
            border-radius: 50%;
            border: 2px solid #2563eb;
            box-shadow: 0 4px 6px rgba(0,0,0,0.2);
            z-index: 10001; /* Higher than back button */
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: sans-serif;
        }
        .enhancer-btn:hover {
            background: #2563eb;
            color: white;
            transform: scale(1.1);
        }
        .enhancer-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6);
            z-index: 10002;
            display: none;
            justify-content: center;
            align-items: center;
            backdrop-filter: blur(3px);
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        .enhancer-modal-overlay.active {
            display: flex;
            opacity: 1;
        }
        .enhancer-modal {
            background: white;
            width: 90%;
            max-width: 500px;
            padding: 30px;
            border-radius: 16px;
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
            position: relative;
            transform: translateY(20px);
            transition: transform 0.3s ease;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            text-align: left;
            color: #333;
        }
        .enhancer-modal-overlay.active .enhancer-modal {
            transform: translateY(0);
        }
        .enhancer-close {
            position: absolute;
            top: 15px;
            right: 20px;
            font-size: 24px;
            cursor: pointer;
            color: #999;
        }
        .enhancer-close:hover { color: #333; }
        .enhancer-title {
            margin: 0 0 10px 0;
            font-size: 24px;
            font-weight: bold;
            color: #1e293b;
        }
        .enhancer-meta {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 20px;
            display: flex;
            gap: 15px;
        }
        .enhancer-desc {
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 25px;
            color: #475569;
        }
        .enhancer-tags {
            margin-bottom: 25px;
        }
        .enhancer-tag {
            display: inline-block;
            background: #eff6ff;
            color: #2563eb;
            padding: 5px 12px;
            border-radius: 20px;
            font-size: 12px;
            margin-right: 8px;
            font-weight: 600;
        }
        .enhancer-actions {
            display: flex;
            gap: 10px;
        }
        .enhancer-action-btn {
            flex: 1;
            padding: 12px;
            border-radius: 8px;
            text-align: center;
            text-decoration: none;
            font-weight: 600;
            font-size: 14px;
            transition: background 0.2s;
        }
        .btn-source {
            background: #1e293b;
            color: white;
        }
        .btn-source:hover { background: #334155; color: white; }
    `;
    document.head.appendChild(style);

    // 4. Inject HTML Elements
    const btn = document.createElement('div');
    btn.className = 'enhancer-btn';
    btn.innerHTML = 'ℹ️'; // Emoji used as icon
    btn.title = "Technological Details";
    document.body.appendChild(btn);

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'enhancer-modal-overlay';
    modalOverlay.innerHTML = `
        <div class="enhancer-modal">
            <div class="enhancer-close">&times;</div>
            <h2 class="enhancer-title">Exp ${currentExp.id}: ${currentExp.title}</h2>
            <div class="enhancer-meta">
                <span>📅 ${currentExp.date}</span>
            </div>
            <p class="enhancer-desc">${currentExp.desc}</p>
            <div class="enhancer-tags">
                ${currentExp.stack.map(tech => `<span class="enhancer-tag">${tech}</span>`).join('')}
            </div>
            <div class="enhancer-actions">
                <a href="${repoBase + currentExp.path}" target="_blank" class="enhancer-action-btn btn-source">
                    View Source Code
                </a>
            </div>
        </div>
    `;
    document.body.appendChild(modalOverlay);

    // 5. Event Listeners
    btn.addEventListener('click', () => {
        modalOverlay.classList.add('active');
    });

    const closeBtn = modalOverlay.querySelector('.enhancer-close');
    closeBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.classList.remove('active');
        }
    });

})();
