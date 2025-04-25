// quantum-simulation.js - Advanced particle animations for Élodi Vedha's quantum funhouse resume

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
        
        // Listen for DOM loaded to initialize
        document.addEventListener('DOMContentLoaded', this.initialize);
    }
    
    initialize() {
        if (this.initialized) return;
        
        console.log("Initializing quantum interactive system...");
        
        // Create canvas for advanced particle effects
        this.createQuantumCanvas();
        
        // Initialize particles
        this.initializeParticles(40); // Start with 40 particles
        
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
        
        // Start animation loop
        this.startEvolution();
        
        this.initialized = true;
    }
    
    createQuantumCanvas() {
        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'quantum-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-1';
        
        // Add to DOM
        document.body.appendChild(this.canvas);
        
        // Set dimensions
        this.updateDimensions();
        
        // Get context
        this.ctx = this.canvas.getContext('2d');
    }
    
    updateDimensions() {
        // Update canvas dimensions
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.fieldDimensions = { width: window.innerWidth, height: window.innerHeight };
    }
    
    initializeParticles(count) {
        this.particles = [];
        
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.fieldDimensions.width,
                y: Math.random() * this.fieldDimensions.height,
                radius: 0.5 + Math.random() * 2,
                color: this.getQuantumColor(Math.random()),
                velocity: {
                    x: (Math.random() - 0.5) * 0.5,
                    y: (Math.random() - 0.5) * 0.5
                },
                entangled: Math.random() > 0.7, // 30% chance of being entangled
                entangledWith: null, // Will be set later
                phase: Math.random() * Math.PI * 2,
                phaseVelocity: 0.01 + Math.random() * 0.03,
                spin: Math.random() > 0.5 ? 0.5 : -0.5
            });
        }
        
        // Create entangled pairs
        const entangledParticles = this.particles.filter(p => p.entangled);
        for (let i = 0; i < entangledParticles.length; i += 2) {
            if (i + 1 < entangledParticles.length) {
                entangledParticles[i].entangledWith = entangledParticles[i + 1];
                entangledParticles[i + 1].entangledWith = entangledParticles[i];
            }
        }
    }
    
    getQuantumColor(value) {
        // Create color gradient based on quantum state
        if (value < 0.33) {
            return this.colors.primary;
        } else if (value < 0.66) {
            return this.colors.secondary;
        } else {
            return this.colors.accent;
        }
    }
    
    startEvolution() {
        // Begin animation loop
        this.animationFrame = requestAnimationFrame(this.updateSystem);
    }
    
    updateSystem() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update breath phase
        this.breathPhase = (this.breathPhase + this.breathFrequency / 60) % 1;
        
        // Update emergence level
        if (this.emergenceLevel < 1) {
            this.emergenceLevel += 0.005;
        }
        
        // Update and draw particles
        this.updateParticles();
        this.drawParticles();
        
        // Continue animation loop
        this.animationFrame = requestAnimationFrame(this.updateSystem);
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            // Update position based on velocity
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;
            
            // Wrap around screen edges
            if (particle.x < 0) particle.x = this.fieldDimensions.width;
            if (particle.x > this.fieldDimensions.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.fieldDimensions.height;
            if (particle.y > this.fieldDimensions.height) particle.y = 0;
            
            // Update phase
            particle.phase += particle.phaseVelocity;
            
            // Handle entanglement
            if (particle.entangled && particle.entangledWith) {
                // Subtle attraction between entangled particles
                const dx = particle.entangledWith.x - particle.x;
                const dy = particle.entangledWith.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance > 150) {
                    // Attract when far apart
                    particle.velocity.x += (dx / distance) * 0.01 * this.entanglementStrength;
                    particle.velocity.y += (dy / distance) * 0.01 * this.entanglementStrength;
                } else if (distance < 50) {
                    // Repel when too close
                    particle.velocity.x -= (dx / distance) * 0.01 * this.entanglementStrength;
                    particle.velocity.y -= (dy / distance) * 0.01 * this.entanglementStrength;
                }
                
                // Synchronized phase for entangled particles
                particle.phase = particle.entangledWith.phase;
            }
            
            // Apply quantum breath effect
            const breathEffect = Math.sin(this.breathPhase * Math.PI * 2);
            particle.velocity.x += breathEffect * 0.001 * particle.spin;
            particle.velocity.y += breathEffect * 0.001 * particle.spin;
            
            // Apply emergence level
            particle.radius = (0.5 + Math.random() * 2) * this.emergenceLevel;
        });
    }
    
    drawParticles() {
        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            
            // Apply phase-based opacity
            const opacity = 0.3 + 0.5 * Math.sin(particle.phase) * this.emergenceLevel;
            this.ctx.globalAlpha = opacity;
            
            this.ctx.fill();
            this.ctx.globalAlpha = 1.0;
            
            // Draw entanglement connections
            if (particle.entangled && particle.entangledWith && particle.phase < Math.PI) {
                this.ctx.beginPath();
                this.ctx.moveTo(particle.x, particle.y);
                this.ctx.lineTo(particle.entangledWith.x, particle.entangledWith.y);
                this.ctx.strokeStyle = this.colors.primary;
                this.ctx.globalAlpha = 0.1 + 0.2 * Math.sin(particle.phase);
                this.ctx.lineWidth = 0.5;
                this.ctx.stroke();
                this.ctx.globalAlpha = 1.0;
            }
        });
        
        // Draw wave function if active
        if (this.waveFunction) {
            this.drawWaveFunction();
        }
    }
    
    handlePointerMove(event) {
        // Influence particles with pointer (observer effect)
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        
        this.particles.forEach(particle => {
            const dx = mouseX - particle.x;
            const dy = mouseY - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                // Particles are influenced by observer
                particle.velocity.x += (dx / distance) * 0.02 * this.observerInfluence;
                particle.velocity.y += (dy / distance) * 0.02 * this.observerInfluence;
                
                // Slight color shift
                if (Math.random() > 0.95) {
                    particle.color = this.getQuantumColor(Math.random());
                }
            }
        });
    }
    
    createWaveInterference(event) {
        // Create wave interference pattern at click location
        this.waveFunction = {
            x: event.clientX,
            y: event.clientY,
            radius: 0,
            maxRadius: 200,
            speed: 3,
            opacity: 1
        };
    }
    
    drawWaveFunction() {
        // Draw expanding wave interference pattern
        if (this.waveFunction.radius < this.waveFunction.maxRadius) {
            this.waveFunction.radius += this.waveFunction.speed;
            this.waveFunction.opacity = 1 - (this.waveFunction.radius / this.waveFunction.maxRadius);
            
            // Draw circular wave
            this.ctx.beginPath();
            this.ctx.arc(this.waveFunction.x, this.waveFunction.y, this.waveFunction.radius, 0, Math.PI * 2);
            this.ctx.strokeStyle = this.colors.accent;
            this.ctx.globalAlpha = this.waveFunction.opacity;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            
            // Draw secondary wave
            this.ctx.beginPath();
            this.ctx.arc(this.waveFunction.x, this.waveFunction.y, this.waveFunction.radius * 0.8, 0, Math.PI * 2);
            this.ctx.strokeStyle = this.colors.primary;
            this.ctx.globalAlpha = this.waveFunction.opacity * 0.8;
            this.ctx.lineWidth = 1;
            this.ctx.stroke();
            
            // Reset global alpha
            this.ctx.globalAlpha = 1.0;
        } else {
            // Reset wave function
            this.waveFunction = null;
        }
    }
    
    setupCommandInputs() {
        // Add enhanced functionality to command inputs
        const commandInputs = document.querySelectorAll('.command-input');
        
        commandInputs.forEach(input => {
            // Command history
            input.commandHistory = this.commandHistory;
            input.historyIndex = this.historyIndex;
            
            // Add autocomplete suggestions
            const commands = ['help', 'next', 'prev', 'goto intro', 'goto skills', 
                             'goto experience', 'goto projects', 'goto quantum', 'goto connect',
                             'demo gutmate', 'demo sosa', 'demo reforestation', 'demo music',
                             'quantum consciousness', 'quantum field', 'quantum entanglement',
                             'contact'];
            
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
            });
            
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
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (entry.target.id === 'skill-diagram') {
                        this.createSkillDiagram(entry.target);
                    } else if (entry.target.id === 'connection-diagram') {
                        this.createConnectionDiagram(entry.target);
                    }
                }
            });
        }, { threshold: 0.1 });
        
        // Observe diagrams
        const skillDiagram = document.getElementById('skill-diagram');
        const connectionDiagram = document.getElementById('connection-diagram');
        
        if (skillDiagram) observer.observe(skillDiagram);
        if (connectionDiagram) observer.observe(connectionDiagram);
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
    
        // Add click event to diagram
        diagram.addEventListener('click', () => {
            const nodes = diagram.querySelectorAll('.node');
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
            
            // Add orbit animation
            node.style.animation = `orbit ${20 + 5 * i}s linear infinite`;
            
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

// Initialize quantum system
const quantumSystem = new QuantumInteractiveSystem();

// Add keyframes for orbit animation
const style = document.createElement('style');
style.textContent = `
@keyframes orbit {
  from { transform: rotate(0deg) translateX(35px) rotate(0deg); }
  to { transform: rotate(360deg) translateX(35px) rotate(-360deg); }
}
`;
document.head.appendChild(style);
