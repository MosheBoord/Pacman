import Entity from "./Entity.js";
import constants from "../../Constants.js";

import pacmanMouthOpen0Percent from "../../images/pacman-sprites/pacman-mouth-open-0-percent.png";
import pacmanMouthOpen15Percent from "../../images/pacman-sprites/pacman-mouth-open-15-percent.png";
import pacmanMouthOpen30Percent from "../../images/pacman-sprites/pacman-mouth-open-30-percent.png";
import pacmanMouthOpen50Percent from "../../images/pacman-sprites/pacman-mouth-open-50-percent.png";
import pacmanMouthOpen65Percent from "../../images/pacman-sprites/pacman-mouth-open-65-percent.png";
import pacmanMouthOpen80Percent from "../../images/pacman-sprites/pacman-mouth-open-80-percent.png";
import pacmanMouthOpen100Percent from "../../images/pacman-sprites/pacman-mouth-open-100-percent.png";
import pacmanBoundingBox1 from "../../images/pacman-sprites/pacman-bounds-1.png";
import pacmanBoundingBox2 from "../../images/pacman-sprites/pacman-bounds-2.png";

class Pacman extends Entity {
  height = 13;
  width = 13;
  duration = 200;
  iterations = Infinity;
  direction = constants.LEFT;
  animationDirection = "alternate";
  animationList = {
    standingStill: {
      keyFrames: [pacmanMouthOpen100Percent],
    },
    eating: {
      keyFrames: [
        pacmanMouthOpen100Percent,
        pacmanMouthOpen80Percent,
        pacmanMouthOpen65Percent,
        pacmanMouthOpen50Percent,
        pacmanMouthOpen30Percent,
        pacmanMouthOpen15Percent,
        pacmanMouthOpen0Percent,
      ],
    },
    boundingBox1: {
      keyFrames: [pacmanBoundingBox1],
    },
    boundingBox2: {
      keyFrames: [pacmanBoundingBox2],
    },
  };
}

export default Pacman;
