

const modelBase = { width: 190, height: 90 }

const modelPlayerSlots = [
    [ 1 ],                   // 2 players
    [ 4, 3 ],                // 3 players
    [ 4, 1, 3 ],             // 4 players
    [ 4, 2, 0, 3 ],          // 5 players
    [ 4, 2, 1, 0, 3 ],       // 6 players
    [ 6, 4, 2, 0, 3, 5 ],    // 7 players
    [ 6, 4, 2, 1, 0, 3, 5 ]  // 8 players
]
const modelPlayerSlotLocations = [
    { col: 1, row: 0 },
    { col: 2, row: 0 },
    { col: 3, row: 0 },
    { col: 0, row: 1 },
    { col: 4, row: 1 },
    { col: 1, row: 2 },
    { col: 3, row: 2 }
]
const modelPlayerViewDim = { width: 178, height: 40 }
const modelPlayerViewPos = { left: 6, top: 4 }
const modelTableTopDim = { width: 150, height: 24 }
const modelTableTopPos = { left: 20, top: 8 }
const modelStockPos = { left: 88, top: 13 }
const modelPilePos = {left: 102, top: 13 }

const modelLargeCardDim = { width: 40, height: 56 }
const modelSmallCardDim = { width: 10, height: 14 }

const modelThumbCenter = { left: 95, top: 80 }

const modelBlindDim = { width: 20, height: 20}
const modelBlindCenter = {left: modelBase.width - modelBlindDim.width/2 - 10, top: modelBase.height - modelBlindDim.height/2 - 10}

export const rescalePrivateView = (view) => {

    const widthInAspectUnits = view.offsetWidth / modelBase.width
    const heightInAspectUnits = view.offsetHeight / modelBase.height

    const units = Math.min(widthInAspectUnits, heightInAspectUnits)
    const canvas =
        {
            width: units * modelBase.width,
            height: units * modelBase.height
        }
    canvas.left = (view.offsetWidth - canvas.width) / 2
    canvas.top = (view.offsetHeight - canvas.height) / 2

    const newModelPlayerViewBase = {
        ...modelPlayerViewPos,
        ...modelPlayerViewDim,
        canvas: canvas
    }

    const scaledSmallCardDim = scaleToCanvas(modelSmallCardDim, canvas)
    const scaledLargeCardDim = scaleToCanvas(modelLargeCardDim, canvas)

    const newStockStyle = {
        ...layoutStyle(modelStockPos, modelSmallCardDim, canvas),
        transform: 'rotateX(40deg)'
    }

    const newPileStyle = {
        ...layoutStyle(modelPilePos, modelSmallCardDim, canvas),
        transform: 'rotateX(40deg)'
    }

    const newBlindCardStyleInput =
        {
            ...layoutStyle(modelBlindCenter, modelBlindDim, canvas),
            cardDim: scaledSmallCardDim
        }

    const newHandCardStyleInput =
        {
            ...mapPositionToView(modelThumbCenter, canvas),
            cardDim: scaledLargeCardDim
        }

    return {
        newModelPlayerViewBase: newModelPlayerViewBase,
        newTableTopStyle: layoutStyle(modelTableTopPos, modelTableTopDim, canvas),
        newStockStyle: newStockStyle,
        newPileStyle: newPileStyle,
        newBlindCardStyleInput: newBlindCardStyleInput,
        newHandCardStyleInput: newHandCardStyleInput,
    }
}

const scaleToCanvas = ({width, height}, canvas) => {
    return {
        width: canvas.width * width / modelBase.width,
        height: canvas.height * height / modelBase.height,
    }
}

const mapPositionToView = ({left, top}, canvas) => {
    return {
        left: canvas.left + left * canvas.width / modelBase.width,
        top: canvas.top + top * canvas.height / modelBase.height
    }
}

const layoutStyle = (position, dimensions, canvas) => {
    return {
        ...mapPositionToView(position, canvas),
        ...scaleToCanvas(dimensions, canvas)
    }
}

export const initialModelPlayerViewBase = {
    top: 0,
    left: 0,
    height: 1,
    width: 1,
    canvas: { top: 0, left: 0, height: 1, width: 1}
}

export const playerStyle = (
    {
        modelPlayerViewBase,
        playerIx,
        nPlayers,
        currentPlayerIx,
        myPlayerIx,
        direction
    }) => {

    const relativeIx = (playerIx - myPlayerIx + nPlayers) % nPlayers
    const playerSlot = modelPlayerSlots[nPlayers - 2][relativeIx - 1]
    const playerSlotLocation = modelPlayerSlotLocations[playerSlot]

    const modelNameDim = {
        width: modelPlayerViewDim.width / 5,
        height: modelPlayerViewDim.height / 3
    }
    const modelNamePos = {
        left: modelPlayerViewBase.left + playerSlotLocation.col * modelNameDim.width,
        top: modelPlayerViewBase.top + playerSlotLocation.row *  modelNameDim.height
    }

    const distanceFromCurrent = (nPlayers + (playerIx - currentPlayerIx) * direction) % nPlayers
    const nameColor = distanceFromCurrent >= 0 && distanceFromCurrent <= 2 ? 'orange' : 'grey'
    const opacity = 100 - 33 * ((nameColor === 'orange') ? distanceFromCurrent : playerSlotLocation.row)
    const modelFontSize = modelNameDim.height * (1 - 0.2 * playerSlotLocation.row)
    let textAlign
    switch(playerSlotLocation.col) {
        case 0: textAlign = 'left'; break
        case 4: textAlign = 'right'; break
        default: textAlign = 'center'; break
    }

    const style = {
        ...layoutStyle(modelNamePos, modelNameDim, modelPlayerViewBase.canvas),
        color: nameColor,
        opacity: `${opacity}%`,
        fontSize: `${scaleToCanvas(modelFontSize, modelPlayerViewBase.canvas).height}px`,
        textAlign: textAlign,
    }

    return style
}

export const blindCardStyle = ({baseInput, card, cardIndex}) => {
    return {
        left: `${baseInput.left + 0.01 * card.r * baseInput.width * Math.cos(card.theta)}px`,
        top: `${baseInput.top + 0.01 * card.r * baseInput.height * Math.sin(card.theta)}px`,
        height: `${baseInput.cardDim.height}px`,
        width: `${baseInput.cardDim.width}px`,
        transform: `transformX(-50%) transformY(-50%) rotate(${card.rotation}rad)`,
        zIndex: 100 + cardIndex
    }
}

export const initialBlindCardStyle = {
    left: 0,
    top: 0,
    height: 1,
    width: 1,
    cardDim: { height: 0, width: 0}
}

export const handCardStyle = ({baseInput, cardIndex, nCards}) => {
    const maxTheta = Math.asin(1.5/7)
    const marginTheta = Math.PI / 8
    const handTheta = Math.PI - marginTheta
    const dTheta = Math.min(maxTheta, nCards > 0 ? handTheta / nCards : maxTheta)

    const firstTheta = -dTheta * (Math.floor((nCards-1)/2) + (nCards % 2 === 0 ? 0.5 : 0))
    const style= {
        top: `${baseInput.top - baseInput.cardDim.height}px`,
        left: `${baseInput.left}px`,
        height: `${baseInput.cardDim.height}px`,
        width: `${baseInput.cardDim.width}px`,
        transform: `translateY(-${2*cardIndex}%) rotate(${firstTheta + cardIndex * dTheta}rad)`,
        transformOrigin: 'bottom left',
        zIndex: 100 + cardIndex
    }
    return style
}

export const initialHandCardStyle = {
    top: 0,
    left: 0,
    height: 1,
    width: 1,
    cardDim: { height:1, width: 1}
}
