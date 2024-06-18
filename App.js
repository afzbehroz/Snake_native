import "react-native-gesture-handler";
import Game from "./src/components/Game";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const App = () => (
  <GestureHandlerRootView>
    <Game />
  </GestureHandlerRootView>
);

export default App;
