/**
 * Alignment: Distribute horizontally
 * @desc Distribute all selected layers horizontally between the left and right-most selected layer
 * @author Pixate, Inc.
 * @version 1.1
 */

var layers = getSelectedLayers();

if (layers.length > 2) {
    
    // sort the layers by their vertical position
    function compare(a,b) {
      if (a.x < b.x)
         return -1;
      if (a.x > b.x)
        return 1;
      return 0;
    }
    layers.sort(compare);
    
    var left = layers.shift();
    var right = layers.pop();
    var distance = right.left - left.right;
    
    // sum up width of layers in between left and right
    var totalWidth = layers.reduce(function(width, layer) {
        return width + layer.width;
    }, 0);
    
    // calculate spacing distance
    // distance - totalWidth equals the total amount of spacing between layers
    // layers.length + 1 represents the number of spaces
    var spacing = (distance - totalWidth) / (layers.length + 1);
    
    // space out each layer
    var previousLayer;
    layers.forEach(function(layer, i) {
        if (i === 0) {
            layer.x = left.right + spacing;
        } else if (i === layers.length - 1) {
            layer.right = right.left - spacing;
        } else {
            layer.x = previousLayer.right + spacing;
        }
        previousLayer = layer;
    });
    
} else {
    alert('Select more than 2 layers!');
}
