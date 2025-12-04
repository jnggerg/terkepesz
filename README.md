# Live demo:
https://jnggerg.github.io/terkepesz/

# About the project:
The game is built in Vanilla JS, HTML, CSS and Bootstrap.
It inlcudes a random mission list, change between EN/HU languages.
Gamestate is stored in localstorage.

# Game Description:
In this single-player game, you must place various shapes of terrain tiles with different terrain types onto an 11×11 grid map.
Each tile has an associated time value (1 or 2). At the end of the game (or during the game), you must perform several checks (missions) based on the current state of the grid,
and the final score is determined from these.

## Game Duration
The game lasts for 28 time units. Each terrain tile has a time value that determines how long it takes to explore it.
You may draw new terrain tiles until you reach the 28 time units. If the total time value reaches or exceeds 28, the game ends.  
For example, if you have 1 time unit remaining and you draw a terrain tile with a time value of 2, you may still place the tile, and the game ends immediately afterward.

## Seasons
The 28 time units represent one year. The year is divided into 4 seasons, each lasting 7 time units.
If, while drawing terrain tiles, the accumulated time value reaches or exceeds a multiple of 7, that season ends.

At the end of each season, you can score points for 2 mission cards:  
- At the end of Spring: missions A–B  
- At the end of Summer: missions B–C 
- At the end of Autumn: missions C–D  
- At the end of Winter: missions D–A

