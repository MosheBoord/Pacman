import "./Sprite.css";
import { useRef, useEffect } from "react";

function Sprite({ className, animation, style }) {
  //   const ref = useRef(null);
  let { keyFrames, duration, iterations, direction, name } = animation;
  //   if (keyFrames.length === 1) {
  //     keyFrames = [keyFrames[0], keyFrames[0]];
  // console.log(animation);
  //   }

  const mounted = useRef(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const node = elementRef.current;
    if (node) {
      // console.log(
      //   animation.keyFrames.map((keyFrame) => ({ content: keyFrame })),
      //   {
      //     duration: animation.duration,
      //     iterations: animation.iterations,
      //   }
      // );
      node.animate(
        keyFrames.map((keyFrame) => ({
          content: `url(${keyFrame})`,
        })),
        {
          duration,
          iterations,
          direction,
        }
      );
    }
  }, [name]);

  useEffect(() => {
    mounted.current = true;
    console.log("mounting.....");

    return () => {
      mounted.current = false;
      console.log("unmounting.........");
    };
  }, []);

  return (
    <>
      {keyFrames.length === 1 ? (
        <div
          style={{
            ...style,
            content: `url(${keyFrames[0]})`,
            // backgroundColor: "blue",
          }}
          ref={elementRef}
          className={`${className} sprite`}
        ></div>
      ) : (
        <div
          style={{ ...style }}
          ref={elementRef}
          // ref={}
          className={`${className} sprite`}
        ></div>
      )}
    </>
  );
}

export default Sprite;
