import {RidgedMultiNoise} from "./RigidMultiNoise/RigidMultiNoise";
import {modifyTerrainRigidMulti} from "./RigidMultiNoise/RigidMultiNoiseGenerator";
import {modifyTerrainWorley} from "./WorleyNoise/WorleyNoiseGenerator";
import {WorleyNoise} from "./WorleyNoise/WorleyNoise";

export function generateRidgedMultiNoise(octaves: number, lacunarity: number, persistence: number, maxHeight: number, minHeight: number) {
    modifyTerrainRigidMulti(map.size.x, map.size.y, minHeight, maxHeight, new RidgedMultiNoise(getRandomNumber(0, 1000), octaves, lacunarity, persistence));
}

export function generateWorleyNoise(WorleyPoints: number, maxHeight: number, minHeight: number) {
    modifyTerrainWorley(map.size.x, map.size.y, minHeight, maxHeight, new WorleyNoise(getRandomNumber(0, 1000), WorleyPoints));
}

const getRandomNumber = (min: number, max: number) => {
    console.log("Generating random number between " + min + " and " + max + "... output" + Math.random() * (max - min) + min);
    return Math.random() * (max - min) + min
}
