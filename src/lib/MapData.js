async function loadData() {
  let res = await fetch(
    "https://unpkg.com/visionscarto-world-atlas/world/110m.json"
  );
  return res.json();
}

const data = await loadData();

export default data;
