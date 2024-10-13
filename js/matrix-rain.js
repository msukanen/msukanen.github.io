"use strict";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$abcdefghijklmnopqrstuvwxyz%^&*()_+~`|}{[]\:;?£§,./-=";
const CHARS_LEN = CHARS.length;
let _rndTextLengths = [];
for (let i = 0; i < 10240; i++) {
    _rndTextLengths.push(Math.floor(Math.random() * 46) + 5);
}
let _currentRndTextLengthIndex = 0;
const cyclicRndTextLengthIndex = () => {
    _currentRndTextLengthIndex++;
    if (_currentRndTextLengthIndex >= _rndTextLengths.length) {
        _currentRndTextLengthIndex = 0;
    }
    return _currentRndTextLengthIndex;
};
const genrandomstring = (nonRandomIndex) => {
    if (nonRandomIndex != null) {
        nonRandomIndex = (nonRandomIndex + CHARS.length) % CHARS.length;
        return CHARS.charAt(nonRandomIndex);
    }
    let length = _rndTextLengths[cyclicRndTextLengthIndex()];
    let textContent = Array(Math.floor((50 - length) / 2)).fill("\u00A0");
    let oldIndex = -1;
    for (let i = 0; i < length; i++) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * CHARS.length);
        } while (randomIndex === oldIndex);
        oldIndex = randomIndex;
        textContent.push(CHARS.charAt(randomIndex));
    }
    return textContent.join('');
};
class Scroller {
    get duration() {
        return this._duration;
    }
    set duration(value) {
        this._duration = value;
        this.element.style.animationDuration = `${value}s`;
    }
    constructor(duration, id) {
        var scroller = document.createElement("div");
        scroller.className = "matrix-rain-column";
        scroller.id = `matrix-rain-${id}`;
        scroller.innerHTML = genrandomstring(null);
        this.element = scroller;
        this._duration = duration;
    }
}
let _randomValues = [];
const RANDOM_VALUES = 2048;
for (let i = 0; i < RANDOM_VALUES; i++) {
    let prevDuration = -1;
    for (let j = 0; j < 40; j++) {
        let duration;
        do {
            duration = Math.floor(Math.random() * 10) + 5;
        } while (duration === prevDuration);
        prevDuration = duration;
        _randomValues.push(duration);
    }
}
let _timingIndex = 0;
const getNextRandomTiming = () => {
    _timingIndex++;
    if (_timingIndex >= _randomValues.length) {
        _timingIndex = 0;
    }
    return _randomValues[_timingIndex];
};
const addRainContainer = (whereId, id) => {
    const body = document.getElementById(whereId);
    if (!body) {
        console.error('Element with id "${whereId}" not found.');
        return;
    }
    const container = document.createElement("div");
    container.id = `matrix-rain-container-${id}`;
    container.className = "matrix-rain-container";
    body.appendChild(container);
    let scrollers = [];
    const numColumns = 40;
    for (let i = 0; i < numColumns; i++) {
        let el = new Scroller(getNextRandomTiming(), i + (id - 1) * numColumns);
        el.element.style.left = `${i * 18}px`;
        scrollers.push(el);
    }
    container.offsetWidth;
    scrollers.forEach(node => {
        container.appendChild(node.element);
    });
    container.offsetWidth;
    scrollers.forEach(node => {
        node.element.style.animationDuration = `${node.duration}s`;
        node.element.addEventListener("animationiteration", () => {
            node.element.innerHTML = genrandomstring(null);
            node.element.style.animationDuration = `${getNextRandomTiming()}s`;
        });
    });
};
const addHTextScroller = (whereId, id, text) => {
    let body = document.getElementById(whereId);
    if (!body) {
        console.error(`Element with id "${whereId}" not found.`);
        return;
    }
    let container = document.createElement("div");
    container.id = `matrix-hscroller-container-${id}`;
    container.className = "matrix-hscroller-container";
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
        scrollers.push(scroller);
    }
    scrollers.forEach(element => {
        container.appendChild(element);
    });
};
