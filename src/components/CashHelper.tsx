import { useState } from "react"
import { cashHelperSuggest } from "../utils/currency"
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
    newAmount !== "" ? cashHelperSuggest(newAmount) : null

  return (
    <div className="page h-screen flex flex-col gap-15 pt-[10%] bg-[#eeeae1] text-[#1d4139]">

      {/* زر العودة */}
      <div className="flex flex-col justify-center items-start px-[10%]">
        <Button onClick={onBack} className="w-45 h-15 md:w-60 md:h-15 cursor-pointer bg-[#1d4139] text-[#eeeae1] hover:bg-[#1a332e]">
          <ChevronLeft className="hidden md:block" style={{ width: "32px", height: "32px" }} />
          <ChevronLeft className="block md:hidden" style={{ width: "22px", height: "22px" }} />
          <h1 className="text-[15px] md:text-[20px] font-[Harmony]">العودة إلى الرئيسية</h1>
        </Button>
      </div>

      {/* إدخال المبلغ */}
      <div className="flex flex-col gap-5 justify-center items-center">
        <h2 className="text-[30px] md:text-[50px] font-[HarmonyBold]">
          اقتراح أوراق الدفع
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

      {/* النتيجة */}
      {result && (
        <div className="px-[10%] w-full flex flex-col bg-[#eeeae1]">

          <h4 className="text-[20px] lg:text-[30px] font-[Harmony] mb-[5%] text-center">
            الأوراق المقترحة
          </h4>

          <NotesRow notes={result.notes} />

          <div className="flex flex-col gap-2">
            {result.remainingOld > 0 && (
              <p style={{ color: "orange" }}>
                <span className="font-[Harmony]">
                المتبقي بالعملة القديمة:
                </span>
                <strong>
                  <span className="font-[Konde]">
                    {formatNumber(result.remainingOld)}
                  </span>{" "}
                  ل.س
                </strong>
              </p>
            )}

            {result.adjustment && (
              <div className="text-center text-[12px] md:text-[16px] text-orange-700 font-[Harmony] leading-relaxed bg-[#eeeae1]">
                يوجد فرق ظاهري بسبب عدم توفر فئة 5 ليرات و 1 ليرة في العملة الجديدة
                <br />
                لإتمام المبلغ من الممكن دفع 25 وإرجاع 20 للحصول على 5 حالياً
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}



export default CashHelper
