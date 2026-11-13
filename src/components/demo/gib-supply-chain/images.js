const shots = import.meta.glob('../../../assets/demo/gib-supply-chain/shots/*.png', { eager: true, import: 'default' });
export function shot(name) {
  const hit = Object.entries(shots).find(([path]) => path.endsWith(`/${name}`));
  if (!hit) throw new Error(`Missing screenshot: ${name}`);
  return hit[1];
}
