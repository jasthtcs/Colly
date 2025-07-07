document.addEventListener('DOMContentLoaded', function() {

    const themes = [
        { name: 'Ube Delight', className: 'theme-default', color: '#7F5AF0' },
        { name: 'Crimson Crush', className: 'theme-crimson', color: '#D32F2F' },
        { name: 'Midnight Depths', className: 'theme-midnight', color: '#1E88E5' },
        { name: 'Emerald Fields', className: 'theme-emerald', color: '#43A047' },
        { name: 'Golden Hour', className: 'theme-golden', color: '#FFB300' }
    ];

    const masterSchedule = [
        { day: 1, milestoneStart: 4, task: 'Outbound Call'}, { day: 12, milestoneStart: 12, task: 'Outbound Call'},
        { day: 13, milestoneStart: 12, task: 'Send SMS'}, { day: 15, milestoneStart: 12, task: 'Outbound Call'},
        { day: 17, milestoneStart: 17, task: 'Send Letter'}, { day: 19, milestoneStart: 17, task: 'Outbound Call'},
        { day: 21, milestoneStart: 17, task: 'Outbound Call'}, { day: 23, milestoneStart: 23, task: 'Outbound Call'},
        { day: 26, milestoneStart: 23, task: 'Send SMS'}, { day: 30, milestoneStart: 23, task: 'Outbound Call'},
        { day: 33, milestoneStart: 33, task: 'Send Email'}, { day: 36, milestoneStart: 33, task: 'Outbound Call'},
        { day: 39, milestoneStart: 33, task: 'Outbound Call'}, { day: 41, milestoneStart: 41, task: 'Send Email'},
        { day: 47, milestoneStart: 41, task: 'Outbound Call'}, { day: 55, milestoneStart: 55, task: 'Outbound Call'},
        { day: 58, milestoneStart: 55, task: 'Send SMS'}, { day: 60, milestoneStart: 55, task: 'Outbound Call'},
        { day: 63, milestoneStart: 55, task: 'Outbound Call'}, { day: 65, milestoneStart: 65, task: 'S6Q1'},
        { day: 75, milestoneStart: 65, task: 'Outbound Call'}, { day: 85, milestoneStart: 85, task: 'Outbound Call'},
        { day: 95, milestoneStart: 95, task: 'S6Q2'}, { day: 115, milestoneStart: 115, task: 'Outbound Call'},
        { day: 135, milestoneStart: 115, task: 'Outbound Call'}, { day: 155, milestoneStart: 115, task: 'S61D'},
        { day: 170, milestoneStart: 115, task: 'Outbound Call'},
    ];
    const specialMarkers = [
        { start: 65, end: 85, marker: 'S6Q1' }, { start: 95, end: 154, marker: 'S6Q2' },
        { start: 155, end: 169, marker: 'S21D' }, { start: 170, end: Infinity, marker: 'DEFAULT list' }
    ];

    const dayForm = document.getElementById('day-form');
    const dayInput = document.getElementById('day-input');
    const milestoneTitleEl = document.getElementById('milestone-title');
    const nextActionEl = document.getElementById('next-action');
    const taskItem1 = document.getElementById('task-item-1');
    const taskText1 = document.getElementById('task-text-1');
    const taskItem2 = document.getElementById('task-item-2');
    const taskText2 = document.getElementById('task-text-2');
    const followUpDayEl = document.getElementById('follow-up-day');
    const followUpMonthEl = document.getElementById('follow-up-month');
    const followUpYearEl = document.getElementById('follow-up-year');
    const settingsButton = document.getElementById('settings-button');
    const themeMenu = document.getElementById('theme-menu');
    const themeSwatchesContainer = document.getElementById('theme-swatches');
    const darkModeSwitch = document.getElementById('dark-mode-switch');
    const themeNameDisplay = document.getElementById('theme-name-display');

    let activeTheme;

    function getMilestone(currentDay) { let milestoneDay = 4; for (const event of masterSchedule) { if (currentDay >= event.day) { milestoneDay = event.milestoneStart; } } let markerTitle = `Day ${milestoneDay} Milestone`; for (const marker of specialMarkers) { if (currentDay >= marker.start && currentDay <= marker.end) { if (marker.marker === 'S21D' || marker.marker === 'DEFAULT list') milestoneDay = 115; markerTitle = `Milestone ${milestoneDay} (${marker.marker})`; break; } } return markerTitle; }
    function getTodaysTasks(currentDay) { const importantDay = masterSchedule.find(event => event.day === currentDay); const tasks = importantDay ? importantDay.task : 'Outbound Call'; return tasks.split(' / '); }
    function getFollowUpInfo(currentDay) { const nextImportantDay = masterSchedule.find(event => event.day > currentDay); if (!nextImportantDay) { return { date: null, action: 'None' }; } const daysUntil = nextImportantDay.day - currentDay; const today = new Date(); const followUpDate = new Date(today); followUpDate.setDate(today.getDate() + daysUntil); const nextAction = nextImportantDay.task; return { date: followUpDate, action: nextAction }; }

    function updateUI() {
        const day = parseInt(dayInput.value, 10);
        if (isNaN(day) || day < 1) {
            milestoneTitleEl.textContent = 'Enter a Day';
            followUpDayEl.textContent = '—';
            followUpMonthEl.textContent = '';
            followUpYearEl.textContent = '';
            nextActionEl.textContent = '—';
            taskItem1.style.display = 'none';
            taskItem2.style.display = 'none';
            return;
        }

        const milestone = getMilestone(day);
        const tasks = getTodaysTasks(day);
        const followUp = getFollowUpInfo(day);

        milestoneTitleEl.textContent = milestone;
        nextActionEl.textContent = followUp.action;

        if (followUp.date) {
            followUpDayEl.textContent = followUp.date.getDate().toString();
            followUpMonthEl.textContent = followUp.date.toLocaleDateString('en-GB', { month: 'short' });
            followUpYearEl.textContent = followUp.date.getFullYear().toString();
        } else {
            followUpDayEl.textContent = '—';
            followUpMonthEl.textContent = '';
            followUpYearEl.textContent = '';
        }

        taskItem1.style.display = 'flex';
        taskText1.textContent = tasks[0];
        if (tasks.length > 1) {
            taskText2.textContent = tasks[1];
            taskItem2.style.display = 'flex';
        } else {
            taskItem2.style.display = 'none';
        }
    }

    dayForm.addEventListener('submit', function(e) {
        e.preventDefault();
        updateUI();
    });
    
    function applyTheme(themeClassName) {
        document.body.classList.remove(...themes.map(t => t.className));
        if (themeClassName !== 'theme-default') {
            document.body.classList.add(themeClassName);
        }
        localStorage.setItem('selectedTheme', themeClassName);
        updateActiveSwatch(themeClassName);
        
        activeTheme = themes.find(t => t.className === themeClassName);
        if (activeTheme) {
            themeNameDisplay.textContent = activeTheme.name;
            themeNameDisplay.style.color = activeTheme.color;
        }
    }
    
    function updateActiveSwatch(activeClassName) { document.querySelectorAll('.swatch').forEach(swatch => { swatch.classList.toggle('active', swatch.dataset.themeClass === activeClassName); }); }
    
    themes.forEach(theme => {
        const swatch = document.createElement('button');
        swatch.className = 'swatch';
        swatch.title = theme.name; 
        swatch.style.backgroundColor = theme.color;
        swatch.style.color = theme.color;
        swatch.dataset.themeClass = theme.className;
        
        swatch.addEventListener('click', () => applyTheme(theme.className));

        swatch.addEventListener('mouseover', () => {
            themeNameDisplay.textContent = theme.name;
            themeNameDisplay.style.color = theme.color;
        });
        swatch.addEventListener('mouseout', () => {
            if (activeTheme) {
                themeNameDisplay.textContent = activeTheme.name;
                themeNameDisplay.style.color = activeTheme.color;
            }
        });

        themeSwatchesContainer.appendChild(swatch);
    });

    settingsButton.addEventListener('click', () => themeMenu.classList.toggle('hidden'));
    darkModeSwitch.addEventListener('change', () => { document.body.classList.toggle('dark-mode', darkModeSwitch.checked); localStorage.setItem('mode', darkModeSwitch.checked ? 'dark' : 'light'); });
    
    const savedTheme = localStorage.getItem('selectedTheme') || 'theme-default';
    applyTheme(savedTheme);
    if (localStorage.getItem('mode') === 'dark') { document.body.classList.add('dark-mode'); darkModeSwitch.checked = true; }
    
    updateUI();
});