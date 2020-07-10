import Radium from 'radium';
import { zoomIn } from "react-animations";

const styles = {
  zoomIn: {
    animation: "x 0.5s",
    animationName: Radium.keyframes(zoomIn, "zoomIn")
  }
};

export default styles;