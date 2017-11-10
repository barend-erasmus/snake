import { expect } from 'chai';
import 'mocha';

import { removeRewards, cycleSnakePath, generateRewards, collectReward } from './snake';

describe('generateRewards', () => {
    it('should return 10 rewards', () => {
        const rewards: { x: number, y: number }[] = generateRewards([]);

        expect(rewards.length).to.be.eq(10);
    });
});

describe('removeRewards', () => {
    it('should remove rewards given snake path is in same location', () => {
        const rewards: { x: number, y: number }[] = removeRewards([
            {
                x: 10,
                y: 20,
            },
        ], [
                {
                    x: 10,
                    y: 20,
                },
                {
                    x: 30,
                    y: 30,
                },
            ]);

        expect(rewards.length).to.be.eq(1);
    });
});

describe('collectReward', () => {
    it('should return true given snake path is in same location', () => {
        const result: boolean = collectReward([
            {
                x: 10,
                y: 20,
            },
        ], [
                {
                    x: 10,
                    y: 20,
                },
                {
                    x: 30,
                    y: 30,
                },
            ]);

        expect(result).to.be.true;
    });

    it('should return false given snake path is not in same location', () => {
        const result: boolean = collectReward([
            {
                x: 25,
                y: 25,
            },
        ], [
                {
                    x: 10,
                    y: 20,
                },
                {
                    x: 30,
                    y: 30,
                },
            ]);

        expect(result).to.be.false;
    });
});

describe('cycleSnakePath', () => {
    it('should move up given direction is up', () => {
        const snakePath: { x: number, y: number }[] = cycleSnakePath(0, [
            {
                x: 10,
                y: 10,
            },
            {
                x: 10,
                y: 9,
            },
        ]);

        expect(snakePath[1].x).to.be.eq(10);
        expect(snakePath[1].y).to.be.eq(9);

        expect(snakePath[2].x).to.be.eq(10);
        expect(snakePath[2].y).to.be.eq(8);
    });

    it('should move down given direction is down', () => {
        const snakePath: { x: number, y: number }[] = cycleSnakePath(1, [
            {
                x: 10,
                y: 9,
            },
            {
                x: 10,
                y: 10,
            },
        ]);

        expect(snakePath[1].x).to.be.eq(10);
        expect(snakePath[1].y).to.be.eq(10);

        expect(snakePath[2].x).to.be.eq(10);
        expect(snakePath[2].y).to.be.eq(11);
    });

    it('should move left given direction is left', () => {
        const snakePath: { x: number, y: number }[] = cycleSnakePath(2, [
            {
                x: 10,
                y: 9,
            },
            {
                x: 10,
                y: 10,
            },
        ]);

        expect(snakePath[1].x).to.be.eq(10);
        expect(snakePath[1].y).to.be.eq(10);

        expect(snakePath[2].x).to.be.eq(9);
        expect(snakePath[2].y).to.be.eq(10);
    });

    it('should move right given direction is right', () => {
        const snakePath: { x: number, y: number }[] = cycleSnakePath(3, [
            {
                x: 10,
                y: 9,
            },
            {
                x: 10,
                y: 10,
            },
        ]);

        expect(snakePath[1].x).to.be.eq(10);
        expect(snakePath[1].y).to.be.eq(10);

        expect(snakePath[2].x).to.be.eq(11);
        expect(snakePath[2].y).to.be.eq(10);
    });
});