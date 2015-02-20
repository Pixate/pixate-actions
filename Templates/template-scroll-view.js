/**
 * Template: Scroll view 
 * @desc Creates a simple template for a scroll view, with a fullscreen scroll container and sample content layer
 * @author Pixate, Inc.
 * @version 1.0
 */  

// create the scroll container
var scrollContainer = createLayer("Scroll container");
scrollContainer.width = Screen.width;
scrollContainer.height = Screen.height;
scrollContainer.backgroundColor = 'transparent';

// create the content
var scrollContent = createLayer("Scroll content");
scrollContent.width = Screen.width - 100;
scrollContent.centerX = Screen.width / 2;
scrollContent.height = Screen.height * 2;
scrollContent.y = 50;
scrollContent.backgroundColor = "#2475e4";

nestLayers(scrollContainer, scrollContent);

var scroll = createScrollInteraction(scrollContainer);