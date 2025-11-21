function drawTiles(wasCached) {
    for (let i = 0; i < gameState.tileMatrix.length; i++) {
        const row = gameState.tileMatrix[i];
        for (let j = 0; j < row.length; j++) {
            const tile = row[j];
            const tileHtml = document.getElementById(tile.id);
            const typeStyle = getElementTypeStyle(tile.type);
            if (wasCached) {
                tileHtml.classList.replace(ELEM_BLANK_STYLE, typeStyle);
            } else {
                tileHtml.classList.remove(ELEM_FOREST_STYLE);
                tileHtml.classList.remove(ELEM_TOWN_STYLE);
                tileHtml.classList.remove(ELEM_WATER_STYLE);
                tileHtml.classList.remove(ELEM_FARM_STYLE);
                tileHtml.classList.remove(ELEM_MOUNTAIN_STYLE);
                tileHtml.classList.add(typeStyle);
            }

        }
    }
}

function fillPlaceableElementSequence() {
    const possibleElements = ELEMENT_LIST.map(x => x);
    shuffleArray(possibleElements);
    gameState.placeableElementSequence = possibleElements;
}


function clearSelectionStyle(htmlElem) {
    htmlElem.classList.remove(INVALID_SELECTION);
    htmlElem.classList.remove(VALID_SELECTION);
    htmlElem.classList.remove(POSITION_SELECTION);
    htmlElem.classList.remove(VALID_POSITION_SELECTION);
    htmlElem.classList.remove(INVALID_POSITION_SELECTION);
}


function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function showGameOverModal() {
    const modalElement = document.getElementById('game-over-modal');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}

function showHelp() {
    const modalElement = document.getElementById('help-modal');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}

console.log("Helper functions imported");