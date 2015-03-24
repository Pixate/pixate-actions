/**
 * Alignment: Align center vertically
 * @desc Aligns all selected layers to center of the screen in the canvas
 * @author Pixate, Inc.
 * @version 1.1
 */

var layers = getSelectedLayers();
layers.forEach(function(layer) {
   layer.centerY = Screen.centerY; 
});