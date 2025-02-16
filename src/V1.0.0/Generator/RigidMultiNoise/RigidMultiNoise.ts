export class RidgedMultiNoise {
    private seed: number;
    private octaves: number;
    private lacunarity: number;
    private persistence: number;

    constructor(seed: number, octaves: number = 4, lacunarity: number = 2, persistence: number = 0.7) {
        this.seed = seed;
        this.octaves = octaves;
        this.lacunarity = lacunarity;
        this.persistence = persistence;
    }

    private dotGradient(ix: number, iy: number, x: number, y: number): number {
        const gradients = [
            [1, 1], [-1, 1], [1, -1], [-1, -1],
            [1, 0], [-1, 0], [0, 1], [0, -1]
        ];

        let randomIndex = Math.floor(Math.abs(this.pseudoRandom(ix + iy * 37 + this.seed)) * gradients.length);
        randomIndex = randomIndex % gradients.length;

        const g = gradients[randomIndex];

        return (x - ix) * g[0] + (y - iy) * g[1];
    }


    private interpolate(a: number, b: number, x: number): number {
        return a + (b - a) * (x * x * (3 - 2 * x));
    }

    private pseudoRandom(x: number): number {
        x = (x << 13) ^ x;
        return ((x * (x * x * 15731 + 789221) + 1376312589) & 0x7fffffff) / 0x7fffffff;
    }

    private noise(x: number, y: number): number {
        const x0 = Math.floor(x);
        const x1 = x0 + 1;
        const y0 = Math.floor(y);
        const y1 = y0 + 1;

        const sx = x - x0;
        const sy = y - y0;

        const n00 = this.dotGradient(x0, y0, x, y);
        const n10 = this.dotGradient(x1, y0, x, y);
        const n01 = this.dotGradient(x0, y1, x, y);
        const n11 = this.dotGradient(x1, y1, x, y);

        const ix0 = this.interpolate(n00, n10, sx);
        const ix1 = this.interpolate(n01, n11, sx);

        return this.interpolate(ix0, ix1, sy);
    }

    public getValue(x: number, y: number): number {
        let value = 0;
        let frequency = 1;
        let amplitude = 1;
        let maxValue = 0;

        for (let i = 0; i < this.octaves; i++) {
            let signal = this.noise(x * frequency, y * frequency);
            signal = 1 - Math.abs(signal);

            value += amplitude * signal;
            maxValue += amplitude;

            frequency *= this.lacunarity;
            amplitude *= this.persistence;
        }

        let finalValue = value / maxValue;

        finalValue = Math.pow(finalValue, 1.5);

        return finalValue;
    }

}
