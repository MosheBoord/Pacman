import "./PacmanSprite.css";
import Sprite from "../Sprite/Sprite.js";

// const pathToImagesFromSpriteClass = "../../../public/images/pacman-sprites/"
// const pathToSpriteClass = ""

function PacmanSprite({ animationName, entity }) {
  // return <div className="pacman-sprite"></div>;

  // console.log("animation:", animationName, animation[animationName], animation);
  // console.log(entity);
  return (
    <Sprite
      className="pacman-sprite facing-right"
      animation={{ ...animation[animationName], name: animationName }}
      // key={animationName}
      style={{
        top: `${(100 / (8 * 36)) * entity.y}%`,
        left: `${(100 / (8 * 28)) * entity.x}%`,
        // left: `calc((100 / (8 * 28)) * ${entity.x})%`,
      }}
    ></Sprite>
  );
}

export default PacmanSprite;
