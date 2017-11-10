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

export function display(grounds: number[][], snakePath: { x: number, y: number }[], rewards: { x: number, y: number }[]): void {

    for (const item of snakePath) {
        grounds[item.y][item.x] = 1;
    }

    for (const item of rewards) {
        grounds[item.y][item.x] = 2;
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
            } else if (grounds[row][column] === 2) {
                ctx.fillStyle = 'red';
                ctx.fillRect(column * cellSize, row * cellSize, cellSize, cellSize);
            } else {
                ctx.fillStyle = 'white';
                ctx.fillRect(column * cellSize, row * cellSize, cellSize, cellSize);
            }
        }
    }
}

export function displayClear() {
    const width = document.getElementById("box").parentElement.clientWidth;
    const height = width;

    const canvas: any = document.getElementById("box");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);
}

export function displayGameOver() {
    const width = document.getElementById("box").parentElement.clientWidth;
    const height = width;

    const canvas: any = document.getElementById("box");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.font = "30px Arial";
    ctx.fillText("Game Over !!", width / 2, height / 2);
}

export function collectReward(snakePath: { x: number, y: number }[], rewards: { x: number, y: number }[]) {
    let result: boolean = false;
    for (const [itemIndex, item] of snakePath.entries()) {
        for (const [rewardIndex, reward] of rewards.entries()) {
            if (reward.x === item.x && reward.y === item.y) {
                result = true;
            }
        }
    }

    return result;
}

export function removeRewards(snakePath: { x: number, y: number }[], rewards: { x: number, y: number }[]) {
    for (const [itemIndex, item] of snakePath.entries()) {
        for (const [rewardIndex, reward] of rewards.entries()) {
            if (reward.x === item.x && reward.y === item.y) {
                rewards.splice(rewardIndex, 1);
            }
        }
    }

    return rewards;
}

export function generateRewards(rewards: { x: number, y: number }[]) {
    for (let i = 0; i < 10; i++) {
        rewards.push({
            x: Math.floor(Math.random() * 50),
            y: Math.floor(Math.random() * 50),
        });
    }

    return rewards;
}

export function cycleSnakePath(currentDirection: number, snakePath: { x: number, y: number }[]) {
    if (currentDirection === 0) {
        snakePath.push({
            x: snakePath[snakePath.length - 1].x,
            y: snakePath[snakePath.length - 1].y - 1,
        });
    } else if (currentDirection === 1) {
        snakePath.push({
            x: snakePath[snakePath.length - 1].x,
            y: snakePath[snakePath.length - 1].y + 1,
        });
    } else if (currentDirection === 2) {
        snakePath.push({
            x: snakePath[snakePath.length - 1].x - 1,
            y: snakePath[snakePath.length - 1].y,
        });
    } else if (currentDirection === 3) {
        snakePath.push({
            x: snakePath[snakePath.length - 1].x + 1,
            y: snakePath[snakePath.length - 1].y,
        });
    }

    if (snakePath[snakePath.length - 1].y < 0 || snakePath[snakePath.length - 1].y > 49 || snakePath[snakePath.length - 1].x < 0 || snakePath[snakePath.length - 1].x > 49) {
        return null;
    }

    return snakePath;
}


export let currentDirection: number = 0; // 0 -> Up | 1 -> Down | 2 -> Left | 3 - Right
export let snakePath: { x: number, y: number }[] = [];
export let rewards: { x: number, y: number }[] = [];

export function initialize() {

    currentDirection = 0;

    snakePath = [];

    rewards = generateRewards([]);

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

    displayClear();
    display(makeArray(50, 50, 0), snakePath, rewards);

    document.addEventListener('keyup', function (event) {
        if (event.key === 'ArrowUp'|| event.key === 'w') {
            currentDirection = 0;
        } else if (event.key === 'ArrowDown' || event.key === 's') {
            currentDirection = 1;
        } else if (event.key === 'ArrowLeft'|| event.key === 'a') {
            currentDirection = 2;
        } else if (event.key === 'ArrowRight'|| event.key === 'd') {
            currentDirection = 3;
        }
    });
}

export function start() {
    initialize();

    let interval = setInterval(function () {
    
        snakePath = cycleSnakePath(currentDirection, snakePath);

        if (snakePath === null) {
            clearInterval(interval);
            displayClear();
            displayGameOver();
        } else {
            
            const collectedRewards: boolean = collectReward(snakePath, rewards);

            if (collectedRewards === false) {
                snakePath.shift();
            }

            rewards = removeRewards(snakePath, rewards);

            display(makeArray(50, 50, 0), snakePath, rewards);
        }
    }, 200);
}
