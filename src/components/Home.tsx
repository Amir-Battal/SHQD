import { ArrowLeftRight, BanknoteArrowUpIcon } from "lucide-react"
import { Button } from "./ui/button"

interface Props {
  onSelect: (mode: "convert" | "cash") => void
}

const Home = ({ onSelect }: Props) => {
  return (
    <div className="page h-screen flex flex-col gap-20 items-center justify-center">
      <h2 className="text-[50px]">اختر العملية</h2>

      <div className="flex flex-col gap-5 items-center">
        <Button onClick={() => onSelect("convert")} className="w-100 h-15 cursor-pointer">
          <ArrowLeftRight style={{ width: '32px', height: '32px' }} />
          <h1 className="text-[20px]">تحويل من العملة القديمة إلى الجديدة</h1>
        </Button>

        <Button onClick={() => onSelect("cash")} className="w-60 h-15 cursor-pointer">
          <BanknoteArrowUpIcon style={{ width: '32px', height: '32px' }} />
          <h1 className="text-[20px]">اقتراح أوراق الدفع</h1>
          
        </Button>
      </div>
    </div>
  )
}

export default Home
