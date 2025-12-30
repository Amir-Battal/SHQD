import { NOTE_ICONS } from "../utils/noteIcons"
import { NEW_NOTES, type SuggestedNote } from "../utils/currency"

interface Props {
  notes: SuggestedNote[]
}

const NotesRow = ({ notes }: Props) => {
  return (
    <div className="flex justify-center gap-6 flex-wrap">
      {NEW_NOTES.map(noteValue => {
        const found = notes.find(n => n.note === noteValue)
        const Icon = NOTE_ICONS[noteValue]

        if (!found) {
          // مكان محجوز لكن مخفي
          return (
            <div key={noteValue} className="w-24 md:w-28 opacity-0">
              <Icon />
            </div>
          )
        }

        return (
          <div
            key={noteValue}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-24 md:w-28">
              <Icon />
            </div>

            <div className="font-[Konde] text-[18px]">
              {found.count} × {noteValue}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default NotesRow
