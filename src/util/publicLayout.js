

const modelBaseR = 28
const modelPlayerNameAtR = 26
const modelPublicPlayerHandAtR = 22
const modelTableR = 24
const modelPlayerBlindAtR = 16
const modelStockAtR = 3.5
const modelPileAtR = 3.5
const modelCardH = 7
const modelCardW = 5


export const rescalePublicView = (view) => {

    const f = scaleFactor(view)

    const newCardH = modelCardH * f
    const newCardW = modelCardW * f

    const newTableStyle = positionStyle(
            {
                viewDimensions: view,
                givenOrigin: 'center',
                radius: 0,
                theta: 0,
                height: 2 * modelTableR * f,
                width: 2 * modelTableR * f
            })
    newTableStyle.borderRadius = '50%'

    const newStockStyle = positionStyle(
        {
            viewDimensions: view,
            givenOrigin: 'center',
            radius: modelStockAtR * f,
            theta: Math.PI,
            height: newCardH,
            width: newCardW
        }
    )

    const newPileStyle = positionStyle(
        {
            viewDimensions: view,
            givenOrigin: 'center',
            radius: modelPileAtR * f,
            theta: 0,
            height: newCardH,
            width: newCardW
        }
    )

    const newPlayerNameStyleInput =
        {
            viewDimensions: view,
            givenOrigin: 'center',
            radius: modelPlayerNameAtR * f,
            theta: 0,                        // overwritten by player angle
            height: 50,
            width: 100
        }

    const newPlayerBlindCardStyleInput =
        {
            viewDimensions: view,
            givenOrigin: 'center',
            radius: modelPlayerBlindAtR * f,
            theta: 0,                         // overwritten by player angle
            radiusSlopPerc: 0,                // overwritten by card.r
            thetaSlopPerc: 0,                 // overwritten by card.theta
            height: newCardH,
            width: newCardW
        }

    const newPlayerHandCardStyleInput =
        {
            viewDimensions: view,
            givenOrigin: 'center',
            radius: modelPublicPlayerHandAtR * f,
            theta: 0,                         // overwritten by player angle
            radiusSlopPerc: 0,                // overwritten to 2px per cardIndex
            thetaSlopPerc: 0,
            height: newCardH,
            width: newCardW
        }


    return {
        newTableStyle: newTableStyle,
        newStockStyle: newStockStyle,
        newPileStyle: newPileStyle,
        newPlayerNameStyleInput: newPlayerNameStyleInput,
        newPlayerBlindCardStyleInput: newPlayerBlindCardStyleInput,
        newPlayerHandCardStyleInput: newPlayerHandCardStyleInput
    }
}

export const playerNameStyle = ({baseInput, anglePerPlayer, playerIx}) => {

    const theta = anglePerPlayer * playerIx
    const input = { ...baseInput}
    input.theta = theta
    const style = positionStyle(input)
    style.transform = `rotate(${Math.PI/2 + theta}rad)`
    return style
}

export const playerBlindCardStyle = ({baseInput, anglePerPlayer, playerIx, card, cardIndex }) => {

    const theta = anglePerPlayer * playerIx
    const input = { ...baseInput}
    input.theta = theta
    input.radiusSlopPerc = card.r
    input.thetaSlopPerc = card.theta
    const style = positionStyle(input)
    style.transform = `rotate(${card.rotation}rad)`
    style.zIndex = 100 + cardIndex
    return style
}

export const playerHandCardStyle = ({baseInput, anglePerPlayer, playerIx, cardIndex, nCards}) => {

    const theta = anglePerPlayer * playerIx
    const input = { ...baseInput }
    input.theta = theta
    input.radiusSlopPerc = 200 * cardIndex / input.radius
    const style = positionStyle(input)
    const {firstTheta, deltaTheta} = handAngles(nCards)
    style.transformOrigin = 'bottom left'
    style.transform = `rotate(${firstTheta + cardIndex * deltaTheta}rad)`
    style.zIndex = 100 + cardIndex
    return style
}

const scaleFactor = (view) => {
    const shortSide = Math.min(view.offsetWidth * 0.8, view.offsetHeight) - 10
    return shortSide / (2 * modelBaseR)
}

export const positionStyle = (
    {
        viewDimensions,
        givenOrigin,                    // 'center', 'topLeft', 'bottomLeft'
        radius,                      // px
        radiusSlopPerc= 0,   // % of height/width diagonal
        theta,                       // rad
        thetaSlopPerc = 0,   // % of the angle of the arc of diagonal at distance sloppedRadius
        height,
        width}) => {

    const parentCenterX = viewDimensions.offsetWidth / 2
    const parentCenterY = viewDimensions.offsetHeight / 2
    const diagonal = Math.sqrt(Math.pow(height, 2) + Math.pow(width, 2))
    const sloppedRadius = radius + 0.01 * radiusSlopPerc * diagonal
    const sloppedTheta = (sloppedRadius < 0.01) ?
        theta :
        theta + Math.atan((diagonal * 0.5) / sloppedRadius) * 0.01 * thetaSlopPerc

    let left = parentCenterX + sloppedRadius * Math.cos(sloppedTheta)
    let top = parentCenterY + sloppedRadius * Math.sin(sloppedTheta)
    if (givenOrigin === 'center') {
        left -= width / 2
        top -= height / 2
    }
    return {
        position: 'absolute',
        top: top,
        left: left,
        height: height,
        width: width
    }
}

const handAngles = (nCards) => {

    const handThetaMax = 7 * Math.PI / 8
    const cardDThetaMax = Math.asin(3/14)

    const deltaTheta = Math.min(handThetaMax / (nCards + 1), cardDThetaMax)
    const firstTheta = - deltaTheta * (nCards+(nCards % 2 === 0 ? 1 : 0))  / 1.5

    return {
        firstTheta,
        deltaTheta
    }
}
