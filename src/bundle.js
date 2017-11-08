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
function display(grounds, snakePath) {
    for (const item of snakePath) {
        grounds[item.y][item.x] = 1;
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
            else {
                ctx.fillStyle = 'white';
                ctx.fillRect(column * cellSize, row * cellSize, cellSize, cellSize);
            }
        }
    }
}
exports.display = display;
exports.currentDirection = 0;
exports.snakePath = [];
function initialize() {
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
    display(makeArray(50, 50, 0), exports.snakePath);
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
    setInterval(() => {
        if (exports.currentDirection === 0 && exports.snakePath[exports.snakePath.length - 1].y) {
            exports.snakePath.push({
                x: exports.snakePath[exports.snakePath.length - 1].x,
                y: exports.snakePath[exports.snakePath.length - 1].y - 1,
            });
            exports.snakePath.shift();
        }
        else if (exports.currentDirection === 1 && exports.snakePath[exports.snakePath.length - 1].y < 49) {
            exports.snakePath.push({
                x: exports.snakePath[exports.snakePath.length - 1].x,
                y: exports.snakePath[exports.snakePath.length - 1].y + 1,
            });
            exports.snakePath.shift();
        }
        else if (exports.currentDirection === 2 && exports.snakePath[exports.snakePath.length - 1].x > 1) {
            exports.snakePath.push({
                x: exports.snakePath[exports.snakePath.length - 1].x - 1,
                y: exports.snakePath[exports.snakePath.length - 1].y,
            });
            exports.snakePath.shift();
        }
        else if (exports.currentDirection === 3 && exports.snakePath[exports.snakePath.length - 1].x < 49) {
            exports.snakePath.push({
                x: exports.snakePath[exports.snakePath.length - 1].x + 1,
                y: exports.snakePath[exports.snakePath.length - 1].y,
            });
            exports.snakePath.shift();
        }
        display(makeArray(50, 50, 0), exports.snakePath);
    }, 200);
}
exports.initialize = initialize;

},{}]},{},[1])(1)
});