(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Snake = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeArray(h, w, val) {
    const arr = [];
    for (let y = 0; y < h; y++) {
        arr[y] = [];
        for (let x = 0; x < w; x++) {
            arr[y][x] = val;
        }
    }
    return arr;
}
exports.makeArray = makeArray;
function display(grounds, snakePath, rewards) {
    for (const item of snakePath) {
        grounds[item.y][item.x] = 1;
    }
    for (const item of rewards) {
        grounds[item.y][item.x] = 2;
    }
    const width = document.getElementById("box").parentElement.clientWidth;
    const height = width;
    const canvas = document.getElementById("box");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    const cellSize = Math.floor(width / grounds[0].length);
    for (let row = 0; row < grounds.length; row++) {
        for (let column = 0; column < grounds[row].length; column++) {
            if (grounds[row][column] === 1) {
                ctx.fillStyle = 'black';
                ctx.fillRect(column * cellSize, row * cellSize, cellSize, cellSize);
            }
            else if (grounds[row][column] === 2) {
                ctx.fillStyle = 'red';
                ctx.fillRect(column * cellSize, row * cellSize, cellSize, cellSize);
            }
            else {
                ctx.fillStyle = 'white';
                ctx.fillRect(column * cellSize, row * cellSize, cellSize, cellSize);
            }
        }
    }
}
exports.display = display;
function displayClear() {
    const width = document.getElementById("box").parentElement.clientWidth;
    const height = width;
    const canvas = document.getElementById("box");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
}
exports.displayClear = displayClear;
function displayGameOver() {
    const width = document.getElementById("box").parentElement.clientWidth;
    const height = width;
    const canvas = document.getElementById("box");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.font = "30px Arial";
    ctx.fillText("Game Over !!", width / 2, height / 2);
}
exports.displayGameOver = displayGameOver;
function checkForRewards(snakePath, rewards) {
    for (const [itemIndex, item] of snakePath.entries()) {
        for (const [rewardIndex, reward] of rewards.entries()) {
            if (reward.x === item.x && reward.y === item.y) {
                rewards.splice(rewardIndex, 1);
            }
        }
    }
    return rewards;
}
exports.checkForRewards = checkForRewards;
function generateRewards(rewards) {
    for (let i = 0; i < 10; i++) {
        rewards.push({
            x: Math.floor(Math.random() * 50),
            y: Math.floor(Math.random() * 50),
        });
    }
    return rewards;
}
exports.generateRewards = generateRewards;
function cycleSnakePath(currentDirection, snakePath) {
    if (currentDirection === 0) {
        snakePath.push({
            x: snakePath[snakePath.length - 1].x,
            y: snakePath[snakePath.length - 1].y - 1,
        });
        snakePath.shift();
    }
    else if (currentDirection === 1) {
        snakePath.push({
            x: snakePath[snakePath.length - 1].x,
            y: snakePath[snakePath.length - 1].y + 1,
        });
        snakePath.shift();
    }
    else if (currentDirection === 2) {
        snakePath.push({
            x: snakePath[snakePath.length - 1].x - 1,
            y: snakePath[snakePath.length - 1].y,
        });
        snakePath.shift();
    }
    else if (currentDirection === 3) {
        snakePath.push({
            x: snakePath[snakePath.length - 1].x + 1,
            y: snakePath[snakePath.length - 1].y,
        });
        snakePath.shift();
    }
    if (snakePath[snakePath.length - 1].y < 0 || snakePath[snakePath.length - 1].y > 49 || snakePath[snakePath.length - 1].x < 0 || snakePath[snakePath.length - 1].x > 49) {
        return null;
    }
    return snakePath;
}
exports.cycleSnakePath = cycleSnakePath;
exports.currentDirection = 0;
exports.snakePath = [];
exports.rewards = [];
function initialize() {
    exports.currentDirection = 0;
    exports.snakePath = [];
    exports.rewards = generateRewards([]);
    exports.snakePath.push({
        x: Math.floor(50 / 2),
        y: Math.floor(50 / 2),
    });
    exports.snakePath.push({
        x: Math.floor(50 / 2) - 1,
        y: Math.floor(50 / 2),
    });
    exports.snakePath.push({
        x: Math.floor(50 / 2) - 2,
        y: Math.floor(50 / 2),
    });
    exports.snakePath.push({
        x: Math.floor(50 / 2) - 2,
        y: Math.floor(50 / 2) - 1,
    });
    exports.snakePath.push({
        x: Math.floor(50 / 2) - 2,
        y: Math.floor(50 / 2) - 2,
    });
    display(makeArray(50, 50, 0), exports.snakePath, exports.rewards);
    document.addEventListener('keyup', function (event) {
        if (event.key === 'ArrowUp') {
            exports.currentDirection = 0;
        }
        else if (event.key === 'ArrowDown') {
            exports.currentDirection = 1;
        }
        else if (event.key === 'ArrowLeft') {
            exports.currentDirection = 2;
        }
        else if (event.key === 'ArrowRight') {
            exports.currentDirection = 3;
        }
    });
}
exports.initialize = initialize;
function start() {
    initialize();
    displayClear();
    let interval = setInterval(function () {
        exports.snakePath = cycleSnakePath(exports.currentDirection, exports.snakePath);
        if (exports.snakePath === null) {
            clearInterval(interval);
            displayClear();
            displayGameOver();
        }
        else {
            exports.rewards = checkForRewards(exports.snakePath, exports.rewards);
            display(makeArray(50, 50, 0), exports.snakePath, exports.rewards);
        }
    }, 200);
}
exports.start = start;

},{}]},{},[1])(1)
});