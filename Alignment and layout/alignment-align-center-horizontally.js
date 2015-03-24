/**
 * Alignment: Align center horizontally
 * @desc Aligns all selected layers to middle of the screen in the canvas
 * @author Pixate, Inc.
 * @version 1.1
 */

var layers = getSelectedLayers();
layers.forEach(function(layer) {
   layer.centerX = Screen.centerX; 
});