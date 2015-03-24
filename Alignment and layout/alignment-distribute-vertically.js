
/**
 * Alignment: Distribute vertically
 * @desc Distribute all selected layers vertically between the top and bottom-most selected layer
 * @author Pixate, Inc.
 * @version 1.1
 */

var layers = getSelectedLayers();

if (layers.length > 2) {
    
    // sort the layers by their vertical position
    function compare(a,b) {
      if (a.y < b.y)
         return -1;
      if (a.y > b.y)
        return 1;
      return 0;
    }
    layers.sort(compare);
    
    var top = layers.shift();
    var bottom = layers.pop();
    var distance = bottom.top - top.bottom;
    
    // sum up height of layers in between top and bottom
    var totalHeight = layers.reduce(function(height, layer) {
        return height + layer.height;
    }, 0);
    
    // calculate spacing distance
    // distance - totalHeight equals the total amount of spacing between layers
    // layers.length + 1 represents the number of spaces
    var spacing = (distance - totalHeight) / (layers.length + 1);
    
    // space out each layer
    var previousLayer;
    layers.forEach(function(layer, i) {
        if (i === 0) {
            layer.y = top.bottom + spacing;
        } else if (i === layers.length - 1) {
            layer.bottom = bottom.top - spacing;
        } else {
            layer.y = previousLayer.bottom + spacing;
        }
        previousLayer = layer;
    });
    
} else {
    alert('Select more than 2 layers!');
}