// DevOps Learning Agent - Main Application Logic
class DevOpsLearningAgent {
    constructor() {
        this.currentUser = {
            id: 'user_001',
            name: 'DevOps Learner',
            level: 1,
            currentXP: 0,
            nextLevelXP: 1000,
            completedModules: [],
            achievementsEarned: [],
            streakDays: 0,
            selectedPath: null,
            assessmentCompleted: false,
            currentModuleId: null
        };

        this.assessmentData = {
            questions: [
                {
                    id: 1,
                    question: "What is the primary goal of DevOps?",
                    options: [
                        "To replace system administrators",
                        "To bridge development and operations teams",
                        "To eliminate manual testing",
                        "To reduce development costs"
                    ],
                    correct: 1,
                    category: "foundations"
                },
                {
                    id: 2,
                    question: "Which command shows running processes in Linux?",
                    options: ["ls -la", "ps aux", "grep process", "find /proc"],
                    correct: 1,
                    category: "linux"
                },
                {
                    id: 3,
                    question: "What does CI stand for in DevOps?",
                    options: [
                        "Computer Integration",
                        "Continuous Implementation", 
                        "Continuous Integration",
                        "Code Intelligence"
                    ],
                    correct: 2,
                    category: "cicd"
                }
            ],
            currentQuestion: 0,
            selectedAnswers: [],
            score: 0
        };

        this.learningData = {
            modules: [
                {
                    id: 1,
                    title: "DevOps Foundations",
                    description: "Master fundamental DevOps principles and culture",
                    duration: "2-3 weeks",
                    difficulty: "Beginner",
                    topics: [
                        "DevOps Philosophy and Culture",
                        "SDLC and DevOps Lifecycle", 
                        "Linux Fundamentals",
                        "Command Line Mastery",
                        "Networking Basics",
                        "Version Control with Git"
                    ],
                    projects: [
                        "Set up personal development environment",
                        "Create first Git repository with branching strategy",
                        "Linux system administration tasks"
                    ],
                    prerequisites: [],
                    xpReward: 500,
                    badges: ["Foundation Explorer", "Linux Warrior", "Git Master"],
                    progress: 0,
                    unlocked: true
                },
                {
                    id: 2,
                    title: "Development & Collaboration", 
                    description: "Learn programming essentials and team collaboration",
                    duration: "3-4 weeks",
                    difficulty: "Beginner",
                    topics: [
                        "Python Programming Basics",
                        "Bash Scripting",
                        "Code Quality and Testing",
                        "Agile Methodologies",
                        "Collaboration Tools"
                    ],
                    projects: [
                        "Build automation scripts in Python",
                        "Create comprehensive test suite",
                        "Implement Agile workflow simulation"
                    ],
                    prerequisites: [1],
                    xpReward: 750,
                    badges: ["Code Crafter", "Team Player", "Quality Guardian"],
                    progress: 0,
                    unlocked: false
                },
                {
                    id: 3,
                    title: "CI/CD Pipelines",
                    description: "Master continuous integration and deployment",
                    duration: "4-5 weeks", 
                    difficulty: "Intermediate",
                    topics: [
                        "CI/CD Fundamentals",
                        "Jenkins Automation",
                        "GitLab CI/CD",
                        "GitHub Actions",
                        "Pipeline Design Patterns",
                        "Automated Testing Integration"
                    ],
                    projects: [
                        "Build complete Jenkins CI/CD pipeline",
                        "Implement multi-branch workflow",
                        "Create automated deployment pipeline"
                    ],
                    prerequisites: [1, 2],
                    xpReward: 1000,
                    badges: ["Pipeline Architect", "Automation Expert", "CI/CD Champion"],
                    progress: 0,
                    unlocked: false
                },
                {
                    id: 4,
                    title: "Containerization",
                    description: "Learn Docker and container technologies",
                    duration: "3-4 weeks",
                    difficulty: "Intermediate", 
                    topics: [
                        "Docker Fundamentals",
                        "Container Lifecycle Management",
                        "Docker Compose",
                        "Container Registry Management",
                        "Security Best Practices"
                    ],
                    projects: [
                        "Containerize web application",
                        "Multi-container application with Docker Compose",
                        "Set up private Docker registry"
                    ],
                    prerequisites: [2, 3],
                    xpReward: 900,
                    badges: ["Container Captain", "Docker Ninja", "Registry Master"],
                    progress: 0,
                    unlocked: false
                },
                {
                    id: 5,
                    title: "Kubernetes Orchestration",
                    description: "Master container orchestration with Kubernetes",
                    duration: "5-6 weeks",
                    difficulty: "Advanced",
                    topics: [
                        "Kubernetes Architecture",
                        "Pod and Service Management", 
                        "Deployments and Scaling",
                        "ConfigMaps and Secrets",
                        "Helm Charts",
                        "Ingress and Networking"
                    ],
                    projects: [
                        "Deploy microservices application to Kubernetes",
                        "Implement auto-scaling and load balancing",
                        "Create Helm chart for application deployment"
                    ],
                    prerequisites: [3, 4],
                    xpReward: 1200,
                    badges: ["Kubernetes Captain", "Orchestration Expert", "Helm Hero"],
                    progress: 0,
                    unlocked: false
                }
            ],

            achievements: [
                {
                    id: "first_steps",
                    name: "First Steps",
                    description: "Complete your first lesson",
                    icon: "🚀",
                    xpValue: 50,
                    earned: false
                },
                {
                    id: "week_warrior",
                    name: "Week Warrior", 
                    description: "Learn for 7 consecutive days",
                    icon: "⚡",
                    xpValue: 200,
                    earned: false
                },
                {
                    id: "project_pioneer",
                    name: "Project Pioneer",
                    description: "Complete your first hands-on project", 
                    icon: "🏗️",
                    xpValue: 300,
                    earned: false
                },
                {
                    id: "collaboration_king",
                    name: "Collaboration King",
                    description: "Help 10 fellow learners",
                    icon: "👑", 
                    xpValue: 500,
                    earned: false
                },
                {
                    id: "knowledge_seeker",
                    name: "Knowledge Seeker",
                    description: "Complete all quizzes in a module with 90%+ score",
                    icon: "🎯",
                    xpValue: 400,
                    earned: false
                }
            ],

            learningPaths: [
                {
                    id: "full_stack_devops",
                    name: "Full-Stack DevOps Engineer",
                    description: "Complete journey from beginner to professional DevOps engineer",
                    modules: [1, 2, 3, 4, 5],
                    estimatedDuration: "6-8 months",
                    careerOutcomes: ["DevOps Engineer", "Site Reliability Engineer", "Platform Engineer"]
                },
                {
                    id: "cloud_specialist", 
                    name: "Cloud DevOps Specialist",
                    description: "Focus on cloud-native DevOps practices",
                    modules: [1, 2, 3, 4, 5],
                    estimatedDuration: "4-6 months",
                    careerOutcomes: ["Cloud Engineer", "Cloud DevOps Engineer", "Cloud Architect"]
                },
                {
                    id: "automation_expert",
                    name: "Automation & CI/CD Expert",
                    description: "Specialize in automation and pipeline development", 
                    modules: [1, 2, 3],
                    estimatedDuration: "3-5 months",
                    careerOutcomes: ["Automation Engineer", "CI/CD Specialist", "Release Engineer"]
                }
            ]
        };

        this.quizData = {
            currentQuiz: null,
            currentQuestion: 0,
            selectedAnswers: [],
            score: 0,
            questions: [
                {
                    question: "What is the main benefit of using Infrastructure as Code?",
                    options: [
                        "Faster hardware performance",
                        "Consistent and repeatable deployments",
                        "Lower electricity costs",
                        "Better user interfaces"
                    ],
                    correct: 1
                },
                {
                    question: "Which tool is commonly used for container orchestration?",
                    options: ["Docker", "Jenkins", "Kubernetes", "Ansible"],
                    correct: 2
                },
                {
                    question: "What does 'CI' stand for in CI/CD?",
                    options: [
                        "Code Integration",
                        "Continuous Integration",
                        "Computer Intelligence", 
                        "Cloud Infrastructure"
                    ],
                    correct: 1
                },
                {
                    question: "Which monitoring tool is commonly used with Kubernetes?",
                    options: ["MySQL", "Prometheus", "Apache", "MongoDB"],
                    correct: 1
                },
                {
                    question: "What is the primary purpose of Docker?",
                    options: [
                        "Database management",
                        "Web development",
                        "Application containerization",
                        "Network security"
                    ],
                    correct: 2
                }
            ]
        };

        this.mentorMessages = [
            "Great question! DevOps is all about collaboration between development and operations teams.",
            "That's an excellent observation! Let me explain how CI/CD pipelines work in practice.",
            "You're making fantastic progress! Keep up the great work on your learning journey.",
            "Interesting point! Kubernetes can seem complex at first, but it becomes clearer with hands-on practice.",
            "Perfect! That's exactly how infrastructure as code should work. You're getting it!",
            "Good thinking! Security should always be integrated into the DevOps pipeline from the start.",
            "Absolutely! Monitoring and observability are crucial for maintaining reliable systems.",
            "Excellent! Docker containers make applications much more portable and scalable.",
            "That's a smart approach! Automation is key to reducing manual errors in deployments.",
            "You're on the right track! Version control is fundamental to any DevOps workflow."
        ];

        this.chatExpanded = false;
        this.init();
    }

    init() {
        this.loadUserData();
        this.setupEventListeners();
        this.checkOnboardingStatus();
        this.updateUI();
    }

    loadUserData() {
        const savedUser = localStorage.getItem('devops_user');
        if (savedUser) {
            this.currentUser = { ...this.currentUser, ...JSON.parse(savedUser) };
        }
    }

    saveUserData() {
        localStorage.setItem('devops_user', JSON.stringify(this.currentUser));
    }

    setupEventListeners() {
        // Theme toggle
        document.getElementById('themeToggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Assessment navigation
        document.getElementById('nextQuestion').addEventListener('click', () => {
            this.nextAssessmentQuestion();
        });

        document.getElementById('prevQuestion').addEventListener('click', () => {
            this.prevAssessmentQuestion();
        });

        // Path selection and journey start
        document.getElementById('startJourney').addEventListener('click', () => {
            this.startLearningJourney();
        });

        // Quick actions
        document.getElementById('continueCurrentModule').addEventListener('click', () => {
            this.continueCurrentModule();
        });

        document.getElementById('practiceQuiz').addEventListener('click', () => {
            this.startQuiz();
        });

        // Modal controls
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal('moduleModal');
        });

        document.getElementById('closeQuizModal').addEventListener('click', () => {
            this.closeModal('quizModal');
        });

        document.getElementById('startModule').addEventListener('click', () => {
            this.startSelectedModule();
        });

        // Quiz navigation
        document.getElementById('nextQuizQuestion').addEventListener('click', () => {
            this.nextQuizQuestion();
        });

        document.getElementById('prevQuizQuestion').addEventListener('click', () => {
            this.prevQuizQuestion();
        });

        document.getElementById('closeQuizResults').addEventListener('click', () => {
            this.closeModal('quizModal');
        });

        // Mentor chat - Fixed event listener
        document.getElementById('toggleChat').addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMentorChat();
        });

        document.getElementById('sendMessage').addEventListener('click', () => {
            this.sendMentorMessage();
        });

        document.getElementById('messageInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMentorMessage();
            }
        });

        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.add('hidden');
            }
        });
    }

    checkOnboardingStatus() {
        if (!this.currentUser.assessmentCompleted) {
            document.getElementById('onboardingModal').classList.remove('hidden');
            this.startAssessment();
        } else {
            document.getElementById('dashboard').style.display = 'block';
        }
    }

    startAssessment() {
        this.assessmentData.currentQuestion = 0;
        this.assessmentData.selectedAnswers = [];
        this.renderAssessmentQuestion();
    }

    renderAssessmentQuestion() {
        const question = this.assessmentData.questions[this.assessmentData.currentQuestion];
        const totalQuestions = this.assessmentData.questions.length;
        
        document.getElementById('questionNum').textContent = this.assessmentData.currentQuestion + 1;
        document.getElementById('totalQuestions').textContent = totalQuestions;
        document.getElementById('questionText').textContent = question.question;
        
        const progress = ((this.assessmentData.currentQuestion) / totalQuestions) * 100;
        document.getElementById('assessmentProgress').style.width = `${progress}%`;

        const optionsContainer = document.getElementById('questionOptions');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => {
                this.selectAssessmentOption(index);
            });
            optionsContainer.appendChild(optionElement);
        });

        this.updateAssessmentNavigation();
    }

    selectAssessmentOption(optionIndex) {
        this.assessmentData.selectedAnswers[this.assessmentData.currentQuestion] = optionIndex;
        
        document.querySelectorAll('.option').forEach((option, index) => {
            option.classList.toggle('selected', index === optionIndex);
        });

        document.getElementById('nextQuestion').disabled = false;
    }

    nextAssessmentQuestion() {
        if (this.assessmentData.currentQuestion < this.assessmentData.questions.length - 1) {
            this.assessmentData.currentQuestion++;
            this.renderAssessmentQuestion();
        } else {
            this.completeAssessment();
        }
    }

    prevAssessmentQuestion() {
        if (this.assessmentData.currentQuestion > 0) {
            this.assessmentData.currentQuestion--;
            this.renderAssessmentQuestion();
        }
    }

    updateAssessmentNavigation() {
        const prevButton = document.getElementById('prevQuestion');
        const nextButton = document.getElementById('nextQuestion');
        
        prevButton.disabled = this.assessmentData.currentQuestion === 0;
        
        const hasAnswer = this.assessmentData.selectedAnswers[this.assessmentData.currentQuestion] !== undefined;
        nextButton.disabled = !hasAnswer;
        
        if (this.assessmentData.currentQuestion === this.assessmentData.questions.length - 1) {
            nextButton.textContent = 'Complete Assessment';
        } else {
            nextButton.textContent = 'Next';
        }
    }

    completeAssessment() {
        // Calculate score
        let correctAnswers = 0;
        this.assessmentData.questions.forEach((question, index) => {
            if (this.assessmentData.selectedAnswers[index] === question.correct) {
                correctAnswers++;
            }
        });
        
        this.assessmentData.score = (correctAnswers / this.assessmentData.questions.length) * 100;

        // Hide assessment, show path selection
        document.querySelector('.assessment-container').classList.add('hidden');
        document.getElementById('pathSelection').classList.remove('hidden');
        
        this.renderLearningPaths();
    }

    renderLearningPaths() {
        const pathCards = document.getElementById('pathCards');
        pathCards.innerHTML = '';

        this.learningData.learningPaths.forEach(path => {
            const pathCard = document.createElement('div');
            pathCard.className = 'path-card';
            pathCard.innerHTML = `
                <h4>${path.name}</h4>
                <p>${path.description}</p>
                <div class="path-meta">
                    <span>📅 ${path.estimatedDuration}</span>
                    <span>🎯 ${path.careerOutcomes.length} career paths</span>
                </div>
            `;
            
            pathCard.addEventListener('click', () => {
                this.selectLearningPath(path.id);
            });
            
            pathCards.appendChild(pathCard);
        });
    }

    selectLearningPath(pathId) {
        document.querySelectorAll('.path-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        event.target.closest('.path-card').classList.add('selected');
        this.currentUser.selectedPath = pathId;
    }

    startLearningJourney() {
        if (!this.currentUser.selectedPath) {
            alert('Please select a learning path first!');
            return;
        }

        this.currentUser.assessmentCompleted = true;
        this.currentUser.currentModuleId = 1; // Start with first module
        this.giveXP(100); // Bonus for completing onboarding
        this.checkAchievement('first_steps');
        
        this.saveUserData();
        
        document.getElementById('onboardingModal').classList.add('hidden');
        document.getElementById('dashboard').style.display = 'block';
        
        this.updateUI();
    }

    updateUI() {
        this.updateUserInfo();
        this.updateStats();
        this.updateQuickActions();
        this.renderModules();
        this.renderAchievements();
    }

    updateUserInfo() {
        document.getElementById('userLevel').textContent = this.currentUser.level;
        document.getElementById('currentXP').textContent = this.currentUser.currentXP;
        document.getElementById('nextLevelXP').textContent = this.currentUser.nextLevelXP;
        
        const progress = (this.currentUser.currentXP / this.currentUser.nextLevelXP) * 100;
        document.getElementById('xpProgress').style.width = `${progress}%`;
    }

    updateStats() {
        document.getElementById('modulesCompleted').textContent = this.currentUser.completedModules.length;
        document.getElementById('achievementsEarned').textContent = this.currentUser.achievementsEarned.length;
        document.getElementById('streakDays').textContent = this.currentUser.streakDays;
        
        const totalModules = this.learningData.modules.length;
        const progress = Math.round((this.currentUser.completedModules.length / totalModules) * 100);
        document.getElementById('overallProgress').textContent = `${progress}%`;
    }

    updateQuickActions() {
        const currentModule = this.learningData.modules.find(m => m.id === this.currentUser.currentModuleId);
        if (currentModule) {
            document.getElementById('currentModuleText').textContent = `Continue: ${currentModule.title}`;
        }
    }

    renderModules() {
        const modulesGrid = document.getElementById('modulesGrid');
        modulesGrid.innerHTML = '';

        this.learningData.modules.forEach(module => {
            const isCompleted = this.currentUser.completedModules.includes(module.id);
            const isUnlocked = this.isModuleUnlocked(module);
            
            const moduleCard = document.createElement('div');
            moduleCard.className = `module-card ${isCompleted ? 'completed' : ''} ${!isUnlocked ? 'locked' : ''}`;
            
            const difficultyClass = `badge--${module.difficulty.toLowerCase()}`;
            
            moduleCard.innerHTML = `
                <div class="module-header">
                    <div class="module-meta">
                        <span class="badge ${difficultyClass}">${module.difficulty}</span>
                        <span class="duration">${module.duration}</span>
                        <span class="xp-reward">+${module.xpReward} XP</span>
                    </div>
                </div>
                <div class="module-body">
                    <h3>${module.title}</h3>
                    <p>${module.description}</p>
                    <div class="module-progress">
                        <div class="module-progress-fill" style="width: ${module.progress}%"></div>
                    </div>
                    <div class="module-topics">
                        ${module.topics.slice(0, 3).map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
                        ${module.topics.length > 3 ? `<span class="topic-tag">+${module.topics.length - 3} more</span>` : ''}
                    </div>
                </div>
            `;

            if (isUnlocked) {
                moduleCard.addEventListener('click', () => {
                    this.openModuleModal(module);
                });
            }

            modulesGrid.appendChild(moduleCard);
        });
    }

    renderAchievements() {
        const achievementsGrid = document.getElementById('achievementsGrid');
        achievementsGrid.innerHTML = '';

        this.learningData.achievements.forEach(achievement => {
            const isEarned = this.currentUser.achievementsEarned.includes(achievement.id);
            
            const achievementCard = document.createElement('div');
            achievementCard.className = `achievement-card ${isEarned ? 'earned' : 'locked'}`;
            
            achievementCard.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <h4>${achievement.name}</h4>
                <p>${achievement.description}</p>
                <div class="achievement-xp">+${achievement.xpValue} XP</div>
            `;

            achievementsGrid.appendChild(achievementCard);
        });
    }

    isModuleUnlocked(module) {
        if (module.prerequisites.length === 0) return true;
        return module.prerequisites.every(prereqId => 
            this.currentUser.completedModules.includes(prereqId)
        );
    }

    openModuleModal(module) {
        document.getElementById('moduleTitle').textContent = module.title;
        document.getElementById('moduleDifficulty').textContent = module.difficulty;
        document.getElementById('moduleDifficulty').className = `badge badge--${module.difficulty.toLowerCase()}`;
        document.getElementById('moduleDuration').textContent = module.duration;
        document.getElementById('moduleXP').textContent = module.xpReward;
        document.getElementById('moduleDescription').textContent = module.description;

        const topicsList = document.getElementById('moduleTopics');
        topicsList.innerHTML = '';
        module.topics.forEach(topic => {
            const li = document.createElement('li');
            li.textContent = topic;
            topicsList.appendChild(li);
        });

        const projectsList = document.getElementById('moduleProjects');
        projectsList.innerHTML = '';
        module.projects.forEach(project => {
            const li = document.createElement('li');
            li.textContent = project;
            projectsList.appendChild(li);
        });

        const badgesPreview = document.getElementById('moduleBadges');
        badgesPreview.innerHTML = '';
        module.badges.forEach(badge => {
            const badgeSpan = document.createElement('span');
            badgeSpan.className = 'badge-preview';
            badgeSpan.textContent = badge;
            badgesPreview.appendChild(badgeSpan);
        });

        const startButton = document.getElementById('startModule');
        startButton.dataset.moduleId = module.id;

        const isCompleted = this.currentUser.completedModules.includes(module.id);
        if (isCompleted) {
            startButton.textContent = 'Review Module';
        } else {
            startButton.textContent = 'Start Module';
        }

        document.getElementById('moduleModal').classList.remove('hidden');
    }

    startSelectedModule() {
        const moduleId = parseInt(document.getElementById('startModule').dataset.moduleId);
        this.currentUser.currentModuleId = moduleId;
        
        // Simulate module progress
        const module = this.learningData.modules.find(m => m.id === moduleId);
        if (module && !this.currentUser.completedModules.includes(moduleId)) {
            module.progress = 25; // Start with some progress
            this.giveXP(100); // Progress bonus
        }
        
        this.saveUserData();
        this.closeModal('moduleModal');
        this.updateUI();
        
        // Show success message
        this.showNotification(`Started learning: ${module.title}!`, 'success');
    }

    continueCurrentModule() {
        if (this.currentUser.currentModuleId) {
            const module = this.learningData.modules.find(m => m.id === this.currentUser.currentModuleId);
            if (module) {
                // Simulate progress
                module.progress = Math.min(100, module.progress + 20);
                
                if (module.progress === 100 && !this.currentUser.completedModules.includes(module.id)) {
                    this.completeModule(module.id);
                }
                
                this.giveXP(50);
                this.saveUserData();
                this.updateUI();
                
                this.showNotification('Great progress! Keep learning!', 'success');
            }
        }
    }

    completeModule(moduleId) {
        this.currentUser.completedModules.push(moduleId);
        const module = this.learningData.modules.find(m => m.id === moduleId);
        
        if (module) {
            this.giveXP(module.xpReward);
            
            // Unlock next modules
            this.learningData.modules.forEach(m => {
                if (m.prerequisites.includes(moduleId)) {
                    m.unlocked = this.isModuleUnlocked(m);
                }
            });
            
            this.checkAchievement('project_pioneer');
            this.showNotification(`🎉 Module completed: ${module.title}!`, 'success');
        }
    }

    startQuiz() {
        this.quizData.currentQuestion = 0;
        this.quizData.selectedAnswers = [];
        this.quizData.score = 0;
        
        document.getElementById('quizModal').classList.remove('hidden');
        document.querySelector('.quiz-results').classList.add('hidden');
        document.querySelector('.quiz-container').classList.remove('hidden');
        
        this.renderQuizQuestion();
    }

    renderQuizQuestion() {
        const question = this.quizData.questions[this.quizData.currentQuestion];
        const totalQuestions = this.quizData.questions.length;
        
        document.getElementById('quizQuestionNum').textContent = this.quizData.currentQuestion + 1;
        document.getElementById('quizTotalQuestions').textContent = totalQuestions;
        document.getElementById('quizQuestionText').textContent = question.question;
        
        const progress = ((this.quizData.currentQuestion) / totalQuestions) * 100;
        document.getElementById('quizProgress').style.width = `${progress}%`;

        const optionsContainer = document.getElementById('quizOptions');
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => {
                this.selectQuizOption(index);
            });
            optionsContainer.appendChild(optionElement);
        });

        this.updateQuizNavigation();
    }

    selectQuizOption(optionIndex) {
        this.quizData.selectedAnswers[this.quizData.currentQuestion] = optionIndex;
        
        document.querySelectorAll('#quizOptions .option').forEach((option, index) => {
            option.classList.toggle('selected', index === optionIndex);
        });

        document.getElementById('nextQuizQuestion').disabled = false;
    }

    nextQuizQuestion() {
        if (this.quizData.currentQuestion < this.quizData.questions.length - 1) {
            this.quizData.currentQuestion++;
            this.renderQuizQuestion();
        } else {
            this.completeQuiz();
        }
    }

    prevQuizQuestion() {
        if (this.quizData.currentQuestion > 0) {
            this.quizData.currentQuestion--;
            this.renderQuizQuestion();
        }
    }

    updateQuizNavigation() {
        const prevButton = document.getElementById('prevQuizQuestion');
        const nextButton = document.getElementById('nextQuizQuestion');
        
        prevButton.disabled = this.quizData.currentQuestion === 0;
        
        const hasAnswer = this.quizData.selectedAnswers[this.quizData.currentQuestion] !== undefined;
        nextButton.disabled = !hasAnswer;
        
        if (this.quizData.currentQuestion === this.quizData.questions.length - 1) {
            nextButton.textContent = 'Complete Quiz';
        } else {
            nextButton.textContent = 'Next';
        }
    }

    completeQuiz() {
        // Calculate score
        let correctAnswers = 0;
        this.quizData.questions.forEach((question, index) => {
            if (this.quizData.selectedAnswers[index] === question.correct) {
                correctAnswers++;
            }
        });
        
        this.quizData.score = Math.round((correctAnswers / this.quizData.questions.length) * 100);

        // Show results
        document.querySelector('.quiz-container').classList.add('hidden');
        document.querySelector('.quiz-results').classList.remove('hidden');
        
        document.getElementById('finalScore').textContent = `${this.quizData.score}%`;
        
        let message = '';
        let xpBonus = 0;
        
        if (this.quizData.score >= 90) {
            message = '🌟 Excellent work! You truly understand these concepts!';
            xpBonus = 200;
            this.checkAchievement('knowledge_seeker');
        } else if (this.quizData.score >= 70) {
            message = '👍 Great job! You have a solid understanding.';
            xpBonus = 150;
        } else if (this.quizData.score >= 50) {
            message = '📚 Good effort! Consider reviewing the material.';
            xpBonus = 100;
        } else {
            message = '💪 Keep practicing! Learning takes time and effort.';
            xpBonus = 50;
        }
        
        document.getElementById('scoreMessage').textContent = message;
        document.getElementById('quizXP').textContent = xpBonus;
        
        this.giveXP(xpBonus);
        this.saveUserData();
    }

    toggleMentorChat() {
        const chatMessages = document.getElementById('chatMessages');
        const chatInput = document.getElementById('chatInput');
        const toggleButton = document.getElementById('toggleChat');
        
        this.chatExpanded = !this.chatExpanded;
        
        if (this.chatExpanded) {
            chatMessages.classList.remove('hidden');
            chatInput.classList.remove('hidden');
            toggleButton.textContent = '➖';
        } else {
            chatMessages.classList.add('hidden');
            chatInput.classList.add('hidden');
            toggleButton.textContent = '💬';
        }
    }

    sendMentorMessage() {
        const messageInput = document.getElementById('messageInput');
        const message = messageInput.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addChatMessage(message, 'user');
        
        // Clear input
        messageInput.value = '';
        
        // Simulate mentor response
        setTimeout(() => {
            const randomResponse = this.mentorMessages[Math.floor(Math.random() * this.mentorMessages.length)];
            this.addChatMessage(randomResponse, 'mentor');
        }, 1000);
    }

    addChatMessage(text, sender) {
        const chatMessages = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `<p>${text}</p>`;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    giveXP(amount) {
        this.currentUser.currentXP += amount;
        
        // Check for level up
        while (this.currentUser.currentXP >= this.currentUser.nextLevelXP) {
            this.levelUp();
        }
        
        this.updateUserInfo();
    }

    levelUp() {
        this.currentUser.level++;
        this.currentUser.currentXP -= this.currentUser.nextLevelXP;
        this.currentUser.nextLevelXP = Math.floor(this.currentUser.nextLevelXP * 1.5);
        
        this.showNotification(`🎉 Level Up! You're now level ${this.currentUser.level}!`, 'success');
    }

    checkAchievement(achievementId) {
        if (!this.currentUser.achievementsEarned.includes(achievementId)) {
            this.currentUser.achievementsEarned.push(achievementId);
            
            const achievement = this.learningData.achievements.find(a => a.id === achievementId);
            if (achievement) {
                this.giveXP(achievement.xpValue);
                this.showNotification(`🏆 Achievement Unlocked: ${achievement.name}!`, 'success');
            }
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification--${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 20px;
            background: var(--color-success);
            color: var(--color-btn-primary-text);
            border-radius: var(--radius-base);
            box-shadow: var(--shadow-lg);
            z-index: 9999;
            max-width: 300px;
            opacity: 0;
            transform: translateX(100%);
            transition: all 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    closeModal(modalId) {
        document.getElementById(modalId).classList.add('hidden');
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-color-scheme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        
        const themeButton = document.getElementById('themeToggle');
        themeButton.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        
        localStorage.setItem('devops_theme', newTheme);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load saved theme
    const savedTheme = localStorage.getItem('devops_theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-color-scheme', savedTheme);
        document.getElementById('themeToggle').textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }
    
    // Initialize the learning agent
    new DevOpsLearningAgent();
});