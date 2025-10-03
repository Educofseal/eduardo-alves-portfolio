import React, { useState } from 'react';
import profileImage from '../assets/eduardo_alves_profile.jpg';

/**
 * PixelArtScene
 * - Click "Iniciar Animação" to play/pause
 * - Car: moves left->right with wheel rotation, loops
 * - Blimp: moves left->right slowly with static sign image, loops
 * - Plane: moves right->left fast with marquee banner of project images, loops
 * - Steven Universe inspired pastel gradient background with stars and a straight road
 */
export default function PixelArtScene() {
  const [isPlaying, setIsPlaying] = useState(false);

  const blimpProject = profileImage;

  return (
    <section className="pixel-scene-section">
      <div className="pixel-scene-card">
        <div className="pixel-scene-header">
          <h3>Modo Pixel • Steven Universe</h3>
          <button
            className="pixel-btn"
            onClick={() => setIsPlaying((prev) => !prev)}
            aria-pressed={isPlaying}
          >
            {isPlaying ? 'Pausar' : 'Iniciar Animação'}
          </button>
        </div>

        <div
          className="pixel-scene"
          data-playing={isPlaying ? 'true' : 'false'}
          role="img"
          aria-label="Cena de Pixel Art com carro, dirigível e avião animados"
          onClick={() => setIsPlaying((prev) => !prev)}
          title={`Clique para ${isPlaying ? 'pausar' : 'iniciar'}`}
        >
          {/* Sun + sea + bokeh to match reference */}
          <div className="sun" />
          {/* Stars/sparkles layer */}
          <div className="sky-sparkles" />
          <div className="sea" />
          <div className="bokeh-dots" />
          <div className="city-lights" />

          {/* Mountain silhouette to keep perspective */}
          <div className="mountain" />

          {/* Road - straight path */}
          <div className="road">
            <div className="lane" />
          </div>

          {/* Car */}
          <div className="car">
            <div className="car-body" />
            <div className="wheel wheel-front" />
            <div className="wheel wheel-back" />
          </div>

          {/* Blimp with sign */}
          <div className="blimp">
            <div className="blimp-body" />
            <div className="blimp-fins" />
            <div className="blimp-gondola" />
            <div className="blimp-prop" />
            <div className="blimp-sign">
              <img src={blimpProject} alt="Projeto no letreiro do dirigível" />
            </div>
          </div>

          {/* Plane with banner (text + avatar) */}
          <div className="plane">
            <div className="plane-body" />
            <div className="plane-wing" />
            <div className="plane-tail" />
            <div className="plane-banner">
              <div className="banner-content">
                <img className="banner-avatar" src={profileImage} alt="Avatar" />
                <span className="banner-text">Eduardo Alves</span>
              </div>
            </div>
          </div>

          {/* Corner sparkle */}
          <div className="corner-star" />
        </div>

        <p className="pixel-help">Clique na cena ou no botão para {isPlaying ? 'pausar' : 'iniciar'} a animação.</p>
      </div>
    </section>
  );
}
