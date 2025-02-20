﻿import {ShowWidget} from "./Widget/showWidget";
import {generateRidgedMultiNoise, generateWorleyNoise} from "../Generator/Generator";

let emptyWindow: Window;
const windowTag = "MapGenerator";
let windowShowInfo: Window = ui.getWindow(windowTag);
const noiseTypes = ["SelectType", "RidgedMultiNoise", "WorleyNoise"];
let noiseIndex = 0;
let octavesIndex = 4;
let lacunarityIndex = 2;
let maxHeightIndex = 104;
let minHeightIndex = 48;
let worleyPointsIndex = 10;

export function showMainWindow() {
    
    if (windowShowInfo) {
        windowShowInfo.bringToFront();
        return;
    }
    const windowDesc: WindowDesc = {
        classification: windowTag,
        width: 400,
        height: 200,
        title: 'InfoWindow',
        colours: [0o32, 0o30],
        widgets: [
            {
                name: "generateMapButton",
                type: "button",
                width: 30,
                height: 26,
                x: 10,
                y: 60,
                tooltip: "Generate map",
                onClick: () => {
                    noisetypes()
                },
                image: "cheats",
            },
            {
                name: "NoiseTypePicker",
                type: "dropdown",
                x: 10,
                y: 20,
                width: 130,
                height: 26,
                items: noiseTypes,
                selectedIndex: noiseIndex,
                onChange: (index) => {
                    noiseIndex = index;
                    ShowWidget.getInstance().showWidgetInWindow(noiseTypes, noiseIndex, windowShowInfo);
                }
            },
            {
                name: "Octaves",
                type: "label",
                x: 150,
                y: 20,
                width: 100,
                height: 26,
                text: "Octaves: 4",
            },
            {
                name: "octavesSlider",
                type: "spinner",
                x: 250,
                y: 20,
                width: 100,
                height: 26,
                tooltip: "Number of octaves",
                text: "4",
                onIncrement: () => {
                    if (octavesIndex < 10) {
                        octavesIndex++;
                        windowShowInfo.findWidget<SpinnerWidget>("octavesSlider").text = octavesIndex.toString()
                    }
                },
                onDecrement: () => {
                    if (octavesIndex > 1) {
                        octavesIndex--;
                        windowShowInfo.findWidget<SpinnerWidget>("octavesSlider").text = octavesIndex.toString()
                    }
                }
            },
            {
                name: "Lacunarity",
                type: "label",
                x: 150,
                y: 50,
                width: 100,
                height: 26,
                text: "Lacunarity: ",
            },
            {
                name: "lacunaritySlider",
                type: "spinner",
                x: 250,
                y: 50,
                width: 100,
                height: 26,
                tooltip: "Lacunarity",
                text: "2",
                onIncrement: () => {
                    if (lacunarityIndex < 10) {
                        lacunarityIndex++;
                        windowShowInfo.findWidget<SpinnerWidget>("lacunaritySlider").text = lacunarityIndex.toString()
                    }
                },
                onDecrement: () => {
                    if (lacunarityIndex > 1) {
                        lacunarityIndex--;
                        windowShowInfo.findWidget<SpinnerWidget>("lacunaritySlider").text = lacunarityIndex.toString()
                    }
                }
            },
            {
                name: "MaxHeightLabel",
                type: "label",
                x: 150,
                y: 80,
                width: 100,
                height: 26,
                text: "MaxHeight: ",
            },
            {
                name: "maxHeightSlider",
                type: "spinner",
                x: 250,
                y: 80,
                width: 100,
                height: 26,
                tooltip: "MaxHeight",
                text: "13",
                onIncrement: () => {
                    if (maxHeightIndex < 200 && maxHeightIndex > minHeightIndex) {
                        maxHeightIndex += 8;
                        let text : number = windowShowInfo.findWidget<SpinnerWidget>("maxHeightSlider").text as unknown as number;
                        text ++
                        windowShowInfo.findWidget<SpinnerWidget>("maxHeightSlider").text = text.toString();
                    }
                },
                onDecrement: () => {
                    if (maxHeightIndex > 48 && maxHeightIndex > minHeightIndex) {
                        maxHeightIndex -= 8;
                        let text : number = windowShowInfo.findWidget<SpinnerWidget>("maxHeightSlider").text as unknown as number;
                        text --
                        windowShowInfo.findWidget<SpinnerWidget>("maxHeightSlider").text = text.toString();
                    }
                }
            },
            {
                name: "MinHeightLabel",
                type: "label",
                x: 150,
                y: 110,
                width: 100,
                height: 26,
                text: "MinHeight: ",
            },
            {
                name: "minHeightSlider",
                type: "spinner",
                x: 250,
                y: 110,
                width: 100,
                height: 26,
                tooltip: "MinHeight",
                text: "6",
                onIncrement: () => {
                    if (minHeightIndex < 200 && minHeightIndex < maxHeightIndex) {
                        minHeightIndex += 8;
                        let text : number = windowShowInfo.findWidget<SpinnerWidget>("minHeightSlider").text as unknown as number;
                        text ++
                        windowShowInfo.findWidget<SpinnerWidget>("minHeightSlider").text = text.toString();
                    }
                },
                onDecrement: () => {
                    if (minHeightIndex > 0 && minHeightIndex < maxHeightIndex) {
                        minHeightIndex -= 8;
                        let text : number = windowShowInfo.findWidget<SpinnerWidget>("minHeightSlider").text as unknown as number;
                        text --
                        windowShowInfo.findWidget<SpinnerWidget>("minHeightSlider").text = text.toString();
                    }
                }
            },
            {
                name: "WorleyPointsLabel",
                type: "label",
                x: 150,
                y: 140,
                width: 100,
                height: 26,
                text: "WorleyPoints: ",
            },
            {
                name: "worleyPointsSlider",
                type: "spinner",
                x: 250,
                y: 140,
                width: 100,
                height: 26,
                tooltip: "WorleyPoints",
                text: "10",
                onIncrement: () => {
                    if (worleyPointsIndex < 1000) {
                        worleyPointsIndex++;
                        windowShowInfo.findWidget<SpinnerWidget>("worleyPointsSlider").text = worleyPointsIndex.toString()
                    }
                },
                onDecrement: () => {
                    if (worleyPointsIndex > 1) {
                        worleyPointsIndex--;
                        windowShowInfo.findWidget<SpinnerWidget>("worleyPointsSlider").text = worleyPointsIndex.toString()
                    }
                }
            }
        ],
        onClose() {
            windowShowInfo = emptyWindow;
            noiseIndex = 0;
            ui.tool?.cancel()
        },
    }
    windowShowInfo = ui.openWindow(windowDesc);
    ShowWidget.getInstance().showWidgetInWindow(noiseTypes, noiseIndex, windowShowInfo);
}




function noisetypes() {
    
    switch (noiseTypes[noiseIndex]) {
        case "RidgedMultiNoise":
            generateRidgedMultiNoise(octavesIndex, lacunarityIndex, 0.7, maxHeightIndex, minHeightIndex);
            break;
        case "WorleyNoise":
            generateWorleyNoise(worleyPointsIndex, maxHeightIndex, minHeightIndex);
            break;
        default:
            ui.showError("", "Please select a noise type");
            break;
    }
}