document.addEventListener('DOMContentLoaded', () => {
    const pages = document.querySelectorAll('.page');
    const navLinks = document.querySelectorAll('.nav-link');
    const disasterCards = document.querySelectorAll('.disaster-card');
    const loginForm = document.getElementById('loginForm');
    const loginPage = document.getElementById('loginPage');
    const mainApp = document.getElementById('mainApp');
    const loginError = document.getElementById('loginError');
    const adminLoginLink = document.getElementById('adminLoginLink');
    const adminDashboardLink = document.getElementById('adminDashboardLink');
    const adminDashboardLinkMobile = document.getElementById('adminDashboardLinkMobile');
    const logoutButton = document.getElementById('logoutButton');
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    let currentUser = null;

    function showPage(pageId) {
        if (pageId.startsWith('disasterDetail_')) {
            const disasterKey = pageId.split('_')[1];
            renderDisasterDetail(disasterKey);
            pages.forEach(p => p.classList.remove('active'));
            document.getElementById('disasterDetailPage').classList.add('active');
        } else {
            pages.forEach(p => {
                p.classList.remove('active');
                if (p.id === pageId) {
                    p.classList.add('active');
                }
            });
        }
        window.scrollTo(0, 0);
        lucide.createIcons();
    }
    
    function renderDisasterDetail(disasterKey) {
        const data = disasterData[disasterKey];
        const detailPage = document.getElementById('disasterDetailPage');

        if (!data) {
            detailPage.innerHTML = `<p>Details not found.</p>`;
            return;
        }

        const stepsHtml = data.steps.map(step => `
            <div class="mb-6">
                <h3 class="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-2 mb-3">${step.title}</h3>
                <ul class="list-disc list-inside space-y-2 text-gray-600">
                    ${step.points.map(point => `<li>${point}</li>`).join('')}
                </ul>
            </div>
        `).join('');

        const visualsHtml = data.visuals ? `
            <div class="mt-8">
                <h3 class="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-2 mb-4">Visual Guide</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    ${data.visuals.map(visual => `
                        <div class="bg-gray-50 rounded-lg p-2 shadow-sm border">
                            <img src="${visual.src}" alt="${visual.caption}" class="w-full h-auto rounded-md mb-2 object-cover">
                            <p class="text-center text-sm text-gray-600 font-medium p-1">${visual.caption}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '';

        const videoHtml = data.video ? `
            <div class="my-6">
                <h3 class="text-xl font-semibold text-gray-700 mb-3">${data.video.title}</h3>
                <div class="aspect-video bg-black rounded-lg overflow-hidden shadow-lg border">
                     <video controls class="w-full h-full object-cover">
                        <source src="${data.video.src}" type="video/mp4">
                        Your browser does not support the video tag.
                     </video>
                </div>
            </div>
        ` : '';

        detailPage.innerHTML = `
            <div class="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                <div class="flex items-center mb-4">
                    <span class="lucide-icon h-10 w-10 text-${data.color} mr-4" data-lucide="${data.icon}"></span>
                    <h1 class="text-3xl sm:text-4xl font-bold text-gray-800">${data.title}</h1>
                </div>
                <p class="text-gray-600">${data.description}</p>
                
                ${videoHtml}
                ${stepsHtml}
                ${visualsHtml}
                 <button class="mt-8 text-indigo-600 font-semibold back-to-dashboard flex items-center">
                    <span class="lucide-icon mr-2 h-5 w-5" data-lucide="arrow-left"></span> Back to Dashboard
                 </button>
            </div>
        `;
        
        document.querySelector('.back-to-dashboard').addEventListener('click', (e) => {
            e.preventDefault();
            showPage('dashboardPage');
        });
    }

    function handleLogin(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if ((username === 'student' || username === 'student@school.in') && password === 'pass123') {
            currentUser = { username: 'Student', role: 'student' };
            initializeApp();
        } else if ((username === 'admin' || username === 'admin@school.in') && password === 'admin123') {
            currentUser = { username: 'Admin', role: 'admin' };
            initializeApp();
        } else {
            loginError.textContent = 'Invalid username or password.';
        }
    }

    function initializeApp() {
        loginPage.classList.remove('active');
        mainApp.classList.remove('hidden');
        document.getElementById('usernameDisplay').textContent = currentUser.username;
        document.getElementById('welcomeName').textContent = currentUser.username;

        if (currentUser.role === 'admin') {
            adminDashboardLink.classList.remove('hidden');
            adminDashboardLinkMobile.classList.remove('hidden');
            showPage('adminPage');
        } else {
            adminDashboardLink.classList.add('hidden');
            adminDashboardLinkMobile.classList.add('hidden');
            showPage('dashboardPage');
        }
    }

    function handleLogout() {
        currentUser = null;
        mainApp.classList.add('hidden');
        loginPage.classList.add('active');
        document.getElementById('loginForm').reset();
        loginError.textContent = '';
    }

    loginForm.addEventListener('submit', handleLogin);
    
    adminLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('username').value = 'admin@school.in';
        document.getElementById('password').value = 'admin123';
        loginForm.dispatchEvent(new Event('submit'));
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(e.currentTarget.dataset.page);
            mobileMenu.classList.add('hidden');
        });
    });

    disasterCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(e.currentTarget.dataset.page);
        });
    });

    logoutButton.addEventListener('click', handleLogout);

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });

    // --- NEW: Animated Drill Logic ---
    const startAnimatedDrillBtn = document.getElementById('startAnimatedDrill');
    const animatedDrillContainer = document.getElementById('animatedDrillContainer');
    const drillStepEl = document.getElementById('drillStep');
    const drillPrevBtn = document.getElementById('drillPrevBtn');
    const drillNextBtn = document.getElementById('drillNextBtn');

    const drillSteps = [
        { title: "Step 1: Get the Alert", text: "You receive a 'Flood Warning' on your phone. This is serious. It's time to act.", icon: "smartphone" },
        { title: "Step 2: Grab Your Go-Bag", text: "You have your pre-packed emergency bag with water, food, and a first-aid kit. You take it immediately.", icon: "briefcase" },
        { title: "Step 3: Secure Your Home", text: "You quickly turn off the main electricity and gas supply as instructed by authorities.", icon: "power-off" },
        { title: "Step 4: Check on Others", text: "You quickly check on your elderly neighbor to make sure they are also ready to leave.", icon: "users" },
        { title: "Step 5: Evacuate!", text: "You leave your home and follow the designated evacuation route to higher ground. Do not take shortcuts.", icon: "siren" },
        { title: "Step 6: Stay Informed", text: "At the shelter, you listen to emergency radio for updates. Do not return home until it's declared safe.", icon: "radio" },
    ];
    let currentDrillStep = 0;

    function renderDrillStep() {
        const step = drillSteps[currentDrillStep];
        drillStepEl.innerHTML = `<div class="drill-step-content">
            <span class="lucide-icon h-16 w-16 mx-auto text-indigo-500 mb-4" data-lucide="${step.icon}"></span>
            <h3 class="text-xl font-bold mb-2">${step.title}</h3>
            <p class="text-gray-600 max-w-md mx-auto">${step.text}</p>
        </div>`;
        lucide.createIcons();
        drillPrevBtn.disabled = currentDrillStep === 0;
        drillNextBtn.textContent = currentDrillStep === drillSteps.length - 1 ? 'Finish' : 'Next';
    }

    startAnimatedDrillBtn.addEventListener('click', () => {
        animatedDrillContainer.classList.remove('hidden');
        currentDrillStep = 0;
        renderDrillStep();
    });

    drillNextBtn.addEventListener('click', () => {
        if (currentDrillStep < drillSteps.length - 1) {
            currentDrillStep++;
            renderDrillStep();
        } else {
            animatedDrillContainer.classList.add('hidden');
            alert('Drill Complete! Well done.');
        }
    });

    drillPrevBtn.addEventListener('click', () => {
        if (currentDrillStep > 0) {
            currentDrillStep--;
            renderDrillStep();
        }
    });

    // --- NEW: FLORIMA Game Logic ---
    const startFlorimaGameBtn = document.getElementById('startFlorimaGame');
    
    startFlorimaGameBtn.addEventListener('click', () => {
        showPage('gamePage');
        initFlorimaGame();
    });
    
    const gameBoardEl = document.getElementById('gameBoard');
    const playerResourcesEl = document.getElementById('playerResources');
    const resourceCardsEl = document.getElementById('resourceCards');
    const eventTextEl = document.getElementById('eventText');
    const nextTurnBtn = document.getElementById('nextTurnBtn');
    const actionInfoEl = document.getElementById('actionInfo');

    let gameState = {};

    const eventCards = [
        { text: "Heavy rainfall predicted. River levels are rising.", effect: { resources: { money: 50 } } },
        { text: "Flash Flood Warning! A sudden surge is imminent in low-lying areas.", effect: { flood: 2, type: 'plains' } },
        { text: "Government grant received for disaster preparedness.", effect: { resources: { money: 200 } } },
        { text: "Community volunteers help build defenses.", effect: { resources: { sandbags: 2 } } },
        { text: "Storm passes with minor impact. River levels recede slightly.", effect: {} },
        { text: "Major Flood Alert! The main river is about to burst its banks.", effect: { flood: 3, type: 'river' } },
    ];

    const gameMap = [
        'river', 'river', 'plains', 'plains', 'farmland',
        'river', 'town', 'town', 'plains', 'farmland',
        'river', 'town', 'school', 'hospital', 'farmland',
        'river', 'plains', 'plains', 'farmland', 'farmland'
    ];

    function initFlorimaGame() {
        gameState = {
            turn: 0,
            resources: { money: 300, sandbags: 3, evac_teams: 1 },
            mapState: gameMap.map(type => ({ type, isFlooded: false, hasSandbag: false, isEvacuated: false })),
            selectedResource: null,
            score: 0
        };
        nextTurnBtn.disabled = false;
        eventTextEl.innerHTML = 'Click "Next Turn" to draw an event card.';
        renderGame();
    }

    function renderGame() {
        // Render Map
        gameBoardEl.innerHTML = '';
        gameState.mapState.forEach((tile, index) => {
            const tileEl = document.createElement('div');
            tileEl.className = `game-tile tile-${tile.type} relative`;
            if (tile.isFlooded) tileEl.classList.add('flooded');
            tileEl.textContent = tile.type.charAt(0).toUpperCase() + tile.type.slice(1);
            tileEl.dataset.index = index;
            
            if (tile.hasSandbag) {
                const sandbagEl = document.createElement('div');
                sandbagEl.className = 'sandbag-token';
                tileEl.appendChild(sandbagEl);
            }
            if (tile.isEvacuated) {
                const evacEl = document.createElement('div');
                evacEl.className = 'evac-token';
                tileEl.appendChild(evacEl);
            }

            tileEl.addEventListener('click', () => handleTileClick(index));
            gameBoardEl.appendChild(tileEl);
        });

        // Render Resources
        playerResourcesEl.innerHTML = `
            <div>💰 Money: <span class="font-bold">${gameState.resources.money}</span></div>
            <div>🧱 Sandbags: <span class="font-bold">${gameState.resources.sandbags}</span></div>
            <div>🚌 Evac Teams: <span class="font-bold">${gameState.resources.evac_teams}</span></div>
            <div>🏆 Score: <span class="font-bold">${gameState.score}</span></div>
        `;

        // Render Resource Cards
        resourceCardsEl.innerHTML = `
            <div class="resource-card border-yellow-500" data-resource="sandbags">🧱 Use Sandbag</div>
            <div class="resource-card border-green-500" data-resource="evac_teams">🚌 Use Evac Team</div>
        `;
        document.querySelectorAll('.resource-card').forEach(card => {
            card.addEventListener('click', () => selectResource(card.dataset.resource));
        });
    }

    function selectResource(resource) {
        gameState.selectedResource = resource;
        document.querySelectorAll('.resource-card').forEach(c => c.classList.remove('selected'));
        document.querySelector(`[data-resource="${resource}"]`).classList.add('selected');
        actionInfoEl.textContent = `Click a map tile to use ${resource === 'sandbags' ? 'a sandbag' : 'an evac team'}.`;
    }

    function handleTileClick(index) {
        if (!gameState.selectedResource) {
            actionInfoEl.textContent = "Please select a resource first!";
            return;
        }

        const tile = gameState.mapState[index];
        const resource = gameState.selectedResource;

        if (resource === 'sandbags') {
            if (gameState.resources.sandbags > 0 && !tile.hasSandbag) {
                gameState.resources.sandbags--;
                tile.hasSandbag = true;
                gameState.score += 10;
            }
        } else if (resource === 'evac_teams') {
            if (gameState.resources.evac_teams > 0 && (tile.type === 'town' || tile.type === 'school' || tile.type === 'hospital') && !tile.isEvacuated) {
                gameState.resources.evac_teams--;
                tile.isEvacuated = true;
                 gameState.score += 50;
            }
        }
        
        gameState.selectedResource = null;
        actionInfoEl.textContent = "Select a resource, then click on a map tile.";
        renderGame();
    }

    nextTurnBtn.addEventListener('click', () => {
        gameState.turn++;
        
        const event = eventCards[Math.floor(Math.random() * eventCards.length)];
        eventTextEl.textContent = event.text;

        // Apply event effects
        if(event.effect.resources) {
            for(const res in event.effect.resources) {
                gameState.resources[res] += event.effect.resources[res];
            }
        }
        if(event.effect.flood) {
            for(let i = 0; i < event.effect.flood; i++) {
                const tilesOfType = gameState.mapState.map((t, idx) => ({...t, idx})).filter(t => (event.effect.type === 'river' ? t.type === 'river' || t.type === 'plains' : t.type === event.effect.type) && !t.isFlooded);
                if (tilesOfType.length > 0) {
                    const randomTile = tilesOfType[Math.floor(Math.random() * tilesOfType.length)];
                    const gameTile = gameState.mapState[randomTile.idx];
                    
                    if (!gameTile.hasSandbag) {
                        gameTile.isFlooded = true;
                        if (!gameTile.isEvacuated && (gameTile.type === 'town' || gameTile.type === 'school' || gameTile.type === 'hospital')) {
                             gameState.score -= 100; // Penalty for not evacuating
                        }
                    } else {
                        gameTile.hasSandbag = false; // Sandbag is used up
                        gameState.score += 20; // Bonus for successful defense
                    }
                }
            }
        }
        
        // Check for game over
        const populatedAreas = gameState.mapState.filter(t => t.type === 'town' || t.type === 'school' || t.type === 'hospital');
        const floodedPopulated = populatedAreas.filter(t => t.isFlooded).length;
        if(floodedPopulated >= 3) {
            eventTextEl.innerHTML = `<strong>Game Over!</strong> Too many critical areas were flooded. Your final score is ${gameState.score}.`;
            nextTurnBtn.disabled = true;
        } else {
            nextTurnBtn.disabled = false;
        }

        renderGame();
    });

    // Initial call
    lucide.createIcons();
});

