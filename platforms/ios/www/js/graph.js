
var width = 150,
    height = 150,
    τ = 2 * Math.PI; // http://tauday.com/tau-manifesto

// An arc function with all values bound except the endAngle. So, to compute an
// SVG path string for a given angle, we pass an object with an endAngle
// property to the `arc` function, and it will return the corresponding string.
var outerArc = d3.svg.arc()
    .innerRadius(44)
    .outerRadius(65)
    .startAngle(0);

var midArc = d3.svg.arc()
    .innerRadius(25)
    .outerRadius(44)
    .startAngle(0);

var innerArc = d3.svg.arc()
    .innerRadius(12)
    .outerRadius(25 )
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
    .style("fill", "#ddd")
    .attr("d", outerArc);

var midBackground = svg.append("path")
    .datum({endAngle: τ})
    .style("fill", "#fff")
    .attr("d", midArc);

var innerBackground = svg.append("path")
    .datum({endAngle: τ})
    .style("fill", "#ddd")
    .attr("d", innerArc);

// Add the foreground arc.
var outerShape = svg.append("path")
    .datum({endAngle: τ})
    .style("fill", "orange")
    .style("stroke-linecap", "round")
    .attr("d", outerArc);

 var midShape = svg.append("path")
    .datum({endAngle: τ})
    .style("fill", "#FB3799")
    .attr("d", midArc);

 var innerShape = svg.append("path")
    .datum({endAngle: τ})
    .style("fill", "#666")
    .attr("d", innerArc);

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


// code for bounce

// var box = d3.select("#frame")
//           .append("svg")
//           .attr("width", 900)
//           .attr("height", 600);

// box.append("circle")
//    .style("stroke", "white")
//    .attr("r", 40)
//    .attr("cx", 150)
//    .attr("cy", 150)
//    .on("mouseover", bounce);
   //.on("mouseout", bounce);

// function bounce() {
//   alert("object rollover: "+this);
//   d3.select(this)
//     .transition()
//     .attr("r", r+10)
//     .duration(200)
//     .ease("cubic-out")
//     .each("end", bounceBack);
// }

// function bounceBack() {
//     d3.select(this)
//        .transition()
//        .attr("r", 150)
//        .duration(200)
//        .ease("cubic-out");
// }

