// modules/habits.js
import { db } from '../db.js';

export const title = 'Habit Tracker';

export async function render(container) {
    const habits = await db.getAll('habits');
    const today = new Date().toISOString().split('T')[0];

    container.innerHTML = `
        <div class="space-y-6">
            <div class="flex justify-between items-center">
                <h2 class="text-2xl font-bold">Daily Habits</h2>
                <button id="add-habit-btn" class="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition flex items-center gap-2">
                    <i data-lucide="plus" class="w-4 h-4"></i> New Habit
                </button>
            </div>

            <div id="habits-list" class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${habits.length === 0 ? '<p class="text-slate-500 col-span-2 text-center py-10">No habits yet. Create your first one!</p>' : ''}
                ${habits.map(habit => renderHabitCard(habit, today)).join('')}
            </div>
        </div>

        <!-- Modal for adding habits -->
        <div id="habit-modal" class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
            <div class="bg-white dark:bg-slate-900 rounded-xl p-6 w-full max-w-md border border-slate-200 dark:border-slate-800">
                <h3 class="text-xl font-bold mb-4">Create New Habit</h3>
                <form id="habit-form" class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium mb-1">Habit Name</label>
                        <input type="text" name="name" required class="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-medium mb-1">Category</label>
                        <select name="category" class="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-brand-500 outline-none">
                            <option value="health">Health</option>
                            <option value="productivity">Productivity</option>
                            <option value="learning">Learning</option>
                            <option value="mindfulness">Mindfulness</option>
                        </select>
                    </div>
                    <div class="flex gap-3 pt-2">
                        <button type="button" id="close-modal" class="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition">Cancel</button>
                        <button type="submit" class="flex-1 px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition">Create</button>
                    </div>
                </form>
            </div>
        </div>
    `;

    setupEventListeners();
}

function renderHabitCard(habit, today) {
    const isCompleted = habit.date === today && habit.completed;
    return `
        <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:shadow-lg transition">
            <div class="flex items-center gap-4">
                <button class="toggle-habit w-8 h-8 rounded-full border-2 ${isCompleted ? 'bg-green-500 border-green-500' : 'border-slate-300 dark:border-slate-600'} flex items-center justify-center transition" data-id="${habit.id}">
                    ${isCompleted ? '<i data-lucide="check" class="w-4 h-4 text-white"></i>' : ''}
                </button>
                <div>
                    <h4 class="font-semibold ${isCompleted ? 'line-through text-slate-400' : ''}">${habit.name}</h4>
                    <p class="text-xs text-slate-500 capitalize">${habit.category} • ${habit.streak || 0} day streak</p>
                </div>
            </div>
            <button class="delete-habit p-2 text-slate-400 hover:text-red-500 transition" data-id="${habit.id}">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
        </div>
    `;
}

function setupEventListeners() {
    const modal = document.getElementById('habit-modal');
    const form = document.getElementById('habit-form');

    document.getElementById('add-habit-btn').addEventListener('click', () => modal.classList.remove('hidden'));
    document.getElementById('close-modal').addEventListener('click', () => modal.classList.add('hidden'));

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        await db.add('habits', {
            name: formData.get('name'),
            category: formData.get('category'),
            date: new Date().toISOString().split('T')[0],
            completed: false,
            streak: 0
        });
        modal.classList.add('hidden');
        form.reset();
        render(document.getElementById('app-content')); // Re-render
    });

    document.querySelectorAll('.toggle-habit').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = parseInt(btn.dataset.id);
            const habits = await db.getAll('habits');
            const habit = habits.find(h => h.id === id);
            habit.completed = !habit.completed;
            habit.date = new Date().toISOString().split('T')[0];
            if(habit.completed) habit.streak = (habit.streak || 0) + 1;
            await db.update('habits', habit);
            render(document.getElementById('app-content'));
        });
    });

    document.querySelectorAll('.delete-habit').forEach(btn => {
        btn.addEventListener('click', async () => {
            await db.delete('habits', parseInt(btn.dataset.id));
            render(document.getElementById('app-content'));
        });
    });
}
