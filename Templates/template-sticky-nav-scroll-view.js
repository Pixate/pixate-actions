/**
 * Template: Sticky nav scroll view
 * @desc Generates a scroll view with a sticky navigation bar that moves out of the way when scrolling down
 * @author Pixate, Inc.
 * @version 1.0
 */  

// create the "status bar"
var statusBar = createLayer("Status bar");
statusBar.width = Screen.width;
statusBar.height = 20;
statusBar.backgroundColor = "#222222";

// create the nav
var nav = createLayer("Nav");
nav.width = Screen.width;
nav.height = 44;
nav.y = 20;
nav.backgroundColor = "#555555";

// create the scroll container
var scrollContainer = createLayer("Scroll container");
scrollContainer.width = Screen.width;
scrollContainer.height = Screen.height;
scrollContainer.backgroundColor = 'transparent';

// create the content
var scrollContent = createLayer("Scroll content");
scrollContent.width = Screen.width - 100;
scrollContent.centerX = Screen.centerX;
scrollContent.height = Screen.height * 2;
scrollContent.y = 84;
scrollContent.backgroundColor = "#2475e4";

nestLayers(scrollContainer, scrollContent);


// make the scroll container scrollable
var scroll = createScrollInteraction(scrollContainer);

// make the nav sticky
var stickyNavMove = createMoveAnimation(nav);
stickyNavMove.basedOn = scrollContainer.scrollPosition;
stickyNavMove.animates = AnimationMode.continuousWithRate;
stickyNavMove.scrollDirection = ScrollDirection.vertical;
stickyNavMove.scrollDirection = ScrollDirection.vertical;
stickyNavMove.begin = 0; // don't need an end since it's just going offscreen
stickyNavMove.rate = -1;