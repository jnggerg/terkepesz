//THESE WERE CREATED ONLY FOR ERROR HANDLING -->
let tilesInitialized = false;
let placeableElementHtmlInitialized = false;
//THESE WERE CREATED ONLY FOR ERROR HANDLING <--

let selectedTileRowIndex = 0;
let selectedTileColumnIndex = 0;
let selectionHtmlList = [];
let selectionList = [];
let selectionInvalid = true;

let gameState = {
    tileMatrix: [],
    pointsTracking: {
        spring: 0,
        summer: 0,
        autumn: 0,
        winter: 0,
        sum: 0
    },
    gameTime: 0,
    currentSeason: '',
    placeableElementSequence: [],
    placeableElement: {
        time: 0,
        type: '',
        shape: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ],
        rotation: 0,
        mirrored: false
    },
    missions: []
}

gameState.tileMatrix = initializeTiles();

startGame();