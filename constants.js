//Element types
const ELEM_FOREST = 'forest';
const ELEM_WATER = 'water';
const ELEM_TOWN = 'town';
const ELEM_FARM = 'farm';
const ELEM_MOUNTAIN = 'mountain';
const ELEM_BLANK = 'blank';

//Element type CSS styles
const ELEM_BLANK_STYLE = 'blank-element';
const ELEM_FOREST_STYLE = 'forest-element';
const ELEM_WATER_STYLE = 'water-element';
const ELEM_TOWN_STYLE = 'town-element';
const ELEM_FARM_STYLE = 'farm-element';
const ELEM_MOUNTAIN_STYLE = 'mountain-element';

//CSS styles
const INVALID_SELECTION = 'invalid-selection';
const INVALID_POSITION_SELECTION = 'current-selection-position-invalid';
const POSITION_SELECTION = 'current-selection-position';
const VALID_POSITION_SELECTION = 'current-selection-position-valid';
const VALID_SELECTION = 'valid-selection';

//HTML IDs
const TIME_LEFT = 'time-left';
const GAME_TABLE = 'game-table';
const TOTAL_POINTS_COUNTER = 'all-points';
const PLACEABLE_ELEMENT_CONTAINER = 'random-element-container';
const PLACEABLE_ELEMENT = 'random-element';
const PLACEABLE_ELEMENT_TIME_VALUE = 'time-points';
const SEASON_MISSIONS = 'season-mission-list';
const SEASON_MISSION_POINTS_SUFFIX = '-mission-points';
const SEASON_MISSION_SUFFIX = '-mission';

//Season constants
const SPRING = 'spring';
const SUMMER = 'summer';
const AUTUMN = 'autumn';
const WINTER = 'winter';
const SEASON_POINTS_SUFFIX = '-points'
const SEASON_ID_MAPPINGS = {
    0: SPRING,
    1: SUMMER,
    2: AUTUMN,
    3: WINTER
};
const SEASON_MISSION_MAPPINGS = {
    'spring': [0, 1],
    'summer': [1, 2],
    'autumn': [2, 3],
    'winter': [3, 0]
};

//Game logic
const MAX_GAME_TIME = 28;
const LOCAL_STORAGE_CACHE = 'game-cache';

const MISSION_LIST =
{
    "basic": [
        {
            "id": 0,
            'name': 'forest_edge',
            "title": "Az erdő széle",
            "description": "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz.",
            "points_aquired": 0,
            point_calculator: (() => {
                let points = 0;
                for (let i = 0; i < gameState.tileMatrix.length; i++) {
                    const row = gameState.tileMatrix[i];
                    for (let j = 0; j < row.length; j++) {
                        const tile = row[j];
                        if ((i === 0 || i === gameState.tileMatrix.length - 1) &&
                            tile.type === ELEM_FOREST) {
                            points++
                        }
                        if ((j === 0 || j === gameState.tileMatrix.length - 1) &&
                            tile.type === ELEM_FOREST) {
                            points++
                        }
                    }
                }
                return points;
            })
        },
        {
            "id": 0,
            "title": "Álmos-völgy",
            "description": "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz.",
            "points_aquired": 0,
            point_calculator: (() => {
                let points = 0;
                for (let i = 0; i < gameState.tileMatrix.length; i++) {
                    const row = gameState.tileMatrix[i];
                    let forestCount = 0;
                    for (let j = 0; j < row.length; j++) {
                        const tile = row[j];
                        if (tile.type == ELEM_FOREST) {
                            forestCount++;
                        }
                    }
                    if (forestCount === 4) {
                        points += 4;
                    }
                }
                return points;
            })
        },
        {
            "id": 0,
            "title": "Krumpliöntözés",
            "description": "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz.",
            "points_aquired": 0,
            point_calculator: (() => {
                let points = 0;

                for (let i = 0; i < gameState.tileMatrix.length; i++) {
                    const row = gameState.tileMatrix[i];
                    for (let j = 0; j < row.length; j++) {
                        const tile = row[j];
                        if (tile.type === ELEM_FARM) {
                            let leftTile, rightTile, topTile, bottomTile;
                            if (j - 1 >= 0) {
                                leftTile = gameState.tileMatrix[i][j - 1];
                            }
                            if (j + 1 < row.length) {
                                rightTile = gameState.tileMatrix[i][j + 1]
                            }
                            if (i + 1 < gameState.tileMatrix.length) {
                                topTile = gameState.tileMatrix[i + 1][j];
                            }
                            if (i - 1 >= 0) {
                                bottomTile = gameState.tileMatrix[i - 1][j];
                            }
                            if (leftTile && leftTile.type === ELEM_WATER) {
                                points += 2;
                            }
                            if (rightTile && rightTile.type === ELEM_WATER) {
                                points += 2;
                            }
                            if (topTile && topTile.type === ELEM_WATER) {
                                points += 2;
                            }
                            if (bottomTile && bottomTile.type === ELEM_WATER) {
                                points += 2;
                            }
                        }
                    }
                }

                return points;
            })
        },
        {
            "id": 0,
            "title": "Határvidék",
            "description": "Minden teli sorért vagy oszlopért 6-6 pontot kapsz.",
            "points_aquired": 0,
            point_calculator: (() => {
                let points = 0;
                for (let i = 0; i < gameState.tileMatrix.length; i++) {
                    const row = gameState.tileMatrix[i];
                    let fullRow = true;
                    for (let j = 0; j < row.length; j++) {
                        const tile = row[j];
                        if (tile.type === ELEM_BLANK) {
                            fullRow = false;
                            continue;
                        }
                    }
                    if (fullRow) {
                        points += 6;
                    }
                }
                return points;
            })
        }
    ],
    "extra": [
        {
            "title": "Fasor",
            "description": "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért."
        },
        {
            "title": "Gazdag város",
            "description": "A legalább három különböző tereptípussal szomszédos falurégióidért három-három pontot kapsz."
        },
        {
            "title": "Öntözőcsatorna",
            "description": "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte."
        },
        {
            "title": "Mágusok völgye",
            "description": "A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz."
        },
        {
            "title": "Üres telek",
            "description": "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz."
        },
        {
            "title": "Sorház",
            "description": "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz."
        },
        {
            "title": "Páratlan silók",
            "description": "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz."
        },
        {
            "title": "Gazdag vidék",
            "description": "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz."
        }
    ],
}

const ELEMENT_LIST = [{
    time: 2,
    type: 'water',
    shape: [
        [1, 1, 1],
        [0, 0, 0],
        [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
},
{
    time: 2,
    type: 'town',
    shape: [
        [1, 1, 1],
        [0, 0, 0],
        [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
},
{
    time: 1,
    type: 'forest',
    shape: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
},
{
    time: 2,
    type: 'farm',
    shape: [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
},
{
    time: 2,
    type: 'forest',
    shape: [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
},
{
    time: 2,
    type: 'town',
    shape: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
},

{
    time: 2,
    type: 'farm',
    shape: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
},

{
    time: 1,
    type: 'town',
    shape: [
        [1, 1, 0],
        [1, 0, 0],
        [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
},

{
    time: 1,
    type: 'town',
    shape: [
        [1, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
},

{
    time: 1,
    type: 'farm',
    shape: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
},

{
    time: 1,
    type: 'farm',
    shape: [
        [0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]
    ],
    rotation: 0,
    mirrored: false
},

{
    time: 2,
    type: 'water',
    shape: [
        [1, 1, 1],
        [1, 0, 0],
        [1, 0, 0]
    ],
    rotation: 0,
    mirrored: false
},

{
    time: 2,
    type: 'water',
    shape: [
        [1, 0, 0],
        [1, 1, 1],
        [1, 0, 0]
    ],
    rotation: 0,
    mirrored: false
},
{
    time: 2,
    type: 'forest',
    shape: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 1]
    ],
    rotation: 0,
    mirrored: false
},
{
    time: 2,
    type: 'forest',
    shape: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
},
{
    time: 2,
    type: 'water',
    shape: [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0]
    ],
    rotation: 0,
    mirrored: false
}]

const fixedMountainTiles = [[2, 2], [4, 9], [6, 4], [9, 10], [10, 6]]

console.log("Constants imported");
