var stars = [];
for (var i = 0; i < 100; i++) {
  stars.push({
    ra: Math.random() * 360,
    dec: Math.random() * 90,
    mag: Math.random() * 10,
    color: 'rgb(' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ',' + Math.round(Math.random() * 255) + ')'
  });
}

var svg = d3.select('#map-container')
  .append('svg')
  .attr('width', 800)
  .attr('height', 600);

svg.selectAll('circle')
  .data(stars)
  .enter()
  .append('circle')
  .attr('cx', function(d) {
    return Math.cos(d.ra * Math.PI / 180) * 400 + 400;
  })
  .attr('cy', function(d) {
    return Math.sin(d.dec * Math.PI / 180) * 300 + 300;
  })
  .attr('r', function(d) {
    return d.mag * 2;
  })
  .style('fill', function(d) {
    return d.color;
  });

svg.selectAll('circle')
  .on('mouseover', function(d) {
    d3.select(this).style('fill', 'red');
  })
  .on('mouseout', function(d) {
    d3.select(this).style('fill', d.color);
  });