/**
 * Alignment: Align top
 * @desc Aligns selected layers to the top of the screen in the canvas
 * @author Pixate, Inc.
 * @version 1.1
 */

var layers = getSelectedLayers();
layers.forEach(function(layer) {
   layer.y = 0;
});