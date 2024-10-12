"use strict";
function genrandomstring(not_random_index) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$abcdefghijklmnopqrstuvwxyz%^&*()_+~`|}{[]\:;?£§,./-=";
    if (not_random_index !== null && not_random_index !== undefined) {
        if (not_random_index < 0) {
            not_random_index = 0;
        }
        else if (not_random_index >= chars.length) {
            not_random_index = chars.length - 1;
        }
        return chars.charAt(not_random_index);
    }
    let textContent = "";
    let oldIndex = -1;
    const length = Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    for (let i = 0; i < (50 - length) / 2; i++) {
        textContent += "\u00A0";
    }
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
    constructor(duration, id) {
        var scroller = document.createElement("div");
        scroller.className = "matrix-scroller";
        scroller.id = `matrix-scroller-${id}`;
        scroller.innerHTML = genrandomstring(null);
        this.element = scroller;
        this.duration = duration;
    }
}
const randomValues = [];
const countRandomValues = 2048;
for (let i = 0; i < countRandomValues; i++) {
    let prevDuration = -1;
    for (let j = 0; j < 40; j++) {
        let duration;
        do {
            duration = Math.floor(Math.random() * 10) + 5;
        } while (duration === prevDuration);
        prevDuration = duration;
        randomValues.push(duration);
    }
}
let timingIndex = 0;
const gettimingvalue = () => {
    timingIndex++;
    if (timingIndex >= randomValues.length) {
        timingIndex = 0;
    }
    return randomValues[timingIndex];
};
function addscroller(whereId, id) {
    const body = document.getElementById(whereId);
    if (!body) {
        console.error('Element with id "${whereId}" not found.');
        return;
    }
    const container = document.createElement("div");
    container.id = `matrix-scroller-container-${id}`;
    container.className = "matrix-scroller-container";
    body.appendChild(container);
    let scrollers = [];
    const numColumns = 40;
    for (let i = 0; i < numColumns; i++) {
        scrollers.push(new Scroller(gettimingvalue(), i + (id - 1) * numColumns));
    }
    console.log(`offsetWidth before: ${container.offsetWidth}`);
    scrollers.forEach(node => {
        container.appendChild(node.element);
    });
    console.log(`offsetWidth after: ${container.offsetWidth}`);
    scrollers.forEach(node => {
        node.element.style.animationName = "matrix-text-animation";
        node.element.style.animationDuration = `${node.duration}s`;
        node.element.style.animationTimingFunction = "linear";
        node.element.style.animationIterationCount = "infinite";
        node.element.addEventListener("animationiteration", () => {
            node.element.innerHTML = genrandomstring(null);
            node.element.style.animationDuration = `${gettimingvalue()}s`;
        });
    });
}
function addhscroller(whereId, id, endAnimId, css_y, duration, text) {
    let body = document.getElementById(whereId);
    if (!body) {
        console.error(`Element with id "${whereId}" not found.`);
        return;
    }
    let container = document.createElement("div");
    container.id = `matrix-hscroller-container-${id}`;
    container.className = "matrix-hscroller-container";
    container.style.top = css_y;
    if (endAnimId === undefined) {
        container.style.animationName = "matrix-hscroller-animation";
    }
    else {
        container.style.animationName = `matrix-hscroller-animation-${Math.floor(Math.abs(endAnimId))}`;
    }
    container.style.animationDuration = `${duration}s`;
    container.style.animationTimingFunction = "linear";
    container.style.animationIterationCount = "once";
    body.appendChild(container);
    const numColumns = text.length;
    let scrollers = [];
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
        scrollers.push(scroller);
    }
    scrollers.forEach(element => {
        container.appendChild(element);
    });
}
