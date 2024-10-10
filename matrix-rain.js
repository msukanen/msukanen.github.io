// Description: 3D animation for the main page.

// Generate a random string of characters:
function genrandomstring() {
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
    constructor(duration) {
        var scroller = document.createElement("div")
        scroller.className = "matrix-scroller"
        scroller.innerHTML = genrandomstring()
        scroller.style.animationName = "matrix-text-animation"
        scroller.style.animationDuration = duration + "s"
        scroller.style.animationTimingFunction = "linear"
        scroller.style.animationIterationCount = "infinite"
        // Change the text when the animation ends:
        scroller.addEventListener("animationiteration", () => {
            this.innerHTML = genrandomstring()
            this.style.animationDuration = genrandomtiming() + "s"
        })
        return scroller
    }
}

function genrandomtiming() {
    return Math.floor(Math.random() * 10) + 5;
}

// Add a scroller to the container:
function addscroller(whereId, id) {
    let body = document.getElementById(whereId);
    let container = document.createElement("div");
    container.id = "matrix-scroller-container-" + id;
    container.className = "matrix-scroller-container";
    body.appendChild(container);
    const numColumns = 40;
    let prevDuration = -1;
    for (let i = 0; i < numColumns; i++) {
        let duration;
        do {
            duration = genrandomtiming();
        } while(duration === prevDuration);
        prevDuration = duration;
        container.appendChild(new Scroller(duration));
    }
}
