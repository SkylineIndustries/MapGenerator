import {RidgedMultiNoise} from "./RigidMultiNoise";

export function modifyTerrainRigidMulti(width: number, height: number, baseHeight: number, maxHeight: number, noiseGen: RidgedMultiNoise) {

    resetTerrain(width, height, baseHeight);

    CalculateHeightValue(width, height, baseHeight, maxHeight, noiseGen);

}

function resetTerrain(width: number, height: number, baseHeight: number) {
    for (let x = 1; x < width - 1; x++) {
        for (let y = 1; y < height - 1; y++) {
            const tile = map.getTile(x, y);
            for (let i = 0; i < tile.numElements; i++) {
                setTileHeight(x, y, baseHeight);
            }
        }
    }
}

function CalculateHeightValue(width: number, height: number, baseHeight: number, maxHeight: number, noiseGen: RidgedMultiNoise) {
    const scale = 10;

    for (let x = 1; x < width - 1; x++) {
        for (let y = 1; y < height - 1; y++) {
            let noiseValue = noiseGen.getValue(x / scale, y / scale);


            let clampedNoise = Math.max(0, Math.min(1, noiseValue));

            let heightValue = (1 - clampedNoise) * baseHeight + clampedNoise * maxHeight;

            heightValue = Math.round(heightValue / 8) * 8;

            heightValue = Math.max(baseHeight, Math.min(heightValue, maxHeight));

            const tile = map.getTile(x, y);
            for (let i = 0; i < tile.numElements; i++) {
                setTileHeight(x, y, heightValue);
            }
        }
    }
    console.log(`Terrain generation complete!`);
}

function setTileHeight(x: number, y: number, height: number) {
    const tile = map.getTile(x, y);
    for (let i = 0; i < tile.numElements; i++) {
        const element = tile.getElement(i);
        if (element.type === "surface") {
            element.baseHeight = height;
            element.clearanceHeight = height;
        }
    }
}
