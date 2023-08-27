<script>
  import data from "../lib/DonutData.js";
  import { scaleOrdinal } from "d3-scale";
  import { pie, arc } from "d3-shape";

  let width = 400;
  let height = 400;
  let margin = 40;

  let keys = Object.keys(data);
  const radius = Math.min(width, height) / 2 - margin;
  const color = scaleOrdinal()
    .domain(keys)
    .range(["#CFA88B", "#FEDB7F", "#FFF1CC", "#CABB92", "#343434", "#DBB551"]);

  const pies = pie()
    .sort(null)
    .value((d) => d[1]);
  const data_ready = pies(Object.entries(data));

  const arcs = arc()
    .innerRadius(radius * 0.5)
    .outerRadius(radius * 0.8);

  const outerArc = arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

  function labels(d) {
    const posA = arcs.centroid(d);
    const posB = outerArc.centroid(d);
    const posC = outerArc.centroid(d);
    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
    posC[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
    return [posA, posB, posC];
  }

  function labelText(d) {
    const pos = outerArc.centroid(d);
    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
    pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
    return `translate(${pos})`;
  }

  function labelStyle(d) {
    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
    return midangle < Math.PI ? "start" : "end";
  }
</script>

<div class="chartwrapper" role="figure" tabindex="0">
  <svg {width} {height}>
    <title> Donut Chart showing percentage of deal stages</title>
    <g
      transform="translate({width / 2}, {height / 2.5})"
      role="list"
      tabindex="0"
      aria-label="Donut Chart"
    >
      {#each data_ready as d}
        <path
          role="listitem"
          tabindex="0"
          aria-label="{d.data[0]} was at {d.data[1]}%"
          d={arcs(d)}
          fill={color(d.data[1])}
          opacity="0.9"
        />
      {/each}
      {#each data_ready as d}
        <polyline
          stroke="#808080"
          fill="none"
          stroke-width="1"
          points={labels(d)}
        />
      {/each}
      <g role="presentation" aria-hidden="true">
        {#each data_ready as d}
          <text
            class="text"
            dx="-20"
            dy="-5"
            transform={labelText(d)}
            style="text-anchor={labelStyle(d)}"
          >
            {d.data[0]}
          </text>
        {/each}
      </g>
    </g>
  </svg>
</div>

<style>
  .text {
    font-family: var(--sans-serif);
    font-size: 0.75rem;
    font-weight: 600;
    fill: #808080;
    text-anchor: start;
  }
</style>
