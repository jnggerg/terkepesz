function updateSeasonPoints(season) {
    const seasonPointsCounterHtml = document.getElementById(`${season}${SEASON_POINTS_SUFFIX}`);
    const pointsLabel = currentLang === 'hu' ? 'pont' : 'points';
    switch (season) {
        case SPRING:
            seasonPointsCounterHtml.innerText = `${gameState.pointsTracking.spring}\n ${pointsLabel}`;
            break;
        case SUMMER:
            seasonPointsCounterHtml.innerText = `${gameState.pointsTracking.summer}\n ${pointsLabel}`;
            break;
        case AUTUMN:
            seasonPointsCounterHtml.innerText = `${gameState.pointsTracking.autumn}\n ${pointsLabel}`;
            break;
        case WINTER:
            seasonPointsCounterHtml.innerText = `${gameState.pointsTracking.winter}\n ${pointsLabel}`;
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
