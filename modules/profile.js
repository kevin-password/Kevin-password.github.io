import { db } from '../db.js';
export const title = 'My Profile';
export async function render(container) {
    const data = await db.getAll('academic');
    const skills = data.filter(d => d.type === 'skill');
    container.innerHTML = `
        <div class="space-y-6">
            <div class="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                <div class="w-24 h-24 mx-auto bg-gradient-to-br from-brand-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mb-4">KT</div>
                <h2 class="text-2xl font-bold">Kevin Tumusiime</h2>
                <p class="text-brand-500 font-medium">MBChB Student | Medical Researcher</p>
                <p class="text-slate-500 text-sm mt-1">Kabale, Uganda</p>
            </div>
            <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800">
                <h3 class="text-xl font-bold mb-4">Technical Skills</h3>
                <div class="flex flex-wrap gap-2">
                    ${skills.map(s => `<span class="px-3 py-1 bg-brand-500/10 text-brand-500 rounded-full text-sm font-medium">${s.name}</span>`).join('')}
                </div>
            </div>
        </div>`;
}
