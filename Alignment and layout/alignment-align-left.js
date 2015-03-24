/**
 * Alignment: Align left
 * @desc Aligns selected layers to the left side of the screen in the canvas
 * @author Pixate, Inc.
 * @version 1.1
 */

var layers = getSelectedLayers();
layers.forEach(function(layer) {
   layer.x = 0; 
});