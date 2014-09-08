
var width = 150,
    height = 150,
    τ = 2 * Math.PI; // http://tauday.com/tau-manifesto

// An arc function with all values bound except the endAngle. So, to compute an
// SVG path string for a given angle, we pass an object with an endAngle
// property to the `arc` function, and it will return the corresponding string.
var outerArc = d3.svg.arc()
    .innerRadius(45)
    .outerRadius(65)
    .startAngle(0);

var innerArc = d3.svg.arc()
    .innerRadius(35)
    .outerRadius(45)
    .startAngle(0);

// Create the SVG container, and apply a transform such that the origin is the
// center of the canvas. This way, we don't need to position arcs individually.
var svg = d3.select("#graph").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

// Add the background arc, from 0 to 100% (τ).
var background = svg.append("path")
    .datum({endAngle: τ})
    .style("fill", "#ddd")
    .attr("d", outerArc);

// Add the foreground arc in orange, currently showing 12.7%.
var outerShape = svg.append("path")
    .datum({endAngle: .127 * τ})
    .style("fill", "orange")
    .attr("d", outerArc);

 var innerShape = svg.append("path")
    .datum({endAngle: τ})
    .style("fill", "#000")
    .attr("d", innerArc);

// Every so often, start a transition to a new random angle. Use transition.call
// (identical to selection.call) so that we can encapsulate the logic for
// tweening the arc in a separate function below.
// setInterval(function() {
//   foreground.transition()
//       .duration(400)
//       .call(arcTween, dialMove * τ);  
// }, 1000);

// Creates a tween on the specified transition's "d" attribute, transitioning
// any selected arcs from their current angle to the specified new angle.
function arcTweenOuter(transition, newAngle) {

  transition.attrTween("d", function(d) {

    var interpolate = d3.interpolate(d.endAngle, newAngle);

    return function(t) {

      d.endAngle = interpolate(t);

      return outerArc(d);
    };
  });
}
function arcTweenInner(transition, newAngle) {

  transition.attrTween("d", function(d) {

    var interpolate = d3.interpolate(d.endAngle, newAngle);

    return function(t) {

      d.endAngle = interpolate(t);

      return innerArc(d);
    };
  });
}