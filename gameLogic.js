function restartGame() {
    localStorage.clear();
    gameState.tileMatrix.forEach(row => {
        row.forEach(tile => {
            if (tile.type !== ELEM_BLANK && tile.type !== ELEM_MOUNTAIN) {
                tile.type = ELEM_BLANK;
            }
        });
    });
    document.getElementById(PLACEABLE_ELEMENT).remove();
    startGame();
}

function startGame() {
    const cache = localStorage.getItem(LOCAL_STORAGE_CACHE);
    const wasCached = cache !== null;
    const timeLeftElement = document.getElementById(TIME_LEFT);
    if (!wasCached) {
        gameState.gameTime = timeLeftElement.innerText = MAX_GAME_TIME;
        gameState.pointsTracking.summer = 0;
        gameState.pointsTracking.spring = 0;
        gameState.pointsTracking.winter = 0;
        gameState.pointsTracking.autumn = 0;
        gameState.pointsTracking.sum = 0;
        gameState.currentSeason = SPRING;
        gameState.missions = [];
        updateSeasonPoints(SPRING);
        updateSeasonPoints(SUMMER);
        updateSeasonPoints(AUTUMN);
        updateSeasonPoints(WINTER);
        fillPlaceableElementSequence();
        initializePlaceableElement(false);
        initializeMissions(false);
        calculatePoints();
    } else {
        gameState = JSON.parse(cache);
        timeLeftElement.innerText = gameState.gameTime;
        const seasonPointsCounterHtml = document.getElementById(`${gameState.currentSeason}`);
        seasonPointsCounterHtml.classList.add('selected');
        updateSeasonPoints(SPRING);
        updateSeasonPoints(SUMMER);
        updateSeasonPoints(AUTUMN);
        updateSeasonPoints(WINTER);
        const totalPointsCounterHtml = document.getElementById(TOTAL_POINTS_COUNTER);
        totalPointsCounterHtml.innerText = `${gameState.pointsTracking.sum} pont`;
        initializePlaceableElement(true);
        initializeMissions(true);
    }
    document.getElementById(`0${SEASON_MISSION_SUFFIX}`)?.classList.remove('selected');
    document.getElementById(`1${SEASON_MISSION_SUFFIX}`)?.classList.remove('selected');
    document.getElementById(`2${SEASON_MISSION_SUFFIX}`)?.classList.remove('selected');
    document.getElementById(`3${SEASON_MISSION_SUFFIX}`)?.classList.remove('selected');
    document.getElementById(`${SPRING}`).classList.remove('selected');
    document.getElementById(`${SUMMER}`).classList.remove('selected');
    document.getElementById(`${AUTUMN}`).classList.remove('selected');
    document.getElementById(`${WINTER}`).classList.remove('selected');
    const seasonMissions = getSeasonMissions(gameState.currentSeason);
    for (let i = 0; i < seasonMissions.length; i++) {
        const seasonMission = seasonMissions[i];
        const seasonMissionHtml = document.getElementById(`${seasonMission.id}${SEASON_MISSION_SUFFIX}`);
        seasonMissionHtml.classList.add('selected');
    }
    const seasonHtml = document.getElementById(`${gameState.currentSeason}`);
    seasonHtml.classList.add('selected');
    drawTiles(wasCached);
}

function deductTimeLeft(deductedTime) {
    if (deductedTime === undefined) {
        throw Error('deductedTime parameter is undefined!');
    }
    const timeLeftHtml = document.getElementById(TIME_LEFT);
    gameState.gameTime -= deductedTime;
    if (gameState.gameTime < 0) {
        gameState.gameTime = 0;
    }
    let elapsedSeasons = Math.floor((MAX_GAME_TIME - gameState.gameTime) / 7);
    const newSeason = SEASON_ID_MAPPINGS[elapsedSeasons];
    if (newSeason !== gameState.currentSeason) {
        calculatePoints();
        if (newSeason) {
            const previousSeasonHtml = document.getElementById(gameState.currentSeason);
            previousSeasonHtml.classList.remove('selected');
            const previousSeasonMissions = getSeasonMissions(gameState.currentSeason);
            for (let i = 0; i < previousSeasonMissions.length; i++) {
                const seasonMission = previousSeasonMissions[i];
                const seasonMissionHtml = document.getElementById(`${seasonMission.id}${SEASON_MISSION_SUFFIX}`);
                seasonMissionHtml.classList.remove('selected');
            }
            const newSeasonPointsCounterHtml = document.getElementById(`${newSeason}`);
            newSeasonPointsCounterHtml.classList.add('selected');
            const newSeasonMissions = getSeasonMissions(newSeason);
            for (let i = 0; i < newSeasonMissions.length; i++) {
                const seasonMission = newSeasonMissions[i];
                const seasonMissionHtml = document.getElementById(`${seasonMission.id}${SEASON_MISSION_SUFFIX}`);
                seasonMissionHtml.classList.add('selected');
            }
            gameState.currentSeason = newSeason;
        }
    }
    timeLeftHtml.innerText = gameState.gameTime;
    localStorage.setItem(LOCAL_STORAGE_CACHE, JSON.stringify(gameState))
}

function clearTileSelection() {
    selectionHtmlList.forEach(htmlElem => {
        clearSelectionStyle(htmlElem);
    });
    selectionHtmlList.splice(0);
    selectionList.splice(0);
}

function rotateElement() {
    let left = 0, right = 2;
    while (left < right) {
        for (let i = 0; i < right - left; i++) {
            let top = left, bottom = right;
            let topLeft = gameState.placeableElement.shape[top][left + i];
            gameState.placeableElement.shape[top][left + i] = gameState.placeableElement.shape[bottom - i][left];
            gameState.placeableElement.shape[bottom - i][left] = gameState.placeableElement.shape[bottom][right - i];
            gameState.placeableElement.shape[bottom][right - i] = gameState.placeableElement.shape[top + i][right];
            gameState.placeableElement.shape[top + i][right] = topLeft;
        }
        left++;
        right--;
    }
    modifyPlaceableElement(undefined, false)
}

function mirrorElement() {
    for (var i = 0; i < 3; i++) {
        gameState.placeableElement.shape[i].reverse();
    }
    modifyPlaceableElement(undefined, false)
}

function selectTile(event) {
    if (gameState.gameTime <= 0) {
        return;
    }
    selectedTileRowIndex = event.target.row;
    selectedTileColumnIndex = event.target.col;

    selectionInvalid = false;
    for (let i = -1; i < 2; i++) {
        const placeableElementRowIndex = i + 1;
        const selectedAreaRowNumber = selectedTileRowIndex + i;
        for (let j = -1; j < 2; j++) {
            const placeableElementColumnIndex = j + 1;
            if (gameState.placeableElement.shape[placeableElementRowIndex][placeableElementColumnIndex] === 1) {
                const selectedAreaColumnNumber = selectedTileColumnIndex + j;
                const selectedAreaRow = gameState.tileMatrix[selectedAreaRowNumber];
                if (!selectedAreaRow) {
                    selectionInvalid = true;
                    continue;
                }
                const selectedAreaTile = selectedAreaRow[selectedAreaColumnNumber];
                if (!selectedAreaTile) {
                    selectionInvalid = true;
                    continue;
                }

                if (selectedAreaTile) {
                    if (selectedAreaTile.type !== ELEM_BLANK) {
                        selectionInvalid = true;
                    }
                    const selectedAreaTileHtml = document.getElementById(selectedAreaTile.id)
                    selectionHtmlList.push(selectedAreaTileHtml);
                    selectionList.push(selectedAreaTile);
                } else if (!selectedAreaTile) {
                    selectionInvalid = true;
                }
            }
        }
    }

    selectionHtmlList.forEach(htmlElem => {
        htmlElem.classList.add(selectionInvalid ? INVALID_SELECTION : VALID_SELECTION);
    });

    const selectedTile = gameState.tileMatrix[selectedTileRowIndex][selectedTileColumnIndex];
    const selectedTileHtml = document.getElementById(selectedTile.id);
    if (gameState.placeableElement.shape[1][1] === 1) {
        selectedTileHtml.classList.add(selectionInvalid ? INVALID_POSITION_SELECTION : VALID_POSITION_SELECTION);
    } else {
        selectedTileHtml.classList.add(POSITION_SELECTION);
    }
    selectionHtmlList.push(selectedTileHtml);
}

console.log("Game logic imported");
