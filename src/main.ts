import {showMainWindow} from "./V1.0.0/Window/MainWindow";

export function startup() {
    console.log("MapGenerator plugin loaded");
    if (typeof ui !== "undefined") {
        ui.registerMenuItem("MapGenerator", () => showMainWindow());
    }
}