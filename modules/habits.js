import { db } from '../db.js';
export const title = 'Habit Tracker';
export async function render(container) {
    const habits = await db.getAll('habits');
    container.innerHTML = `
        <div class="space-y-6">
            <h2 class="text-2xl font-bold">Daily Habits</h2>
            <div id="habits-list" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${habits.length === 0 ? '<p class="text-slate-500 col-span-2 text-center py-10">No habits yet.</p>' : ''}
                ${habits.map(h => `<div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">${h.name}</div>`).join('')}
            </div>
        </div>`;
}
