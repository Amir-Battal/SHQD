import { ArrowLeftRight, BanknoteArrowUpIcon } from "lucide-react"
import { Button } from "./ui/button"
import Logo from "@/assets/Logo"


interface Props {
  onSelect: (mode: "convert" | "cash" | "newToOld") => void,
  onLogoClick: () => void
}


const Home = ({ onSelect, onLogoClick }: Props) => {
  return (
    <div className="page h-screen flex flex-col gap-10 items-center justify-between py-[10%] md:pt-[10%] bg-[#eeeae1] text-[#1d4139]">
      <h2 className="text-[50px] font-[HarmonyBold]">اختر العملية</h2>

      <div className="flex flex-col gap-5 items-center font-[Harmony]">
        <Button onClick={() => onSelect("convert")} className="w-80 md:w-100 h-15 cursor-pointer bg-[#1d4139] text-[#eeeae1] hover:bg-[#1a332e]">
          <ArrowLeftRight className="hidden md:block" style={{ width: '32px', height: '32px' }} />
          <ArrowLeftRight className="block md:hidden" style={{ width: '22px', height: '22px' }} />
          <h1 className="text-[15px] md:text-[20px]">تحويل من العملة القديمة إلى الجديدة</h1>
        </Button>

        <Button onClick={() => onSelect("newToOld")} className="w-80 md:w-100 h-15 cursor-pointer bg-[#1d4139] text-[#eeeae1] hover:bg-[#1a332e]">
          <ArrowLeftRight className="hidden md:block" style={{ width: 32, height: 32 }} />
          <ArrowLeftRight className="block md:hidden" style={{ width: 22, height: 22 }} />
          <h1 className="text-[15px] md:text-[20px]">
            تحويل من العملة الجديدة إلى القديمة
          </h1>
        </Button>

        <Button onClick={() => onSelect("cash")} className="w-60 h-15 cursor-pointer bg-[#1d4139] text-[#eeeae1] hover:bg-[#1a332e]">
          <BanknoteArrowUpIcon className="hidden md:block" style={{ width: '32px', height: '32px' }} />
          <BanknoteArrowUpIcon className="block md:hidden" style={{ width: '22px', height: '22px' }} />
          <h1 className="text-[15px] md:text-[20px]">اقتراح أوراق الدفع</h1>
        </Button>

      </div>

      <Logo onClick={onLogoClick} size="fill-black w-[18%] md:w-[12%] lg:w-[8%] cursor-pointer" />
    </div>
  )
}

export default Home
