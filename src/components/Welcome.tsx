import Logo from "@/assets/Logo"
import { Button } from "./ui/button"

interface Props {
  onStart: () => void
}

const Welcome = ({ onStart }: Props) => {
  return (
    <div className="page h-screen flex flex-col gap-5 items-center justify-center bg-[#1d4139] text-[#eeeae1]">
      <Logo size="w-[80%] md:w-1/2 lg:w-[40%] fill-[#eeeae1]" />
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-[15px] md:text-[30px] font-[Harmony]">محول العملة السورية</h1>
        <p className="text-[15px] md:text-[30px] mt-[-2%] font-[Harmony]">بعد حذف صفرين من العملة</p>
      </div>
      <Button onClick={onStart} className="w-40 h-15 md:w-50 md:h-15 mt-[2%] cursor-pointer bg-[#eeeae1] text-[#1d4139] hover:bg-[#b9b8b4]">
        <h1 className="text-[30px] md:text-[40px] font-[HarmonyBold] mt-[10%]">ابدأ</h1>
      </Button>

      <h1 className="font-[Harmony] mt-[5%] flex flex-row gap-2">
        تم برمجة هذا التطبيق من قبل 
        <a target="_blank" href="https://amirbattal.com/" className="font-[HarmonyBold] underline hover:text-[#aaa8a3]"> أمير بطال</a>
      </h1>
    </div>
  )
}

export default Welcome
