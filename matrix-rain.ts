// Description: 3D animation for the main page.

// Generate a random string of characters:
function genrandomstring(not_random_index: number | null | undefined): string {
    // Characters to choose from:
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$abcdefghijklmnopqrstuvwxyz%^&*()_+~`|}{[]\:;?><,./-="
    if (not_random_index !== null && not_random_index !== undefined) {
        if (not_random_index < 0) {
            not_random_index = 0
        } else if (not_random_index >= chars.length) {
            not_random_index = chars.length - 1
        }
        return chars.charAt(not_random_index)
    }

    let textContent = ""
    let oldIndex = -1

    // Random text length between 5 and 50 characters:
    const length = Math.floor(Math.random() * (50 - 5 + 1)) + 5
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length)
        // Prevent the same character from appearing twice in a row:
        while (randomIndex === oldIndex) {
            randomIndex = Math.floor(Math.random() * chars.length)
        }
        oldIndex = randomIndex;
        textContent += chars.charAt(randomIndex)
    }
    return textContent;
}

// Generate a scrolling text element:
class Scroller {
    element: HTMLDivElement
    duration: number

    constructor(duration: number, id: number) {
        var scroller = document.createElement("div")
        scroller.className = "matrix-scroller"
        scroller.innerHTML = genrandomstring(id)
        this.element = scroller;
        this.duration = duration
    }
}

// Generate random duration for the animation:
const genrandomtiming = (): number => {
    do {
        let duration = Math.floor(Math.random() * 10) + 5
        if (duration >= 1) {
            return duration
        }
    } while(true)
}

const randomValues: number[] = []
// Instantiate the random values:
for (let i = 0; i < 2048; i++) {
    let prevDuration = -1;
    for (let j = 0; j < 40; j++) {
        let duration: number
        do {
            duration = genrandomtiming()
        } while(duration === prevDuration)
        prevDuration = duration
        randomValues.push(duration)
    }
}
let timingIndex = 0

// Get next timing value:
const gettimingvalue = (): number => {
    timingIndex = (timingIndex + 1) % randomValues.length
    return randomValues[timingIndex]
}

// Add a scroller to the container:
function addscroller(whereId: string, id: number): void {
    const body = document.getElementById(whereId)
    if (!body) {
        console.error('Element with id "${whereId}" not found.')
        return
    }
    const container = document.createElement("div")
    container.id = `matrix-scroller-container-${id}`
    container.className = "matrix-scroller-container"
    body.appendChild(container)
    
    let scrollers = []
    const numColumns = 40
    for (let i = 0; i < numColumns; i++) {
        scrollers.push(new Scroller(gettimingvalue(), i))
    }

    console.log(`offsetWidth before: ${container.offsetWidth}`)

    scrollers.forEach(node => {
        container.appendChild(node.element)
    });

    console.log(`offsetWidth after: ${container.offsetWidth}`)

    scrollers.forEach(node => {
        node.element.style.animationName = "matrix-text-animation"
        node.element.style.animationDuration = `${node.duration}s`
        node.element.style.animationTimingFunction = "linear"
        node.element.style.animationIterationCount = "infinite"
        // Change the text when the animation ends:
        node.element.addEventListener("animationiteration", () => {
            node.element.innerHTML = genrandomstring(id)
            node.element.style.animationDuration = `${genrandomtiming()}s`
        })
    });
}

function addhscroller(whereId: string, id: number, endAnimId: number | undefined, css_y: string, duration: number, text: string ): void {
    let body = document.getElementById(whereId)
    if (!body) {
        console.error(`Element with id "${whereId}" not found.`)
        return
    }
    let container = document.createElement("div")
    container.id = `matrix-hscroller-container-${id}`
    container.className = "matrix-hscroller-container"
    container.style.top = css_y
    if (endAnimId === undefined) {
        container.style.animationName = "matrix-hscroller-animation"
    } else {
        container.style.animationName = `matrix-hscroller-animation-${Math.floor(Math.abs(endAnimId))}`
    }
    container.style.animationDuration = `${duration}s`
    container.style.animationTimingFunction = "linear"
    container.style.animationIterationCount = "once"
    body.appendChild(container)
    
    const numColumns = text.length
    let scrollers = []
    for (let i = 0; i < numColumns; i++) {
        let scroller = document.createElement("div")
        const ch = text.charAt(i)
        if (ch === ' ') {
            scroller.innerHTML = '&nbsp;'
        } else {
            scroller.innerHTML = ch
        }
        scroller.style.zIndex = '8'
        scrollers.push(scroller)
    }

    scrollers.forEach(element => {
        container.appendChild(element)
    });
}
