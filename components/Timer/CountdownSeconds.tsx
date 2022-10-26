import React, { useEffect, useState, useRef } from "react";
import { random } from "../../lib";

const opacityDuration = 1;

export interface ICountdownSeconds {
  id: string;
  seconds: number;
}

export interface ICountdownSecondsProps extends ICountdownSeconds {
  onAnimationEnd: any;
}

interface IOptionsRef {
  animationDuration: number;
  element: React.MutableRefObject<undefined>;
  onAnimationEnd: any;
  id: string;
}

export const CountdownSeconds = ({
  id,
  seconds,
  onAnimationEnd,
}: ICountdownSecondsProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(1);
  const size = useRef(random(0.7, 1.5));

  const element = useRef();
  const initialOptions: any = useRef({
    animationDuration: random(2, 5),
    element,
    onAnimationEnd,
    id,
  });

  useEffect(() => {
    const { animationDuration, element, onAnimationEnd, id } =
      initialOptions.current;

    element.current.addEventListener("transitionend", (event: any) => {
      if (event.propertyName === "opacity") {
        onAnimationEnd(id);
      }
    });

    setTimeout(() => {
      setPosition((prevState) => ({
        ...prevState,
        x: random(-40, 40),
        y: random(-100, -200),
      }));
    }, 5);

    setTimeout(() => {
      setOpacity(0);
    }, (animationDuration - opacityDuration) * 1000);
  }, []);

  return (
    <div
      style={{
        top: 0,
        color: seconds < 0 ? "red" : "#26F7B1",
        opacity,
        left: "-2rem",
        pointerEvents: "none",
        position: "absolute",
        transform: `translate(calc(-50% + ${position.x}px), calc(-100% + ${position.y}px)) scale(${size.current})`,
        textShadow: "0 0 5px rgba(0, 0, 0, .25)",
        transition: `transform ${initialOptions.current.animationDuration}s linear, opacity ${opacityDuration}s ease-in-out`,
      }}
      ref={element as any}
    >
      {seconds > 0 && "+"}
      {seconds}s
    </div>
  );
};
