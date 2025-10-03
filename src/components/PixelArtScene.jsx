import React, { useEffect, useRef, useState } from 'react';

/**
 * PixelArtScene: looping car, blimp and plane with simple CSS sprites.
 * - Accepts `start` boolean to play/pause animations.
 * - `blimpContent` and `planeContent` render inside signs.
 */
export default function PixelArtScene({ start = true, blimpContent, planeContent }) {
  const sceneRef = useRef(null);
  const [isRunning, setIsRunning] = useState(start);

  useEffect(() => {
    setIsRunning(start);
  }, [start]);

  return (
    <div ref={sceneRef} className="pixel-scene">
      {/* Steven Universe style sky */}
      <div className="su-sky" />

      {/* Ground road - straight path */}
      <div className="road">
        <div className="lane" />
      </div>

      {/* Car */}
      <div className={`car ${isRunning ? 'run' : 'paused'}`}>
        <div className="car-body" />
        <div className="wheel wheel-front" />
        <div className="wheel wheel-back" />
      </div>

      {/* Blimp with marquee content */}
      <div className={`blimp ${isRunning ? 'run' : 'paused'}`}>
        <div className="blimp-body" />
        <div className="blimp-sign">
          {blimpContent || <span>Projeto no dirigível</span>}
        </div>
      </div>

      {/* Plane with banner content */}
      <div className={`plane ${isRunning ? 'run' : 'paused'}`}>
        <div className="plane-body" />
        <div className="plane-banner">
          {planeContent || <span>Projetos passando</span>}
        </div>
      </div>
    </div>
  );
}
