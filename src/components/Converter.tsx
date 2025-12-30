import { useState } from "react"
import { convertAndSuggest } from "../utils/currency"
import { Button } from "./ui/button"
import { ChevronLeft } from "lucide-react"
import { Input } from "./ui/input"
import { normalizeNumberInput } from "../utils/numberInput"

interface Props {
  onBack: () => void
}


const Converter = ({ onBack }: Props) => {
  const [oldAmount, setOldAmount] = useState<number | "">("")

  const result =
    oldAmount !== "" ? convertAndSuggest(oldAmount) : null


  return (
    <div className="page h-screen flex flex-col gap-15 pt-[10%] bg-[#eeeae1] text-[#1d4139]">
      <div className="flex flex-col justify-center items-start px-[10%]">
        <Button onClick={onBack} className="w-45 h-15 md:w-60 md:h-15 cursor-pointer bg-[#1d4139] text-[#eeeae1] hover:bg-[#1a332e]">
          <ChevronLeft className="hidden md:block" style={{ width: '32px', height: '32px' }} />
          <ChevronLeft className="block md:hidden" style={{ width: '22px', height: '22px' }} />
          <h1 className="text-[15px] md:text-[20px] font-[Harmony]">العودة إلى الرئيسية</h1>
        </Button>
      </div>

      <div className="flex flex-col gap-5 justify-center items-center">
        <h2 className="text-[30px] md:text-[50px] font-[HarmonyBold]">تحويل العملة</h2>

        <Input
          className="w-[80%] md:w-[70%] lg:w-[40%] h-15 border-[0.5px] border-[#1d4139] text-[#1d4139] placeholder:text-[#1d4139] text-center placeholder:font-[Harmony]"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="المبلغ بالعملة القديمة"
          value={oldAmount}
          onChange={(e) => {
            const normalized = normalizeNumberInput(e.target.value)
            setOldAmount(normalized === "" ? "" : Number(normalized))
          }}
        />
      </div>



      {result && (
        <>
          <p>
            المبلغ الجديد:
            <strong> {result.exactNew}</strong>
          </p>

          <h4>الأوراق المقترحة</h4>

          {result.notes.map(n => (
            <div key={n.note}>
              {n.note} × {n.count}
            </div>
          ))}

          {result.remaining > 0 && (
            <p style={{ color: "orange" }}>
              باقي غير قابل للدفع:
              <strong> {result.remaining}</strong>
            </p>
          )}
        </>
      )}
    </div>
  )
}

export default Converter
