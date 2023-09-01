<script>
  import data from "../lib/TreemapData.js";
  import { stratify } from "d3-hierarchy";
  import { treemap } from "d3-hierarchy";
  import { scaleOrdinal } from "d3-scale";

  let width = 350;
  let height = 350;
  const margin = { top: 20, right: 20, bottom: 20, left: 20 };

  let innerHeight = height - margin.top - margin.bottom;
  $: innerWidth = width - margin.right - margin.left;

  const color = scaleOrdinal()
    .domain(["Cleantech", "Health", "Femtech", "Fintech", "Big data analytics"])
    .range(["#CBB092", "#EFD7AC", "#FBEDCA", "#F5F1E5", "#AAA184"]);

  let root = stratify()
    .id((d) => d.name)
    .parentId((d) => d.parent)(data);
  root.sum((d) => +d.value);

  $: root = treemap()
    .size([innerWidth + margin.left + margin.right, innerHeight])
    .padding(2)(root);

  console.log(root.leaves()[1], "treemap");
</script>

<div class="chartWrapper" bind:clientWidth={width} role="figure" tabindex="0">
  <svg {width} {height} transform="translate({margin.left}, {0})">
    <title> Treemap showing Sector breakdown</title>
    <g role="list" tabindex="0" aria-label="Tree map">
      {#each root.leaves() as d}
        <rect
          role="listitem"
          tabindex="0"
          aria-label="{d.data.name} sector made up {d.data.value}%"
          x={d.x0}
          y={d.y0}
          width={d.x1 - d.x0}
          height={d.y1 - d.y0}
          fill={color(d.id)}
        />
      {/each}
    </g>

    <g role="presentation" aria-hidden="true">
      {#each root.leaves() as d}
        <text class="text" x={d.x0 + 15} y={d.y0 + 30}> {d.data.name} </text>
      {/each}
    </g>
  </svg>
</div>

<style>
  .text {
    font-size: 0.75rem;
    font-weight: 400;
    fill: #1d1d1d;
    text-anchor: start;
  }
</style>
