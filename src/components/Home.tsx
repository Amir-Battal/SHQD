interface Props {
  onSelect: (mode: "convert" | "cash") => void
}

const Home = ({ onSelect }: Props) => {
  return (
    <div className="page">
      <h2>اختر العملية</h2>

      <button onClick={() => onSelect("convert")}>
        🔁 تحويل العملة
      </button>

      <button onClick={() => onSelect("cash")}>
        💵 اقتراح أوراق الدفع
      </button>
    </div>
  )
}

export default Home
