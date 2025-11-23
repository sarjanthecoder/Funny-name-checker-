// Data for Random Generation
const archetypes = ["The Chaos Potato", "Glitter Paladin", "Naptime Ninja", "Caffeine Warlock", "Social Butterfly (Irony)", "Pixel Wizard"];
const traits = ["Slightly sticky", "Can smell wifi", "Allergic to mornings", "Fluent in sarcasm", "Hoards shiny objects", "Suspiciously lucky", "Professional napper", "Vibrates with anxiety"];
const items = ["A half-eaten bagel", "Invisibility cloak (lost)", "Rubber duck collection", "Infinite coffee mug", "cursed sword", "bag of holding (full of snacks)"];
const catchphrases = [
    "It works on my machine!",
    "I meant to do that.",
    "Chaos is just spicy order.",
    "Did someone say snacks?",
    "404: Motivation not found.",
    "Hold my juice box."
];
const colors = ["#ff9a9e", "#fad0c4", "#a18cd1", "#fbc2eb", "#8fd3f4", "#84fab0"];

class CharacterGenerator {
    constructor() {
        this.input = document.getElementById('username-input');
        this.btn = document.getElementById('generate-btn');
        this.container = document.getElementById('card-container');
        
        this.btn.addEventListener('click', () => this.generate());
        
        // Generate one on load for demo
        this.generate();
    }

    getRandom(arr, count = 1) {
        if (count === 1) return arr[Math.floor(Math.random() * arr.length)];
        const shuffled = [...arr].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    generate() {
        const username = this.input.value || "Anonymous";
        
        // Construct the JSON object as requested
        const character = {
            username: username,
            archetype: this.getRandom(archetypes),
            personality: this.getRandom(traits, 5),
            backstory: `Born in a ${this.getRandom(['storm', 'bakery', 'library', 'glitch'])}, ${username} decided that normal was overrated. Now they wander the digital realm looking for ${this.getRandom(items)} and avoiding responsibilities.`,
            appearance: {
                hair: "Defies gravity",
                eyes: "Sparkling with mischief",
                clothing: "Hoodie of Mystery",
                accessories: this.getRandom(items),
                height: "5'2\" (on tiptoes)",
                posture: "Slouching artistically",
                oddity: "Glows in the dark"
            },
            favorite_things: this.getRandom(items, 4),
            catchphrases: this.getRandom(catchphrases, 3),
            color_palette: {
                background: "#ffffff",
                card: "#fdfbfb",
                accent: this.getRandom(colors),
                text: "#333333"
            },
            tags: ["funny", "lovable", "chaos"]
        };

        this.render(character);
    }

    render(char) {
        const cardHTML = `
            <div class="character-card" style="border-top: 5px solid ${char.color_palette.accent}">
                <div class="char-header">
                    <div class="char-name">${char.username}</div>
                    <div class="char-archetype" style="background: ${char.color_palette.accent}20; color: ${char.color_palette.accent}">${char.archetype}</div>
                </div>
                
                <div class="char-avatar" style="background: linear-gradient(135deg, ${char.color_palette.accent}40, ${char.color_palette.accent}10)">
                    ${this.getAvatarEmoji(char.archetype)}
                </div>

                <div class="char-traits">
                    ${char.personality.map(t => `<span class="trait-tag">${t}</span>`).join('')}
                </div>

                <p class="char-bio">${char.backstory}</p>

                <div class="char-catchphrase" onclick="this.innerText = '${char.catchphrases[1]}'">
                    "${char.catchphrases[0]}"
                </div>
                
                <div class="char-footer">
                    <span>❤️ Loves: ${char.favorite_things[0]}</span>
                    <span>Oddity: ${char.appearance.oddity}</span>
                </div>
            </div>
        `;

        this.container.innerHTML = cardHTML;
        
        // Add click listener for catchphrase cycling manually since innerHTML kills references
        const phraseBox = this.container.querySelector('.char-catchphrase');
        let phraseIndex = 0;
        phraseBox.addEventListener('click', () => {
            phraseIndex = (phraseIndex + 1) % char.catchphrases.length;
            phraseBox.innerText = `"${char.catchphrases[phraseIndex]}"`;
            phraseBox.style.transform = "scale(0.95)";
            setTimeout(() => phraseBox.style.transform = "scale(1)", 100);
        });
    }

    getAvatarEmoji(archetype) {
        if (archetype.includes("Potato")) return "🥔";
        if (archetype.includes("Wizard")) return "🧙‍♂️";
        if (archetype.includes("Ninja")) return "🥷";
        if (archetype.includes("Cat")) return "🐱";
        return "✨";
    }
}

class FlamesGame {
    constructor() {
        this.name1Input = document.getElementById('flames-name1');
        this.name2Input = document.getElementById('flames-name2');
        this.btn = document.getElementById('calc-flames-btn');
        this.resultDiv = document.getElementById('flames-result');
        this.resultText = document.getElementById('result-text');
        this.resultDesc = document.getElementById('result-desc');
        this.resultIcon = document.querySelector('.result-icon');

        this.btn.addEventListener('click', () => this.calculate());
    }

    calculate() {
        const n1 = this.name1Input.value.toLowerCase().replace(/[^a-z]/g, '');
        const n2 = this.name2Input.value.toLowerCase().replace(/[^a-z]/g, '');

        if (!n1 || !n2) {
            alert("Please enter both names!");
            return;
        }

        let str1 = n1.split('');
        let str2 = n2.split('');

        // Remove common characters
        for (let i = 0; i < str1.length; i++) {
            const index = str2.indexOf(str1[i]);
            if (index !== -1) {
                str1[i] = '*'; // Mark as removed
                str2[index] = '*';
            }
        }

        const count = str1.filter(c => c !== '*').length + str2.filter(c => c !== '*').length;
        
        this.showResult(count);
    }

    showResult(count) {
        const flames = [
            { l: 'F', w: 'Friends', d: 'Besties for life! 👯', i: '🤝' },
            { l: 'L', w: 'Lovers', d: 'Sparks are flying! 💘', i: '😍' },
            { l: 'A', w: 'Affection', d: 'Someone has a crush... 🌸', i: '💌' },
            { l: 'M', w: 'Marriage', d: 'Put a ring on it! 💍', i: '💒' },
            { l: 'E', w: 'Enemy', d: 'Run away! ⚔️', i: '😈' },
            { l: 'S', w: 'Sister', d: 'Family zone. 🏠', i: '👧' }
        ];

        // Simple modulo logic for demo purposes
        // Note: Real FLAMES is elimination, but modulo is common for quick web toys
        // Using (count % 6) where 0 = Sister (last index) if we map 1-6. 
        // Let's use index = count % 6.
        // If count is 0 (names are identical), it's usually "Soulmates" or "Lovers" in custom rules, 
        // but strictly it's 0. Let's map 0 to something special or just use the array.
        
        let index = count % 6;
        // Adjust because usually 1 = F, etc.
        // If count = 1, index 1.
        // If count = 6, index 0.
        // Let's shift it so 1=F (index 0).
        // (count - 1) % 6? 
        // Let's just stick to count % 6 and map it arbitrarily for fun.
        
        // Mapping: 1=F, 2=L, 3=A, 4=M, 5=E, 0=S
        if (count === 0) index = 1; // Identical names -> Lovers
        else index = (count % 6);
        
        // Fix index to match array
        // 1%6 = 1 -> Lovers? No F is first.
        // Let's just do:
        // 1 -> F (0)
        // 2 -> L (1)
        // ...
        // 0 -> S (5)
        
        let finalIndex = (count % 6 === 0) ? 5 : (count % 6) - 1;
        if (count === 0) finalIndex = 1; // Special case for identical names

        const result = flames[finalIndex];

        this.resultText.innerText = result.w;
        this.resultDesc.innerText = result.d;
        this.resultIcon.innerText = result.i;
        
        this.resultDiv.classList.remove('hidden');
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new CharacterGenerator();
    new FlamesGame();
});
