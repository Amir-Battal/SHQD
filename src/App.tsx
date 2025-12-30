import { useState } from "react"
import Welcome from "./components/Welcome"
import Home from "./components/Home"
import Converter from "./components/Converter"
import CashHelper from "./components/CashHelper"

type Screen = "welcome" | "home" | "convert" | "cash"

const App = () => {
  const [screen, setScreen] = useState<Screen>("welcome")

  const goHome = () => setScreen("home")

  if (screen === "welcome")
    return <Welcome onStart={() => setScreen("home")} />

  if (screen === "home")
    return <Home onSelect={setScreen} />

  if (screen === "convert")
    return <Converter onBack={goHome} />

  if (screen === "cash")
    return <CashHelper onBack={goHome} />

  return null
}

export default App
