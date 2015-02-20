/**
 * Alignment: Fit to screen
 * @desc Resizes and moves the selected layer to fill the screen
 * @author Pixate, Inc.
 * @version 1.0
 */

var layer = getSelectedLayer();
layer.y = layer.x = 0;
layer.width = Screen.width;
layer.height = Screen.height;