export function makeArray(h: number, w: number, val: number): number[][] {
    const arr: number[][] = [];
    for (let y = 0; y < h; y++) {
        arr[y] = [];
        for (let x = 0; x < w; x++) {
            arr[y][x] = val;
        }
    }
    return arr;
}

export function display(grounds: number[][], snakePath: { x: number, y: number }[]): void {

    for (const item of snakePath) {
        grounds[item.y][item.x] = 1;
    }

    const width = document.getElementById("box").parentElement.clientWidth;
    const height = width;

    const canvas: any = document.getElementById("box");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    const cellSize = Math.floor(width / grounds[0].length);

    for (let row = 0; row < grounds.length; row++) {
        for (let column = 0; column < grounds[row].length; column++) {
            if (grounds[row][column] === 1) {
                ctx.fillStyle = 'black';
                ctx.fillRect(column * cellSize, row * cellSize, cellSize, cellSize);
            } else {
                ctx.fillStyle = 'white';
                ctx.fillRect(column * cellSize, row * cellSize, cellSize, cellSize);
            }
        }
    }
}

export let currentDirection: number = 0; // 0 -> Up | 1 -> Down | 2 -> Left | 3 - Right
export let snakePath: { x: number, y: number }[] = [];

export function initialize() {
    snakePath.push({
        x: Math.floor(50 / 2),
        y: Math.floor(50 / 2),
    });

    snakePath.push({
        x: Math.floor(50 / 2) - 1,
        y: Math.floor(50 / 2),
    });

    snakePath.push({
        x: Math.floor(50 / 2) - 2,
        y: Math.floor(50 / 2),
    });

    snakePath.push({
        x: Math.floor(50 / 2) - 2,
        y: Math.floor(50 / 2) - 1,
    });

    snakePath.push({
        x: Math.floor(50 / 2) - 2,
        y: Math.floor(50 / 2) - 2,
    });

    display(makeArray(50, 50, 0), snakePath);

    document.addEventListener('keyup', function (event) {

        if (event.key === 'ArrowUp') {
            currentDirection = 0;
        } else if (event.key === 'ArrowDown') {
            currentDirection = 1;
        } else if (event.key === 'ArrowLeft') {
            currentDirection = 2;
        } else if (event.key === 'ArrowRight') {
            currentDirection = 3;
        }
    });

    setInterval(() => {
        if (currentDirection === 0 && snakePath[snakePath.length - 1].y) {
            snakePath.push({
                x: snakePath[snakePath.length - 1].x,
                y:  snakePath[snakePath.length - 1].y - 1,
            });
            snakePath.shift();
        } else if (currentDirection === 1 && snakePath[snakePath.length - 1].y < 49) {
            snakePath.push({
                x: snakePath[snakePath.length - 1].x,
                y: snakePath[snakePath.length - 1].y + 1,
            });
            snakePath.shift();
        } else if (currentDirection === 2 && snakePath[snakePath.length - 1].x > 1) {
            snakePath.push({
                x: snakePath[snakePath.length - 1].x - 1,
                y: snakePath[snakePath.length - 1].y,
            });
            snakePath.shift();
        } else if (currentDirection === 3 && snakePath[snakePath.length - 1].x < 49) {
            snakePath.push({
                x: snakePath[snakePath.length - 1].x + 1,
                y: snakePath[snakePath.length - 1].y,
            });
            snakePath.shift();
        }

        display(makeArray(50, 50, 0), snakePath);

    }, 200)
}
