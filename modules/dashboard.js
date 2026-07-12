import { db } from '../db.js';
export const title = 'Dashboard';
export async function render(container) {
    container.innerHTML = `
        <div class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                    <p class="text-sm text-slate-500">Status</p>
                    <p class="text-2xl font-bold text-green-500">Online</p>
                </div>
                <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                    <p class="text-sm text-slate-500">Current Focus</p>
                    <p class="text-2xl font-bold">MBChB Studies</p>
                </div>
            </div>
            <div class="bg-gradient-to-r from-brand-500/10 to-purple-500/10 p-6 rounded-xl border border-brand-500/20">
                <h3 class="text-lg font-semibold mb-2">Welcome to LifeOS, Kevin!</h3>
                <p class="text-slate-600 dark:text-slate-300">Your academic data and skills have been automatically loaded from your CV. Navigate to "My Profile" or "Academic" to see them.</p>
            </div>
        </div>`;
}            <!-- AI Recommendations -->
            <div class="bg-gradient-to-r from-brand-500/10 to-purple-500/10 p-6 rounded-xl border border-brand-500/20">
                <h3 class="text-lg font-semibold mb-2 flex items-center gap-2">
                    <i data-lucide="sparkles" class="w-5 h-5 text-brand-500"></i> AI Coach Recommendations
                </h3>
                <ul class="space-y-2 text-slate-600 dark:text-slate-300">
                    <li class="flex items-start gap-2"><i data-lucide="check" class="w-4 h-4 mt-1 text-green-500"></i> You are on a 5-day streak for morning workouts. Keep it up!</li>
                    <li class="flex items-start gap-2"><i data-lucide="alert-circle" class="w-4 h-4 mt-1 text-yellow-500"></i> Your screen time increased by 15% yesterday. Try the Pomodoro timer today.</li>
                    <li class="flex items-start gap-2"><i data-lucide="info" class="w-4 h-4 mt-1 text-blue-500"></i> You have 3 pending assignments due this week. Block 2 hours today.</li>
                </ul>
            </div>
        </div>
    `;

    initCharts(finance);
}

function renderStatCard(title, value, icon, color) {
    const colors = {
        brand: 'bg-brand-500/10 text-brand-500',
        green: 'bg-green-500/10 text-green-500',
        purple: 'bg-purple-500/10 text-purple-500',
        orange: 'bg-orange-500/10 text-orange-500'
    };
    return `
        <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
            <div class="flex items-center justify-between mb-4">
                <span class="text-sm font-medium text-slate-500 dark:text-slate-400">${title}</span>
                <div class="p-2 rounded-lg ${colors[color]}">
                    <i data-lucide="${icon}" class="w-5 h-5"></i>
                </div>
            </div>
            <p class="text-2xl font-bold">${value}</p>
        </div>
    `;
}

function calculateNetWorth(finance) {
    return finance.reduce((acc, item) => {
        return item.type === 'income' ? acc + item.amount : acc - item.amount;
    }, 0).toLocaleString();
}

function initCharts(finance) {
    // Discipline Chart
    const ctx1 = document.getElementById('disciplineChart').getContext('2d');
    new Chart(ctx1, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Score',
                data: [65, 72, 80, 75, 90, 85, 92],
                borderColor: '#0ea5e9',
                backgroundColor: 'rgba(14, 165, 233, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });

    // Finance Chart
    const ctx2 = document.getElementById('financeChart').getContext('2d');
    new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Income', 'Expenses', 'Savings'],
            datasets: [{
                data: [5000, 3200, 1800],
                backgroundColor: ['#10b981', '#ef4444', '#8b5cf6']
            }]
        },
        options: { responsive: true, cutout: '70%' }
    });
}
