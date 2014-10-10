
var width = 180,
    height = 180,
    τ = 2 * Math.PI; // http://tauday.com/tau-manifesto

// An arc function with all values bound except the endAngle. So, to compute an
// SVG path string for a given angle, we pass an object with an endAngle
// property to the `arc` function, and it will return the corresponding string.
var backgroundArc = d3.svg.arc()
     .innerRadius(5)
     .outerRadius(85)
     .startAngle(0);


var outerArc = d3.svg.arc()
    .innerRadius(60)
    .outerRadius(80)
    .startAngle(0);

var midArc = d3.svg.arc()
    .innerRadius(35)
    .outerRadius(55)
    .startAngle(0);

var innerArc = d3.svg.arc()
    .innerRadius(10)
    .outerRadius(30)
    .startAngle(0);

// Create the SVG container, and apply a transform such that the origin is the
// center of the canvas. This way, we don't need to position arcs individually.
var svg = d3.select("#graph").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")



    

// Add the background arc, from 0 to 100% (τ).
 var outerBackground = svg.append("path")
     .datum({endAngle: τ})
     .style("fill", "#222")
     .attr("d", backgroundArc);

// Add the foreground arc.
var outerShape = svg.append("path")
    .datum({endAngle: τ})
    .style("fill", "orange")
    //.style("stroke-linecap", "round")
    .attr("d", outerArc);

 var midShape = svg.append("path")
    .datum({endAngle: τ})
    .style("fill", "#FB3799")
    .attr("d", midArc);

 var innerShape = svg.append("path")
    .datum({endAngle: τ})
    .style("fill", "#971D9B")
    .attr("d", innerArc);

var circle = svg.append("circle")
    .style("fill", "#971D9B")
    .attr("r", 85);


// Creates a tween on the specified transition's "d" attribute, transitioning
// any selected arcs from their current angle to the specified new angle.
function arcTween(transition, newAngle, arcName) {

  transition.attrTween("d", function(d) {

    var interpolate = d3.interpolate(d.endAngle, newAngle);

    return function(t) {

      d.endAngle = interpolate(t);

      return arcName(d);
    };
  });
}

