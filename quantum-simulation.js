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
        
        // Bind methods
        this.initialize = this.initialize.bind(this);
        this.startEvolution = this.startEvolution.bind(this);
        this.updateSystem = this.updateSystem.bind(this);
        this.handlePointerMove = this.handlePointerMove.bind(this);
        this.createWaveInterference = this.createWaveInterference.bind(this);
        
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
        
        // Start animation loop
        this.startEvolution();
        
        // Enhanced command input
        this.enhanceCommandInput();
        
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
    
    enhanceCommandInput() {
        // Add enhanced functionality to command inputs
        const commandInputs = document.querySelectorAll('.command-input');
        
        commandInputs.forEach(input => {
            // Add command history
            input.commandHistory = [];
            input.historyIndex = -1;
            
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
            suggestions.style.position = 'absolute';
            suggestions.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
            suggestions.style.border = '1px solid #ff69b4';
            suggestions.style.borderTop = 'none';
            suggestions.style.maxHeight = '150px';
            suggestions.style.overflow = 'auto';
            suggestions.style.width = '100%';
            suggestions.style.zIndex = '100';
            
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
                            suggestion.textContent = match;
                            suggestion.style.padding = '5px 10px';
                            suggestion.style.cursor = 'pointer';
                            suggestion.style.color = '#ff69b4';
                            
                            suggestion.addEventListener('mouseenter', function() {
                                this.style.backgroundColor = 'rgba(255, 105, 180, 0.3)';
                            });
                            
                            suggestion.addEventListener('mouseleave', function() {
                                this.style.backgroundColor = 'transparent';
                            });
                            
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
            input.addEventListener('keydown', function(e) {
                if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    if (suggestions.style.display === 'block') {
                        const suggestionItems = suggestions.querySelectorAll('div');
                        let activeItem = suggestions.querySelector('div.active');
                        let index = -1;
                        
                        if (activeItem) {
                            activeItem.classList.remove('active');
                            activeItem.style.backgroundColor = 'transparent';
                            index = Array.from(suggestionItems).indexOf(activeItem);
                            index = (index - 1 + suggestionItems.length) % suggestionItems.length;
                        } else {
                            index = suggestionItems.length - 1;
                        }
                        
                        suggestionItems[index].classList.add('active');
                        suggestionItems[index].style.backgroundColor = 'rgba(255, 105, 180, 0.3)';
                        this.value = suggestionItems[index].textContent;
                    } else if (this.commandHistory.length > 0 && this.historyIndex < this.commandHistory.length - 1) {
                        this.historyIndex++;
                        this.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
                    }
                } else if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (suggestions.style.display === 'block') {
                        const suggestionItems = suggestions.querySelectorAll('div');
                        let activeItem = suggestions.querySelector('div.active');
                        let index = -1;
                        
                        if (activeItem) {
                            activeItem.classList.remove('active');
                            activeItem.style.backgroundColor = 'transparent';
                            index = Array.from(suggestionItems).indexOf(activeItem);
                            index = (index + 1) % suggestionItems.length;
                        } else {
                            index = 0;
                        }
                        
                        suggestionItems[index].classList.add('active');
                        suggestionItems[index].style.backgroundColor = 'rgba(255, 105, 180, 0.3)';
                        this.value = suggestionItems[index].textContent;
                    } else if (this.historyIndex > 0) {
                        this.historyIndex--;
                        this.value = this.commandHistory[this.commandHistory.length - 1 - this.historyIndex];
                    } else if (this.historyIndex === 0) {
                        this.historyIndex = -1;
                        this.value = '';
                    }
                } else if (e.key === 'Tab') {
                    e.preventDefault();
                    if (suggestions.style.display === 'block') {
                        const firstSuggestion = suggestions.querySelector('div');
                        if (firstSuggestion) {
                            this.value = firstSuggestion.textContent;
                            suggestions.style.display = 'none';
                        }
                    }
                } else if (e.key === 'Enter') {
                    // Add command to history
                    if (this.value.trim() !== '') {
                        this.commandHistory.push(this.value);
                        if (this.commandHistory.length > 10) {
                            this.commandHistory.shift();
                        }
                        this.historyIndex = -1;
                    }
                    suggestions.style.display = 'none';
                } else if (e.key === 'Escape') {
                    suggestions.style.display = 'none';
                }
            });
            
            // Hide suggestions when clicking elsewhere
            document.addEventListener('click', function(e) {
                if (e.target !== input) {
                    suggestions.style.display = 'none';
                }
            });
        });
    }
}

// Create and initialize the quantum system
const quantumSystem = new QuantumInteractiveSystem();

// Export for global access
window.quantumSystem = quantumSystem;