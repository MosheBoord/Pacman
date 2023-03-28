import VideoGame from "./VideoGame.js";
import seedrandom from "seedrandom";
import Pacman from "./Entities/Pacman.js";
import Ghost from "./Entities/Ghost.js";
import Tile from "./Entities/Tile.js";
import constants from "../Constants.js";
import PacmanGrid from "./Entities/PacmanGrid.js";

const { ghostSpriteConstants } = constants;

export default class PacmanGame extends VideoGame {
  constructor() {
    super();
    this.setupInitialApp();

    this.onInputEvent("left", () => {
      if (this.inTestingMode) {
        if (this.testingTile.left) {
          this.testingTile = this.pacmanGrid.getTile(
            this.testingTile.x - 1,
            this.testingTile.y
          );
        }
        if (this.testingTile.x < 1) {
          this.testingTile = this.pacmanGrid.getTile(
            this.testingTile.x + 28,
            this.testingTile.y
          );
        }
        this.centerEntityOnTile(this.pacman, this.testingTile);
      } else {
        this.buttonPressed.left = true;
      }
    });

    this.onInputEvent("leftCancelled", () => {
      this.buttonPressed.left = false;
    });

    this.onInputEvent("right", () => {
      if (this.inTestingMode) {
        if (this.testingTile.right) {
          this.testingTile = this.pacmanGrid.getTile(
            this.testingTile.x + 1,
            this.testingTile.y
          );
        }
        if (this.testingTile.x > 28) {
          this.testingTile = this.pacmanGrid.getTile(
            this.testingTile.x - 28,
            this.testingTile.y
          );
        }
        this.centerEntityOnTile(this.pacman, this.testingTile);
      } else {
        this.buttonPressed.right = true;
      }
    });

    this.onInputEvent("rightCancelled", () => {
      this.buttonPressed.right = false;
    });

    this.onInputEvent("down", () => {
      if (this.inTestingMode) {
        if (this.testingTile.down) {
          this.testingTile = this.pacmanGrid.getTile(
            this.testingTile.x,
            this.testingTile.y + 1
          );
          this.centerEntityOnTile(this.pacman, this.testingTile);
        }
      } else {
        this.buttonPressed.down = true;
      }
    });

    this.onInputEvent("downCancelled", () => {
      this.buttonPressed.down = false;
    });

    this.onInputEvent("up", () => {
      if (this.inTestingMode) {
        if (this.testingTile.up) {
          this.testingTile = this.pacmanGrid.getTile(
            this.testingTile.x,
            this.testingTile.y - 1
          );
          this.centerEntityOnTile(this.pacman, this.testingTile);
        }
      } else {
        this.buttonPressed.up = true;
      }
    });

    this.onInputEvent("upCancelled", () => {
      this.buttonPressed.up = false;
    });
  }

  setupInitialApp() {
    // this.inTestingMode = true;
    // this.frameRateInMilliseconds = 1000 / 10;
    this.isRunning = true;
    // this.verticalMovement = 0;
    // this.verticleSpeed = 0.01;
    this.pacmanHorizontalMovement = -0.5;
    this.pacmanVerticalMovement = 0;
    this.pacmanSpeed = 0.8;
    this.timers = [];
    this.counters = [];
    this.gridHeight = 36;
    this.gridWidth = 28;
    this.tileHeight = 8;
    this.tileWidth = 8;
    // this.tiles = this.getTileGrid();
    this.pacmanGrid = new PacmanGrid(this.gridHeight, this.gridWidth);
    this.pacman = new Pacman();
    this.pacman.setAnimations(["eating"]);
    this.shawdowPacman1 = new Pacman();
    this.shawdowPacman2 = new Pacman();
    this.pacman.forwardAnimations(this.shawdowPacman1);
    this.pacman.forwardAnimations(this.shawdowPacman2);
    this.buttonPressed = {
      up: false,
      down: false,
      right: false,
      left: false,
    };
    // this.upPressed = false;
    // this.downPressed = false;
    // this.rightPressed = false;
    // this.leftPressed = false;

    // this.pacman.setAnimations(["standingStill"]);
    this.pacman.linkEntity(this.shawdowPacman1, {
      x: this.gridWidth * this.tileWidth,
      y: 0,
    });
    this.pacman.linkEntity(this.shawdowPacman2, {
      x: -1 * this.gridWidth * this.tileWidth,
      y: 0,
    });
    this.blinky = new Ghost(ghostSpriteConstants.BLINKY);
    this.blinky.setAnimations(["moving", "eyesLeft"]);
    this.blinky.eyes = ghostSpriteConstants.RIGHT;
    this.blinky.isScared = false;
    this.seed = "I Piece First";
    this.seed = "J first!!";
    // this.seed = "L first.";
    // this.seed = "S Piece First";
    // this.seed = "O Piece First";
    // this.seed = "Z Piece First";
    // this.seed = "T Piece First";
    // let settings = JSON.parse(localStorage.getItem("settings"));

    // if (settings) {
    //   if (!settings.useCustomSeed) {
    //     settings.seed = this.getRandomSeed();
    //   }
    // } else {
    //   settings = {
    //     seed: this.getRandomSeed(),
    //     useCustomSeed: false,
    //   };
    // }

    // this.testingTile = this.pacmanGrid.getTile(26, 18);
    // // this.testingTile.x = 2;
    // // this.testingTile.y = 27;

    // this.centerEntityOnTile(this.pacman, this.testingTile);

    this.testingTile = this.pacmanGrid.getTile(14, 18);

    this.centerEntityOnTile(this.blinky, this.testingTile);

    this.testingTile = this.pacmanGrid.getTile(14, 21);
    this.testingTile = this.pacmanGrid.getTile(2, 5);
    this.centerEntityOnTile(this.pacman, this.testingTile);
    this.pacman.setAnimationRotation(180);

    // this.pacman.animationName = "eating";

    this.state = {
      animationName: "eating",
      gridHeight: this.gridHeight,
      gridWidth: this.gridWidth,
      tileHeight: this.tileHeight,
      tileWidth: this.tileWidth,
      // blinky: this.blinky,
      // blinky: {
      //   ghostName: ghostSpriteConstants.BLINKY,
      //   animationName: "moving",
      //   eyes: ghostSpriteConstants.RIGHT,
      //   isScared: false,
      // },
      framesRunning: 0,
      isRunning: true,
      score: 0,
      // pacman: this.pacman,
      entities: [
        this.pacman,
        this.shawdowPacman1,
        this.shawdowPacman2,
        this.blinky,
      ],
      // entities: [this.pacman],
    };

    // this.addTimer(200, () => {
    //   this.state.animationName = "boundingBox1";
    // });

    // this.addTimer(500, () => {
    //   this.state.animationName = "eating";
    // });

    this.phase = this.getChasePhase();
  }

  setSetting(setting, value) {
    this.state.settings[setting] = value;
  }

  saveSettings() {
    localStorage.setItem("settings", JSON.stringify(this.state.settings));
  }

  getRandomSeed() {
    const startingCharCode = 40;
    const endingCharCode = 125;
    const seedLength = 10;

    let seed = "";
    for (let i = 0; i < seedLength; i++) {
      const randomCode = Math.floor(
        Math.random() * (endingCharCode - startingCharCode) + startingCharCode
      );
      seed += String.fromCharCode(randomCode);
    }
    return seed;
  }

  runNextFrame() {
    super.runNextFrame();
    this.state.framesRunning++;
    this.updateCountersAndTimers();
    this.phase.advance();
    // this.pacman.setAnimations(["boundingBox1"]);
    this.refresh();
  }

  refresh() {
    this.setState({ ...this.state });
  }

  addTimer(time, callback) {
    this.timers.push({ framesLeft: time, activate: callback });
  }

  addCounter(name) {
    this.counters.push({ name, framesPassed: 0 });
  }

  removeCounter(name) {
    this.counters = this.counters.filter((counter) => counter.name !== name);
  }

  updateCountersAndTimers() {
    this.counters.forEach((counter) => {
      counter.framesPassed++;
    });

    const expiredTimers = [];

    this.timers.forEach((timer) => {
      timer.framesLeft--;
      if (timer.framesLeft <= 0) {
        timer.activate();
        expiredTimers.push(timer);
      }
    });

    this.timers = this.timers.filter((timer) => !expiredTimers.includes(timer));
  }

  centerEntityOnTile(entity, tile) {
    const { x, y } = tile.getPosition();
    entity.setPosition(x, y);
  }

  getTileGrid() {
    const tileGrid = [];
    for (let y = 0; y < this.gridHeight; y++) {
      const row = [];
      for (let x = 0; x < this.gridWidth; x++) {
        row.push({ empty: true });
      }
      tileGrid.push(row);
    }
  }

  getChasePhase() {
    let direction = this.pacman.direction;
    const directionFlow = {};
    const facing = {
      up: 270,
      down: 90,
      right: 0,
      left: 180,
    };

    // const directions = {
    //   up: {
    //     opposite: constants.DOWN,
    //     move: () => {
    //       this.pacmanVerticalMovement = -1 * this.pacmanSpeed;
    //       this.pacmanHorizontalMovement = 0;
    //     },
    //     rotate: () => {
    //       this.pacman.setAnimationRotation(270);
    //     },
    //     getNextPosition: (pacmanPosition, tilePosition) => {
    //       const nextPosition = {
    //         x: pacmanPosition.x,
    //         y: pacmanPosition.y - this.pacmanSpeed,
    //       };
    //       this.pacman.setAnimationRotation(270);
    //       if (pacmanPosition.x < tilePosition.x) {
    //         nextPosition.x = Math.min(
    //           pacmanPosition.x + this.pacmanSpeed,
    //           tilePosition.x
    //         );
    //         this.pacman.setAnimationRotation(315);
    //       }
    //       if (pacmanPosition.x > tilePosition.x) {
    //         nextPosition.x = Math.max(
    //           pacmanPosition.x - this.pacmanSpeed,
    //           tilePosition.x
    //         );
    //         this.pacman.setAnimationRotation(225);
    //       }
    //       return nextPosition;
    //     },
    //   },
    //   down: {
    //     opposite: constants.UP,
    //     move: () => {
    //       this.pacmanVerticalMovement = this.pacmanSpeed;
    //       this.pacmanHorizontalMovement = 0;
    //     },
    //     rotate: () => {
    //       this.pacman.setAnimationRotation(90);
    //     },
    //     getNextPosition: (pacmanPosition, tilePosition) => {
    //       const nextPosition = {
    //         x: pacmanPosition.x,
    //         y: pacmanPosition.y + this.pacmanSpeed,
    //       };
    //       this.pacman.setAnimationRotation(90);
    //       if (pacmanPosition.x < tilePosition.x) {
    //         nextPosition.x = Math.min(
    //           pacmanPosition.x + this.pacmanSpeed,
    //           tilePosition.x
    //         );
    //         this.pacman.setAnimationRotation(45);
    //       }
    //       if (pacmanPosition.x > tilePosition.x) {
    //         nextPosition.x = Math.max(
    //           pacmanPosition.x - this.pacmanSpeed,
    //           tilePosition.x
    //         );
    //         this.pacman.setAnimationRotation(135);
    //       }
    //       return nextPosition;
    //     },
    //   },
    //   right: {
    //     opposite: constants.LEFT,
    //     move: () => {
    //       this.pacmanHorizontalMovement = this.pacmanSpeed;
    //       this.pacmanVerticalMovement = 0;
    //     },
    //     rotate: () => {
    //       this.pacman.setAnimationRotation(0);
    //     },
    //     getNextPosition: (pacmanPosition, tilePosition) => {
    //       const nextPosition = {
    //         x: pacmanPosition.x + this.pacmanSpeed,
    //         y: pacmanPosition.y,
    //       };
    //       this.pacman.setAnimationRotation(0);
    //       if (pacmanPosition.y < tilePosition.y) {
    //         nextPosition.y = Math.min(
    //           pacmanPosition.y + this.pacmanSpeed,
    //           tilePosition.y
    //         );
    //         this.pacman.setAnimationRotation(45);
    //       }
    //       if (pacmanPosition.y > tilePosition.y) {
    //         nextPosition.y = Math.max(
    //           pacmanPosition.y - this.pacmanSpeed,
    //           tilePosition.y
    //         );
    //         this.pacman.setAnimationRotation(315);
    //       }
    //       return nextPosition;
    //     },
    //   },
    //   left: {
    //     opposite: constants.RIGHT,
    //     move: () => {
    //       this.pacmanHorizontalMovement = -1 * this.pacmanSpeed;
    //       this.pacmanVerticalMovement = 0;
    //     },
    //     rotate: () => {
    //       this.pacman.setAnimationRotation(180);
    //     },
    //     getNextPosition: (pacmanPosition, tilePosition) => {
    //       const nextPosition = {
    //         x: pacmanPosition.x + this.pacmanSpeed,
    //         y: pacmanPosition.y,
    //       };
    //       this.pacman.setAnimationRotation(180);
    //       if (pacmanPosition.y < tilePosition.y) {
    //         nextPosition.y = Math.min(
    //           pacmanPosition.y + this.pacmanSpeed,
    //           tilePosition.y
    //         );
    //         this.pacman.setAnimationRotation(135);
    //       }
    //       if (pacmanPosition.y > tilePosition.y) {
    //         nextPosition.y = Math.max(
    //           pacmanPosition.y - this.pacmanSpeed,
    //           tilePosition.y
    //         );
    //         this.pacman.setAnimationRotation(225);
    //       }
    //       return nextPosition;
    //     },
    //   },
    // };

    const directions = [
      constants.UP,
      constants.DOWN,
      constants.RIGHT,
      constants.LEFT,
    ];

    return {
      advance: () => {
        const { tile } = this.getLocationDatOfEntity(this.pacman);
        const tilePosition = tile.getPosition();
        console.log(tile);
        console.log(tile.getPosition());

        const oldDirection = this.pacman.direction;
        let { x, y } = this.pacman.getPosition();
        let position = { x, y };

        directions.forEach((direction) => {
          if (this.buttonPressed[direction] && tile[direction]) {
            this.pacman.direction = direction;
          }
        });

        const newDirection = this.pacman.direction;

        this.pacman.setAnimationRotation(facing[newDirection]);
        this.pacman.setAnimations(["eating"]);

        if (newDirection === constants.UP || newDirection === constants.DOWN) {
          if (newDirection === constants.UP) {
            position.y += -1 * this.pacmanSpeed;
            if (!tile[newDirection] && position.y <= tilePosition.y) {
              position.y = tilePosition.y;
              this.pacman.setAnimations(["standingStill"]);
            }
            if (position.x < tilePosition.x) {
              position.x += this.pacmanSpeed;
              if (position.x < tilePosition.x) {
                this.pacman.setAnimationRotation(315);
              } else if (position.x > tilePosition.x) {
                position.x = tilePosition.x;
              }
            } else if (position.x > tilePosition.x) {
              position.x += -1 * this.pacmanSpeed;
              if (position.x > tilePosition.x) {
                this.pacman.setAnimationRotation(225);
              } else if (position.x < tilePosition.x) {
                position.x = tilePosition.x;
              }
            }
          } else {
            position.y += this.pacmanSpeed;
            if (!tile[newDirection] && position.y >= tilePosition.y) {
              position.y = tilePosition.y;
              this.pacman.setAnimations(["standingStill"]);
            }
            if (position.x < tilePosition.x) {
              position.x += this.pacmanSpeed;
              if (position.x < tilePosition.x) {
                this.pacman.setAnimationRotation(45);
              } else if (position.x > tilePosition.x) {
                position.x = tilePosition.x;
              }
            } else if (position.x > tilePosition.x) {
              position.x += -1 * this.pacmanSpeed;
              if (position.x > tilePosition.x) {
                this.pacman.setAnimationRotation(135);
              } else if (position.x < tilePosition.x) {
                position.x = tilePosition.x;
              }
            }
          }
        } else {
          if (newDirection === constants.LEFT) {
            position.x += -1 * this.pacmanSpeed;
            if (!tile[newDirection] && position.x <= tilePosition.x) {
              position.x = tilePosition.x;
              this.pacman.setAnimations(["standingStill"]);
            }
            if (position.y < tilePosition.y) {
              position.y += this.pacmanSpeed;
              if (position.y < tilePosition.y) {
                this.pacman.setAnimationRotation(135);
              } else if (position.y > tilePosition.y) {
                position.y = tilePosition.y;
              }
            } else if (position.y > tilePosition.y) {
              position.y += -1 * this.pacmanSpeed;
              if (position.y > tilePosition.y) {
                this.pacman.setAnimationRotation(225);
              } else if (position.y < tilePosition.y) {
                position.y = tilePosition.y;
              }
            }
          } else {
            position.x += this.pacmanSpeed;
            if (!tile[newDirection] && position.x >= tilePosition.x) {
              position.x = tilePosition.x;
              this.pacman.setAnimations(["standingStill"]);
            }
            if (position.y < tilePosition.y) {
              position.y += this.pacmanSpeed;
              if (position.y < tilePosition.y) {
                this.pacman.setAnimationRotation(45);
              } else if (position.y > tilePosition.y) {
                position.y = tilePosition.y;
              }
            } else if (position.y > tilePosition.y) {
              position.y += -1 * this.pacmanSpeed;
              if (position.y > tilePosition.y) {
                this.pacman.setAnimationRotation(315);
              } else if (position.y < tilePosition.y) {
                position.y = tilePosition.y;
              }
            }
          }
        }

        // Object.keys(directions).forEach((key) => {
        //   if (this.buttonPressed[key] && tile[key]) {
        //     // directions[key].move();
        //     // if (this.pacman.direction === directions[key].opposite) {
        //     //   directions[key].rotate();
        //     // }
        //     this.pacman.direction = key;
        //     console.log(direction, directions[key]);
        //   }
        // });

        // position = directions[this.pacman.direction].getNextPosition(
        //   { x, y },
        //   tile.getPosition()
        // );

        // console.log("direction", this.pacman.direction);

        // console.log("old position", this.pacman);
        if (position.x < 0) {
          position.x += this.gridWidth * this.tileWidth;
        } else if (position.x > this.gridWidth * this.tileWidth) {
          position.x -= this.gridWidth * this.tileWidth;
        }

        this.pacman.setPosition(position.x, position.y);

        console.log(this.pacman.getPosition());

        // console.log("new position", this.pacman);

        // this.pacman.setPosition(
        //   this.pacman.x + this.pacmanHorizontalMovement,
        //   this.pacman.y + this.pacmanVerticalMovement
        // );

        // this.pacman.x += this.pacmanHorizontalMovement;
        // this.pacman.y += this.pacmanVerticalMovement;

        // if (this.pacman.direction === constants.UP) {
        //   if (tile.up) {
        //     this.pacmanVerticalMovement = -1 * this.pacmanSpeed;
        //     this.pacman.setAnimations(["eating"]);
        //   } else {
        //     const tileMiddle = (tile.y - 1) * tile.height - tile.height / 2 + 1;
        //     if (this.pacman.y >= tileMiddle) {
        //       this.pacman.setPosition(this.pacman.x, tileMiddle);
        //       this.pacmanVerticalMovement = 0;
        //       this.pacmanHorizontalMovement = 0;
        //       this.pacman.setAnimations(["standingStill"]);
        //     }
        //   }
        // }

        // if (this.pacman.direction === constants.DOWN) {
        //   if (tile.down) {
        //     this.pacmanVerticalMovement = this.pacmanSpeed;
        //     this.pacman.setAnimations(["eating"]);
        //   } else {
        //     const tileMiddle = (tile.y - 1) * tile.height - tile.height / 2 + 1;
        //     if (this.pacman.y >= tileMiddle) {
        //       this.pacman.setPosition(this.pacman.x, tileMiddle);
        //       this.pacmanVerticalMovement = 0;
        //       this.pacmanHorizontalMovement = 0;
        //       this.pacman.setAnimations(["standingStill"]);
        //     }
        //   }
        // }

        // if (this.pacman.direction === constants.LEFT) {
        //   if (tile.left) {
        //     this.pacmanHorizontalMovement = -1 * this.pacmanSpeed;
        //     this.pacman.setAnimations(["eating"]);
        //   } else {
        //     const tileMiddle = (tile.x - 1) * tile.width - tile.width / 2 + 1;
        //     if (this.pacman.x >= tileMiddle) {
        //       this.pacman.setPosition(tileMiddle, this.pacman.y);
        //       this.pacmanVerticalMovement = 0;
        //       this.pacmanHorizontalMovement = 0;
        //       this.pacman.setAnimations(["standingStill"]);
        //     }
        //   }
        // }

        // if (this.pacman.direction === constants.RIGHT) {
        //   if (tile.right) {
        //     this.pacmanHorizontalMovement = this.pacmanSpeed;
        //     this.pacman.setAnimations(["eating"]);
        //   } else {
        //     const tileMiddle = (tile.x - 1) * tile.width - tile.width / 2 + 1;
        //     if (this.pacman.x <= tileMiddle) {
        //       this.pacman.setPosition(tileMiddle, this.pacman.y);
        //       this.pacmanVerticalMovement = 0;
        //       this.pacmanHorizontalMovement = 0;
        //       this.pacman.setAnimations(["standingStill"]);
        //     }
        //   }
        // }
        // this.pacman.setAnimationRotation(facing[this.pacman.direction]);
      },
    };
  }

  getLocationDatOfEntity(entity) {
    const data = {
      relativeToTileLocation: {
        x: (entity.x + entity.width / 2) % this.tileWidth,
        y: (entity.y + entity.height / 2) % this.tileHeight,
      },
    };
    const tileX =
      Math.floor((entity.x + entity.width / 2) / this.tileWidth) + 1;
    const tileY =
      Math.floor((entity.y + entity.height / 2) / this.tileHeight) + 1;
    data.tile = this.pacmanGrid.getTile(tileX, tileY);
    return data;
  }

  getStandardPieceFallingPhase() {
    let timeInAir = 0;
  }

  getPausePhase(time, phase) {
    this.addTimer(time, () => {
      this.phase = phase;
    });
  }

  createRandomNumberGenerator() {
    const seededGenerator = {};
    return {
      generateRandomNumber: (seed) => {
        if (seed) {
          if (!seededGenerator[seed]) {
            seededGenerator[seed] = new seedrandom(seed);
          }
          return seededGenerator[seed]();
        } else {
          return Math.random();
        }
      },
    };
  }
}
