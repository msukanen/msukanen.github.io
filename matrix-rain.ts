// Description: 3D animation for the main page.

// Generate a random string of characters:
function genrandomstring(): string {
    // Characters to choose from:
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=";
    let textContent = "";
    let oldIndex = -1;
    // Random text length between 5 and 50 characters:
    const length = Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        // Prevent the same character from appearing twice in a row:
        while (randomIndex === oldIndex) {
            randomIndex = Math.floor(Math.random() * chars.length);
        }
        oldIndex = randomIndex;
        textContent += chars.charAt(randomIndex);
    }
    return textContent;
}

// Generate a scrolling text element:
class Scroller {
    element: HTMLDivElement;

    constructor(duration: number) {
        var scroller = document.createElement("div")
        scroller.className = "matrix-scroller"
        scroller.innerHTML = genrandomstring()
        scroller.style.animationName = "matrix-text-animation"
        scroller.style.animationDuration = duration + "s"
        scroller.style.animationTimingFunction = "linear"
        scroller.style.animationIterationCount = "infinite"
        // Change the text when the animation ends:
        scroller.addEventListener("animationiteration", () => {
            scroller.innerHTML = genrandomstring()
            scroller.style.animationDuration = genrandomtiming() + "s"
        })
        this.element = scroller;
    }
}

function genrandomtiming(): number {
    return Math.floor(Math.random() * 10) + 5;
}

// Add a scroller to the container:
function addscroller(whereId: string, id: number): void {
    const body = document.getElementById(whereId);
    if (!body) {
        console.error('Element with id "${whereId}" not found.');
        return;
    }
    const container = document.createElement("div");
    container.id = "matrix-scroller-container-" + id;
    container.className = "matrix-scroller-container";
    body.appendChild(container);
    
    const numColumns = 40;
    let prevDuration = -1;
    for (let i = 0; i < numColumns; i++) {
        let duration: number;
        do {
            duration = genrandomtiming();
        } while(duration === prevDuration);
        prevDuration = duration;
        container.appendChild(new Scroller(duration).element);
    }
}

function addhscroller(whereId: string, id: number, css_y: string, duration: number, text: string): void {
    let body = document.getElementById(whereId);
    if (!body) {
        console.error('Element with id "${whereId}" not found.');
        return;
    }
    let container = document.createElement("div");
    container.id = 'matrix-hscroller-container-' + id;
    container.className = "matrix-hscroller-container";
    container.style.top = css_y;
    container.style.animationName = "matrix-hscroller-animation";
    container.style.animationDuration = duration + 's';
    container.style.animationTimingFunction = "linear";
    container.style.animationIterationCount = "once";
    body.appendChild(container);
    
    const numColumns = text.length;
    for (let i = 0; i < numColumns; i++) {
        let scroller = document.createElement("div");
        scroller.className = "matrix-hscroller";
        const ch = text.charAt(i);
        if (ch === ' ') {
            scroller.innerHTML = '&nbsp;';
        } else {
            scroller.innerHTML = ch;
        }
        scroller.style.zIndex = '8';
        container.appendChild(scroller);
    }
}
