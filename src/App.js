import logo from "./logo.svg";
import "./App.css";
// import PacmanSprite from "./components/PacmanSprite/PacmanSprite.js";
// import { GhostSprite } from "./components/GhostSprite/GhostSprite.js";
import Sprite from "./components/Sprite/Sprite.js";
import BackgroundLayer from "./components/BackgroundLayer/BackgroundLayer.js";
import { useState } from "react";
import KeyboardController from "./Game/KeyboardController.js";
import PacmanGame from "./Game/PacmanGame.js";
import constants from "./Constants.js";

const { ghostSpriteConstants } = constants;

const game = new PacmanGame();

const keyboardController = new KeyboardController();

keyboardController.mapKeyDown("ArrowLeft", () => {
  game.inputEvent("left");
});

keyboardController.mapKeyDown("ArrowRight", () => {
  game.inputEvent("right");
});

keyboardController.mapKeyDown("ArrowDown", () => {
  game.inputEvent("down");
});

keyboardController.mapKeyDown("ArrowUp", () => {
  game.inputEvent("up");
});

keyboardController.mapKeyUp("ArrowLeft", () => {
  game.inputEvent("leftCancelled");
});

keyboardController.mapKeyUp("ArrowRight", () => {
  game.inputEvent("rightCancelled");
});

keyboardController.mapKeyUp("ArrowUp", () => {
  game.inputEvent("upCancelled");
});

keyboardController.mapKeyUp("ArrowDown", () => {
  game.inputEvent("downCancelled");
});

keyboardController.mapKeyDown("a", () => {
  game.inputEvent("rotateCounterClockwise");
});

keyboardController.mapKeyDown("d", () => {
  game.inputEvent("rotateClockwise");
});

keyboardController.mapKeyDown(" ", () => {
  game.inputEvent("swap");
});

keyboardController.mapKeyDown("8", () => {
  game.inputEvent("speedUp");
});

keyboardController.mapKeyDown("Escape", () => {
  game.inputEvent("togglePause");
});

keyboardController.mapKeyDown("w", () => {
  game.inputEvent("activateTwoPiece");
});

keyboardController.mapKeyDown("s", () => {
  game.inputEvent("activateRainbowPieces");
});

window.addEventListener("blur", (event) => {
  // game.inputEvent("pause");
});

let changeAnimation = () => {};
let myState = {
  animationName: "eating",
  blinky: {
    ghostName: ghostSpriteConstants.BLINKY,
    animationName: "moving",
    eyes: ghostSpriteConstants.RIGHT,
    isScared: false,
  },
};

function App() {
  const [state, setState] = useState({
    entities: [],
    // animationName: "eating",
    // blinky: {
    //   ghostName: ghostSpriteConstants.BLINKY,
    //   animationName: "moving",
    //   eyes: ghostSpriteConstants.RIGHT,
    //   isScared: false,
    // },
    // pacman: {
    //   x: 0,
    //   y: 0,
    // },
  });
  // myState = state;
  // changeAnimation = setState;

  game.control(setState);

  return (
    <div className="App">
      <div className="pacman-video-game">
        <BackgroundLayer></BackgroundLayer>

        <div className="pacman-sprites-layer">
          {state.entities.map((entity) => {
            // console.log(entity);
            return (
              <>
                {entity.animations.map((animation) => {
                  return (
                    <Sprite
                      className={`${entity.constructor.name.toLowerCase()}-sprite`}
                      animation={animation}
                      style={{
                        top: `${
                          (100 / (state.tileHeight * state.gridHeight)) *
                          entity.y
                        }%`,
                        left: `${
                          (100 / (state.tileWidth * state.gridWidth)) * entity.x
                        }%`,
                        height: `${
                          (100 / (state.tileHeight * state.gridHeight)) *
                          entity.height
                        }%`,
                        width: `${
                          (100 / (state.tileWidth * state.gridWidth)) *
                          entity.width
                        }%`,
                        transform: `rotate(${entity.animationRotation}deg)`,
                        // left: `calc((100 / (8 * 28)) * ${entity.x})%`,
                      }}
                    ></Sprite>
                  );
                })}
              </>
            );
          })}
          {/* <PacmanSprite
            animationName={state.animationName}
            // key={state.animationName}
            entity={state.pacman}
          ></PacmanSprite>
          <GhostSprite entity={state.blinky}></GhostSprite> */}
        </div>
      </div>
    </div>
  );
}

const testingFunction = () => {
  myState.blinky.eyes =
    myState.blinky.eyes === ghostSpriteConstants.RIGHT
      ? ghostSpriteConstants.LEFT
      : ghostSpriteConstants.RIGHT;
  changeAnimation({
    animationName: "notEating",
    blinky: {
      ...myState.blinky,
    },
  });
  setTimeout(() => {
    testingFunction();
  }, 200);
};

const testingFunction2 = () => {
  myState.blinky.isScared = !myState.blinky.isScared;
  myState.blinky.eyes =
    myState.blinky.eyes === ghostSpriteConstants.RIGHT
      ? ghostSpriteConstants.SCARED
      : ghostSpriteConstants.RIGHT;
  changeAnimation({
    animationName: "notEating",
    blinky: {
      ...myState.blinky,
    },
  });
  setTimeout(() => {
    testingFunction2();
  }, 1000);
};

game.start();

// testingFunction2();

// setTimeout(() => {
//   testingFunction();
// }, 200);

export default App;
