export function stripHtml(html: string) {
  const parser = new DOMParser();
  const document = parser.parseFromString(html, "text/html");

  return (document.body.textContent ?? "")
    .replace("Read more on Last.fm", "")
    .trim();
}
