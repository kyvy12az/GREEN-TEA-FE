import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const getPupilOffset = (eyeOffsetX: number, eyeOffsetY: number) => {
    if (!containerRef.current) return { x: 0, y: 0 };

    const rect = containerRef.current.getBoundingClientRect();
    const eyeCenterX = rect.left + rect.width / 2 + eyeOffsetX;
    const eyeCenterY = rect.top + rect.height / 2 + eyeOffsetY;

    const deltaX = mousePosition.x - eyeCenterX;
    const deltaY = mousePosition.y - eyeCenterY;
    const angle = Math.atan2(deltaY, deltaX);
    const distance = Math.min(Math.hypot(deltaX, deltaY) / 30, 1);

    const maxOffset = 3;
    return {
      x: Math.cos(angle) * maxOffset * distance,
      y: Math.sin(angle) * maxOffset * distance,
    };
  };

  const leftPupil = getPupilOffset(-16, -20);
  const rightPupil = getPupilOffset(16, -20);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      {/* Lá trà với mắt */}
      <div ref={containerRef} className="relative mb-8">
        {/* SVG Lá trà */}
        <svg
          width="160"
          height="200"
          viewBox="0 0 160 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-tea-500"
        >
          {/* Cuống lá */}
          <path
            d="M80 200 Q80 170 80 160"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          {/* Thân lá */}
          <path
            d="M80 20 
               C 20 40, 10 100, 40 140 
               Q 60 165, 80 160 
               Q 100 165, 120 140 
               C 150 100, 140 40, 80 20"
            fill="currentColor"
          />
          {/* Gân lá giữa */}
          <path
            d="M80 30 Q80 90 80 150"
            stroke="hsl(var(--tea-600))"
            strokeWidth="2"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />
          {/* Gân lá trái */}
          <path
            d="M80 60 Q60 70 45 90"
            stroke="hsl(var(--tea-600))"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M80 90 Q55 100 40 120"
            stroke="hsl(var(--tea-600))"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />
          {/* Gân lá phải */}
          <path
            d="M80 60 Q100 70 115 90"
            stroke="hsl(var(--tea-600))"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />
          <path
            d="M80 90 Q105 100 120 120"
            stroke="hsl(var(--tea-600))"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.3"
          />
        </svg>

        {/* Mắt trái */}
        <div
          className="absolute w-7 h-7 bg-white rounded-full shadow-sm flex items-center justify-center"
          style={{ top: "55px", left: "48px" }}
        >
          <div
            className="w-3 h-3 bg-tea-800 rounded-full transition-transform duration-100 ease-out"
            style={{
              transform: `translate(${leftPupil.x}px, ${leftPupil.y}px)`,
            }}
          />
        </div>

        {/* Mắt phải */}
        <div
          className="absolute w-7 h-7 bg-white rounded-full shadow-sm flex items-center justify-center"
          style={{ top: "55px", right: "48px" }}
        >
          <div
            className="w-3 h-3 bg-tea-800 rounded-full transition-transform duration-100 ease-out"
            style={{
              transform: `translate(${rightPupil.x}px, ${rightPupil.y}px)`,
            }}
          />
        </div>
      </div>

      {/* Text content */}
      <h1 className="text-7xl font-bold text-tea-700 mb-3">404</h1>
      <p className="text-tea-600 text-lg mb-8 text-center">
        Trang bạn tìm kiếm không tồn tại
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-tea-500 text-white rounded-full font-medium hover:bg-tea-600 transition-colors duration-200"
      >
        Về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
