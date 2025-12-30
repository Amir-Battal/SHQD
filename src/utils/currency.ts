export const NEW_NOTES = [500, 200, 100, 50, 25, 10] as const

export type Note = typeof NEW_NOTES[number]

export interface SuggestedNote {
  note: Note
  count: number
}

export interface ConvertResult {
  exactNew: number
  notes: SuggestedNote[]
  remaining: number
}

export interface CashSuggestResult {
  notes: SuggestedNote[]
  remaining: number
}


export const convertAndSuggest = (oldAmount: number): ConvertResult => {
  const exactNew = oldAmount / 100

  const payable = Math.floor(exactNew)
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
    exactNew,
    notes,
    remaining: exactNew - payable
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
