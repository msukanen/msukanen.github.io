"use strict";
function genrandomstring() {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~`|}{[]\:;?><,./-=";
    let textContent = "";
    let oldIndex = -1;
    const length = Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    for (let i = 0; i < length; i++) {
        let randomIndex = Math.floor(Math.random() * chars.length);
        while (randomIndex === oldIndex) {
            randomIndex = Math.floor(Math.random() * chars.length);
        }
        oldIndex = randomIndex;
        textContent += chars.charAt(randomIndex);
    }
    return textContent;
}
class Scroller {
    constructor(duration) {
        var scroller = document.createElement("div");
        scroller.className = "matrix-scroller";
        scroller.innerHTML = genrandomstring();
        scroller.style.animationName = "matrix-text-animation";
        scroller.style.animationDuration = duration + "s";
        scroller.style.animationTimingFunction = "linear";
        scroller.style.animationIterationCount = "infinite";
        scroller.addEventListener("animationiteration", () => {
            scroller.innerHTML = genrandomstring();
            scroller.style.animationDuration = genrandomtiming() + "s";
        });
        this.element = scroller;
    }
}
function genrandomtiming() {
    return Math.floor(Math.random() * 10) + 5;
}
function addscroller(whereId, id) {
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
        let duration;
        do {
            duration = genrandomtiming();
        } while (duration === prevDuration);
        prevDuration = duration;
        container.appendChild(new Scroller(duration).element);
    }
}
function addhscroller(whereId, id, endAnimId, css_y, duration, text) {
    let body = document.getElementById(whereId);
    if (!body) {
        console.error('Element with id "${whereId}" not found.');
        return;
    }
    let container = document.createElement("div");
    container.id = 'matrix-hscroller-container-' + id;
    container.className = "matrix-hscroller-container";
    container.style.top = css_y;
    if (endAnimId === undefined) {
        container.style.animationName = "matrix-hscroller-animation";
    }
    else {
        container.style.animationName = "matrix-hscroller-animation-" + Math.floor(Math.abs(endAnimId));
    }
    container.style.animationDuration = duration + 's';
    container.style.animationTimingFunction = "linear";
    container.style.animationIterationCount = "once";
    body.appendChild(container);
    const numColumns = text.length;
    for (let i = 0; i < numColumns; i++) {
        let scroller = document.createElement("div");
        const ch = text.charAt(i);
        if (ch === ' ') {
            scroller.innerHTML = '&nbsp;';
        }
        else {
            scroller.innerHTML = ch;
        }
        scroller.style.zIndex = '8';
        container.appendChild(scroller);
    }
}
