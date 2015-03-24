/**
 * Alignment: Align right
 * @desc Aligns selected layers to the right side of the screen in the canvas
 * @author Pixate, Inc.
 * @version 1.1
 */

var layers = getSelectedLayers();
layers.forEach(function(layer) {
   layer.right = Screen.width; 
});