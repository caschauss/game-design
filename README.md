# PolitikschMERZen
A game about politics created by [firefly](https://github.com/caschauss), [HerrUnkreativ](https://github.com/HerrUnkreativ), [Kev](https://github.com/KevPtsm) and [Snackshreck](https://github.com/Snackshreck).
## Getting started
! Make sure you have [nodejs](https://nodejs.org/en) and [npmjs](https://www.npmjs.com/) installed on your device.
1. Open a Terminal in both the `frontend` and `backend` folder.
2. Run `npm i` and `npm run dev` in both terminals.
3. Open [the website in your browser](http://localhost:1312/).
## How to play
This game will display a random quote from an anonymous politician. Your task is to find out which party they belong to.
You're given four options, one of which will be correct. A timer will start ticking until you select one option.
Quotes are divided into three difficulty settings. You can add new quotes by accessing `data.db` in the `backend` folder with a tool such as [DB Browser for SQLite](https://sqlitebrowser.org/).
You can select a number of different power-ups from the start menu. You can either select four random ones or two from the following list: 
- Year: Shows the year of a given quote.
- Politician: Shows the author of a given quote.
- Context: Shows the context of a given quote.
- 50 %: Removes two false options.
- 2x Points: Double point modifier for the current round.
- +10 s: Adds ten seconds to the current timer.
# License
You can use this Game under the [Creative Commons BY-NC license](https://en.wikipedia.org/wiki/Creative_Commons_NonCommercial_license). Please link to [the original repository](https://github.com/caschauss/game-design) if you decide to expand on it.