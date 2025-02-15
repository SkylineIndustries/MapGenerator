import {GenerateMap} from "../Generator/Generator";

let emptyWindow: Window;
const windowTag = "MapGenerator";
let windowShowInfo: Window = ui.getWindow(windowTag);
export function showMainWindow() {
    if (windowShowInfo) {
        windowShowInfo.bringToFront();
        return;
    }
    const windowDesc: WindowDesc = {
        classification: windowTag,
        width: 400,
        height: 100,
        title: 'InfoWindow',
        colours: [0o32, 0o30],
        widgets: [
            {
                name: "generateMapButton",
                type: "button",
                width: 30,
                height: 26,
                x: 50,
                y: 50,
                tooltip: "Generate map",
                onClick: () => {
                    GenerateMap("default");
                },
                image: "cheats",
            }
        ],
        onClose() {
            windowShowInfo = emptyWindow;
            ui.tool?.cancel()
        },
    }
    windowShowInfo = ui.openWindow(windowDesc);
}