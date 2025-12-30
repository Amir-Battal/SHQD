import { useState } from "react"
import { suggestNotesForNewAmount } from "../utils/currency"
import { Button } from "./ui/button"
import { ChevronLeft } from "lucide-react"
import { normalizeNumberInput } from "../utils/numberInput"
import { Input } from "./ui/input"

interface Props {
  onBack: () => void
}

const CashHelper = ({ onBack }: Props) => {
  const [newAmount, setNewAmount] = useState<number | "">("")

  const result =
    newAmount !== "" ? suggestNotesForNewAmount(newAmount) : null

  return (
    <div className="page h-screen flex flex-col gap-15 pt-[10%]">

      <div className="flex flex-col justify-center items-start px-[10%]">
        <Button onClick={onBack} className="w-45 h-15 md:w-60 md:h-15 cursor-pointer">
          <ChevronLeft className="hidden md:block" style={{ width: "32px", height: "32px" }} />
          <ChevronLeft className="block md:hidden" style={{ width: "22px", height: "22px" }} />
          <h1 className="text-[15px] md:text-[20px]">العودة إلى الرئيسية</h1>
        </Button>
      </div>

      <div className="flex flex-col gap-5 justify-center items-center">
        <h2 className="text-[30px] md:text-[50px]">اقتراح أوراق الدفع</h2>

        <Input
          className="w-[80%] md:w-[70%] lg:w-[40%] h-15"
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
        <>
          <h4>الأوراق المقترحة</h4>

          {result.notes.length === 0 && (
            <p>لا توجد أوراق مناسبة</p>
          )}

          {result.notes.map(n => (
            <div key={n.note}>
              {n.note} × {n.count}
            </div>
          ))}

          {result.remaining > 0 && (
            <p style={{ color: "red" }}>
              مبلغ غير قابل للتجزئة:
              <strong> {result.remaining}</strong>
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default CashHelper
