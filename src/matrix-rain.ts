// Description: 3D animation for the matrix-rain page.

// Characters to choose from:
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$abcdefghijklmnopqrstuvwxyz%^&*()_+~`|}{[]\:;?£§,./-="
const CHARS_LEN = CHARS.length
let rndTextLengths: number[] = []
for (let i = 0; i < 10240; i++) {
    rndTextLengths.push(Math.floor(Math.random() * 46 /*50-5+1*/) + 5)
}
let currentRndTextLengthIndex = 0
const cyclicRndTextLengthIndex = (): number => {
    currentRndTextLengthIndex++
    if (currentRndTextLengthIndex >= rndTextLengths.length) {
        currentRndTextLengthIndex = 0
    }
    return currentRndTextLengthIndex
}

// Generate a random string of characters:
const genrandomstring = (nonRandomIndex: number | null | undefined): string => {
    if (nonRandomIndex != null) {
        // Select a deterministic result insted of generating a random one.
        nonRandomIndex = (nonRandomIndex + CHARS.length) % CHARS.length
        return CHARS.charAt(nonRandomIndex)
    }

    let length = rndTextLengths[cyclicRndTextLengthIndex()]
    let textContent = Array(Math.floor((50 - length) / 2)).fill("\u00A0")

    // Let's add some random characters while avoiding adding the same character twice in a row:
    let oldIndex = -1
    for (let i = 0; i < length; i++) {
        let randomIndex: number
        do { randomIndex = Math.floor(Math.random() * CHARS.length) }
        while (randomIndex === oldIndex)
        oldIndex = randomIndex;
        textContent.push(CHARS.charAt(randomIndex))
    }
    return textContent.join('')
}

// Generate a scrolling text element:
class Scroller {
    private _duration: number
    element: HTMLDivElement

    get duration(): number {
        return this._duration
    }
    set duration(value: number) {
        this._duration = value
        this.element.style.animationDuration = `${value}s`
    }

    constructor(duration: number, id: number) {
        var scroller = document.createElement("div")
        scroller.className = "matrix-rain-column"
        scroller.id = `matrix-rain-${id}`
        scroller.innerHTML = genrandomstring(null)
        this.element = scroller;
        this._duration = duration
    }
}

// Instantiate some random values:
const randomValues: number[] = []
const countRandomValues = 2048
for (let i = 0; i < countRandomValues; i++) {
    let prevDuration = -1;
    for (let j = 0; j < 40; j++) {
        let duration: number
        do {
            duration = Math.floor(Math.random() * 10) + 5
        } while(duration === prevDuration)
        prevDuration = duration
        randomValues.push(duration)
    }
}
let timingIndex = 0

// Get next timing value:
const getNextRandomTiming = (): number => {
    timingIndex++
    if (timingIndex >= randomValues.length) {
        timingIndex = 0
    }
    return randomValues[timingIndex]
}

// Add a rain container into whereId:
const addRainContainer = (whereId: string, id: number): void => {
    const body = document.getElementById(whereId)
    if (!body) {
        console.error('Element with id "${whereId}" not found.')
        return
    }
    const container = document.createElement("div")
    container.id = `matrix-rain-container-${id}`
    container.className = "matrix-rain-container"
    body.appendChild(container)
    
    let scrollers = []
    const numColumns = 40
    for (let i = 0; i < numColumns; i++) {
        let el = new Scroller(getNextRandomTiming(), i + (id-1) * numColumns)
        el.element.style.left = `${i * 18}px`
        scrollers.push(el)
    }

    container.offsetWidth
    scrollers.forEach(node => {
        container.appendChild(node.element)
    });
    container.offsetWidth

    scrollers.forEach(node => {
        node.element.style.animationDuration = `${node.duration}s`
        // Change the text when the animation ends:
        node.element.addEventListener("animationiteration", () => {
            node.element.innerHTML = genrandomstring(null)
            node.element.style.animationDuration = `${getNextRandomTiming()}s`
        })
    });
}

// Add a horizontal text scroller:
const addHTextScroller = (whereId: string, id: number, text: string): void => {
    let body = document.getElementById(whereId)
    if (!body) {
        console.error(`Element with id "${whereId}" not found.`)
        return
    }
    let container = document.createElement("div")
    container.id = `matrix-hscroller-container-${id}`
    container.className = "matrix-hscroller-container"
    body.appendChild(container)
    
    const numColumns = text.length
    let scrollers = []
    for (let i = 0; i < numColumns; i++) {
        let scroller = document.createElement("div")
        const ch = text.charAt(i)
        if (ch === ' ') {   scroller.innerHTML = '&nbsp;'}
        else {              scroller.innerHTML = ch      }
        scrollers.push(scroller)
    }

    scrollers.forEach(element => {
        container.appendChild(element)
    });
}
