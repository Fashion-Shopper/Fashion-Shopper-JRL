export const compareById = (a, b) => {
  const bandA = a.id;
  const bandB = b.id;

  let comparison = 0;
  comparison = bandA > bandB ? 1 : -1;
  return comparison;
};
