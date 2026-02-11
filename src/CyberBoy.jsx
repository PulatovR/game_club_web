import { motion } from 'framer-motion';

const CyberBoy = () => {
  return (
    <div className="relative w-full h-full flex justify-center items-end">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(255,215,0,0.4)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* КОРПУС МОНИТОРА И СТОЛ */}
        <path d="M450 150 L600 150 L600 350 L450 350 Z" stroke="#FFD700" strokeWidth="2" />
        <path d="M300 450 L700 450" stroke="#FFD700" strokeWidth="3" />

        {/* ЭКРАН С БЕГУЩИМ КОДОМ */}
        <mask id="screenMask">
          <rect x="460" y="160" width="130" height="180" fill="white" />
        </mask>
        <g mask="url(#screenMask)">
          {[...Array(10)].map((_, i) => (
            <motion.rect
              key={i}
              x="470"
              y={170 + i * 20}
              width={Math.random() * 80 + 20}
              height="2"
              fill="#FFD700"
              initial={{ x: -100 }}
              animate={{ x: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
            />
          ))}
        </g>

        {/* ПАЦАН И КРЕСЛО (Упрощенный контур по твоему референсу) */}
        <path d="M350 300 Q320 250 350 200 Q380 250 350 300" stroke="#FFD700" strokeWidth="2" /> {/* Голова */}
        <path d="M300 550 L350 450 L400 550" stroke="#FFD700" strokeWidth="2" /> {/* Ножки кресла */}

        {/* ПАЛЬЦЫ В ДВИЖЕНИИ */}
        <motion.path
          d="M420 400 L440 390"
          stroke="#FFD700"
          strokeWidth="3"
          animate={{ y: [0, -5, 0], x: [0, 2, 0] }}
          transition={{ repeat: Infinity, duration: 0.15 }}
        />
        <motion.path
          d="M425 410 L445 400"
          stroke="#FFD700"
          strokeWidth="3"
          animate={{ y: [0, -4, 0], x: [0, -2, 0] }}
          transition={{ repeat: Infinity, duration: 0.1, delay: 0.05 }}
        />

        {/* ДЫМ НАД КОФЕ */}
        <g opacity="0.6">
          {[0, 1, 2].map((i) => (
            <motion.path
              key={i}
              d={`M ${650 + i * 5} 410 Q ${655 + i * 5} 390 ${650 + i * 5} 370`}
              stroke="#FFD700"
              strokeWidth="1"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: -20, opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: i * 0.6 }}
            />
          ))}
        </g>
        
        {/* КРУЖКА */}
        <path d="M640 410 L670 410 L670 435 L640 435 Z" stroke="#FFD700" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default CyberBoy;