// Quantum Interactive System for Élodi Vedha's Funhouse Resume
class QuantumInteractiveSystem {
    constructor() {
        this.initialized = false;
        this.entanglementStrength = 0.7;
        this.observerInfluence = 0.3;
        this.emergenceLevel = 0;
        this.breathPhase = 0;
        this.breathFrequency = 0.1;
        this.particles = [];
        this.fieldDimensions = { width: window.innerWidth, height: window.innerHeight };
        this.colors = {
            primary: '#ff69b4',
            secondary: '#ff3366',
            accent: '#ffffff',
            background: '#000000'
        };
        
        // Track current slide
        this.currentSlide = 'intro';
        
        // Command history
        this.commandHistory = [];
        this.historyIndex = -1;
        
        // Music state
        this.musicPlayed = false;
        
        // Bind methods
        this.initialize = this.initialize.bind(this);
        this.startEvolution = this.startEvolution.bind(this);
        this.updateSystem = this.updateSystem.bind(this);
        this.handlePointerMove = this.handlePointerMove.bind(this);
        this.createWaveInterference = this.createWaveInterference.bind(this);
        this.processCommand = this.processCommand.bind(this);
        this.navigateTo = this.navigateTo.bind(this);
        this.setupNavigation = this.setupNavigation.bind(this);
        this.runDemo = this.runDemo.bind(this);
        this.exploreQuantumConcept = this.exploreQuantumConcept.bind(this);
        this.toggleMusic = this.toggleMusic.bind(this);
        this.createSkillDiagram = this.createSkillDiagram.bind(this);
        this.createConnectionDiagram = this.createConnectionDiagram.bind(this);
        
        // Initialize the quantum system
        this.initialize();
    }
    
    initialize() {
        if (this.initialized) return;
        
        console.log("Initializing quantum interactive system...");
        
        // Initialize particles in the quantum particles container
        this.initializeParticles();
        
        // Add event listeners
        window.addEventListener('resize', this.updateDimensions.bind(this));
        document.addEventListener('pointermove', this.handlePointerMove);
        document.addEventListener('click', this.createWaveInterference);
        
        // Set up terminal and navigation
        this.setupCommandInputs();
        this.setupNavigation();
        this.setupDiagrams();
        this.setupSpecialActions();
        
        // Play music on first user interaction
        document.addEventListener('click', this.playMusicOnce.bind(this), { once: true });
        
        this.initialized = true;
    }
    
    initializeParticles() {
        const particlesContainer = document.querySelector('.quantum-particles');
        if (!particlesContainer) return;
        
        // Clear existing particles
        particlesContainer.innerHTML = '';
        
        // Create particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random position
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            
            // Random size
            const size = 2 + Math.random() * 5;
            
            // Random duration and delay
            const duration = 5 + Math.random() * 15;
            const delay = Math.random() * 10;
            
            // Set styles
            particle.style.top = `${top}%`;
            particle.style.left = `${left}%`;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.animationDuration = `${duration}s`;
            particle.style.animationDelay = `${delay}s`;
            
            // Add to container
            particlesContainer.appendChild(particle);
        }
    }
    
    updateDimensions() {
        this.fieldDimensions = { 
            width: window.innerWidth, 
            height: window.innerHeight 
        };
    }
    
    startEvolution() {
        // Handle any animation or state evolution here
        // This is simplified as we're using CSS animations for particles
    }
    
    updateSystem() {
        // Update any system state here
        // This is simplified as we're using CSS animations for particles
    }
    
    handlePointerMove(event) {
        // Enhance with particle interaction if needed
    }
    
    createWaveInterference(event) {
        // Add wave effect if needed
    }
    
    setupCommandInputs() {
        // Add enhanced functionality to command inputs
        const commandInputs = document.querySelectorAll('.command-input');
        
        commandInputs.forEach(input => {
            // Add autocomplete suggestions
            const commands = ['help', 'next', 'prev', 'goto intro', 'goto skills', 
                            'goto experience', 'goto projects', 'goto quantum', 'goto connect',
                            'demo gutmate', 'demo sosa', 'demo reforestation', 'demo music',
                            'quantum consciousness', 'quantum field', 'quantum entanglement'];
            
            // Create suggestion element
            const suggestions = document.createElement('div');
            suggestions.className = 'command-suggestions';
            suggestions.style.display = 'none';
            
            input.parentNode.style.position = 'relative';
            input.parentNode.appendChild(suggestions);
            
            // Add input event
            input.addEventListener('input', function() {
                const value = this.value.toLowerCase();
                if (value.length > 0) {
                    // Filter matching commands
                    const matches = commands.filter(cmd => cmd.startsWith(value));
                    
                    if (matches.length > 0) {
                        suggestions.innerHTML = '';
                        matches.forEach(match => {
                            const suggestion = document.createElement('div');
                            suggestion.className = 'command-suggestion';
                            suggestion.textContent = match;
                            
                            suggestion.addEventListener('click', function() {
                                input.value = match;
                                suggestions.style.display = 'none';
                                input.focus();
                            });
                            
                            suggestions.appendChild(suggestion);
                        });
                        suggestions.style.display = 'block';
                    } else {
                        suggestions.style.display = 'none';
                    }
                } else {
                    suggestions.style.display = 'none';
                }
            });
            
            // Handle keyboard navigation
            input.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    
                    if (suggestions.style.display === 'block') {
                        // Navigate suggestions
                        const suggestionItems = suggestions.querySelectorAll('.command-suggestion');
                        let activeItem = suggestions.querySelector('.command-suggestion.active');
                        let index = -1;
                        
                        if (activeItem) {
                            activeItem.classList.remove('active');
                            index = Array.from(suggestionItems).indexOf(activeItem);
                            index = (index - 1 + suggestionItems.length) % suggestionItems.length;
                        } else {
                            index = suggestionItems.length - 1;
                        }
                        
                        suggestionItems[index].classList.add('active');
                        input.value = suggestionItems[index].textContent;
                    } else {
                        // Navigate command history
                        if (this.historyIndex < this.commandHistory.length - 1) {
                            this.historyIndex++;
                            input.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
                        }
                    }
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    
                    if (suggestions.style.display === 'block') {
                        // Navigate suggestions
                        const suggestionItems = suggestions.querySelectorAll('.command-suggestion');
                        let activeItem = suggestions.querySelector('.command-suggestion.active');
                        let index = -1;
                        
                        if (activeItem) {
                            activeItem.classList.remove('active');
                            index = Array.from(suggestionItems).indexOf(activeItem);
                            index = (index + 1) % suggestionItems.length;
                        } else {
                            index = 0;
                        }
                        
                        suggestionItems[index].classList.add('active');
                        input.value = suggestionItems[index].textContent;
                    } else {
                        // Navigate command history
                        if (this.historyIndex > 0) {
                            this.historyIndex--;
                            input.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
                        } else {
                            this.historyIndex = -1;
                            input.value = '';
                        }
                    }
                } else if (e.key === 'Tab') {
                    e.preventDefault();
                    
                    if (suggestions.style.display === 'block') {
                        const activeItem = suggestions.querySelector('.command-suggestion.active') || 
                                        suggestions.querySelector('.command-suggestion');
                        if (activeItem) {
                            input.value = activeItem.textContent;
                            suggestions.style.display = 'none';
                        }
                    }
                } else if (e.key === 'Enter') {
                    const command = input.value.trim().toLowerCase();
                    if (command) {
                        this.processCommand(command);
                        input.value = '';
                        suggestions.style.display = 'none';
                    }
                } else if (e.key === 'Escape') {
                    suggestions.style.display = 'none';
                }
            }.bind(this));
            
            // Handle clicks outside to close suggestions
            document.addEventListener('click', function(e) {
                if (!input.contains(e.target) && !suggestions.contains(e.target)) {
                    suggestions.style.display = 'none';
                }
            });
        });
    }
    
    setupNavigation() {
        // Set up navigation buttons
        const navButtons = document.querySelectorAll('.nav-btn');
        navButtons.forEach(button => {
            const target = button.getAttribute('data-goto');
            if (target) {
                button.addEventListener('click', () => this.navigateTo(target));
            }
        });
        
        // Set up card navigation
        const navCards = document.querySelectorAll('.nav-card');
        navCards.forEach(card => {
            const target = card.getAttribute('data-goto');
            if (target) {
                card.addEventListener('click', () => this.navigateTo(target));
            }
        });
        
        // Set up music toggle
        const musicToggleBtn = document.getElementById('toggle-music-btn');
        if (musicToggleBtn) {
            musicToggleBtn.addEventListener('click', this.toggleMusic);
        }
    }
    
    setupDiagrams() {
        // Initialize diagrams once they become visible
        const skillDiagram = document.getElementById('skill-diagram');
        const connectionDiagram = document.getElementById('connection-diagram');
        
        if (skillDiagram) {
            this.createSkillDiagram(skillDiagram);
            
            // Add click event to diagram
            skillDiagram.addEventListener('click', () => {
                const nodes = skillDiagram.querySelectorAll('.node');
                nodes.forEach(node => {
                    // Animate pulse effect
                    node.animate([
                        { transform: 'scale(1)', boxShadow: '0 0 0 rgba(255, 105, 180, 0.4)' },
                        { transform: 'scale(1.1)', boxShadow: '0 0 15px rgba(255, 105, 180, 0.7)' },
                        { transform: 'scale(1)', boxShadow: '0 0 0 rgba(255, 105, 180, 0.4)' }
                    ], {
                        duration: 1000,
                        easing: 'ease-in-out'
                    });
                });
            });
        }
        
        if (connectionDiagram) {
            this.createConnectionDiagram(connectionDiagram);
        }
    }
    
    setupSpecialActions() {
        // Project demo links
        const projectLinks = document.querySelectorAll('.project-link');
        projectLinks.forEach(link => {
            const demo = link.getAttribute('data-demo');
            if (demo) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.runDemo(demo);
                });
            }
        });
        
        // Quantum exploration links
        const quantumLinks = document.querySelectorAll('.quantum-explore');
        quantumLinks.forEach(link => {
            const concept = link.getAttribute('data-concept');
            if (concept) {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.exploreQuantumConcept(concept);
                });
            }
        });
        
        // Contact form submit
        const sendMessageBtn = document.getElementById('send-message-btn');
        if (sendMessageBtn) {
            sendMessageBtn.addEventListener('click', () => {
                alert('Quantum message transmission initialized. Thank you for connecting with Élodi Vedha!');
            });
        }
    }
    
    playMusicOnce() {
        if (!this.musicPlayed) {
            const audioElement = document.getElementById('background-music');
            if (audioElement) {
                audioElement.volume = 0.5; // Set volume to 50%
                audioElement.play().catch(error => {
                    console.error('Audio playback error:', error);
                });
                this.musicPlayed = true;
            }
        }
    }
    
    toggleMusic() {
        const audioElement = document.getElementById('background-music');
        if (audioElement) {
            if (audioElement.paused) {
                audioElement.play().catch(error => {
                    console.error('Audio playback error:', error);
                });
            } else {
                audioElement.pause();
            }
        }
    }
    
    processCommand(command) {
        console.log(`Processing command: ${command}`);
        
        // Add to history
        this.commandHistory.unshift(command);
        if (this.commandHistory.length > 10) {
            this.commandHistory.pop();
        }
        this.historyIndex = -1;
        
        // Process command
        if (command === 'help') {
            this.navigateTo('help');
            return;
        }
        
        if (command === 'next') {
            const slideOrder = ['intro', 'experience', 'skills', 'projects', 'quantum', 'connect'];
            const currentIndex = slideOrder.indexOf(this.currentSlide);
            
            if (currentIndex < slideOrder.length - 1) {
                this.navigateTo(slideOrder[currentIndex + 1]);
            }
            
            return;
        }
        
        if (command === 'prev') {
            const slideOrder = ['intro', 'experience', 'skills', 'projects', 'quantum', 'connect'];
            const currentIndex = slideOrder.indexOf(this.currentSlide);
            
            if (currentIndex > 0) {
                this.navigateTo(slideOrder[currentIndex - 1]);
            }
            
            return;
        }
        
        // Direct navigation commands
        if (command.startsWith('goto ')) {
            const target = command.substring(5);
            
            if (['intro', 'experience', 'skills', 'projects', 'quantum', 'connect', 'help'].includes(target)) {
                this.navigateTo(target);
            } else {
                console.error(`Unknown destination: ${target}`);
            }
            
            return;
        }
        
        // Demo commands
        if (command.startsWith('demo ')) {
            const demo = command.substring(5);
            this.runDemo(demo);
            return;
        }
        
        // Quantum exploration commands
        if (command.startsWith('quantum ')) {
            const concept = command.substring(8);
            this.exploreQuantumConcept(concept);
            return;
        }
        
        console.error(`Unknown command: ${command}`);
    }
    
    navigateTo(slideId) {
        // Find all slides
        const slides = document.querySelectorAll('.carousel-slide');
        
        // Find target slide
        const targetSlide = document.getElementById(slideId);
        
        if (!targetSlide) return;
        
        // Update current slide
        this.currentSlide = slideId;
        
        // Remove active class from all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
            slide.classList.remove('prev');
        });
        
        // Add active class to target slide
        targetSlide.classList.add('active');
        
        // Scroll to top of slide
        targetSlide.scrollTop = 0;
    }
    
    runDemo(demo) {
        console.log(`Running demo: ${demo}`);
        
        switch (demo) {
            case 'gutmate':
                alert('GutMate Microbiome Analysis Demo initializing...');
                break;
                
            case 'sosa':
                alert('SOSA Environmental Research Data loading...');
                break;
                
            case 'reforestation':
                alert('Reforestation Growth Pattern Analysis starting...');
                break;
                
            case 'dna-extraction':
                alert('DNA Extraction Protocol Visualization loading...');
                break;
                
            case 'wellness':
                alert('Holistic Wellness Research Data loading...');
                break;
                
            case 'protein':
                alert('3D Protein Structure Model rendering...');
                break;
                
            case 'music':
                this.toggleMusic();
                break;
                
            default:
                console.error(`Unknown demo: ${demo}`);
        }
    }
    
    exploreQuantumConcept(concept) {
        console.log(`Exploring quantum concept: ${concept}`);
        
        switch (concept) {
            case 'biology':
                alert('Quantum Biology Theory Explorer initializing...');
                break;
                
            case 'consciousness':
                alert('Quantum Consciousness Visualization loading...');
                break;
                
            case 'healing':
                alert('Quantum Healing Methodologies interface starting...');
                break;
                
            case 'field':
                alert('Quantum Field Visualization generating...');
                break;
                
            case 'entanglement':
                alert('Quantum Entanglement Simulation loading...');
                break;
                
            default:
                console.error(`Unknown quantum concept: ${concept}`);
        }
    }
    
    createSkillDiagram(diagram) {
        // Clear diagram
        diagram.innerHTML = '';
    
        // Skills to display
        const skills = [
            { name: 'Biology', x: 25, y: 30 },
            { name: 'Engineering', x: 75, y: 30 },
            { name: 'Research', x: 25, y: 70 },
            { name: 'Wellness', x: 75, y: 70 }
        ];
    
        // Create nodes and connections
        skills.forEach(skill => {
            // Create node
            const node = document.createElement('div');
            node.classList.add('node');
            node.style.left = `${skill.x}%`;
            node.style.top = `${skill.y}%`;
            node.textContent = skill.name;
            
            // Add to diagram
            diagram.appendChild(node);
        });
    
        // Create connections between nodes
        for (let i = 0; i < skills.length; i++) {
            for (let j = i + 1; j < skills.length; j++) {
                this.createConnection(diagram, skills[i], skills[j]);
            }
        }
    }
    
    createConnectionDiagram(diagram) {
        // Clear diagram
        diagram.innerHTML = '';
    
        // Create central node
        const centralNode = document.createElement('div');
        centralNode.classList.add('node');
        centralNode.style.left = '50%';
        centralNode.style.top = '50%';
        centralNode.style.transform = 'translate(-50%, -50%)';
        centralNode.textContent = 'Élodi';
        
        // Add to diagram
        diagram.appendChild(centralNode);
        
        // Create orbiting nodes
        const count = 6;
        const radius = 35;
        
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);
            
            // Create node
            const node = document.createElement('div');
            node.classList.add('node');
            node.style.left = `${x}%`;
            node.style.top = `${y}%`;
            node.style.width = '50px';
            node.style.height = '50px';
            
            // Add to diagram
            diagram.appendChild(node);
            
            // Create connection to central node
            this.createConnection(diagram, { x: 50, y: 50 }, { x, y });
        }
    }
    
    createConnection(diagram, nodeA, nodeB) {
        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        const connection = document.createElement('div');
        connection.classList.add('connection');
        connection.style.width = `${distance}%`;
        connection.style.left = `${nodeA.x}%`;
        connection.style.top = `${nodeA.y}%`;
        connection.style.transform = `rotate(${angle}deg)`;
        
        diagram.appendChild(connection);
    }
}

// Initialize the quantum system when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new QuantumInteractiveSystem();
});
