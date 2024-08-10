export default function tag(text: string, tags: Record<string, any>): string {
  return text.replace(
    /\{(?<tag>\w+)\}/gm,
    (_match: string, tag: string) => tags[tag] || "N/A"
  );
}
