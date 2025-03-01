import React from "react";
import { useCallback } from "react";
import Particles from "react-particles";
import { loadFull } from "tsparticles";

const MatrixBackground = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="particles-js"
      init={particlesInit}
      options={{
        background: {
          color: "#000000", // Dark background
        },
        particles: {
          number: {
            value: 120, // Adjust density of particles
            density: {
              enable: true,
              value_area: 900,
            },
          },
          color: {
            value: "#ffffff", // White particles
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.4,
            random: true,
          },
          size: {
            value: 3,
            random: true,
          },
          move: {
            enable: true,
            speed: 1.2,
            direction: "none",
            random: false,
            straight: false,
          },
          interactivity: {
            events: {
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
          },
        },
      }}
      className="fixed top-0 left-0 w-full h-full z-0"
    />
  );
};

export default MatrixBackground;
