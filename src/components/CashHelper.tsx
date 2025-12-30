import { useState } from "react"
import { suggestNotesForNewAmount } from "../utils/currency"
import { Button } from "./ui/button"
import { ChevronLeft } from "lucide-react"
import { normalizeNumberInput } from "../utils/numberInput"
import { Input } from "./ui/input"
import NotesRow from "./NotesRow"
import { formatNumber } from "@/utils/formatNumber"

interface Props {
  onBack: () => void
}

const CashHelper = ({ onBack }: Props) => {
  const [newAmount, setNewAmount] = useState<number | "">("")

  const result =
    newAmount !== "" ? suggestNotesForNewAmount(newAmount) : null

  return (
    <div className="page h-screen flex flex-col gap-15 pt-[10%] bg-[#eeeae1] text-[#1d4139]">

      <div className="flex flex-col justify-center items-start px-[10%]">
        <Button onClick={onBack} className="w-45 h-15 md:w-60 md:h-15 cursor-pointer bg-[#1d4139] text-[#eeeae1] hover:bg-[#1a332e]">
          <ChevronLeft className="hidden md:block" style={{ width: "32px", height: "32px" }} />
          <ChevronLeft className="block md:hidden" style={{ width: "22px", height: "22px" }} />
          <h1 className="text-[15px] md:text-[20px] font-[Harmony]">العودة إلى الرئيسية</h1>
        </Button>
      </div>

      <div className="flex flex-col gap-5 justify-center items-center">
        <h2 className="text-[30px] md:text-[50px] font-[HarmonyBold]">اقتراح أوراق الدفع</h2>

        <Input
          className="w-[80%] md:w-[70%] lg:w-[40%] h-15 border-[0.5px] border-[#1d4139] text-[#1d4139] placeholder:text-[#1d4139] text-center placeholder:font-[Harmony]"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="المبلغ بالعملة الجديدة"
          value={newAmount}
          onChange={(e) => {
            const normalized = normalizeNumberInput(e.target.value)
            setNewAmount(normalized === "" ? "" : Number(normalized))
          }}
        />
      </div>

      {result && (
        <div className="px-[10%] w-full flex flex-col">
          <h4 className="text-[20px] lg:text-[30px] font-[Harmony] mb-[5%] flex justify-center">الأوراق المقترحة</h4>

          {result.notes.length === 0 && (
            <p>لا توجد أوراق مناسبة</p>
          )}

          <NotesRow notes={result.notes} />

          {result.remaining > 0 && (
            <p style={{ color: "orange" }}>
              المتبقي بالعملة القديمة:
              <strong>
                <span className="font-[Konde]">
                  {formatNumber(result.remaining * 100)}
                </span>
                <span className="font-[Harmony]"> ل.س</span>
              </strong>
            </p>
          )}
          
        </div>
      )}
    </div>
  )
}

export default CashHelper
