/**
 * Alignment: Align bottom
 * @desc Aligns selected layers to the bottom of the screen in the canvas
 * @author Pixate, Inc.
 * @version 1.1
 */

var layers = getSelectedLayers();
layers.forEach(function(layer) {
   layer.bottom = Screen.height; 
});