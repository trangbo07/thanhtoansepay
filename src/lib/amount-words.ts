/** Đọc số tiền thành chữ (tiếng Việt) cho hóa đơn */
export function amountInWords(n: number): string {
  if (n <= 0) return "Không";
  const units = ["", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
  const scales = ["", "nghìn", "triệu", "tỷ"];

  function readTriple(num: number, showZeroHundred: boolean): string {
    const h = Math.floor(num / 100);
    const t = Math.floor((num % 100) / 10);
    const u = num % 10;
    let s = "";
    if (h > 0) s += `${units[h]} trăm `;
    else if (showZeroHundred) s += "không trăm ";
    if (t > 1) s += `${units[t]} mươi `;
    else if (t === 1) s += "mười ";
    else if (t === 0 && u > 0 && (h > 0 || showZeroHundred)) s += "lẻ ";
    if (t === 1 && u === 5) s += "lăm ";
    else if (u > 0) s += `${units[u]} `;
    return s.trim();
  }

  let remaining = n;
  let scaleIdx = 0;
  const parts: string[] = [];

  while (remaining > 0) {
    const chunk = remaining % 1000;
    if (chunk > 0) {
      const text = readTriple(chunk, remaining >= 1000);
      parts.unshift(`${text} ${scales[scaleIdx]}`.trim());
    }
    remaining = Math.floor(remaining / 1000);
    scaleIdx += 1;
  }

  const result = parts.join(" ").replace(/\s+/g, " ").trim();
  return result.charAt(0).toUpperCase() + result.slice(1);
}
