import React, { useEffect, useRef, useState } from 'react';

const featureList = [
  'Cryptographically verifiable product lineage',
  'Fine-grained role & permission orchestration',
  'Integrated ML for pricing & quality insights',
  'Real-time batch tracking & anomaly detection (extensible)',
  'Consumer trust via QR provenance disclosure'
];

const pillars = [
  { title: 'Traceability', desc: 'Every batch action immutably recorded on-chain for auditability.' },
  { title: 'Governance', desc: 'Role-based flows prevent unauthorized operations & ensure compliance.' },
  { title: 'Intelligence', desc: 'ML models surface pricing, quality & risk signals.' },
  { title: 'Trust', desc: 'QR powered consumer stories drive differentiation & loyalty.' }
];

const About = () => {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [cycle, setCycle] = useState(0); // increments each time we newly enter to retrigger delays via data attributes
  const bgRef = useRef(null);
  useEffect(()=>{
    const el = sectionRef.current;
    if(!el) return;
    let leaveTimeout;
    const thresholds = Array.from({length:10},(_,i)=> i/10); // finer granularity reduces missed re-entries
    const io = new IntersectionObserver(([entry])=>{
      if(entry.intersectionRatio > 0.25){
        const wasHidden = !visible;
        setVisible(true);
        if(wasHidden){ setCycle(c=>c+1); }
      } else {
        leaveTimeout = setTimeout(()=> setVisible(false), 140);
      }
    },{threshold:thresholds, rootMargin:'0px 0px -12% 0px'});
    io.observe(el);
    return ()=> { io.disconnect(); clearTimeout(leaveTimeout); };
  },[visible]);

  // Removed cursor parallax effect per request

  // Scroll parallax (background subtle upward shift)
  useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const bg = bgRef.current;
    if(!bg) return;
    let rafId;
    const onScroll = ()=>{
      const rect = sectionRef.current?.getBoundingClientRect();
      if(!rect) return;
      const viewportH = window.innerHeight || 1;
      // progress 0 (below) to 1 (top passed) while in view
      const visibleAmt = Math.min(1, Math.max(0, 1 - rect.top/viewportH));
      const translate = (visibleAmt * -24).toFixed(2);
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(()=>{ bg.style.transform = `translateY(${translate}px)`; });
    };
    window.addEventListener('scroll', onScroll, { passive:true });
    onScroll();
    return ()=>{ window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId); };
  },[]);

  return (
    <div ref={sectionRef} className="relative" id="about">
      <div ref={bgRef} className="absolute inset-0 pointer-events-none opacity-60 will-change-transform" style={{background:'radial-gradient(circle at 30% 20%, #dcfce7 0%, transparent 60%)'}} />
      <div className="relative max-w-6xl mx-auto px-4 md:px-6 py-14">
  <div data-cycle={cycle} className={`grid md:grid-cols-2 gap-12 items-start transition-all duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-green-800 mb-2 relative inline-block">
              <span>Our Mission & Perspective</span>
              <span className={`block h-[3px] mt-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-full w-0 transition-all duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)] ${visible ? '!w-64' : ''}`} aria-hidden="true" />
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-1">Building an open, verifiable backbone for equitable, data‑driven agri supply ecosystems.</p>
            <p className="text-gray-700 leading-relaxed text-base md:text-lg max-w-xl">AgriChain unifies blockchain traceability, role-based governance, and data-driven intelligence to bring radical transparency and operational efficiency to agricultural supply chains. From farm creation events to consumer-facing QR code scans, every action is securely anchored.</p>
            <ul className="space-y-3 text-sm md:text-base pt-2">
              {featureList.map((f,i)=>(
                <li key={i} className={`flex items-start gap-3 transition-all duration-700 [transition-delay:${i*70}ms] ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                  <span className="w-2.5 h-2.5 mt-1 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]" />{f}
                </li>
              ))}
            </ul>
          </div>
          <div className={`space-y-6 bg-white/70 backdrop-blur-sm border border-green-200 rounded-2xl p-6 md:p-8 shadow-sm transition-all duration-[1000ms] ease-[cubic-bezier(.22,1,.36,1)] ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-[.96]'}`}>
            <h3 className="text-xl font-semibold text-green-700 mb-3">Core Pillars</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {pillars.map((p,i)=>(
                <div key={p.title} className={`pillar-card p-4 rounded-lg bg-gradient-to-br from-green-50 to-teal-50 border border-green-100 relative overflow-hidden group transition-all duration-600 will-change-transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{transitionDelay:`${300 + i*90}ms`}}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-[radial-gradient(circle_at_70%_30%,rgba(16,185,129,0.22),transparent_70%)]" />
                  <p className="text-sm font-semibold text-green-700 mb-1 flex items-center gap-1">
                    <span className="inline-block w-2 h-2 rounded-sm bg-emerald-500" />{p.title}
                  </p>
                  <p className="text-xs text-gray-600 leading-relaxed relative z-10">{p.desc}</p>
                </div>
              ))}
            </div>
            <div className={`pt-2 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} style={{transitionDelay:'670ms'}}>
              <p className="text-sm text-gray-600 leading-relaxed">The platform is modular: onboarding new data feeds, certificate registries, IoT sensors, or additional analytics pipelines can be done without restructuring existing batch lifecycles. This future-proofs agricultural digitization efforts.</p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .pillar-card:hover { transform: translateY(-4px) scale(1.015); box-shadow:0 10px 28px -10px rgba(16,185,129,0.22),0 6px 18px -6px rgba(13,148,136,0.18);} 
        @media (prefers-reduced-motion: reduce){
          #about * { transition:none !important; animation:none !important; }
        }
      `}</style>
    </div>
  );
};

export default About;
