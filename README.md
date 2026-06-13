# 🌯 Shawarma Horror 🌯

A 3D first-person horror game where you serve shawarmas to customers at a kiosk. But beware - some of them are disguised monsters!

## 🎮 Game Overview

You're working at a shawarma kiosk inside a small hut. Customers come up to order, and you must decide whether to **SERVE** them or **ACCUSE** them of being a monster.

- **Serve HUMANS** ✓ (+1 point)
- **Accuse MONSTERS** ✗ (+2 points)
- **Wrong decision** = Mistake (5 mistakes = Game Over)
- **3 consecutive mistakes** = Jump scare! 😱

## 📋 Game Rules

1. **Read the clues carefully!** Each customer gives you two clues:
   - 👁️ Appearance clue (what you see)
   - 🗣️ Behavior clue (how they act)

2. **Serve HUMANS** if you think they're innocent
   - Humans have clues like: "Looks normal", "Smiles warmly", "Has a watch"

3. **Accuse MONSTERS** if you detect something suspicious
   - Monsters have clues like: "Eyes glow red", "Fingers too long", "Teeth appear sharp"

4. **Survive without making 5 mistakes!**
   - 3 mistakes in a row triggers a jump scare
   - 5 total mistakes = Game Over

## 🕹️ How to Play

1. Open `index.html` in a web browser
2. Click **PLAY** to start the game
3. Read the customer clues carefully
4. Click **SERVE SHAWARMA** if they're human
5. Click **ACCUSE MONSTER** if you detect a monster
6. Try to get the highest score before making 5 mistakes!

## 🎨 Features

- **3D First-Person View** - Immersive hut environment created with Three.js
- **Dynamic Customer Generation** - Humans and monsters with unique clues
- **Score Tracking** - Keep track of correct serves and monsters caught
- **Progressive Difficulty** - More mistakes trigger jump scares
- **Audio Jump Scares** - Scary sound effects using Web Audio API
- **Responsive Design** - Works on desktop browsers

## 🛠️ Technologies Used

- **HTML5** - Game structure
- **CSS3** - UI and styling
- **JavaScript** - Game logic
- **Three.js** - 3D graphics and rendering
- **Web Audio API** - Sound effects

## 📁 File Structure

```
shawarma-horror/
├── index.html      # Main game page and UI
├── game.js         # Game logic and 3D engine
└── README.md       # This file
```

## 🚀 Running the Game

Simply open `index.html` in any modern web browser that supports:
- WebGL (for 3D graphics)
- Web Audio API (for sound effects)
- ES6 JavaScript

## 🎯 Tips for Playing

1. **Pay attention to detail** - Monsters have distinct features
2. **Don't trust appearances alone** - Read both clues
3. **Be patient** - Not every customer is a monster
4. **Watch your mistake counter** - It goes red as you get closer to game over
5. **The jump scares are coming** - Prepare yourself!

## 👾 Monster Indicators

Look for these suspicious signs:
- Eyes that glow red or have an unnatural color
- Unnaturally long fingers or claws
- Scaly or odd-textured skin
- Heads that tilt in strange ways
- Sharp or jagged teeth
- Unusual breathing or growling sounds

## 👤 Human Indicators

Normal customers typically show:
- Friendly, warm smiles
- Normal body proportions
- Regular eye contact
- Polite conversation
- Patient demeanor

## 🎵 Sound Design

The game uses procedurally generated scary sounds for jump scares. The Web Audio API creates unsettling tones that play when you make 3 consecutive mistakes.

## 🏆 Scoring System

- Serve a human correctly: **+1 point**
- Accuse a monster correctly: **+2 points**
- Serve a monster or accuse a human: **+1 Mistake**
- 5 mistakes: **GAME OVER**
- 3 consecutive mistakes: **Jump Scare!**

## 🐛 Known Issues

- None yet! Enjoy the game!

## 📝 Future Improvements

- More customer types and clues
- Different hut environments
- Leaderboard system
- Difficulty levels
- More diverse jump scare effects
- Mobile touch controls

## 👨‍💻 Author

Created with ❤️ for horror game enthusiasts

## 📜 License

This project is open source and available under the MIT License.

---

**Now go forth and serve shawarmas... but watch out! 👀**
