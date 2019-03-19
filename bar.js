function createBar(width, height) {
  const bar = d3.select('#bar')
    .attr('width', width)
    .attr('height', height)

  bar.append('g')
    .classed('x-axis', true)

  bar.append('g')
    .classed('y-axis', true)

  bar.append('text')
    .attr('transform', 'rotate(-90)')
    .attr('x', - height / 2)
    .attr('dy', '1em')
    .style('text-anchor', 'middle')
    .style('font-size', '1em')
    .classed('y-axis-label', true)

  bar.append('text')
    .attr('x', width / 2)
    .attr('y', '1em')
    .attr('font-size', '1.5em')
    .style('text-anchor', 'middle')
    .classed('bar-title', true)
}

function highlightBars(year) {
  d3.select('#bar')
    .selectAll('rect')
      .attr('fill', d => d.year === year ? '#16a085' : '#1abc9c')
}

function drawBar(data, dataType, country) {
  const bar = d3.select('#bar')

  const padding = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 110
  }

  const barPadding = 1
  const width = +bar.attr('width')
  const height = +bar.attr('height')
  let countryData = data.filter(d => d.country === country)
    .sort((a, b) => a.year - b.year)

  let xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))

  let yScale = d3.scaleLinear()
    .domain([0, d3.max(countryData, d +. d[dataType])])
    .range([height - padding.bottom, padding.top])

  let barWidth = xScale(xScale.domain()[0] + 1) - xScale.range()[0]

  let xAxis = d3.axisBottom(xScale)
    .tickFormat(d3.format('.0f'))

  d3.select('.x-axis')
    .attr('transform', `translate(0, ${height - padding.bottom})`)
    .call(xAxis)

  const yAxis = d3.axisLeft(yScale)

  d3.select('.y-axis')
    .attr('transform', `translate(${padding.left - barWidth / 2}, 0)`)
    .transition()
    .duration(1000)
    .call(yAxis)

  let axisLabel = dataType === 'emissions' ?
    `CO2 emissions, thousand metrics tons` :
    `CO2 emissions, metric tons per capita`

  let barTitle = country ?
    `CO2 Emissions, ${country}` :
    'Click on a country to see annual trends.'

  d3.select('.y-axis-label')
    .text(axisLabel)

  d3.select('.bar-title')
    .text(barTitle)
}