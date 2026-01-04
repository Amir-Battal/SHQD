// فئات العملة الجديدة والقديمة
export const NEW_NOTES = [500, 200, 100, 50, 25, 10] as const; // فئات العملة الجديدة
export const OLD_NOTES = [5000, 2000, 1000, 500] as const; // فئات العملة القديمة

export type Note = typeof NEW_NOTES[number] | typeof OLD_NOTES[number];

// واجهة لتخزين النتيجة المقترحة
export interface SuggestedNote {
  note: Note;
  count: number;
}

// واجهة لتخزين معلومات التعديل مثل الفارق في العملة القديمة أو الجديدة
export interface AdjustmentInfo {
  needed: number;   // الفرق بالعملة الجديدة
  pay?: number;     // ما سيدفع (جديد)
  change?: number;  // ما يُرجع (جديد)
  oldEquivalent?: number; // ما يُدفع بالعملة القديمة
  reason: string;
}

// واجهة لتخزين نتيجة التحويل
export interface ConvertResult {
  exactNew: number; // المبلغ المحول إلى العملة الجديدة
  notes: SuggestedNote[]; // الفئات المقترحة
  remaining: number; // المبلغ المتبقي بالعملة القديمة
  adjustment?: {
    reason: string;
  }; // معلومات التعديل إذا لزم الأمر
}



function greedySuggest(amount: number): SuggestedNote[] {
  const notes: SuggestedNote[] = []
  let remaining = amount

  for (const note of NEW_NOTES) {
    if (remaining >= note) {
      const count = Math.floor(remaining / note)
      notes.push({ note, count })
      remaining -= note * count
    }
  }

  return notes
}

function bestSuggest(amount: number): {
  notes: SuggestedNote[]
  remainingNew: number
} {
  let best: {
    notes: SuggestedNote[]
    remainingNew: number
  } | null = null

  for (let c50 = Math.floor(amount / 50); c50 >= 0; c50--) {
    for (let c25 = Math.floor((amount - c50 * 50) / 25); c25 >= 0; c25--) {
      const used = c50 * 50 + c25 * 25
      if (used > amount) continue

      const rest = amount - used
      const c10 = Math.floor(rest / 10)
      const remainingNew = rest - c10 * 10

      const notes: SuggestedNote[] = []
      if (c50) notes.push({ note: 50, count: c50 })
      if (c25) notes.push({ note: 25, count: c25 })
      if (c10) notes.push({ note: 10, count: c10 })

      if (
        !best ||
        remainingNew < best.remainingNew ||
        (remainingNew === best.remainingNew &&
          notes.reduce((s, n) => s + n.count, 0) <
            best.notes.reduce((s, n) => s + n.count, 0))
      ) {
        best = { notes, remainingNew }
      }
    }
  }

  return best ?? { notes: [], remainingNew: amount }
}



function greedyBig(amount: number): SuggestedNote[] {
  const BIG_NOTES = [500, 200, 100] as const
  const notes: SuggestedNote[] = []
  let remaining = amount

  for (const note of BIG_NOTES) {
    if (remaining >= note) {
      const count = Math.floor(remaining / note)
      if (count > 0) {
        notes.push({ note, count })
        remaining -= note * count
      }
    }
  }

  return notes
}



const SMART_LIMIT_OLD = 10000 // الحد الذي نستخدم تحته الآلية الذكية

function mergeNotes(a: SuggestedNote[], b: SuggestedNote[]): SuggestedNote[] {
  const map = new Map<number, number>()

  for (const n of [...a, ...b]) {
    map.set(n.note, (map.get(n.note) ?? 0) + n.count)
  }

  return Array.from(map.entries())
    .map(([note, count]) => ({ note: note as Note, count }))
    .sort((a, b) => b.note - a.note)
}



export const convertAndSuggest = (oldAmount: number): ConvertResult => {
  const exactNew = Math.floor(oldAmount / 100)
  const remainingOld = oldAmount % 100

  const useBig = oldAmount >= SMART_LIMIT_OLD

  const bigPart = useBig
    ? exactNew - (exactNew % 100)
    : 0

  const restPart = exactNew - bigPart

  const bigNotes = bigPart > 0 ? greedyBig(bigPart) : []

  const smallResult =
    restPart > 0
      ? bestSuggest(restPart)
      : { notes: [], remainingNew: 0 }

  const notes = mergeNotes(bigNotes, smallResult.notes)

  const remaining =
    smallResult.remainingNew * 100 + remainingOld

  return {
    exactNew,
    notes,
    remaining,
    adjustment:
      remaining > 0
        ? { reason: "تم استخدام الفئات الكبيرة مع معالجة ذكية لمرتبة الألف" }
        : undefined
  }
}






export interface CashHelperResult {
  exactNew: number
  notes: SuggestedNote[]
  remainingOld: number
  adjustment?: {
    reason: string
  }
}


export const cashHelperSuggest = (newAmount: number): CashHelperResult => {
  const exactNew = Math.floor(newAmount)
  const notes = greedySuggest(exactNew)

  const used = notes.reduce(
    (sum, n) => sum + n.note * n.count,
    0
  )

  const remainingNew = exactNew - used

  return {
    exactNew,
    notes,
    remainingOld: remainingNew * 100,
    adjustment:
      remainingNew > 0
        ? { reason: "لا يمكن دفع المبلغ كاملًا بالعملة الجديدة" }
        : undefined
  }
}



export interface NewToOldResult {
  exactOld: number
}

// دالة لتحويل المبلغ من العملة الجديدة إلى العملة القديمة
export const convertNewToOld = (newAmount: number): NewToOldResult => {
  return {
    exactOld: newAmount * 100, // ضرب العملة الجديدة في 100 للحصول على المبلغ بالعملة القديمة
  };
};

