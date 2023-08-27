<div class="background">
  <div class="header" role="presentation" aria-hidden="true">
    <p class="index"><slot name="index" /></p>
    <p class="title"><slot name="title" /></p>
  </div>
  <div class="chartwrapper">
    <slot name="chart" />
  </div>
</div>

<style>
  p {
    margin: 0;
    font-size: 12px;
    font-weight: 600;
  }
  .background {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    border: 2px solid var(--peach);
    border-radius: 8px;
    height: 400px;
    position: relative;
  }

  .header {
    display: flex;
    flex-direction: row;
    column-gap: 0.5rem;
    margin-left: 1rem;
    margin-top: -0.8rem;
  }

  .header .index {
    border: 1px solid var(--mako);
    border-radius: 2px;
    padding: 2px 8px;
    background: var(--shaft);
  }

  .header .title {
    border: 1px solid var(--peach);
    border-radius: 2px;
    padding: 3px;
    background: var(--sun);
  }
  .chartwrapper {
    margin: 2rem;
    text-align: center;
    overflow: hidden;
  }
</style>
