/**
 * Template: Side drawer nav (reveal) 
 * @desc Creates layers, interactions, and animations for a side drawer nav UI, where the side bar is revealed by swiping the view or tapping a menu button
 * @author Pixate, Inc.
 * @version 1.0
 */  

//set up
var revealAmount = Screen.width - 100;

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

// create the main content view
var mainView = createLayer("Main view");
mainView.width = Screen.width;
mainView.height = Screen.height;
mainView.backgroundColor = "#FFFFFF";

// nest nav bar in main view
nestLayers(mainView, navBar);

// nest bar button in nav
nestLayers(navBar, navBarButton);

// create side bar
var sideBar = createLayer("Side bar");
sideBar.width = Screen.width;
sideBar.height = Screen.height;
sideBar.backgroundColor = "#e74c3c";


// create interaction/animation to reveal side bar by sliding main view
createTapInteraction(navBarButton);
var slideMainViewOut = createMoveAnimation(mainView);
slideMainViewOut.name = "Show side bar";
slideMainViewOut.basedOn = navBarButton.tap;
slideMainViewOut.animates = AnimationMode.withDuration;
slideMainViewOut.toX = 300;
slideMainViewOut.easing = EasingCurve.easeInOutQuadratic;
slideMainViewOut.duration = 0.4;

// create interaction/animation to reveal side bar by sliding main view
function hideSideBar(trigger) {
  createTapInteraction(trigger);
  var slideMainViewIn = createMoveAnimation(mainView);
  slideMainViewIn.name = "Hide side bar";
  slideMainViewIn.basedOn = trigger.tap;
  slideMainViewIn.animates = AnimationMode.withDuration;
  slideMainViewIn.toX = 0;
  slideMainViewIn.easing = EasingCurve.easeInOutQuadratic;
  slideMainViewIn.duration = 0.4;
}

// add hideSideBar animation triggered off main view and side bar tap
hideSideBar(mainView);
hideSideBar(sideBar);

// also enable dragging main view to show/hide side bar

// Add a drag interaction to the layer & set to horizontal drag
var dragMainView = createDragInteraction(mainView);
dragMainView.direction = DragDirection.horizontal;
dragMainView.min = 0;
dragMainView.minReferenceEdge = Edge.left;
dragMainView.max = revealAmount;
dragMainView.maxReferenceEdge = Edge.left;

// animation to snap main view open or closed on drag release
var snapMainView = createMoveAnimation(mainView);
snapMainView.name = "Snap main view";
snapMainView.basedOn = mainView.dragRelease;
snapMainView.animates = AnimationMode.withDuration;
snapMainView.referenceEdge = Edge.left;
snapMainView.condition = 'main_view.x < ' + revealAmount / 2;
snapMainView.toX = 0;
snapMainView.easing = EasingCurve.easeOutQuadratic;
snapMainView.duration = 0.2;

var snapMainViewElse = addAnimationCondition(snapMainView);
snapMainViewElse.toX = revealAmount;
snapMainViewElse.easing = EasingCurve.easeOutQuadratic;
snapMainViewElse.duration = 0.2;