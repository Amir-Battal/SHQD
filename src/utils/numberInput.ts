const arabicToEnglishDigits: Record<string, string> = {
  "٠": "0",
  "١": "1",
  "٢": "2",
  "٣": "3",
  "٤": "4",
  "٥": "5",
  "٦": "6",
  "٧": "7",
  "٨": "8",
  "٩": "9",
}

export const normalizeNumberInput = (value: string): string => {
  return value
    .replace(/[٠-٩]/g, d => arabicToEnglishDigits[d])
    .replace(/\D/g, "")
}
