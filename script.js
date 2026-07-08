document.addEventListener("DOMContentLoaded", () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // 1. Update Hero & About Section
            document.getElementById('hero-name').innerText = data.name;
            document.getElementById('hero-title').innerText = data.title;
            document.getElementById('hero-location').innerText = `📍 ${data.location}`;
            document.getElementById('email-link').href = `mailto:${data.email}`;
            document.getElementById('email-link').innerText = `✉️ Email`;
            document.getElementById('phone-link').href = `tel:${data.phone}`;
            document.getElementById('phone-link').innerText = `📞 Phone`;
            document.getElementById('about-text').innerText = data.about;

            // 2. Build Education Timeline (with Tailwind classes)
            const eduContainer = document.getElementById('education-container');
            data.education.forEach(edu => {
                eduContainer.innerHTML += `
                    <div class="mb-10 relative">
                        <div class="absolute -left-[41px] top-1 w-3 h-3 bg-accent rounded-full shadow-[0_0_0_4px_#0f172a]"></div>
                        <h3 class="text-xl font-semibold mb-1 text-white">${edu.degree}</h3>
                        <div class="text-accent font-medium">${edu.school}</div>
                        <div class="text-slate-400 text-sm italic mb-2">${edu.date}</div>
                    </div>`;
            });

            // 3. Build Experience Timeline (with Tailwind classes)
            const expContainer = document.getElementById('experience-container');
            data.experience.forEach(exp => {
                let bulletPoints = exp.details.map(detail => `<li class="mb-2">${detail}</li>`).join('');
                expContainer.innerHTML += `
                    <div class="mb-10 relative">
                        <div class="absolute -left-[41px] top-1 w-3 h-3 bg-accent rounded-full shadow-[0_0_0_4px_#0f172a]"></div>
                        <h3 class="text-xl font-semibold mb-1 text-white">${exp.role}</h3>
                        <div class="text-accent font-medium">${exp.company}</div>
                        <div class="text-slate-400 text-sm italic mb-2">${exp.date}</div>
                        <ul class="pl-5 text-slate-400 list-disc mt-2">${bulletPoints}</ul>
                    </div>`;
            });

            // 4. Build Skills Tags (with Tailwind classes)
            const skillsContainer = document.getElementById('skills-container');
            data.skills.forEach(skill => {
                skillsContainer.innerHTML += `<span class="bg-indigo-500/15 text-accent px-4 py-2 rounded-full text-sm border border-indigo-500/30 hover:bg-accent hover:text-white transition cursor-default">${skill}</span>`;
            });
        })
        .catch(error => console.error('Error loading CV data:', error));
});
