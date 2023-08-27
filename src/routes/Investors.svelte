<script>
  let images = [
    "absa.png",
    "alter semper.png",
    "altree.png",
    "beyond capital.png",
    "dfc.png",
    "E3.png",
    "finnfund.png",
    "five ventures.png",
    "gaia.png",
    "get invest.png",
    "IFC-Logo.svg",
    "Joseph.png",
    "knife.png",
    "orange.jpg",
    "proparco.jpg",
    "REPP.png",
    "sango.jpg",
    "schmidt.png",
    "smartafrica.png",
    "tlcom.png",
    "vested.png",
    "voltalia.jpg",
    "wti.png",
  ];

  function getImages(image) {
    return `/logo/${image}`;
  }
</script>

<div
  class="wrapper"
  role="list"
  tabindex="0"
  aria-label="List of active investors"
>
  {#each images as image}
    <div
      class="image"
      role="listitem"
      tabindex="0"
      aria-label={image.slice(0, image.length - 4)}
    >
      <img src={getImages(image)} />
    </div>
  {/each}
</div>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 1rem;
  }

  img {
    width: 100%;
    max-width: 100%;
  }
</style>
