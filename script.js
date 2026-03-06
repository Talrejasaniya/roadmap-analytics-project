// Function to push events to GTM/GA4
function pushEvent(name, params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
        'event': name,
        ...params
    });
    console.log("Event Sent to GA4:", name, params);
}

// 1. NAVIGATION & REDIRECTION LOGIC
// Instead of a modal, we redirect users to the project page with the topic as a URL parameter
function navigateToRoadmap(topicName) {

    pushEvent('career_select', {
        'career_name': topicName
    });

    window.location.href = `project.html?topic=${topicName}`;
}

// 2. DETAILED ROADMAP DATA (For SQL, Python, Git, Data Analysis)
const roadmapContent = {
    'SQL': {
        'Beginner': ['SELECT Basics', 'Filtering Data', 'INSERT/UPDATE/DELETE'],
        'Intermediate': ['Joins & Unions', 'Aggregations', 'Data Constraints'],
        'Advanced': ['Window Functions', 'Subqueries', 'Query Optimization']
    },
    'Python': {
        'Beginner': ['Syntax & Variables', 'Lists & Dictionaries', 'Loops & Conditionals'],
        'Intermediate': ['Functions', 'Modules & Pip', 'Error Handling'],
        'Advanced': ['Pandas & NumPy', 'Classes (OOP)', 'Data Visualization']
    },
    'Git': {
        'Beginner': ['What is Git?', 'Repositories & Init', 'Basic Commits'],
        'Intermediate': ['Branching Basics', 'Merging', 'Pull Requests'],
        'Advanced': ['Git Rebase', 'GitHub Actions', 'Rewriting History']
    },
    'DataAnalyst': {
        'Phase 1: Foundation': ['Data Collection', 'Statistics Basics', 'Excel for Data'],
        'Phase 2: Processing': ['Data Cleanup', 'EDA Techniques', 'Python for Analysis'],
        'Phase 3: Advanced': ['Machine Learning Intro', 'Big Data Tools', 'Reporting & Dashboards']
    }
};

// 3. DYNAMIC RENDERING LOGIC (To be used in project.html)
function renderRoadmap(topic) {
    const container = document.getElementById('roadmap-render-area');
    const data = roadmapContent[topic];

    if (!data) return;

    Object.keys(data).forEach(level => {
        // Create Phase Header (Beginner/Intermediate/Advanced)
        const header = document.createElement('div');
        header.className = 'phase-tag';
        header.innerText = level;
        container.appendChild(header);

        // Create the vertical flow wrapper
        const flow = document.createElement('div');
        flow.className = 'roadmap-flow';

        data[level].forEach(skill => {
            const step = document.createElement('div');
            step.className = 'roadmap-step';
            step.innerHTML = `<div class="node-box">${skill}</div>`;
            
            // Interaction Tracking
            step.onclick = () => {
                showDetails(skill, level, topic);
                
                // Important for your analysis!
                pushEvent('roadmap_interaction', {
                    'skill_level': level,
                    'skill_name': skill,
                    'category': topic
                });
            };
            flow.appendChild(step);
        });
        container.appendChild(flow);
    });
}

function showDetails(title, level, category) {
    const panel = document.getElementById('details-panel');
    document.getElementById('panel-title').innerText = title;
    document.getElementById('panel-desc').innerText = `This is a key part of the ${level} curriculum in ${category}. Mastery of this topic is required for progression.`;
    panel.style.display = 'block';
}