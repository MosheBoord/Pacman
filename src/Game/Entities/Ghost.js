import Entity from "./Entity.js";
import {
  filterImage,
  imagesAreLoaded,
} from "../../utilities/ImageProcessing.js";

import ghostEyesRight from "../../images/ghost-sprites/ghost-eyes-right.png";
import ghostEyesLeft from "../../images/ghost-sprites/ghost-eyes-left.png";
import ghostEyesScared from "../../images/ghost-sprites/ghost-eyes-scared.png";
import blinkyLegs1 from "../../images/ghost-sprites/blinky-legs-1.png";
import blinkyLegs2 from "../../images/ghost-sprites/blinky-legs-2.png";

let scaredGhostLegs1;
let scaredGhostLegs2;

if (imagesAreLoaded([blinkyLegs1, blinkyLegs2])) {
  processImages();
} else {
  const waitAndTryAgain = () => {
    console.log("Yay! it's working!!!");
    setTimeout(() => {
      if (imagesAreLoaded([blinkyLegs1, blinkyLegs2])) {
        processImages();
      } else {
        waitAndTryAgain();
      }
    }, 1);
  };
  waitAndTryAgain();
}

function processImages() {
  scaredGhostLegs1 = filterImage(
    blinkyLegs1,
    getfilterFunction({ B: 255, R: 0 })
  );

  scaredGhostLegs2 = filterImage(
    blinkyLegs2,
    getfilterFunction({ B: 255, R: 0 })
  );

  console.log("legs1", scaredGhostLegs1);
  console.log("legs2", scaredGhostLegs2);
}

function getfilterFunction(pixel) {
  return (oldPixel) => {
    return { ...oldPixel, ...pixel };
  };
}

const ghostEyes = {
  eyesRight: ghostEyesRight,
  eyesLeft: ghostEyesLeft,
  eyesScared: ghostEyesScared,
};

const ghostBody = {
  blinky: {
    legs1: blinkyLegs1,
    legs2: blinkyLegs2,
  },
  scaredGhost: {
    legs1: scaredGhostLegs1,
    legs2: scaredGhostLegs2,
  },
};

class Ghost extends Entity {
  height = 14;
  width = 14;
  name;
  isScared = false;
  duration = 200;
  iterations = Infinity;
  direction = "alternate";

  constructor(ghostName) {
    super();
    console.log(this.isScared ? "scaredGhost" : ghostName);
    this.animationList = {
      moving: {
        keyFrames: [
          ghostBody[this.isScared ? "scaredGhost" : ghostName].legs1,
          ghostBody[this.isScared ? "scaredGhost" : ghostName].legs2,
        ],
      },
      eyesRight: {
        keyFrames: [ghostEyesRight],
      },
      eyesLeft: {
        keyFrames: [ghostEyesLeft],
      },
      eyesScared: {
        keyFrames: [ghostEyesScared],
      },
    };
  }
}

export default Ghost;
