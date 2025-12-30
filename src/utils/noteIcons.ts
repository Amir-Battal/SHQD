import Wheat from "../assets/Money/Wheat"
import Olive from "../assets/Money/Olive"
import Cotton from "../assets/Money/Cotton"
import Orange from "../assets/Money/Orange"
import Berries from "../assets/Money/Berries"
import Flower from "../assets/Money/Flower"

export const NOTE_ICONS: Record<number, React.FC> = {
  500: Wheat,
  200: Olive,
  100: Cotton,
  50: Orange,
  25: Berries,
  10: Flower,
}
