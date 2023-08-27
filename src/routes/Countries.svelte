<script>
  import world from "../lib/MapData.js";
  import * as topojson from "topojson-client";
  import * as topojsonServer from "topojson-server";
  import { geoCentroid, geoPath } from "d3-geo";
  import { geoChamberlinAfrica } from "d3-geo-projection";
  import { scaleOrdinal } from "d3-scale";

  let width = 400;
  let height = 600;

  topojson.merge(world, world.objects.countries.geometries);
  let africanCountries = topojson
    .feature(world, world.objects.countries)
    .features.filter((d) => {
      const c = geoCentroid(d);
      return c[0] > -20 && c[0] < 47 && c[1] < 34.5 && c[0] + c[1] < 60;
    });

  let Africa0 = topojsonServer.topology({
    countries: { type: "FeatureCollection", features: africanCountries },
  });
  let countries = [
    "Morocco",
    "Tunisia",
    "Egypt",
    "Somalia",
    "Kenya",
    "Dem. Rep. Congo",
    "Nigeria",
    "Zambia",
    "Namibia",
    "Tanzania",
    "Botswana",
    "South Africa",
  ];

  let colorScale = scaleOrdinal()
    .domain(countries)
    .range([
      "#fff5da",
      "#fef6df",
      "#fceec9",
      "#fef6df",
      "#c8a388",
      "#d4b28f",
      "#d4b28f",
      "#fef0cd",
      "#fef6df",
      "#fef6df",
      "#fef6df",
      "#fef6df",
    ]);

  let Africa = topojson.merge(Africa0, Africa0.objects.countries.geometries);

  $: projection = geoChamberlinAfrica()
    .fitExtent(
      [
        [50, 50],
        [width - 50, height - 50],
      ],
      Africa
    )
    .clipExtent([
      [-2, -2],
      [width + 2, height + 2],
    ]);

  $: path = geoPath(projection);
  console.log(africanCountries[0]);
</script>

<div bind:clientWidth={width} role="figure" tabindex="0">
  <svg {width} {height} g transform="translate(0, -140)">
    <title> Map of Africa showing key recipient countries </title>
    <g id="all">
      <path
        id="land"
        fill="#fcfcfc"
        stroke="none"
        d={path(topojson.feature(world, world.objects.land))}
      />
      <path
        id="borders-all"
        fill="none"
        stroke="#eee"
        d={path(
          topojson.mesh(world, world.objects.countries, (a, b) => a !== b)
        )}
      />
      <path
        id="shore-all"
        fill="none"
        stroke="#ddd"
        d={path(topojson.feature(world, world.objects.land))}
      />
    </g>
    <g id="africa">
      <g id="countries-africa">
        {#each africanCountries as country}
          <path
            fill={countries.includes(country.properties.name)
              ? colorScale(country.properties.name)
              : "#d9d9d9"}
            stroke="none"
            d={path(country)}
          />
        {/each}
        <path
          id="borders-africa"
          fill="none"
          stroke="none"
          d={path(
            topojson.mesh(Africa0, Africa0.objects.countries, (a, b) => a !== b)
          )}
        />
        <path id="shore-africa" fill="none" stroke="#ddd" d={path(Africa)} />
      </g>
    </g>
  </svg>
</div>
