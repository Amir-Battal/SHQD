export const NEW_NOTES = [500, 200, 100, 50, 25, 10] as const

export type Note = typeof NEW_NOTES[number]

export interface SuggestedNote {
  note: Note
  count: number
}

export interface ConvertResult {
  exactNew: number
  paidNotes: SuggestedNote[]
  paidTotal: number
  change: number
}

export interface CashSuggestResult {
  notes: SuggestedNote[]
  remaining: number
}

export const convertAndSuggest = (oldAmount: number): ConvertResult => {
  const exactNew = oldAmount / 100

  // نبحث عن أقل مبلغ يمكن دفعه ≥ المبلغ المطلوب
  let target = Math.ceil(exactNew / 10) * 10

  let remaining = target
  const paidNotes: SuggestedNote[] = []

  for (const note of NEW_NOTES) {
    const count = Math.floor(remaining / note)
    if (count > 0) {
      paidNotes.push({ note, count })
      remaining -= note * count
    }
  }

  return {
    exactNew,
    paidNotes,
    paidTotal: target,
    change: target - exactNew
  }
}


export const suggestNotesForNewAmount = (
  amount: number
): CashSuggestResult => {
  let remaining = amount
  const notes: SuggestedNote[] = []

  for (const note of NEW_NOTES) {
    const count = Math.floor(remaining / note)
    if (count > 0) {
      notes.push({ note, count })
      remaining -= note * count
    }
  }

  return { notes, remaining }
}