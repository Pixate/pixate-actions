/**
 * Template: Tab navigation
 * @desc Generates tab navigation UI that swaps between views. Edit NUM_TABS to change how many tabs are generated. 
 * @author Pixate, Inc.
 * @version 1.0
 */  

// set up
var NUM_TABS = 8;
var TAB_BAR_HEIGHT = 49;

// This is to demonstrate we could easily have different
// tab colors, or images, etc.
// this action is already set up to work with any number
// of defined colors, but if this were changed to use images,
// TAB_COLORS should have entries for each tab
var TAB_COLORS = [
  "rgb(235,235, 235)",
  "rgb(235,235, 235)",
  "rgb(235,235, 235)",
  "rgb(235,235, 235)"
];

// variables
var label, view, tab, switchAnimation, selectAnimation;
var tabs = [];

// ceate a container for all the views
var views = createLayer("Views");
views.width = Screen.width;
views.height = Screen.height;
views.backgroundColor = "transparent";


for (var i = NUM_TABS-1; i >= 0; i--) {

  // the numbering we'll use for layer names
  label = i+1;

  // create each view
  view = createLayer('View ' + label);
  view.width = Screen.width;
  view.height = Screen.height;
  view.backgroundColor = randColor();
  nestLayers(views, view);

  // create each tab 
  tab = createLayer('Tab bar button ' + label);
  tab.width = Screen.width / NUM_TABS;
  tab.height = TAB_BAR_HEIGHT;
  tab.left = (Screen.width / NUM_TABS) * i;
  // shift color for first tab since it will be selected
  if (i === 0) {
    tab.backgroundColor = shiftColor(TAB_COLORS[i % TAB_COLORS.length], -30);
  } else {
    tab.backgroundColor = TAB_COLORS[i % TAB_COLORS.length];
  }  
  tabs.push(tab); // store the tabs for later

  // add tap interaction for tab
  createTapInteraction(tab);

  // create animation to show view
  switchAnimation = createReorderAnimation(view);
  switchAnimation.basedOn = tab.tap;
  switchAnimation.animates = AnimationMode.withDuration;
  // place layer we're switching to the front of the views
  switchAnimation.to = Stacking.front;  
}

// create the tab bar once all the views are created, so it's on top
var tabBar = createLayer("Tab bar");
tabBar.width = Screen.width;
tabBar.height = TAB_BAR_HEIGHT;
tabBar.bottom = Screen.height;
tabBar.backgroundColor = "transparent";

// loop back through tabs and nest in tabBar
// as well as create "active state" animations
var otherTabs, tabDeselect;
tabs.forEach(function(tab) {
  nestLayers(tabBar, tab);


  // create "deselect" animations for tabs when this is tapped
  // that will reset to beginning color
  tabs.forEach(function(tabToDeselect, i) {
    var tabDeselect = createColorAnimation(tabToDeselect);
    tabDeselect.basedOn = tab.tap;
    tabDeselect.animates = AnimationMode.withDuration;
    tabDeselect.to = TAB_COLORS[i % TAB_COLORS.length];
  });

  // animation to "select" active tab
  var selectAnimation = createColorAnimation(tab);
  selectAnimation.basedOn = tab.tap;
  selectAnimation.animates = AnimationMode.withDuration;
  selectAnimation.to = shiftColor(tab.backgroundColor, -30);

});

// Generates a random color
function randColor() {
  var r = (Math.floor(Math.random()*256) + 80) / 2;
  var g = (Math.floor(Math.random()*256) + 80) / 2;
  var b = (Math.floor(Math.random()*256) + 80) / 2;
  return "rgb(" + [r,g,b].join() + ")";
}

// lightens or darkens an RGB color
function shiftColor(color, amount) {
  var rgb = color.replace(/[^\d,]/g, '').split(',').map(function(value){return Number(value)});  
  var colorShift = function(c,n,i,d){for(i=3;i--;c[i]=d<0?0:d>255?255:d|0)d=c[i]+n;return c};
  var shifted = colorShift(rgb, amount);
  return "rgb(" + shifted.join() + ")";
}