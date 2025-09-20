import React, { useRef, useEffect, useState } from "react";
// Add keyframes for a single bounce
const bounceAnim = `
@keyframes bounceY {
  0%, 100% { transform: translateY(0); }
  20% { transform: translateY(-22px); }
  40% { transform: translateY(0); }
}`;
// Inject keyframes into the document head (only once)
if (typeof window !== 'undefined' && !document.getElementById('bounceY-anim')) {
  const style = document.createElement('style');
  style.id = 'bounceY-anim';
  style.innerHTML = bounceAnim;
  document.head.appendChild(style);
}

const steps = [
  { step: 1, title: "Farmer Uploads Produce", desc: "Farmers add produce details to the blockchain." },
  { step: 2, title: "Distributor Updates Transport", desc: "Distributors log transport and handling info." },
  { step: 3, title: "Retailer Verifies", desc: "Retailers check authenticity and quality." },
  { step: 4, title: "Consumer Scans QR", desc: "Consumers scan QR to trace the journey." },
];


const Workflow = () => {
  const [visible, setVisible] = useState(Array(steps.length).fill(false));
  const stepRefs = useRef([]);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute('data-step'));
          if (entry.isIntersecting) {
            setVisible((prev) => {
              if (prev[idx]) return prev;
              const updated = [...prev];
              updated[idx] = true;
              return updated;
            });
          } else {
            setVisible((prev) => {
              if (!prev[idx]) return prev;
              const updated = [...prev];
              updated[idx] = false;
              return updated;
            });
          }
        });
      },
      { threshold: 0.3 }
    );
    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  // Sequential bounce state
  const [bouncingIdx, setBouncingIdx] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setBouncingIdx((prev) => (prev + 1) % steps.length);
    }, 1200); // 1.2s per bounce, adjust for slower/faster
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-white" id="workflow">
      <div className="max-w-5xl mx-auto px-4">
  <h2 className="text-4xl md:text-5xl font-extrabold text-green-800 text-center tracking-tight mb-4">From Field Event to Consumer Trust</h2>
  <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 text-lg leading-relaxed">Each lifecycle action is captured, validated and surfaced through a transparent, auditable data pipeline.</p>
  <div className="flex flex-col md:flex-row items-stretch justify-center gap-14 w-full">
          {steps.map((s, i) => {
            const isLeft = i % 2 === 0;
            return (
              <div
                key={i}
                ref={el => stepRefs.current[i] = el}
                data-step={i}
                className={`flex-1 flex flex-col items-center relative transition-all duration-700 ease-out min-w-[180px] md:min-h-[220px]
                  ${visible[i]
                    ? 'opacity-100 translate-x-0'
                    : isLeft
                      ? 'opacity-0 -translate-x-16'
                      : 'opacity-0 translate-x-16'}
                `}
              >
                <div className="relative flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-16 h-16 rounded-full bg-green-700 text-white text-2xl font-bold border-4 border-green-100 shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-2xl cursor-pointer mb-4 ${bouncingIdx === i ? 'bouncing' : ''}`}
                    style={{
                      animation: bouncingIdx === i ? 'bounceY 1s cubic-bezier(.77,0,.18,1)' : 'none',
                      boxShadow: '0 6px 24px 0 rgba(34,139,34,0.10)',
                      willChange: 'transform',
                    }}
                  >
                    {s.step}
                  </div>
                  {/* Connecting line between number circles */}
                  {i < steps.length - 1 && (
                    <div
                      className="hidden md:block absolute left-full top-1/2 h-1 bg-green-500 z-0"
                      style={{
                        width: visible[i + 1] ? 112 : 0,
                        transform: 'translateY(-50%) translateX(36px)',
                        transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1)',
                      }}
                    ></div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-green-900 mb-1 text-center">{s.title}</h3>
                <p className="text-gray-700 text-center mb-4">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Workflow;
