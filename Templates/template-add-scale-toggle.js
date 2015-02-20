/**
 * Template: Add scale toggle
 * @desc Adds a tap interaction and scale animation to the selected layer so it springs up and down in scale when tapped
 * @author Pixate, Inc.
 * @version 1.0
 */ 

var layer = getSelectedLayer();

// make layer tappable
createTapInteraction(layer);

// scale up on tap
var scaleLayer = createScaleAnimation(layer);
scaleLayer.name = "Toggle scale on tap";
scaleLayer.basedOn = layer.tap;
scaleLayer.animates = AnimationMode.withDuration;
// use < 1.2 as opposed to == 1 in condition since 
// springs take a while to "settle"
scaleLayer.condition = layer.id + '.scale < 1.2';
scaleLayer.toX = 2;
scaleLayer.toY = 2;
scaleLayer.easing = EasingCurve.spring;
scaleLayer.springFriction = 20;
scaleLayer.springTension = 500;

var scaleDownCondition = addAnimationCondition(scaleLayer);
scaleDownCondition.toX = 1;
scaleDownCondition.toY = 1;
scaleDownCondition.easing = EasingCurve.spring;
scaleDownCondition.springFriction = 20;
scaleDownCondition.springTension = 500;