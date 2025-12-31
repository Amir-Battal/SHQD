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


function findBestCombination(amount: number): SuggestedNote[] | null {
  const dp: Array<SuggestedNote[] | null> = Array(amount + 1).fill(null)
  dp[0] = []

  for (let i = 1; i <= amount; i++) {
    let best: SuggestedNote[] | null = null

    for (const note of NEW_NOTES) {
      if (i - note < 0) continue
      const prev = dp[i - note]
      if (!prev) continue

      const candidate = structuredClone(prev)
      const found = candidate.find(n => n.note === note)
      if (found) found.count++
      else candidate.push({ note, count: 1 })

      // تقييم الأفضل
      if (
        !best ||
        totalCount(candidate) < totalCount(best) ||
        (
          totalCount(candidate) === totalCount(best) &&
          totalValue(candidate) > totalValue(best)
        )
      ) {
        best = candidate
      }
    }

    dp[i] = best
  }

  return dp[amount]
}

const totalCount = (notes: SuggestedNote[]) =>
  notes.reduce((s, n) => s + n.count, 0)

const totalValue = (notes: SuggestedNote[]) =>
  notes.reduce((s, n) => s + n.note * n.count, 0)


// دالة لتحويل العملة القديمة إلى العملة الجديدة واختيار أفضل توزيع
export const convertAndSuggest = (oldAmount: number): ConvertResult => {
  const exactNew = Math.floor(oldAmount / 100)

  // جرّب المبلغ كامل
  const full = findBestCombination(exactNew)
  if (full) {
    return {
      exactNew,
      notes: full,
      remaining: oldAmount % 100
    }
  }

  // إن لم يوجد حل كامل → جرّب أقل مبلغ ممكن
  for (let i = exactNew - 1; i >= 0; i--) {
    const combo = findBestCombination(i)
    if (combo) {
      return {
        exactNew,
        notes: combo,
        remaining: (exactNew - i) * 100 + (oldAmount % 100),
        adjustment: {
          reason: "لا يمكن دفع المبلغ كاملًا بالعملة الجديدة"
        }
      }
    }
  }

  // لا شيء ممكن
  return {
    exactNew,
    notes: [],
    remaining: oldAmount,
    adjustment: {
      reason: "لا يمكن استخدام العملة الجديدة لهذا المبلغ"
    }
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

  // جرّب دفع المبلغ كاملًا
  const full = findBestCombination(exactNew)
  if (full) {
    return {
      exactNew,
      notes: full,
      remainingOld: 0
    }
  }

  // جرّب أقل مبلغ ممكن
  for (let i = exactNew - 1; i >= 0; i--) {
    const combo = findBestCombination(i)
    if (combo) {
      return {
        exactNew,
        notes: combo,
        remainingOld: (exactNew - i) * 100,
        adjustment: {
          reason: "لا يمكن دفع المبلغ كاملًا بالعملة الجديدة"
        }
      }
    }
  }

  // لا حل
  return {
    exactNew,
    notes: [],
    remainingOld: exactNew * 100,
    adjustment: {
      reason: "لا يمكن الدفع بالعملة الجديدة"
    }
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

