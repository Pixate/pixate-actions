/**
 * Template: Side drawer nav (overlay)
 * @desc Creates layers, interactions, and animations for a side drawer nav UI, where the side bar is overlays the view when a menu button is tapped
 * @author Pixate, Inc.
 * @version 1.0
 */  

// create side bar
var sideBar = createLayer("Side bar");
sideBar.width = Screen.width * (2/3);
sideBar.height = Screen.height;
sideBar.x = 0 - sideBar.width;
sideBar.backgroundColor = "#e74c3c";

// create the status bar
var statusBar = createLayer("Status bar");
statusBar.width = Screen.width;
statusBar.height = 20;
statusBar.backgroundColor = "#222222";

// create the nav bar
var navBar = createLayer("Nav bar");
navBar.width = Screen.width;
navBar.height = 44;
navBar.y = 20;
navBar.backgroundColor = "#555555";

// create the nav bar button
var navBarButton = createLayer("Nav bar button");
navBarButton.width = navBarButton.height = 22;
navBarButton.x = navBarButton.y = 11;
navBarButton.backgroundColor = "#CCCCCC";

// nest bar button in nav
nestLayers(navBar, navBarButton);

// create the main content view
var mainView = createLayer("Main view");
mainView.width = Screen.width;
mainView.height = Screen.height;
mainView.backgroundColor = "#FFFFFF";


// create interaction/animation to reveal side bar by sliding main view
createTapInteraction(navBarButton);
var slideSideBarIn = createMoveAnimation(sideBar);
slideSideBarIn.name = "Show side bar";
slideSideBarIn.basedOn = navBarButton.tap;
slideSideBarIn.animates = AnimationMode.withDuration;
slideSideBarIn.toX = 0;
slideSideBarIn.easing = EasingCurve.easeInOutQuadratic;
slideSideBarIn.duration = 0.4;

// create interaction/animation to reveal side bar by sliding main view
createTapInteraction(sideBar);
var slideSideBarOut = createMoveAnimation(sideBar);
slideSideBarOut.name = "Hide side bar";
slideSideBarOut.basedOn = sideBar.tap;
slideSideBarOut.animates = AnimationMode.withDuration;
slideSideBarOut.toX = 0 - sideBar.width;
slideSideBarOut.easing = EasingCurve.easeInOutQuadratic;
slideSideBarOut.duration = 0.4;

// also slide the side bar out if tapping on main view
createTapInteraction(mainView);
var slideSideBarOut = createMoveAnimation(sideBar);
slideSideBarOut.name = "Hide side bar";
slideSideBarOut.basedOn = mainView.tap;
slideSideBarOut.animates = AnimationMode.withDuration;
slideSideBarOut.toX = 0 - sideBar.width;
slideSideBarOut.easing = EasingCurve.easeInOutQuadratic;
slideSideBarOut.duration = 0.4;


// also enable dragging main view to show/hide side bar

// Add a drag interaction to the layer & set to horizontal drag
var dragSideBar = createDragInteraction(sideBar);
dragSideBar.direction = DragDirection.horizontal;
dragSideBar.min = 0 - sideBar.width;
dragSideBar.minReferenceEdge = Edge.left;
dragSideBar.max = 0;
dragSideBar.maxReferenceEdge = Edge.left;

// animation to snap main view open or closed on drag release
var snapSideBar = createMoveAnimation(sideBar);
snapSideBar.name = "Snap side bar";
snapSideBar.basedOn = sideBar.dragRelease;
snapSideBar.animates = AnimationMode.withDuration;
snapSideBar.referenceEdge = Edge.left;
snapSideBar.condition = 'side_bar.x < ' + -80;
snapSideBar.toX = 0 - sideBar.width;
snapSideBar.easing = EasingCurve.easeOutQuadratic;
snapSideBar.duration = 0.2;

var snapSideBarElse = addAnimationCondition(snapSideBar);
snapSideBarElse.toX = 0;
snapSideBarElse.easing = EasingCurve.easeOutQuadratic;
snapSideBarElse.duration = 0.2;