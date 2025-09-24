// --- APPLICATION LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    // --- Element Selectors ---
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

    // --- Core Functions ---

    /**
     * Shows a specific page by its ID and hides all others.
     * @param {string} pageId - The ID of the page to display.
     */
    function showPage(pageId) {
        // Special handling for disaster detail pages which use a template
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
        window.scrollTo(0, 0); // Scroll to top on every page change
    }
    
    /**
     * Dynamically generates the HTML for a disaster detail page.
     * @param {string} disasterKey - The key (e.g., 'earthquake') from the disasterData object.
     */
    function renderDisasterDetail(disasterKey) {
        const data = disasterData[disasterKey];
        const detailPage = document.getElementById('disasterDetailPage');

        if (!data) {
            detailPage.innerHTML = `<p class="text-center text-red-500">Error: Disaster details not found.</p>`;
            return;
        }

        // Generate HTML for safety steps
        const stepsHtml = data.steps.map(step => `
            <div class="mb-6">
                <h3 class="text-xl font-semibold text-gray-700 border-b-2 border-gray-200 pb-2 mb-3">${step.title}</h3>
                <ul class="list-disc list-inside space-y-2 text-gray-600">
                    ${step.points.map(point => `<li>${point}</li>`).join('')}
                </ul>
            </div>
        `).join('');

        // Generate HTML for visual guides, if they exist
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

        // Generate HTML for video, if it exists
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
        
        // Assemble the final page HTML
        detailPage.innerHTML = `
            <div class="bg-white p-6 sm:p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
                <div class="flex items-center mb-4">
                    <i data-lucide="${data.icon}" class="h-10 w-10 text-${data.color} mr-4"></i>
                    <h1 class="text-3xl sm:text-4xl font-bold text-gray-800">${data.title}</h1>
                </div>
                <p class="text-gray-600 leading-relaxed">${data.description}</p>
                
                ${videoHtml}
                ${stepsHtml}
                ${visualsHtml}

                 <button class="mt-8 text-indigo-600 font-semibold back-to-dashboard flex items-center hover:underline">
                    <i data-lucide="arrow-left" class="mr-2 h-5 w-5"></i> Back to Dashboard
                 </button>
            </div>
        `;
        lucide.createIcons(); // Re-render icons after adding them to the DOM
        
        // Add event listener for the new "Back" button
        document.querySelector('.back-to-dashboard').addEventListener('click', (e) => {
            e.preventDefault();
            showPage('dashboardPage');
        });
    }

    /**
     * Handles the user login process.
     * @param {Event} event - The form submission event.
     */
    function handleLogin(event) {
        event.preventDefault();
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        // Simple mock authentication logic
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

    /**
     * Sets up the main application view after a successful login.
     */
    function initializeApp() {
        loginPage.classList.remove('active');
        mainApp.classList.remove('hidden');
        document.getElementById('usernameDisplay').textContent = currentUser.username;
        document.getElementById('welcomeName').textContent = currentUser.username;

        // Show/hide admin links based on user role
        if (currentUser.role === 'admin') {
            adminDashboardLink.classList.remove('hidden');
            adminDashboardLinkMobile.classList.remove('hidden');
            showPage('adminPage');
        } else {
            adminDashboardLink.classList.add('hidden');
            adminDashboardLinkMobile.classList.add('hidden');
            showPage('dashboardPage');
        }
        lucide.createIcons(); // Render all icons for the main app
    }

    /**
     * Handles the user logout process.
     */
    function handleLogout() {
        currentUser = null;
        mainApp.classList.add('hidden');
        loginPage.classList.add('active');
        document.getElementById('loginForm').reset();
        loginError.textContent = '';
    }

    // --- Event Listeners Setup ---
    loginForm.addEventListener('submit', handleLogin);
    
    // Quick-login link for admin
    adminLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('username').value = 'admin@school.in';
        document.getElementById('password').value = 'admin123';
        loginForm.dispatchEvent(new Event('submit'));
    });

    // Navigation links (main and mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(e.currentTarget.dataset.page);
            mobileMenu.classList.add('hidden'); // Close mobile menu on nav click
        });
    });

    // Disaster cards on the dashboard
    disasterCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();
            showPage(e.currentTarget.dataset.page);
        });
    });

    // Logout button
    logoutButton.addEventListener('click', handleLogout);

    // Mobile menu toggle button
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Initial render of icons on the login page
    lucide.createIcons();
});

