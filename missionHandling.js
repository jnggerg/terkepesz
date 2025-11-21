
function initializeMissions(isCached) {
    if (isCached === undefined) {
        throw Error('isCached parameter is undefined!');
    }

    const missionListHtml = document.getElementById(SEASON_MISSIONS);
    missionListHtml.innerHTML = '';
    if (isCached) {
        for (let i = 0; i < gameState.missions.length; i++) {
            const mission = gameState.missions[i];
            mission.point_calculator = MISSION_LIST.basic.find(x => x.title === mission.title).point_calculator;
            missionListHtml.append(createMissionHtml(mission));
        }
    } else {
        gameState.missions = [];
        const possibleMissions = MISSION_LIST.basic.map(x => x);
        possibleMissions.forEach(mission => {
            id = 0;
            mission.points_aquired = 0;
        });
        const abMission = selectMission(possibleMissions, 0);
        const bcMission = selectMission(possibleMissions, 1);
        const cdMission = selectMission(possibleMissions, 2);
        const daMission = selectMission(possibleMissions, 3);
        missionListHtml.append(createMissionHtml(abMission),
            createMissionHtml(bcMission),
            createMissionHtml(cdMission),
            createMissionHtml(daMission));
        gameState.missions.push(abMission, bcMission, cdMission, daMission);
    }
    localStorage.setItem(LOCAL_STORAGE_CACHE, JSON.stringify(gameState))

    function createMissionHtml(selectedMission) {
        const missionHtml = document.createElement('div');
        missionHtml.id = `${selectedMission.id}${SEASON_MISSION_SUFFIX}`;
        missionHtml.classList.add('card', 'text-bg-secondary', 'mission-card', 'col-6');

        const missionBodyHtml = document.createElement('div');
        missionBodyHtml.classList.add('card-body')

        const missionTitleHtml = document.createElement('div');
        missionTitleHtml.classList.add('card-header');
        missionTitleHtml.innerText = `${selectedMission.title} (${(selectedMission.id+1)}. Küldetés)`;

        const missionDescriptionHtml = document.createElement('div');
        missionDescriptionHtml.classList.add('card-text');
        missionDescriptionHtml.innerText = selectedMission.description;
        missionBodyHtml.append(missionDescriptionHtml);

        const missionPointsHtml = document.createElement('div');
        missionPointsHtml.classList.add('card-footer');
        missionPointsHtml.id = `${selectedMission.id}${SEASON_MISSION_POINTS_SUFFIX}`;
        missionPointsHtml.innerText = `Pontok: ${selectedMission.points_aquired}`;

        missionHtml.append(missionTitleHtml, missionBodyHtml, missionPointsHtml);
        return missionHtml;
    }

    function selectMission(possibleMissions, missionId) {
        shuffleArray(possibleMissions);
        const missionIndex = Math.floor(Math.random() * possibleMissions.length);
        const selectedMission = possibleMissions.splice(missionIndex, 1)[0];
        selectedMission.id = missionId;
        return selectedMission;
    }
}

console.log("Mission handling imported");
