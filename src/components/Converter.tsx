import { useState } from "react"
import { convertAndSuggest } from "../utils/currency"

const Converter = () => {
  const [oldAmount, setOldAmount] = useState<number | "">("")
  const result =
    oldAmount !== "" ? convertAndSuggest(oldAmount) : null

  return (
    <div className="page">
      <h2>تحويل العملة مع اقتراح الدفع</h2>

      <input
        type="number"
        placeholder="المبلغ بالعملة القديمة"
        value={oldAmount}
        onChange={(e) =>
          setOldAmount(e.target.value === "" ? "" : Number(e.target.value))
        }
      />

    {result && (
      <>
        <p>
          المبلغ بعد التحويل:
          <strong> {result.exactNew.toFixed(2)}</strong>
        </p>

        <h4>المبلغ المدفوع</h4>
        {result.paidNotes.map(n => (
          <div key={n.note}>
            {n.note} × {n.count}
          </div>
        ))}

        <p>
          المجموع المدفوع:
          <strong> {result.paidTotal}</strong>
        </p>

        {result.change > 0 && (
          <p style={{ color: "green" }}>
            الباقي:
            <strong> {result.change.toFixed(2)}</strong>
          </p>
        )}
      </>
    )}

    </div>
  )
}

export default Converter
