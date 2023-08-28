import { useState, useEffect } from "react";
import "./App.scss";

function App() {
  const [volume, setVolume] = useState(40); // Начальное значение громкости
  const [volumeIcons, setvolumeIcons] = useState(true);
  const [currentAudio, setCurrentAudio] = useState("");
  const [activeAudios, setActiveAudios] = useState<
    { id: string; soundName: string }[]
  >([]);

  const playAudio = (audioId: string, soundName: string) => {
    if (volumeIcons) {
      const audio = new Audio(
        document.getElementById(audioId)?.getAttribute("src") || ""
      );
      audio.volume = volume / 100;
      audio.play();
      setCurrentAudio(soundName);
      setActiveAudios([...activeAudios, { id: audioId, soundName }]);
    }
  };

  const toggleVolume = (volumeIcon: boolean) => {
    if (!volumeIcon) {
      setCurrentAudio("");
      setActiveAudios([]);
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      const drumPad = document.querySelector(
        `[data-key*="${key}"]`
      ) as HTMLElement;
      if (drumPad) {
        drumPad.click();
        drumPad.classList.add("drum-pad-active");
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      const drumPad = document.querySelector(`[data-key*="${key}"]`);
      if (drumPad) {
        drumPad.classList.remove("drum-pad-active");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [activeAudios]); // Обновляем обработчики при изменении активных аудио

  return (
    <div id="drum-machine">
      <div className="author">
        IIIWinterIII
        <i className="fas fa-snowflake fa-lg"></i>
      </div>
      <div className="seting-table">
        <div className="volume-set">
          <i
            className={`fas ${
              volumeIcons && volume > 1 ? "fa-volume-up" : "fa-volume-mute"
            }`}
          ></i>
          <label className="switch">
            <input
              type="checkbox"
              onClick={() => {
                toggleVolume(!volumeIcons);
                setvolumeIcons(!volumeIcons);
              }}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div id="display">{currentAudio}</div>
        <div className="display-and-volume-set">
          <div className="volume-display">{volumeIcons ? volume : ''}</div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(event) => setVolume(parseInt(event.target.value))}
          />
        </div>
      </div>
      <div className="pad-bank">
        <div
          className={`drum-pad ${
            activeAudios.some((audio) => audio.id === "Q")
              ? "drum-pad-active"
              : ""
          }`}
          id="Q"
          data-key="ЙQ"
          onClick={() => playAudio("audio-Q", "Heater 1")}
        >
          Q
          <audio
            className="clip"
            id="audio-Q"
            src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
          ></audio>
        </div>
        <div
          className="drum-pad"
          id="W"
          data-key="ЦW"
          onClick={() => playAudio("audio-W", "Heater 2")}
        >
          W
          <audio
            className="clip"
            id="audio-W"
            src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
          ></audio>
        </div>
        <div
          className="drum-pad"
          id="E"
          data-key="УE"
          onClick={() => playAudio("audio-E", "Heater 3")}
        >
          E
          <audio
            className="clip"
            id="audio-E"
            src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
          ></audio>
        </div>
        <div
          className="drum-pad"
          id="A"
          data-key="ФA"
          onClick={() => playAudio("audio-A", "Heater 4")}
        >
          A
          <audio
            className="clip"
            id="audio-A"
            src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
          ></audio>
        </div>
        <div
          className="drum-pad"
          id="S"
          data-key="ЫS"
          onClick={() => playAudio("audio-S", "Clap")}
        >
          S
          <audio
            className="clip"
            id="audio-S"
            src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
          ></audio>
        </div>
        <div
          className="drum-pad"
          id="D"
          data-key="ВD"
          onClick={() => playAudio("audio-D", "Open HH")}
        >
          D
          <audio
            className="clip"
            id="audio-D"
            src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
          ></audio>
        </div>
        <div
          className="drum-pad"
          id="Z"
          data-key="ЯZ"
          onClick={() => playAudio("audio-Z", "Kick n' Hat")}
        >
          Z
          <audio
            className="clip"
            id="audio-Z"
            src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
          ></audio>
        </div>
        <div
          className="drum-pad"
          id="X"
          data-key="ЧX"
          onClick={() => playAudio("audio-X", "Kick")}
        >
          X
          <audio
            className="clip"
            id="audio-X"
            src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
          ></audio>
        </div>
        <div
          className="drum-pad"
          id="C"
          data-key="СC"
          onClick={() => playAudio("audio-C", "Closed HH")}
        >
          C
          <audio
            className="clip"
            id="audio-C"
            src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
          ></audio>
        </div>
      </div>
    </div>
  );
}

export default App;
