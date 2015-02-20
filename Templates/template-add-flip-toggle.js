/**
 * Template: Add flip toggle
 * @desc Makes the selected layer "flippable" by creating a back layer, tap interactions, and rotate animations
 * @author Pixate, Inc.
 * @version 1.0
 */ 

var flipFrontLayer = getSelectedLayer();

var flipBackLayer = createLayer("Back");
flipBackLayer.width = flipFrontLayer.width;
flipBackLayer.height = flipFrontLayer.height;
flipBackLayer.x = Screen.width + 50; // place offscreen alongside front
flipBackLayer.y = flipFrontLayer.y;
flipBackLayer.backgroundColor = "#679ae0";


// make front and back tappable
createTapInteraction(flipFrontLayer);
createTapInteraction(flipBackLayer);

// create flip over (rotate) animation
var flipOver = createRotateAnimation(flipFrontLayer);
flipOver.basedOn = flipFrontLayer.tap;
flipOver.animates = AnimationMode.withDuration;
flipOver.dimension = DimensionType.three;
flipOver.toY = 180;
flipOver.backLayer = flipBackLayer;
flipOver.duration = 0.2;

// create flip back (rotate) animation
var flipBack = createRotateAnimation(flipBackLayer);
flipBack.basedOn = flipBackLayer.tap;
flipBack.animates = AnimationMode.withDuration;
flipBack.dimension = DimensionType.three;
flipBack.toY = -180;
flipBack.backLayer = flipFrontLayer;
flipBack.duration = 0.2;