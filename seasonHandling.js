function updateSeasonPoints(season) {
    const seasonPointsCounterHtml = document.getElementById(`${season}${SEASON_POINTS_SUFFIX}`);
    switch (season) {
        case SPRING:
            seasonPointsCounterHtml.innerText = `${gameState.pointsTracking.spring} pont`;
            break;
        case SUMMER:
            seasonPointsCounterHtml.innerText = `${gameState.pointsTracking.summer} pont`;
            break;
        case AUTUMN:
            seasonPointsCounterHtml.innerText = `${gameState.pointsTracking.autumn} pont`;
            break;
        case WINTER:
            seasonPointsCounterHtml.innerText = `${gameState.pointsTracking.winter} pont`;
            break;
    }
}


function getSeasonMissions(season)
{
    const seasonMissionIdList = SEASON_MISSION_MAPPINGS[season];
    let missionList = []
    seasonMissionIdList.forEach(id => {
        const seasonMission = gameState.missions.find(mission => mission.id === id);
        if(!seasonMission)
        {
            throw Error('Season mission does not exist!');
        }
        missionList.push(seasonMission);
    });
    return missionList;
}

console.log("Seasons imported");
