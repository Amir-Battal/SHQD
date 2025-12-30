export const NEW_NOTES = [500, 200, 100, 50, 25, 10] as const

export type Note = typeof NEW_NOTES[number]

export interface SuggestedNote {
  note: Note
  count: number
}

export interface AdjustmentInfo {
  needed: number      // الفرق (مثلاً 5)
  pay: number         // ما سيدفع (25)
  change: number      // ما سيُرجع (20)
}


export interface ConvertResult {
  exactNew: number
  notes: SuggestedNote[]
  remaining: number
  adjustment?: AdjustmentInfo
}


export interface CashSuggestResult {
  notes: SuggestedNote[]
  remaining: number
}

export interface NewToOldResult {
  exactOld: number
}


export const convertAndSuggest = (oldAmount: number): ConvertResult => {
  const exactNew = oldAmount / 100

  // أقصى مبلغ يمكن تكوينه بالأوراق المتوفرة
  const payable = Math.floor(exactNew / 25) * 25

  let remainingToPay = payable
  const notes: SuggestedNote[] = []

  for (const note of NEW_NOTES) {
    const count = Math.floor(remainingToPay / note)
    if (count > 0) {
      notes.push({ note, count })
      remainingToPay -= note * count
    }
  }

  const diff = exactNew - payable

  let adjustment: AdjustmentInfo | undefined

  // حالة الفرق = 5 (لا توجد فئة 5)
  if (diff === 5) {
    adjustment = {
      needed: 5,
      pay: 25,
      change: 20
    }
  }

  return {
    exactNew,
    notes,
    remaining: diff * 100,
    adjustment
  }
}



export const suggestNotesForNewAmount = (
  amount: number
): CashSuggestResult => {

  // الجزء القابل للدفع (مضاعفات 10 فقط)
  const payable = Math.floor(amount / 10) * 10

  let remainingToPay = payable
  const notes: SuggestedNote[] = []

  for (const note of NEW_NOTES) {
    const count = Math.floor(remainingToPay / note)
    if (count > 0) {
      notes.push({ note, count })
      remainingToPay -= note * count
    }
  }

  return {
    notes,
    remaining: amount - payable
  }
}


export const convertNewToOld = (newAmount: number): NewToOldResult => {
  return {
    exactOld: newAmount * 100
  }
}