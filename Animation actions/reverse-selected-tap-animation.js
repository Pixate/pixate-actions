/**
 * Animations: Reverse selected tap animation
 * @desc Creates a reverse toggle for a tap animation
 * @author Pixate, Inc.
 * @version 1.0
 */

var selectedLayer = getSelectedLayer();

var animations = getSelectedAnimations();

if (animations.length == 0) {
    alert('Select at least one animation to reverse!');
}


// create reverse animations
animations.forEach(function(animation) {
    if (animation.basedOn !== 'tap') {
        alert('Please select an animated based on tap!');
    } else {
        
        switch(animation.type) {
            case 'move':
                
                // create an "else" reverse move animation
                var moveBackCondition = addAnimationCondition(animation);
                
                // determine which properties we need to reverse
                // TODO: use "near" logic for spring easing curves
                var conditionBlocks = [];
                if (animation.toX !== null) {
                    conditionBlocks.push(selectedLayer.id + '.x == ' + selectedLayer.x);
                    moveBackCondition.toX = selectedLayer.x;
                }
                if (animation.toY !== null) {
                    conditionBlocks.push(selectedLayer.id + '.y == ' + selectedLayer.y);
                    moveBackCondition.toY = selectedLayer.y;
                }
                animation.condition = conditionBlocks.join(' and ');
                addEasingCurve(moveBackCondition, animation);
                break;
                
            case 'rotate':
                
                // create an "else" reverse rotate animation
                var rotateBackCondition = addAnimationCondition(animation);
                rotateBackCondition.dimension = animation.dimension;
                rotateBackCondition.anchorX = animation.anchorX;
                rotateBackCondition.anchorY = animation.anchorY;
                // JUSTIN: THIS DOESN'T WORK
                //rotateBackCondition.backLayer = animation.backLayer;
                
                // determine which properties we need to reverse
                var conditionBlocks = [];
                if (animation.toZ !== null) {
                    conditionBlocks.push(selectedLayer.id + '.rotation == ' + selectedLayer.rotation);
                    rotateBackCondition.toZ = selectedLayer.rotation;
                }
                if (animation.dimension == '3d') {
                    if (animation.toX !== null) {
                        conditionBlocks.push(selectedLayer.id + '.rotationX == 0');
                        rotateBackCondition.toX = 0; // rotationX not supported yet
                    }
                    if (animation.toY !== null) {
                        conditionBlocks.push(selectedLayer.id + '.rotationY == 0');
                        rotateBackCondition.toY = 0; // rotationY not supported yet
                    }   
                }
                animation.condition = conditionBlocks.join(' and ');
                addEasingCurve(rotateBackCondition, animation);
                break;
                
            case 'scale':
                
                // set initial condition
                animation.condition = selectedLayer.id + '.scale == ' + selectedLayer.scale;   
                
                // create an "else" reverse scale animation
                var scaleBackCondition = addAnimationCondition(animation);
                scaleBackCondition.anchorX = animation.anchorX;
                scaleBackCondition.anchorY = animation.anchorY;
                scaleBackCondition.scales = animation.scales;
                if (scaleBackCondition.scales === 'factor') {
                    scaleBackCondition.toX = selectedLayer.scale;
                    scaleBackCondition.toY = selectedLayer.scale;   
                } else {
                    scaleBackCondition.toX = selectedLayer.width;
                    scaleBackCondition.toY = selectedLayer.height;
                }
                addEasingCurve(scaleBackCondition, animation);
                break;
            
            case 'fade':
                
                // set initial condition
                animation.condition = selectedLayer.id + '.opacity == ' + selectedLayer.opacity;
                
                // create an "else" reverse scale animation
                var fadeBackCondition = addAnimationCondition(animation);
                fadeBackCondition.to = selectedLayer.opacity * 100; // adjust 0-1 to 0-100
                addEasingCurve(fadeBackCondition, animation);
                break;
        }
    }
});

function addEasingCurve(newCondition, animation) {
    newCondition.easing = animation.easing;
    if (animation.easing === 'spring') {
        newCondition.springFriction = animation.springFriction;
        newCondition.springTension = animation.springTension;   
    } else {
        newCondition.duration = animation.duration;
    }
}