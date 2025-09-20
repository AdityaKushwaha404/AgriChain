import React, { useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const problems = [
	{ icon: (
		<svg viewBox="0 0 48 48" className="w-11 h-11" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
			<path d="M24 4 10 10v11c0 11.2 6.7 17.9 14 21 7.3-3.1 14-9.8 14-21V10L24 4Z" className="stroke-rose-500" />
			<path d="M19 19 29 29M29 19 19 29" className="stroke-emerald-600" />
		</svg>
	), title: "Fraud & Tampering", desc: "Altered paper logs and silent edits erode trust.", bullets: ["Post‑shipment log edits","No immutable audit","Slow root‑cause trace"], iconBg: "from-rose-50 to-rose-100" },
	{ icon: (
		<svg viewBox="0 0 48 48" className="w-11 h-11" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="24" cy="24" r="18" className="stroke-amber-500" />
			<path d="M14 30c2.5-3.5 6.5-6 10-6s7.5 2.5 10 6" className="stroke-emerald-600" />
			<path d="M20 18c0 2 1.8 3.5 4 3.5s4-1.5 4-3.5-1.8-3.5-4-3.5-4 1.5-4 3.5Z" className="stroke-amber-600" />
			<path d="M8 16c3 8 3 12 0 20" className="stroke-amber-400" />
			<path d="M40 16c-3 8-3 12 0 20" className="stroke-amber-400" />
		</svg>
	), title: "Middlemen Exploitation", desc: "Layers of intermediaries drain farmer margins.", bullets: ["Hidden stacked fees","Delayed payouts","Low price power"], iconBg: "from-amber-50 to-yellow-100" },
	{ icon: (
		<svg viewBox="0 0 48 48" className="w-11 h-11" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="24" cy="24" r="18" className="stroke-sky-500" />
			<path d="M16 28c1.5 2.5 4.2 4 7.5 4 5.5 0 8.5-3.7 8.5-8.2 0-4.3-3.2-6.8-7.2-6.8-3.8 0-6.3 2-6.3 4.2 0 4.8 10 3.2 10 8.1 0 2.2-2 3.7-4.7 3.7-2.4 0-4.1-1-5.3-2.5M24 14v3" className="stroke-emerald-600" />
		</svg>
	), title: "Unfair Pricing", desc: "Opaque static pricing ignores quality & seasonality.", bullets: ["No quality‑price link","Data locked in silos","Volatile swings unmanaged"], iconBg: "from-sky-50 to-sky-100" },
	{ icon: (
		<svg viewBox="0 0 48 48" className="w-11 h-11" fill="none" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
			<path d="M12 34c3-6 9-10 12-10s9 4 12 10" className="stroke-gray-500" />
			<circle cx="24" cy="18" r="6" className="stroke-emerald-600" />
			<path d="M6 18h6M36 18h6M24 6v4M24 26v4" className="stroke-gray-400" />
			<path d="M18 44h12" className="stroke-emerald-500" />
		</svg>
	), title: "No Traceability", desc: "Origin, handling & certificates stay unverifiable.", bullets: ["Origin claims unproven","Fragmented certificates","Low consumer trust"], iconBg: "from-gray-50 to-gray-100" }
];

const cardVariants = {
	hidden: { opacity: 0, y: 18 },
	show: (i) => ({
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.5,
			ease: [0.25, 0.8, 0.4, 1],
			delay: i * 0.06
		}
	})
};

const pillVariants = {
	hidden: { opacity: 0 },
	show: (i) => ({
		opacity: 1,
		transition: { duration: 0.35, ease: [0.3,0.9,0.4,1], delay: 0.22 + i * 0.04 }
	})
};

const Problem = () => {
	const sectionRef = useRef(null);
	const inView = useInView(sectionRef, { amount: 0.35, margin: "0px 0px -10% 0px" });
	const controls = useAnimation();
	useEffect(()=>{ controls.start(inView ? 'show' : 'hidden'); },[inView, controls]);
	return (
	<section ref={sectionRef} className="relative py-24 md:py-28 overflow-hidden bg-[radial-gradient(circle_at_18%_22%,rgba(16,185,129,0.12),transparent_60%),radial-gradient(circle_at_82%_35%,rgba(45,212,191,0.16),transparent_65%),linear-gradient(to_bottom_right,#ffffff,#f8fef9,#f5fdfb)]" id="problems">
		{/* Ambient soft mesh */}
		<div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.7]">
			<div className="absolute -top-24 -right-24 w-[480px] h-[480px] rounded-full bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 blur-3xl opacity-35" />
			<div className="absolute top-1/2 -left-32 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-lime-100 via-green-100 to-emerald-100 blur-3xl opacity-30" />
			<div className="absolute bottom-[-180px] left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-amber-100 via-yellow-100 to-lime-100 blur-3xl opacity-30" />
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.10),transparent_72%)]" />
		</div>
		<div className="relative max-w-7xl mx-auto px-4">
			<div className={`transition-all duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}> 
				<h2 className="relative inline-block w-full text-3xl md:text-4xl font-extrabold text-green-800 text-center tracking-tight mb-6">
					<span className="relative inline-block">
						Root Frictions Holding Agriculture Back
						<span className="block h-[3px] mt-3 mx-auto w-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 rounded-full transition-all duration-[950ms] ease-[cubic-bezier(.22,1,.36,1)] delay-200 ${inView ? '!w-56' : ''}" aria-hidden="true" />
					</span>
				</h2>
				<p className="max-w-3xl mx-auto text-center text-gray-600 mb-12 text-base md:text-lg leading-relaxed">Structural opacity and manual hand‑offs erode value, distort incentives and block verifiable provenance across the chain.</p>
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-9 md:gap-14 place-items-stretch">
				{problems.map((p, i) => (
					<motion.div
						key={i}
						className="relative flex flex-col group will-change-transform transition px-1 transform-gpu perspective-[1200px]"
						style={{ minHeight: 190 }}
						initial="hidden"
						animate={controls}
						custom={i}
						variants={cardVariants}
						whileHover={{ y: -4, scale: 1.012, rotateX: 2.2, rotateY: -2.2 }}
						transition={{ duration: 0.4, ease: [0.33,1,0.68,1] }}
					>
						<div className="flex items-start gap-3.5 mb-2.5">
							<div className="relative">
								<div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${p.iconBg} ring-1 ring-black/5 shadow-sm transition-transform group-hover:scale-105`}>{p.icon}</div>
								<div className="absolute -inset-1 rounded-3xl bg-[radial-gradient(circle_at_60%_40%,rgba(16,185,129,0.35),rgba(20,184,166,0)_70%)] opacity-0 group-hover:opacity-60 blur-lg transition" />
							</div>
							<div className="flex-1 pt-0.5">
								<h3 className="text-[15px] font-semibold text-green-900 leading-snug tracking-tight mb-0.5">{p.title}</h3>
								<p className="text-gray-600 text-[12.5px] md:text-[13.5px] leading-relaxed pr-0.5 tracking-tight">{p.desc}</p>
							</div>
						</div>
						<ul className="flex flex-wrap gap-1.5 mt-2 pl-[4.25rem]">
							{p.bullets.map((b, bi) => (
								<motion.li
									key={bi}
									className="px-2.5 py-1 rounded-full bg-white/70 backdrop-blur text-emerald-700 text-[10px] font-medium tracking-tight ring-1 ring-emerald-100 hover:bg-emerald-50 transition whitespace-nowrap"
									initial="hidden"
									animate={controls}
									custom={bi}
									variants={pillVariants}
								>{b}</motion.li>
							))}
						</ul>
						{/* Vertical accent line removed as requested */}
					</motion.div>
				))}
			</div>
		</div>
		<style>{`
			@media (prefers-reduced-motion: reduce){
				#problems * { animation: none !important; transition: none !important; }
			}
		`}</style>
	</section>
  );
};

export default Problem;