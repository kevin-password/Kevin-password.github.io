import { db } from '../db.js';
export const title = 'Academic';
export async function render(container) {
    const data = await db.getAll('academic');
    const education = data.filter(d => d.type === 'education');
    container.innerHTML = `
        <div class="space-y-6">
            <h2 class="text-2xl font-bold mb-6">Education Journey</h2>
            <div class="space-y-4">
                ${education.map(edu => `
                    <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                        <h3 class="text-lg font-bold text-brand-500">${edu.degree}</h3>
                        <p class="text-slate-600 dark:text-slate-400">${edu.school}</p>
                        <p class="text-sm text-slate-500 mt-1">${edu.date}</p>
                    </div>
                `).join('')}
            </div>
        </div>`;
}
