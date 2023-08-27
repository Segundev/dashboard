<script>
  import data from "../lib/stackedData.json";

  // import d3 dependencies
  import { scaleLinear, scaleOrdinal } from "d3-scale";
  import { scaleBand } from "d3-scale";
  import { stack } from "d3-shape";
  import { map, max } from "d3-array";

  let width;
  let height = 300;
  const margin = { top: 20, right: 20, bottom: 20, left: 40 };
  let innerHeight = height - margin.top - margin.bottom;
  $: innerWidth = width - margin.right - margin.left;

  const category = map(data, (d) => d.month);
  const subCategory = Object.keys(data[0]).slice(1, 3);

  $: xScale = scaleBand()
    .domain(category)
    .range([0, innerWidth])
    .paddingInner(0.3);

  const yScale = scaleLinear().domain([0, 500]).range([innerHeight, 0]);

  const colorScale = scaleOrdinal()
    .domain(subCategory)
    .range(["#FFE49F", "#FEF6DF"]);

  const stackData = stack().keys(subCategory)(data);
  let yTicks = yScale.ticks(4);
  $: xTicks = xScale.domain();
</script>

<div
  class="chart-container"
  bind:clientWidth={width}
  tabindex="0"
  role="figure"
>
  <svg>
    <title> Deal activity between January and July 2023 </title>
    <g
      transform="translate({margin.left + margin.right}, 0)"
      role="presentation"
      aria-hidden="true"
    >
      {#each xTicks as tick}
        <text
          class="text"
          x={xScale(tick)}
          y={height}
          dx="-10"
          text-anchor="middle"
        >
          {tick}
        </text>
      {/each}
    </g>
    <g
      transform="translate({0}, {margin.top})"
      role="presentation"
      aria-hidden="true"
    >
      {#each yTicks as tick}
        <g class="y-axis">
          <text class="text" x={0} y={yScale(tick)} dy="-4">
            ${tick}M
          </text>
        </g>
        <g class="line">
          <line
            x1={0}
            y1={yScale(tick)}
            x2={width}
            y2={yScale(tick)}
            stroke={tick === 0 ? "#afafaf" : "#ccc"}
            stroke-width={tick === 0 ? 1.2 : 1}
            stroke-dasharray={tick === 0 ? 0 : 2}
          />
        </g>
      {/each}
    </g>
    <g
      transform="translate({margin.left}, {margin.top})"
      role="list"
      tabindex="0"
      aria-label="Stacked bar Chart"
    >
      {#each stackData as datum}
        {#each datum as d}
          <rect
            role="listitem"
            tabindex="0"
            aria-label="Total deal for the month of {d.data
              .month} was {d[1]} million dollars"
            x={xScale(d.data.month)}
            y={yScale(d[1])}
            width={xScale.bandwidth()}
            height={yScale(d[0]) - yScale(d[1])}
            fill={colorScale(datum.key)}
          />
        {/each}
      {/each}
    </g>
  </svg>
</div>

<style>
  .text {
    font-family: var(--sans-serif);
    font-size: 0.75rem;
    font-weight: 400;
    fill: #999;
    text-anchor: start;
  }

  .chart-container {
    width: 100%;
    margin: 0 auto;
  }
  svg {
    width: 100%;
    height: 400px;
  }
</style>
