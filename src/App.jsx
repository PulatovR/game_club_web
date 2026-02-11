import { useState, useEffect, useRef, memo, useCallback } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

// === 1. КОМПОНЕНТ ЧАСТИЦ С ИКОНКАМИ ===
const BackgroundParticles = memo(() => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const particlesOptions = {
    background: { color: "transparent" },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" },
        // При клике "выплескиваем" новые частицы-иконки
        onClick: { enable: true, mode: "push" }, 
      },
      modes: {
        grab: { distance: 140, links: { opacity: 0.5 } },
        push: { quantity: 6 },
      },
    },
    particles: {
      color: { value: "#FFD700" },
      links: {
        color: "#FFD700",
        distance: 150,
        enable: true,
        opacity: 0.1,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: "none",
        outModes: { default: "bounce" },
      },
      number: {
        density: { enable: true, area: 800 },
        value: 40,
      },
      opacity: { value: 0.4 },
      // === МАГИЯ ИКОНОК ===
      shape: {
        type: ["circle", "image"], // Смешиваем обычные точки и иконки
        options: {
          image: [
            { src: "/icons/joystick.svg", width: 100, height: 100 },
            { src: "/icons/mouse.svg", width: 100, height: 100 },
            { src: "/icons/gamepad.svg", width: 100, height: 100 },
            { src: "/icons/monitor.svg", width: 100, height: 100 }
          ]
        }
      },
      size: { value: { min: 2, max: 8 } }, // Иконки делаем чуть крупнее точек
      
      polygon: {
        enable: true,
        scale: 1,
        type: "outside", 
        url: "/images/collision-mask.png",
        position: { x: 50, y: 55 },
        move: { radius: 10 },
        draw: { enable: false }
      },
    },
    detectRetina: true,
  };

  return (
    <Particles id="tsparticles" init={particlesInit} options={particlesOptions} className="absolute inset-0 z-0" />
  );
});

function App() {
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const audioRef = useRef(new Audio('/audio/space.mp3'));
  
  const [text, setText] = useState('');
  const fullText = "Создаем новую игровую реальность...Спасибо за поддержку...и понимание...";

  // === НОВАЯ ЛОГИКА ТЕКСТА: БЕЗ СТИРАНИЯ ===
  useEffect(() => {
    if (!started) return;
    let i = 0;
    let timer;

    const type = () => {
      if (i <= fullText.length) {
        setText(fullText.slice(0, i));
        i++;
        timer = setTimeout(type, 200);
      } else {
        // Когда текст напечатан полностью — ждем 5 секунд и погнали заново
        timer = setTimeout(() => {
          i = 0;
          type();
        }, 5000);
      }
    };

    type();
    return () => clearTimeout(timer);
  }, [started]);

  const handleStart = () => {
    setStarted(true);
    audioRef.current.loop = true;
    audioRef.current.play().catch(() => {});
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black select-none">
      <BackgroundParticles />

      <AnimatePresence>
        {started && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}
            className="absolute bottom-0 left-0 w-full h-[65%] z-10 flex justify-center items-end pointer-events-none"
          >
            <video 
              src="/video/room.webm" autoPlay loop muted playsInline
              className="w-auto h-full object-contain"
              style={{ filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.5))' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-30 h-full flex flex-col items-center pointer-events-none">
        <motion.img 
          src="/images/depo_logo.png" 
          initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          className="w-[min(70vw,300px)] mt-[10vh] drop-shadow-[0_0_25px_rgba(255,215,0,0.7)]"
        />

        {/* === ПОДСВЕЧЕННЫЙ ТЕКСТ === */}
        {started && (
          <div style={{ 
            marginTop: '5vh',
            color: '#FFD700',
            fontSize: 'clamp(18px, 4vw, 28px)',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            textAlign: 'center',
            // Мощный неоновый эффект
            textShadow: '0 0 10px #FFD700, 0 0 20px #FFD700, 0 0 40px rgba(255, 215, 0, 0.5)' 
          }}>
            {text}<span className="animate-pulse">|</span>
          </div>
        )}
      </div>

      {!started && (
        <div className="absolute inset-0 bg-black/95 z-50 flex justify-center items-center">
          <button
            onClick={handleStart}
            className="px-14 py-6 border-2 border-[#FFD700] text-[#FFD700] rounded-full font-bold text-2xl hover:bg-[#FFD700] hover:text-black transition-all duration-500 shadow-[0_0_40px_rgba(255,215,0,0.5)]"
          >
            Запуск Системы
          </button>
        </div>
      )}

      {started && (
        <button
          onClick={() => { audioRef.current.muted = !audioRef.current.muted; setMuted(!muted); }}
          className="absolute top-6 right-6 p-4 border border-[#FFD700]/30 rounded-full text-[#FFD700] z-[100]"
        >
          {muted ? <VolumeX size={24} /> : <Volume2 size={24} />}
        </button>
      )}

      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent z-20" />
    </div>
  );
}

export default App;