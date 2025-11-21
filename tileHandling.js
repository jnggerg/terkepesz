function initializeTiles() {
    if (tilesInitialized) {
        throw Error("Tiles have already been initialized!");
    }
    const columnSize = 11;
    const rowSize = 11;
    const elementList = [];

    const gameTableHtml = document.getElementById(GAME_TABLE);
    for (let i = 0; i < rowSize; i++) {
        const row = [];
        const rowHtml = document.createElement('div');
        rowHtml.classList.add("zone-row");
        for (let j = 0; j < columnSize; j++) {
            const tileHtml = document.createElement('a');
            const tileId = `${i}-${j}`;
            tileHtml.classList.add(ELEM_BLANK_STYLE, "zone-element", 'clickable');
            tileHtml.id = tileId;
            tileHtml.row = i;
            tileHtml.col = j;
            tileHtml.onclick = placeElement.bind(this);
            tileHtml.onmouseover = selectTile.bind(this);
            tileHtml.onmouseout = clearTileSelection.bind(this);
            rowHtml.append(tileHtml);
            row.push({
                id: tileId,
                type: ELEM_BLANK
            });
        }
        gameTableHtml.append(rowHtml);
        elementList.push(row);
    }

    for (let i = 0; i < fixedMountainTiles.length; i++) {
        const mountain = fixedMountainTiles[i];
        const rowIndex = mountain[0];
        const columnIndex = mountain[1];
        const tileRowNumber = rowIndex - 1;
        const tileColumnIndex = columnIndex - 1;
        const tile = elementList[tileRowNumber][tileColumnIndex];
        tile.type = ELEM_MOUNTAIN;
    }

    return elementList;
}

function placeElement(event) {
    if (gameState.gameTime <= 0) {
        return;
    }
    clearTileSelection();
    selectTile(event);

    if (selectionInvalid) {
        return;
    }

    const skipSelectedTile = gameState.placeableElement.shape[1][1] === 0;
    const elementTypeStyle = getElementTypeStyle(gameState.placeableElement.type);
    for (let i = 0; i < selectionHtmlList.length; i++) {
        const htmlElem = selectionHtmlList[i];
        clearSelectionStyle(htmlElem);
        if (skipSelectedTile && (htmlElem.row === selectedTileRowIndex && htmlElem.col === selectedTileColumnIndex)) {
            continue;
        }
        htmlElem.classList.replace(ELEM_BLANK_STYLE, elementTypeStyle);
    }
    for (let i = 0; i < selectionList.length; i++) {
        const elem = selectionList[i];
        elem.type = gameState.placeableElement.type;
    }
    deductTimeLeft(gameState.placeableElement.time);
    if(gameState.gameTime === 0)
    {
        showGameOverModal();
    }else{
        modifyPlaceableElement();
    }
}

function initializePlaceableElement(isCached) {
    if (placeableElementHtmlInitialized) {
        throw Error('The placeable element HTML has already been initialized!')
    }
    if (isCached === undefined) {
        throw Error('isCached parameter is undefined!');
    }
    const placeableElementContainerHtml = document.getElementById(PLACEABLE_ELEMENT_CONTAINER);
    const placeableElementHtml = document.createElement('div');
    placeableElementHtml.id = PLACEABLE_ELEMENT;
    placeableElementContainerHtml.append(placeableElementHtml);

    modifyPlaceableElement(placeableElementHtml, isCached == false);
}

function modifyPlaceableElement(placeableElementHtml = undefined, assignNewElement = true) {
    if (!placeableElementHtml) {
        placeableElementHtml = document.getElementById(PLACEABLE_ELEMENT);
    }
    if (assignNewElement) {
        if (gameState.placeableElementSequence.length === 0) {
            fillPlaceableElementSequence();
        }
        gameState.placeableElement = gameState.placeableElementSequence.splice(0, 1)[0];
        const placeableElementTimeValueHtml = document.getElementById(PLACEABLE_ELEMENT_TIME_VALUE);
        placeableElementTimeValueHtml.innerText = gameState.placeableElement.time;
    }
    let placeableElementType = getElementTypeStyle(gameState.placeableElement.type);
    placeableElementHtml.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const placeableElementRowHtml = document.createElement('div');
        placeableElementRowHtml.classList.add('row');
        for (let j = 0; j < 3; j++) {
            const placeableElementColumnHtml = document.createElement('div');
            const blankTile = gameState.placeableElement.shape[i][j] === 0;
            placeableElementColumnHtml.classList.add('zone-element', 'col-3');
            placeableElementColumnHtml.classList.add(blankTile ? ELEM_BLANK_STYLE : placeableElementType);
            placeableElementRowHtml.append(placeableElementColumnHtml);
        }
        placeableElementHtml.append(placeableElementRowHtml);
    }
    localStorage.setItem(LOCAL_STORAGE_CACHE, JSON.stringify(gameState))
}

function getElementTypeStyle(type) {
    let placeableElementType = '';
    switch (type) {
        case ELEM_FOREST:
            placeableElementType = ELEM_FOREST_STYLE;
            break;
        case ELEM_TOWN:
            placeableElementType = ELEM_TOWN_STYLE;
            break;
        case ELEM_MOUNTAIN:
            placeableElementType = ELEM_MOUNTAIN_STYLE;
            break;
        case ELEM_WATER:
            placeableElementType = ELEM_WATER_STYLE;
            break;
        case ELEM_FARM:
            placeableElementType = ELEM_FARM_STYLE;
            break;
        case ELEM_BLANK:
            placeableElementType = ELEM_BLANK_STYLE;
            break;
        default:
            throw Error('Invalid element type!');
    }
    return placeableElementType;
}

console.log("Tile handling imported");
