
 export class ShowWidget {
    
     static showWidget : ShowWidget | undefined;
     
     static getInstance() {
        if (this.showWidget === undefined) {
            this.showWidget = new ShowWidget();
        }
        
        return this.showWidget;
     }
     
     showWidgetInWindow(noiseTypes : string[], noiseIndex : number, windowShowInfo: Window) {
        switch (noiseTypes[noiseIndex]) {
            case "RidgedMultiNoise":
                windowShowInfo.findWidget<LabelWidget>("Octaves").isVisible = true;
                windowShowInfo.findWidget<SpinnerWidget>("octavesSlider").isVisible = true;
                windowShowInfo.findWidget<LabelWidget>("Lacunarity").isVisible = true;
                windowShowInfo.findWidget<SpinnerWidget>("lacunaritySlider").isVisible = true;
                windowShowInfo.findWidget<LabelWidget>("WorleyPointsLabel").isVisible = false;
                windowShowInfo.findWidget<SpinnerWidget>("worleyPointsSlider").isVisible = false;
                windowShowInfo.findWidget<LabelWidget>("MaxHeightLabel").isVisible = true;
                windowShowInfo.findWidget<SpinnerWidget>("maxHeightSlider").isVisible = true;
                windowShowInfo.findWidget<LabelWidget>("MinHeightLabel").isVisible = true;
                windowShowInfo.findWidget<SpinnerWidget>("minHeightSlider").isVisible = true;
                break;

            case "WorleyNoise":
                windowShowInfo.findWidget<LabelWidget>("Octaves").isVisible = false;
                windowShowInfo.findWidget<SpinnerWidget>("octavesSlider").isVisible = false;
                windowShowInfo.findWidget<LabelWidget>("Lacunarity").isVisible = false;
                windowShowInfo.findWidget<SpinnerWidget>("lacunaritySlider").isVisible = false;
                windowShowInfo.findWidget<LabelWidget>("WorleyPointsLabel").isVisible = true;
                windowShowInfo.findWidget<SpinnerWidget>("worleyPointsSlider").isVisible = true;
                windowShowInfo.findWidget<LabelWidget>("MaxHeightLabel").isVisible = true;
                windowShowInfo.findWidget<SpinnerWidget>("maxHeightSlider").isVisible = true;
                windowShowInfo.findWidget<LabelWidget>("MinHeightLabel").isVisible = true;
                windowShowInfo.findWidget<SpinnerWidget>("minHeightSlider").isVisible = true;
                break;

            default:
                windowShowInfo.findWidget<LabelWidget>("WorleyPointsLabel").isVisible = false;
                windowShowInfo.findWidget<SpinnerWidget>("worleyPointsSlider").isVisible = false;
                windowShowInfo.findWidget<LabelWidget>("Octaves").isVisible = false;
                windowShowInfo.findWidget<SpinnerWidget>("octavesSlider").isVisible = false;
                windowShowInfo.findWidget<LabelWidget>("Lacunarity").isVisible = false;
                windowShowInfo.findWidget<SpinnerWidget>("lacunaritySlider").isVisible = false;
                windowShowInfo.findWidget<LabelWidget>("MaxHeightLabel").isVisible = false;
                windowShowInfo.findWidget<SpinnerWidget>("maxHeightSlider").isVisible = false;
                windowShowInfo.findWidget<LabelWidget>("MinHeightLabel").isVisible = false;
                windowShowInfo.findWidget<SpinnerWidget>("minHeightSlider").isVisible = false;
                break;
        }
    }
}