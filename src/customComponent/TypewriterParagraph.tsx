"use client";
import Typewriter from "typewriter-effect";

interface Props {
  onDone: () => void;
}

const TypewriterParagraph = ({ onDone }: Props) => {
  return (
    <Typewriter
      onInit={(typewriter) => {
        typewriter
          .typeString("_Hello. Welcome to Library Explorer..!")
          .pauseFor(500)
          .callFunction(() => {
            onDone(); // Notify parent when done
          })
          .start();
      }}
      options={{
          autoStart: false,
          loop: false,
          delay: 50,
          cursor: "_",
        }}
    />
  );
};

export default TypewriterParagraph;
