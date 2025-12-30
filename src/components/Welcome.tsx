import { Button } from "./ui/button"

interface Props {
  onStart: () => void
}

const Welcome = ({ onStart }: Props) => {
  return (
    <div className="page h-screen flex flex-col gap-5 items-center justify-center">
      <h1 className="text-[70px] md:text-[100px] font-bold">شقد</h1>
      <h1 className="text-[30px] md:text-[50px]">محول العملة السورية</h1>
      <p className="text-[30px] md:text-[50px]">بعد حذف صفرين من العملة</p>
      <Button onClick={onStart} className="w-40 h-15 text-[30px] md:w-50 md:h-15 md:text-[40px] cursor-pointer">ابدأ</Button>
    </div>
  )
}

export default Welcome
