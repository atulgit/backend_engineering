export function generateSKU(brand, name, color, size) {
  const brandCode = brand.toUpperCase().slice(0, 3);
  const nameCode = name.toUpperCase().replace(/\s+/g, '').slice(0, 3);
  const colorCode = color.toUpperCase().slice(0, 3);
  return `${brandCode}-${nameCode}-${colorCode}-${size}`;
}
