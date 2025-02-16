import {RidgedMultiNoise} from "./RigidMultiNoise/RigidMultiNoise";
import {modifyTerrain} from "./RigidMultiNoise/RigidMultiNoiseGenerator";

export function GenerateMap(generatorType: string, octaves: number = 4, lacunarity: number = 2, persistence: number = 0.7, maxHeight: number = 104, minHeight: number = 48) {

    switch (generatorType){
        case "RidgedMultiNoise":
            modifyTerrain(map.size.x,map.size.y, minHeight, maxHeight, new RidgedMultiNoise(getRandomNumber(0,1000), octaves, lacunarity, persistence));
            break;
        default:
            break;
    }
    
    console.log("Generating map... with generator type: " + generatorType);
}

const getRandomNumber = (min: number, max: number) => {
    console.log("Generating random number between " + min + " and " + max + "... output" + Math.random() * (max - min) + min);
    return Math.random() * (max - min) + min
}
