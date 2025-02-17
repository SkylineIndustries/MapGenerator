export class WorleyNoise {
    private seed: number;
    private numPoints: number;
    private points: { x: number; y: number }[];

    constructor(seed: number, numPoints: number = 50) {
        this.seed = seed;
        this.numPoints = numPoints;
        this.points = this.generatePoints();
    }

    private generatePoints(): { x: number; y: number }[] {
        let points = [];
        let rng = this.seededRandom(this.seed); // Gebruik een seed-based random generator

        for (let i = 0; i < this.numPoints; i++) {
            let x = Math.floor(rng() * map.size.x); // Correcte schaal
            let y = Math.floor(rng() * map.size.y);
            points.push({ x, y });
        }

        console.log("Generated Worley Points:", points); // Debug output
        return points;
    }

// 🔥 Betere random generator (Xorshift)
    private seededRandom(seed: number): () => number {
        return function () {
            seed ^= seed << 13;
            seed ^= seed >> 17;
            seed ^= seed << 5;
            return ((seed < 0 ? ~seed + 1 : seed) % 1000000) / 1000000;
        };
    }




    public getValue(x: number, y: number): number {
        let minDist = Number.MAX_VALUE;

        for (const point of this.points) {
            let dx = x - point.x;
            let dy = y - point.y;
            let dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < minDist) {
                minDist = dist;
            }
        }

        // Normaliseer tussen 0 en 1
        return minDist / 50; // Pas de schaal hier aan voor een goed effect
    }
}
