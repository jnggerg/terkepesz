const LOCALE_HU = {
    "missions": {
        "forest_edge":{
            "title": "Az erdő széle",
            "description": "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz."
        },
        "dream_valley": {
            "title": "Álmos-völgy",
            "description": "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz."
        },
        "potato_watering": {
            "title": "Krumpliöntözés",
            "description": "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz."
        },
        "border_region": {
            "title": "Határvidék",
            "description": "Minden teli sorért vagy oszlopért 6-6 pontot kapsz."
        }
    },
    "ui": {
        "title": "Térképész",
        "restart": "Játék újraindítása",
        "help": "Segítség",
        "timeLeft": "Hátralevő idő:",
        "totalPoints": "Összes pontszám:",
        "points": "pont",
        "spring": "Tavasz",
        "summer": "Nyár",
        "autumn": "Ősz",
        "winter": "Tél",
        "rotate": "Forgatás",
        "mirror": "Tükrözés",
        "timeValue": "Időérték",
        "gameOver": "Vége",
        "gameOverDesc": "A játéknak vége! Ha új játékot kezdenél, nyomj az 'Újraindítás' gombra!",
        "ok": "Ok",
        "lang": "🇭🇺"
    },
    "help": {
        "gameplay": "Játékmenet",
        "gameplayDesc": "A játék célja, hogy a lehető legtöbb pontot gyűjtsd össze a rendelkezésedre álló idő alatt. Ehhez különböző térképelemeket helyezhetsz el a játéktáblán, amelyek különböző évszakokhoz tartoznak. Minden évszakhoz tartozik egy küldetéslista, amely megmutatja, hogy mely elemek elhelyezésével szerezhetsz pontokat.",
        "controls": "Vezérlés",
        "rotate": "Elem forgatása:",
        "rotateDesc": "Kattints a 'Forgatás' gombra az aktuális elem elforgatásához.",
        "mirror": "Elem tükrözése:",
        "mirrorDesc": "Kattints a 'Tükrözés' gombra az aktuális elem tükrözéséhez.",
        "place": "Elem elhelyezése:",
        "placeDesc": "Kattints a játéktábla egy üres mezőjére az aktuális elem elhelyezéséhez.",
        "scoring": "Pontszámítás",
        "scoringDesc": "Minden elhelyezett elem pontokat ér az adott évszak küldetései alapján. Az összesített pontszámot a képernyő jobb oldalán láthatod.",
        "timeManagement": "Időkezelés",
        "timeManagementDesc1": "A játék egy időzítővel rendelkezik, amely mutatja a hátralevő időt. Az idő lejárta után a játék véget ér, és megjelenik a végső pontszámod.",
        "timeManagementDesc2": "Az idő valójában a lerakható elemek számát jelzi, minden elemnél látható a jobb oldalon az időértéke."
    }
};
const LOCALE_EN = {
    "missions": {
        "forest_edge":{
            "title": "Forest Edge",
            "description": "You gain one point for each forest tile adjacent to the edge of your map."
        },
        "dream_valley": {
            "title": "Dream-Valley",
            "description": "For every row, in which there are three forest tiles, you gain four points."
        },
        "potato_watering": {
            "title": "Potato Watering",
            "description": "You gain two points for each water tile adjacent to your farm tiles."
        },
        "border_region": {
            "title": "Border Region",
            "description": "You gain six points for each filled row or column."
        }
    },
    "ui": {
        "title": "Cartographer",
        "restart": "Restart Game",
        "help": "Help",
        "timeLeft": "Time Left:",
        "totalPoints": "Total Points:",
        "points": "points",
        "spring": "Spring",
        "summer": "Summer",
        "autumn": "Autumn",
        "winter": "Winter",
        "rotate": "Rotate",
        "mirror": "Mirror",
        "timeValue": "Time Value",
        "gameOver": "Game Over",
        "gameOverDesc": "The game is over! If you want to play again, press the 'Restart Game' button!",
        "ok": "Ok",
        "lang": "🇬🇧"
    },
    "help": {
        "gameplay": "Gameplay",
        "gameplayDesc": "The goal of the game is to collect as many points as possible during the available time. To do this, you can place various map elements on the game board that belong to different seasons. Each season has a mission list that shows which elements you can place to earn points.",
        "controls": "Controls",
        "rotate": "Rotate Element:",
        "rotateDesc": "Click the 'Rotate' button to rotate the current element.",
        "mirror": "Mirror Element:",
        "mirrorDesc": "Click the 'Mirror' button to mirror the current element.",
        "place": "Place Element:",
        "placeDesc": "Click on an empty field on the game board to place the current element.",
        "scoring": "Scoring",
        "scoringDesc": "Each placed element earns points based on the current season's missions. You can see the total score on the right side of the screen.",
        "timeManagement": "Time Management",
        "timeManagementDesc1": "The game has a timer that shows the remaining time. After the time runs out, the game ends and your final score is displayed.",
        "timeManagementDesc2": "Time actually represents the number of elements that can be placed. Each element shows its time value on the right side."
    }
};

let currentLang = localStorage.getItem('lang') || 'hu';

function applyTranslations() {
    document.querySelectorAll("[data-i18n]").forEach(elem => {
        const key = elem.getAttribute("data-i18n");
        elem.textContent = t(key);
    });
}

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem("lang", lang);
    applyTranslations();
}

function toggleLanguage() {
    const flag = currentLang === 'hu' ? '🇬🇧' : '🇭🇺';
    document.getElementById('lang-toggle').textContent = flag;
    const newLang = currentLang === 'hu' ? 'en' : 'hu';
    setLanguage(newLang);
    // refresh missions for proper translation
    if (gameState && gameState.missions) {
        initializeMissions(true);
        
        //reapplying selected class to current seasons missions
        const seasonMissions = getSeasonMissions(gameState.currentSeason);
        for (let i = 0; i < seasonMissions.length; i++) {
            const seasonMission = seasonMissions[i];
            const seasonMissionHtml = document.getElementById(`${seasonMission.id}${SEASON_MISSION_SUFFIX}`);
            seasonMissionHtml?.classList.add('selected');
        }
        
        updateSeasonPoints(SPRING);
        updateSeasonPoints(SUMMER);
        updateSeasonPoints(AUTUMN);
        updateSeasonPoints(WINTER);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    applyTranslations();
});

const translations = {
    "en": LOCALE_EN,
    "hu": LOCALE_HU
}

function t(key) {
    const locale = translations[currentLang];
    const keys = key.split('.');
    let value = locale;
    for (let k of keys) {
        value = value[k];
        if (!value) return key;
    }
    return value;
}

function getMissionTitle(missionId) {
    const missions = {
        'forest_edge': t('missions.forest_edge.title'),
        'dream_valley': t('missions.dream_valley.title'),
        'potato_watering': t('missions.potato_watering.title'),
        'border_region': t('missions.border_region.title')
    };
    return missions[missionId] || missionId;
}

function getMissionDescription(missionId) {
    const missions = {
        'forest_edge': t('missions.forest_edge.description'),
        'dream_valley': t('missions.dream_valley.description'),
        'potato_watering': t('missions.potato_watering.description'),
        'border_region': t('missions.border_region.description')
    };
    return missions[missionId] || missionId;
}