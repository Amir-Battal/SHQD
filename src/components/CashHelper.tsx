import { useState } from "react"
import { suggestNotesForNewAmount } from "../utils/currency"

const CashHelper = () => {
  const [newAmount, setNewAmount] = useState<number | "">("")

  const result =
    newAmount !== "" ? suggestNotesForNewAmount(newAmount) : null

  return (
    <div className="page">
      <h2>اقتراح أوراق الدفع</h2>

      <input
        type="number"
        placeholder="المبلغ بالعملة الجديدة"
        value={newAmount}
        onChange={(e) =>
          setNewAmount(e.target.value === "" ? "" : Number(e.target.value))
        }
      />

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
