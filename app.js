import { db } from './db.js';

async function initApp() {
    try {
        await db.init();
        await seedInitialData(); // Automatically loads your CV data!
        
        if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js');
        lucide.createIcons();
        setupThemeToggle();
        setupMobileMenu();
        
        handleRouting();
        window.addEventListener('hashchange', handleRouting);
    } catch (error) {
        console.error('Failed to initialize LifeOS:', error);
    }
}

// MAGIC: Seeds your CV data into the app on first load
async function seedInitialData() {
    const academic = await db.getAll('academic');
    if (academic.length === 0) {
        await db.add('academic', { type: 'education', degree: 'Bachelor of Medicine and Bachelor of Surgery (MBChB)', school: 'Kabale University, Uganda', date: 'Aug 2024 – Present' });
        await db.add('academic', { type: 'education', degree: 'Uganda Advanced Certificate of Education (UACE)', school: 'Standard College Ntungamo', date: '2022 – 2023' });
        await db.add('academic', { type: 'education', degree: 'Uganda Certificate of Education (UCE)', school: 'Kitabi Seminary', date: '2017 – 2020' });
        
        const skills = ['Research Methodology', 'Basic Python Programming', 'LaTeX and Overleaf', 'Microsoft Office Suite', 'Scientific Literature Search', 'Ubuntu Linux'];
        for (const skill of skills) {
            await db.add('academic', { type: 'skill', name: skill });
        }
    }
}

function handleRouting() {
    const hash = window.location.hash.slice(1) || 'dashboard';
    const contentArea = document.getElementById('app-content');
    const pageTitle = document.getElementById('page-title');
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('bg-brand-500/10', 'text-brand-500');
        if (link.getAttribute('href') === `#${hash}`) link.classList.add('bg-brand-500/10', 'text-brand-500');
    });

    contentArea.innerHTML = `<div class="flex items-center justify-center h-full"><div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div></div>`;

    import(`./modules/${hash}.js`)
        .then(module => {
            pageTitle.textContent = module.title || hash.charAt(0).toUpperCase() + hash.slice(1);
            module.render(contentArea);
            lucide.createIcons();
        })
        .catch(err => {
            contentArea.innerHTML = `<div class="text-center text-slate-500 mt-20"><h2 class="text-2xl font-bold">Module Not Found</h2><p>The '${hash}' module is under construction.</p></div>`;
        });
}

function setupThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const theme = localStorage.getItem('lifeos-theme') || 'dark';
    html.classList.toggle('dark', theme === 'dark');
    updateThemeIcons(theme);

    toggle.addEventListener('click', () => {
        const isDark = html.classList.toggle('dark');
        localStorage.setItem('lifeos-theme', isDark ? 'dark' : 'light');
        updateThemeIcons(isDark ? 'dark' : 'light');
    });
}

function updateThemeIcons(theme) {
    document.querySelector('.theme-icon-dark').classList.toggle('hidden', theme === 'light');
    document.querySelector('.theme-icon-light').classList.toggle('hidden', theme === 'dark');
}

// SIDEBAR FIX: Opens on menu click, closes on nav link click
function setupMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full'); // Auto-close!
        });
    });
}

initApp();    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('bg-brand-500/10', 'text-brand-500');
        if (link.getAttribute('href') === `#${hash}`) {
            link.classList.add('bg-brand-500/10', 'text-brand-500');
        }
    });

    // Lazy load modules
    contentArea.innerHTML = `<div class="flex items-center justify-center h-full"><div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div></div>`;

    import(`./modules/${hash}.js`)
        .then(module => {
            pageTitle.textContent = module.title || hash.charAt(0).toUpperCase() + hash.slice(1);
            module.render(contentArea);
            lucide.createIcons(); // Re-render icons for new content
        })
        .catch(err => {
            console.error(`Module ${hash} not found`, err);
            contentArea.innerHTML = `<div class="text-center text-slate-500 mt-20"><h2 class="text-2xl font-bold">Module Not Found</h2><p>The '${hash}' module is under construction.</p></div>`;
        });
}

// 3. Theme Toggle
function setupThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Load preference
    const theme = localStorage.getItem('lifeos-theme') || 'dark';
    html.classList.toggle('dark', theme === 'dark');
    updateThemeIcons(theme);

    toggle.addEventListener('click', () => {
        const isDark = html.classList.toggle('dark');
        localStorage.setItem('lifeos-theme', isDark ? 'dark' : 'light');
        updateThemeIcons(isDark ? 'dark' : 'light');
    });
}

function updateThemeIcons(theme) {
    document.querySelector('.theme-icon-dark').classList.toggle('hidden', theme === 'light');
    document.querySelector('.theme-icon-light').classList.toggle('hidden', theme === 'dark');
}

// 4. Mobile Menu
function setupMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    toggle.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
    });
}

// Start the engine
initApp();
