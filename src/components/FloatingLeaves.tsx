import { motion } from "framer-motion";

const leaves = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: Math.random() * 20 + 15,
  initialX: Math.random() * 100,
  initialY: Math.random() * 100,
  duration: Math.random() * 15 + 20,
  delay: Math.random() * 5,
  rotation: Math.random() * 360,
}));

export function FloatingLeaves() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {leaves.map((leaf) => (
        <motion.div
          key={leaf.id}
          className="absolute text-tea-400/30"
          style={{
            left: `${leaf.initialX}%`,
            top: `${leaf.initialY}%`,
            fontSize: leaf.size,
          }}
          animate={{
            y: [0, -200, 0],
            x: [0, Math.sin(leaf.id) * 100, 0],
            rotate: [leaf.rotation, leaf.rotation + 360, leaf.rotation],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: leaf.duration,
            delay: leaf.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🍃
        </motion.div>
      ))}
    </div>
  );
}
