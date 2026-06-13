// Shawarma Horror Game
// 3D FPV Horror Game where you serve shawarmas to humans and monsters

class ShawarmaGame {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMap.enabled = true;
        this.renderer.setClearColor(0x1a1a2e);

        // Game state
        this.mistakes = 0;
        this.score = 0;
        this.currentCustomer = null;
        this.gameOver = false;
        this.gameStarted = false;
        this.wrongServeCount = 0;

        // Customer data
        this.humanNames = ['John', 'Maria', 'Ahmed', 'Lisa', 'David', 'Sarah'];
        this.monsterNames = ['Gromth', 'Zelax', 'Krex', 'Vorg', 'Malachai'];

        this.humanClues = [
            { appearance: 'Looks normal', behavior: 'Talks politely' },
            { appearance: 'Wears a hat', behavior: 'Smiles warmly' },
            { appearance: 'Has a watch', behavior: 'Patient and friendly' },
            { appearance: 'Carries a bag', behavior: 'Asks for recommendations' },
        ];

        this.monsterClues = [
            { appearance: 'Eyes glow faintly red', behavior: 'Speaks in a low growl' },
            { appearance: 'Fingers too long', behavior: 'Breathes heavily' },
            { appearance: 'Skin looks scaly', behavior: 'Makes hissing sounds' },
            { appearance: 'Head tilts unnaturally', behavior: 'Stares intensely' },
            { appearance: 'Teeth appear sharp', behavior: 'Smells sulfurous' },
        ];

        this.setupScene();
        this.setupLights();
        this.setupEnvironment();
        this.setupEventListeners();
        this.showInstructions();
        this.animate();
    }

    setupScene() {
        this.camera.position.z = 5;
        this.camera.position.y = 1.6; // Eye level
    }

    setupLights() {
        // Main light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 5);
        directionalLight.castShadow = true;
        this.scene.add(directionalLight);

        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        this.scene.add(ambientLight);

        // Point light (eerie glow)
        const pointLight = new THREE.PointLight(0x00ff00, 0.3, 20);
        pointLight.position.set(-5, 2, -5);
        this.scene.add(pointLight);
    }

    setupEnvironment() {
        // Create a hut/kiosk interior
        // Floor
        const floorGeometry = new THREE.PlaneGeometry(20, 20);
        const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x8B7355 });
        const floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.rotation.x = -Math.PI / 2;
        floor.position.y = 0;
        floor.receiveShadow = true;
        this.scene.add(floor);

        // Walls
        this.createWall(0, 0, -8, 20, 5, 1, 0x6B4423); // Back wall
        this.createWall(-10, 0, 0, 1, 5, 20, 0x6B4423); // Left wall
        this.createWall(10, 0, 0, 1, 5, 20, 0x6B4423); // Right wall

        // Counter
        const counterGeometry = new THREE.BoxGeometry(8, 1.2, 2);
        const counterMaterial = new THREE.MeshStandardMaterial({ color: 0x4a3728 });
        const counter = new THREE.Mesh(counterGeometry, counterMaterial);
        counter.position.set(0, 0.6, 2);
        counter.castShadow = true;
        counter.receiveShadow = true;
        this.scene.add(counter);

        // Shawarma rack (decorative)
        this.createShawarmaRack();

        // Roof
        const roofGeometry = new THREE.ConeGeometry(15, 3, 4);
        const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x5c3317 });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.position.y = 5;
        this.scene.add(roof);
    }

    createWall(x, y, z, width, height, depth, color) {
        const geometry = new THREE.BoxGeometry(width, height, depth);
        const material = new THREE.MeshStandardMaterial({ color: color });
        const wall = new THREE.Mesh(geometry, material);
        wall.position.set(x, y, z);
        wall.castShadow = true;
        wall.receiveShadow = true;
        this.scene.add(wall);
    }

    createShawarmaRack() {
        // Vertical spit
        const spitGeometry = new THREE.CylinderGeometry(0.2, 0.2, 3, 8);
        const metalMaterial = new THREE.MeshStandardMaterial({ color: 0xc0c0c0, metalness: 0.8 });
        const spit = new THREE.Mesh(spitGeometry, metalMaterial);
        spit.position.set(-3, 1.5, 3);
        spit.castShadow = true;
        this.scene.add(spit);

        // Meat on spit
        const meatGeometry = new THREE.ConeGeometry(0.5, 2, 6);
        const meatMaterial = new THREE.MeshStandardMaterial({ color: 0xD2691E });
        const meat = new THREE.Mesh(meatGeometry, meatMaterial);
        meat.position.set(-3, 1.5, 3);
        meat.castShadow = true;
        this.scene.add(meat);
    }

    setupEventListeners() {
        document.getElementById('playBtn').addEventListener('click', () => this.startGame());
        document.getElementById('serveBtn').addEventListener('click', () => this.serveCustomer());
        document.getElementById('accuseBtn').addEventListener('click', () => this.accuseCustomer());
        window.addEventListener('resize', () => this.onWindowResize());
    }

    showInstructions() {
        document.getElementById('instructions').style.display = 'flex';
    }

    startGame() {
        this.gameStarted = true;
        document.getElementById('instructions').style.display = 'none';
        this.spawnCustomer();
    }

    spawnCustomer() {
        if (this.gameOver) return;

        const isMonster = Math.random() > 0.5;
        
        if (isMonster) {
            this.currentCustomer = {
                name: this.monsterNames[Math.floor(Math.random() * this.monsterNames.length)],
                isMonster: true,
                clue1: this.monsterClues[Math.floor(Math.random() * this.monsterClues.length)].appearance,
                clue2: this.monsterClues[Math.floor(Math.random() * this.monsterClues.length)].behavior,
            };
        } else {
            this.currentCustomer = {
                name: this.humanNames[Math.floor(Math.random() * this.humanNames.length)],
                isMonster: false,
                clue1: this.humanClues[Math.floor(Math.random() * this.humanClues.length)].appearance,
                clue2: this.humanClues[Math.floor(Math.random() * this.humanClues.length)].behavior,
            };
        }

        this.displayCustomer();
    }

    displayCustomer() {
        document.getElementById('customerName').textContent = this.currentCustomer.name;
        document.getElementById('clue1').textContent = `👁️ ${this.currentCustomer.clue1}`;
        document.getElementById('clue2').textContent = `🗣️ ${this.currentCustomer.clue2}`;
        document.getElementById('customerInfo').classList.remove('hidden');
        document.getElementById('actionButtons').classList.remove('hidden');
    }

    serveCustomer() {
        if (!this.currentCustomer || this.gameOver) return;

        if (this.currentCustomer.isMonster) {
            // Wrong! Served a monster
            this.mistakes++;
            this.wrongServeCount++;
            this.updateMistakeCounter();

            if (this.wrongServeCount >= 3) {
                this.triggerJumpScare();
                this.wrongServeCount = 0;
            }

            if (this.mistakes >= 5) {
                this.endGame();
                return;
            }
        } else {
            // Correct! Served a human
            this.score++;
            document.getElementById('scoreCount').textContent = this.score;
        }

        // Next customer
        this.spawnCustomer();
    }

    accuseCustomer() {
        if (!this.currentCustomer || this.gameOver) return;

        if (!this.currentCustomer.isMonster) {
            // Wrong! Accused an innocent human
            this.mistakes++;
            this.wrongServeCount++;
            this.updateMistakeCounter();

            if (this.wrongServeCount >= 3) {
                this.triggerJumpScare();
                this.wrongServeCount = 0;
            }

            if (this.mistakes >= 5) {
                this.endGame();
                return;
            }
        } else {
            // Correct! Accused a monster
            this.score += 2;
            document.getElementById('scoreCount').textContent = this.score;
        }

        // Next customer
        this.spawnCustomer();
    }

    updateMistakeCounter() {
        document.getElementById('mistakeCount').textContent = this.mistakes;
    }

    triggerJumpScare() {
        const jumpScareElement = document.getElementById('jumpScare');
        
        // Play a scary sound (optional - using Web Audio API)
        this.playScareSound();
        
        jumpScareElement.style.display = 'flex';
        
        setTimeout(() => {
            jumpScareElement.style.display = 'none';
        }, 800);
    }

    playScareSound() {
        // Create a scary beep using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioContext.currentTime;
        
        // Create multiple oscillators for a scary sound
        const frequencies = [150, 75, 300];
        
        frequencies.forEach((freq, index) => {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            
            osc.frequency.value = freq;
            osc.type = 'sawtooth';
            
            gain.gain.setValueAtTime(0.1, now);
            gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            
            osc.connect(gain);
            gain.connect(audioContext.destination);
            
            osc.start(now + index * 0.05);
            osc.stop(now + 0.3);
        });
    }

    endGame() {
        this.gameOver = true;
        document.getElementById('gameOverScreen').style.display = 'flex';
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('customerInfo').classList.add('hidden');
        document.getElementById('actionButtons').classList.add('hidden');
    }

    onWindowResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Subtle camera wobble (as if breathing)
        if (this.gameStarted && !this.gameOver) {
            const time = Date.now() * 0.0005;
            this.camera.position.y = 1.6 + Math.sin(time) * 0.05;
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Start the game when the page loads
window.addEventListener('DOMContentLoaded', () => {
    new ShawarmaGame();
});
