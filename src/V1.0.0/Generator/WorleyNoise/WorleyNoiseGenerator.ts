import { WorleyNoise } from "./WorleyNoise";

export function modifyTerrainWorley(width: number, height: number, baseHeight: number, maxHeight: number, noiseGen: WorleyNoise) {

    for (let x = 1; x < width - 1; x++) {
        for (let y = 1; y < height - 1; y++) {
            let noiseValue = noiseGen.getValue(x, y);

            // Schaal tussen baseHeight en maxHeight
            let heightValue = baseHeight + noiseValue * (maxHeight - baseHeight);

            // Rond af naar een veelvoud van 8
            heightValue = Math.round(heightValue / 8) * 8;
            heightValue = Math.max(baseHeight, Math.min(heightValue, maxHeight));

            const tile = map.getTile(x, y);
            for (let i = 0; i < tile.numElements; i++) {
                const element = tile.getElement(i);
                if (element.type === "surface") {
                    element.baseHeight = heightValue;
                    element.clearanceHeight = heightValue;
                }
            }
        }
    }

    console.log(`Terrain modified using Worley Noise! BaseHeight: ${baseHeight}, MaxHeight: ${maxHeight}`);
}
