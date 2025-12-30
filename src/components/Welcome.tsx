interface Props {
  onStart: () => void
}

const Welcome = ({ onStart }: Props) => {
  return (
    <div className="page">
      <h1>محول العملة السورية</h1>
      <p>بعد حذف صفرين من العملة</p>
      <button onClick={onStart}>ابدأ</button>
    </div>
  )
}

export default Welcome
