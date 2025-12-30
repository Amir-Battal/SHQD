import { useState } from "react"
import { Button } from "./ui/button"
import { ChevronLeft } from "lucide-react"
import { Input } from "./ui/input"
import { normalizeNumberInput } from "../utils/numberInput"
import { convertNewToOld } from "../utils/currency"

interface Props {
  onBack: () => void
}

const NewToOldConverter = ({ onBack }: Props) => {
  const [newAmount, setNewAmount] = useState<number | "">("")

  const result =
    newAmount !== "" ? convertNewToOld(newAmount) : null

  return (
    <div className="page h-screen flex flex-col gap-15 pt-[10%] bg-[#eeeae1] text-[#1d4139]">
      <div className="px-[10%]">
        <Button onClick={onBack} className="w-45 h-15 md:w-60  md:h-15 cursor-pointer bg-[#1d4139] text-[#eeeae1] hover:bg-[#1a332e]">
          <ChevronLeft style={{ width: 32, height: 32 }} />
          <h1 className="text-[15px] md:text-[20px] font-[Harmony]">العودة إلى الرئيسية</h1>
        </Button>
      </div>

      <div className="flex flex-col gap-5 items-center">
        <h2 className="text-[20px] md:text-[40px] font-[HarmonyBold]">
          تحويل من العملة الجديدة إلى القديمة
        </h2>

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
        <p className="text-center text-[20px]">
          المبلغ بالعملة القديمة:
          <strong> {result.exactOld}</strong>
        </p>
      )}
    </div>
  )
}

export default NewToOldConverter
