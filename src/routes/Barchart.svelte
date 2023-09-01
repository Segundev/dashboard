<script>
  import data from "../lib/ColumnData.json";

  // import d3 dependencies
  import { scaleLinear } from "d3-scale";
  import { scaleBand } from "d3-scale";
  import { max } from "d3-array";

  let width;
  let height = 300;
  const margin = { top: 20, right: 20, bottom: 20, left: 30 };

  let innerHeight = height - margin.top - margin.bottom;
  $: innerWidth = width - margin.right - margin.left;
  const startup = data.map((d) => d.startup);

  data.sort((b, a) => {
    return a.value - b.value;
  });

  $: xScale = scaleBand()
    .domain(startup)
    .range([0, innerWidth])
    .paddingInner(0.5);
  let yScale = scaleLinear()
    .domain([0, max(data, (d) => +d.value)])
    .range([innerHeight, 0]);

  let hovered;
  $: xTicks = xScale.domain();
  let yTicks = yScale.ticks(4);
</script>

<div
  class="chart-container"
  bind:clientWidth={width}
  role="figure"
  tabindex="0"
>
  <svg tabindex="0">
    <title> Bar chart showing most funded companies</title>
    <g
      transform="translate({margin.left + 10}, 0)"
      role="presentation"
      aria-hidden="true"
    >
      {#each xTicks as tick}
        <text class="text" x={xScale(tick)} y={height}>
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
      class="inner-chart"
      transform="translate({margin.left + 10}, {margin.top})"
      role="list"
      tabindex="0"
      aria-label="Bar Chart"
    >
      {#each data as d, i}
        <rect
          role="listitem"
          tabindex="0"
          aria-label="{d.startup} got {d.value} million dollar in investor funding"
          x={xScale(d.startup)}
          y={yScale(d.value)}
          width={xScale.bandwidth()}
          height={yScale(0) - yScale(d.value)}
          fill={hovered === d ? "#8E0F0A" : "#FFE49F"}
        />
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
    position: relative;
    width: 100%;
    height: 400px;
  }
</style>
