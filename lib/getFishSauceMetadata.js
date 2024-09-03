export default async function getFishSauceMetaData(fishURIs) {
  let metas = [];
  for (let i = 0; i < fishURIs.length; i++) {
    const res = await fetch(fishURIs[i]);
    const meta = await res.json();
    metas.push(meta);
  }
  return metas;
}
