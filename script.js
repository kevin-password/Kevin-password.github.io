// Wait for the HTML to load, then fetch the data
document.addEventListener("DOMContentLoaded", () => {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            // 1. Update Hero Section
            document.getElementById('hero-name').innerText = data.name;
            document.getElementById('hero-title').innerText = data.title;
            document.getElementById('hero-location').innerText = `📍 ${data.location}`;
            document.getElementById('email-link').href = `mailto:${data.email}`;
            document.getElementById('email-link').innerText = `✉️ ${data.email}`;
            document.getElementById('phone-link').href = `tel:${data.phone}`;
            document.getElementById('phone-link').innerText = `📞 ${data.phone}`;
            document.getElementById('about-text').innerText = data.about;

            // 2. Build Education Timeline
            const eduContainer = document.getElementById('education-container');
            data.education.forEach(edu => {
                eduContainer.innerHTML += `
                    <div class="timeline-item">
                        <h3>${edu.degree}</h3>
                        <div class="institution">${edu.school}</div>
                        <div class="date">${edu.date}</div>
                    </div>`;
            });

            // 3. Build Experience Timeline
            const expContainer = document.getElementById('experience-container');
            data.experience.forEach(exp => {
                let bulletPoints = exp.details.map(detail => `<li>${detail}</li>`).join('');
                expContainer.innerHTML += `
                    <div class="timeline-item">
                        <h3>${exp.role}</h3>
                        <div class="institution">${exp.company}</div>
                        <div class="date">${exp.date}</div>
                        <ul>${bulletPoints}</ul>
                    </div>`;
            });

            // 4. Build Skills Tags
            const skillsContainer = document.getElementById('skills-container');
            data.skills.forEach(skill => {
                skillsContainer.innerHTML += `<span class="skill-tag">${skill}</span>`;
            });
        })
        .catch(error => console.error('Error loading CV data:', error));
});
