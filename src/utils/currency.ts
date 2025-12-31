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


// دالة لتحويل العملة القديمة إلى العملة الجديدة واختيار أفضل توزيع
export const convertAndSuggest = (oldAmount: number): ConvertResult => {
  const exactNew = Math.floor(oldAmount / 100)
  const remainingOld = oldAmount % 100

  const notes = greedySuggest(exactNew)

  const usedNew = notes.reduce(
    (sum, n) => sum + n.note * n.count,
    0
  )

  const remainingNew = exactNew - usedNew

  return {
    exactNew,
    notes,
    remaining: remainingNew * 100 + remainingOld,
    adjustment:
      remainingNew > 0
        ? { reason: "لا يمكن تمثيل المبلغ كاملًا بفئات العملة الجديدة" }
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

