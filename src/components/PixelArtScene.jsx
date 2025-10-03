import React from 'react';

/**
 * PixelArtScene (static background only)
 * - Steven Universe inspired pastel gradient background
 * - Static sparkles, mountain silhouette and straight road
 */
export default function PixelArtScene() {
  return (
    <section className="pixel-scene-section">
      <div className="pixel-scene-card">
        <div
          className="pixel-scene"
          role="img"
          aria-label="Fundo de Pixel Art estilo Steven Universe"
        >
          <div className="sky-sparkles" />
          <div className="mountain" />
          <div className="road">
            <div className="lane" />
          </div>
        </div>
      </div>
    </section>
  );
}
