// Description: 3D animation for the matrix-rain page.

// Characters to choose from:
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$abcdefghijklmnopqrstuvwxyz%^&*()_+~`|}{[]\:;?£§,./-="
const CHARS_LEN = CHARS.length
const DEFAULT_COLUMNS = 40
const RANDOM_TIMING_VALUES_PER_COLUMN = 2048
const FONT_SIZE = 18
const MAX_TEXT_LEN = 50

let _rndTextLengths: number[] = []
for (let i = 0; i < 10240; i++) {
    _rndTextLengths.push(Math.floor(Math.random() * MAX_TEXT_LEN - 4) + 5)
}
let _currentRndTextLengthIndex = 0
const cyclicRndTextLengthIndex = (): number => {
    _currentRndTextLengthIndex++
    if (_currentRndTextLengthIndex >= _rndTextLengths.length) {
        _currentRndTextLengthIndex = 0
    }
    return _currentRndTextLengthIndex
}

// Generate a random string of characters:
const genrandomstring = (nonRandomIndex: number | null | undefined): string => {
    if (nonRandomIndex != null) {
        // Select a deterministic result insted of generating a random one.
        nonRandomIndex = (nonRandomIndex + CHARS.length) % CHARS.length
        return CHARS.charAt(nonRandomIndex)
    }

    let length = _rndTextLengths[cyclicRndTextLengthIndex()]
    if (length === undefined) {
        console.error('Invalid length value:', length)
        return 'ERROR'
    }
    let textContent = Array(Math.floor((MAX_TEXT_LEN - length) / 2)).fill("\u00A0")

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

// A rainfall text element scroller:
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

// Instantiate some random timing values:
let _randomTimingValues: number[] = []
const bootstrapMatrixRain = (whereId: string, columns: number, layers: number): void => {
    for (let i = 0,
             prevDuration = -1,
             duration     = 0
            ; i < RANDOM_TIMING_VALUES_PER_COLUMN; i++) {
        for (let j = 0; j < columns; j++) {
            do {
                duration = Math.floor(Math.random() * 10) + 5
            } while(duration === prevDuration)
            prevDuration = duration
            _randomTimingValues.push(duration)
        }
    }

    for (let i = 1; i <= layers; i++) {
        addRainContainer(whereId, i, columns);
    }
}
let _timingIndex = 0

// Get next timing value:
const getNextRandomTiming = (): number => {
    _timingIndex++
    if (_timingIndex >= _randomTimingValues.length) {
        _timingIndex = 0
    }
    let value = _randomTimingValues[_timingIndex]
    if (value === undefined) {
        console.error('Invalid timing value:', value)
        return 0
    }
    return value
}

// Add a rain container into whereId:
const addRainContainer = (whereId: string, id: number, numColumns: number | null | undefined): void => {
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
    const numCol = (numColumns != null) ? numColumns : DEFAULT_COLUMNS
    for (let i = 0; i < numCol; i++) {
        let el = new Scroller(getNextRandomTiming(), i + (id-1) * numCol)
        el.element.style.left = `${i * FONT_SIZE + ((id-1) * 1.666)}px`
        scrollers.push(el)
    }

    scrollers.forEach(node => {
        container.appendChild(node.element)
    });

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
