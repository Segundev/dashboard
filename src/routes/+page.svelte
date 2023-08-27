<script>
  import ChartContainer from "../lib/chartContainer.svelte";
  import ChildA from "../lib/ChildA.svelte";
  import "../style.css";
  import Barchart from "./Barchart.svelte";
  import Countries from "./Countries.svelte";
  import Donutchart from "./Donutchart.svelte";
  import Investors from "./Investors.svelte";
  import Stackedbarchart from "./Stackedbarchart.svelte";
  import Treemap from "./Treemap.svelte";
</script>

<div class="container">
  <header tabindex="0" role="heading">
    <h1 class="heading">FUNDING FLOWS INTO AFRICA’S STARTUPS IN JULY 2023</h1>
  </header>
  <section
    tabindex="0"
    role="columnheader"
    aria-label="Summary of deals from January to June"
    class="subheader border"
  >
    <div class="metricsWrapper border">
      <div
        class="metrics"
        tabindex="0"
        aria-label="total volume of funding in July 2023 was 140 million dollars"
      >
        <h2>$140M+</h2>
        <p>total volume of funding in July 2023</p>
      </div>
      <div
        class="metrics"
        tabindex="0"
        aria-label="total volume of funding in 2023 was 1.9 billion dollars"
      >
        <h2>$1.9B+</h2>
        <p>total volume of funding in 2023</p>
      </div>
      <div
        class="metrics"
        tabindex="0"
        aria-label="Over 40+ deals in July 2023"
      >
        <h2>40+</h2>
        <p>deals in July 2023</p>
      </div>
      <div class="metrics" tabindex="0" aria-label="Over 130+ deals in 2023">
        <h2>130+</h2>
        <p>deals in 2023</p>
      </div>
    </div>
    <div
      class="subtext"
      tabindex="0"
      aria-label="Data Disclaimer you should take note of"
    >
      <p tabindex="0">
        *Data Disclaimer: Only disclosed deals are included and it excludes two
        mega deals from foreign-domiciled companies with global operations
        including Africa: Zipline’s $330m Series F round and Terrapay’s $100m
        Series B round. The size of these deals in proportion to the total
        volume of funding raised by startups domiciled in Africa or with primary
        operation in Africa is shown in Chart 1.
      </p>
      <p tabindex="0">
        ** Data Disclaimer: Mergers and acquisitions are no longer included in
        the funding flows. They are included in a separate M&A tracker
      </p>
    </div>
  </section>
  <div
    class="chartwrapper"
    tabindex="0"
    role="main"
    aria-label="List Infographics that summarises the deals "
  >
    <ChartContainer>
      <svelte:fragment slot="index">1</svelte:fragment>
      <svelte:fragment slot="title">Deal activity (Jan - July)</svelte:fragment>
      <Stackedbarchart slot="chart" />
    </ChartContainer>
    <ChartContainer>
      <svelte:fragment slot="index">2</svelte:fragment>
      <svelte:fragment slot="title">Key recipient countries</svelte:fragment>
      <Countries slot="chart" />
    </ChartContainer>
    <ChartContainer>
      <svelte:fragment slot="index">3</svelte:fragment>
      <svelte:fragment slot="title">Most funded companies</svelte:fragment>
      <Barchart slot="chart" />
    </ChartContainer>
    <ChartContainer>
      <svelte:fragment slot="index">4</svelte:fragment>
      <svelte:fragment slot="title">Sector breakdown</svelte:fragment>
      <Treemap slot="chart" />
    </ChartContainer>
    <ChartContainer>
      <svelte:fragment slot="index">5</svelte:fragment>
      <svelte:fragment slot="title">Deal stages</svelte:fragment>
      <Donutchart slot="chart" />
    </ChartContainer>
    <ChartContainer>
      <svelte:fragment slot="index">6</svelte:fragment>
      <svelte:fragment slot="title">Most active investors</svelte:fragment>
      <Investors slot="chart" />
    </ChartContainer>
  </div>
  <div class="logo">
    <img src="BIntelligence.jpg" alt="" />
  </div>
</div>

<style>
  .container {
    width: 100%;
    margin: 0 auto;
    max-width: 1000px;
    padding: 0 2rem;
  }
  header,
  .heading {
    text-align: center;
    font-size: 2rem;
    font-weight: 900;
    margin: 1rem;
  }

  .border {
    border: 3px solid var(--mako);
    border-radius: 1rem;
  }

  .subheader {
    width: 800px;
    margin: 0 auto;
  }

  .metricsWrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background: var(--sun);
    margin-top: 1.5rem;
    width: 900px;
    margin-left: -3rem;
  }

  .metrics h2 {
    font-family: var(--sans-serif);
    font-size: 2rem;
    font-weight: bold;
  }

  .metrics p {
    font-size: 12px;
    color: var(--cerise);
  }

  .subtext {
    font-size: 10px;
    line-height: 135%;
    padding: 5px;
  }

  .chartwrapper {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
  }

  .logo img {
    width: 35%;
    max-width: 35%;
  }

  @media (width<980px) {
    .container {
      padding: 0 1.2rem;
    }

    .heading {
      font-size: 1.5rem;
    }
    .chartwrapper {
      display: flex;
      flex-direction: column;
    }

    .subheader {
      width: 80%;
      margin: 0 auto;
    }

    .metricsWrapper {
      width: 120%;
      margin-left: -3rem;
    }

    .metrics h2 {
      font-size: 1.5rem;
    }

    .metrics p {
      line-height: 120%;
      font-size: 0.9rem;
    }
  }
</style>
