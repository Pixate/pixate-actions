/**
 * Alignment: Fit to screen
 * @desc Resizes and moves the selected layers to fill the screen
 * @author Pixate, Inc.
 * @version 1.1
 */

var layers = getSelectedLayers();
layers.forEach(function(layer) {
    layer.y = layer.x = 0;
    layer.width = Screen.width;
    layer.height = Screen.height;
});