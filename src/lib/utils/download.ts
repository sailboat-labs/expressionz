export async function downloadPfp(path: string, index: number) {
  const response = await fetch(path);
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `moonbird_${index}.webp`;
  link.click();
  URL.revokeObjectURL(url);
}
