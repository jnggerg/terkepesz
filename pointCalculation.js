function calculatePoints() {
    const seasonMissions = getSeasonMissions(gameState.currentSeason);
    for (let i = 0; i < seasonMissions.length; i++) {
        const mission = seasonMissions[i];
        const pointsEarned = mission.point_calculator();
        updateMissionPoints(mission, pointsEarned);
        switch (gameState.currentSeason) {
            case SPRING:
                gameState.pointsTracking.spring += pointsEarned;
                break;
            case SUMMER:
                gameState.pointsTracking.summer += pointsEarned;
                break;
            case AUTUMN:
                gameState.pointsTracking.autumn += pointsEarned;
                break;
            case WINTER:
                gameState.pointsTracking.winter += pointsEarned;
                break;
        }
        gameState.pointsTracking.sum += pointsEarned;
    }
    gameState.pointsTracking.sum += mountainSurroundingPoints();
    updateSeasonPoints(gameState.currentSeason);
    const totalPointsCounterHtml = document.getElementById(TOTAL_POINTS_COUNTER);
    totalPointsCounterHtml.innerText = `${gameState.pointsTracking.sum} pont`;
    localStorage.setItem(LOCAL_STORAGE_CACHE, JSON.stringify(gameState))
}

function mountainSurroundingPoints() {
    let mountainPoints = 0;
    for (let i = 0; i < fixedMountainTiles.length; i++) {
        const mountain = fixedMountainTiles[i];
        const rowIndex = mountain[0];
        const columnIndex = mountain[1];
        const tileRowNumber = rowIndex - 1;
        const tileColumnIndex = columnIndex - 1;

        const leftTile = gameState.tileMatrix[tileRowNumber][tileColumnIndex - 1];
        const rightTile = gameState.tileMatrix[tileRowNumber][tileColumnIndex + 1];
        const topTile = gameState.tileMatrix[tileRowNumber + 1][tileColumnIndex];
        const bottomTile = gameState.tileMatrix[tileRowNumber - 1][tileColumnIndex];
        if ((leftTile && leftTile.type !== ELEM_BLANK) &&
            (rightTile && rightTile.type !== ELEM_BLANK) &&
            (topTile && topTile.type !== ELEM_BLANK) &&
            (bottomTile && bottomTile.type !== ELEM_BLANK)) {
            mountainPoints++;
        }
    }
    return mountainPoints;
}

function updateMissionPoints(mission, pointsEarned) {
    mission.points_aquired += pointsEarned;
    const missionPointsHtml = document.getElementById(`${mission.id}${SEASON_MISSION_POINTS_SUFFIX}`);
    missionPointsHtml.innerText = `Pontok: ${mission.points_aquired}`;
}

console.log("Point calculation imported");
