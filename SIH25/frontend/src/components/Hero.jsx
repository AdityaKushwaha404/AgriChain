import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
	const navigate = useNavigate();
	const [show, setShow] = useState(false);
	const [donutKey, setDonutKey] = useState(0); // increments to force re-mount of donut for animation replay
	const sectionRef = useRef(null);
	const snapshotRef = useRef(null);

	useEffect(() => {
		setShow(false);
		const observer = new window.IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					// trigger show then bump key so donut re-mounts and animations restart
					setTimeout(() => {
						setShow(true);
						setDonutKey(k => k + 1);
					}, 80);
				} else {
					setShow(false);
				}
			},
			{ threshold: 0.45 }
		);
		if (sectionRef.current) observer.observe(sectionRef.current);
		return () => observer.disconnect();
	}, []);

	// Dynamic cursor-based tilt for snapshot card
	useEffect(() => {
		const el = snapshotRef.current;
		if (!el) return;
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // honor reduced motion
		let rafId;
		const donutText = el.querySelector('.donut-text');
		const handleMove = (e) => {
			const rect = el.getBoundingClientRect();
			const x = (e.clientX - rect.left) / rect.width; // 0..1
			const y = (e.clientY - rect.top) / rect.height; // 0..1
			// Map to rotation ranges
			const rotateY = (x - 0.5) * 18; // horizontal movement rotates Y
			const rotateX = (0.5 - y) * 16; // vertical movement rotates X
			const scale = 1.045;
			const transform = `perspective(1100px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale(${scale})`;
			// Parallax for donut text (subtle, inverse to cursor for depth)
			if (donutText) {
				const maxX = 14; // px
				const maxY = 10; // px
				const tx = (0.5 - x) * maxX;
				const ty = (0.5 - y) * maxY;
				donutText.style.setProperty('--dx', tx.toFixed(2) + 'px');
				donutText.style.setProperty('--dy', ty.toFixed(2) + 'px');
			}
			cancelAnimationFrame(rafId);
			rafId = requestAnimationFrame(() => { el.style.transform = transform; });
		};
		const reset = () => {
			el.style.transform = '';
			if (donutText) {
				donutText.style.setProperty('--dx', '0px');
				donutText.style.setProperty('--dy', '0px');
			}
		};
		el.addEventListener('pointermove', handleMove);
		el.addEventListener('pointerleave', reset);
		return () => {
			el.removeEventListener('pointermove', handleMove);
			el.removeEventListener('pointerleave', reset);
			cancelAnimationFrame(rafId);
		};
	}, []);

	return (
		<section aria-label="Hero" ref={sectionRef} className="relative overflow-hidden pt-40 pb-28 md:pt-44 md:pb-40 bg-[radial-gradient(circle_at_20%_25%,rgba(16,185,129,0.18),transparent_60%),radial-gradient(circle_at_85%_30%,rgba(45,212,191,0.18),transparent_65%),linear-gradient(to_bottom_right,#f8fff9,#f4fdfb,#fefcf6)]">
			{/* Ambient mesh / gradient shapes */}
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -top-32 -left-28 w-[720px] h-[720px] bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 rounded-full blur-3xl opacity-50" />
				<div className="absolute top-1/3 -right-40 w-[640px] h-[640px] bg-gradient-to-br from-amber-100 via-yellow-100 to-lime-100 rounded-full blur-3xl opacity-40" />
				<div className="absolute bottom-[-260px] left-1/4 w-[780px] h-[780px] bg-gradient-to-br from-teal-100 via-green-100 to-emerald-100 rounded-full blur-3xl opacity-35" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.12),transparent_70%)]" />
			</div>
			<div className={`relative max-w-7xl mx-auto px-5 md:px-8 transition-all duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}> 
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">
					<div className="relative z-10 lg:col-span-7 flex flex-col items-start text-left">
						<p className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur text-emerald-700 text-[12px] font-semibold ring-1 ring-emerald-200 mb-6 tracking-wide shadow-sm">
							<span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Real-Time Produce Integrity
						</p>
						<h1 className="text-4xl md:text-6xl xl:text-[4.1rem] font-extrabold leading-[1.05] tracking-tight text-green-900 mb-6">
							<span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700">Rebuilding Trust</span><br className="hidden md:block" />
							Across Agricultural Value Chains
						</h1>
						<p className="text-lg md:text-xl text-gray-700/90 leading-relaxed max-w-2xl mb-9">
							A unified transparency and intelligence layer: cryptographically anchored batches, event-level traceability, ML‑driven pricing insight and consumer QR provenance— accelerating fairness, compliance and brand trust.
						</p>
						<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10">
							<button onClick={()=>navigate('/transparency')} className="relative inline-flex items-center justify-center px-8 py-3.5 rounded-full font-semibold text-white text-sm md:text-base shadow-lg bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-600 hover:to-teal-500 focus:outline-none transition-transform duration-300 hover:scale-[1.04] ring-1 ring-emerald-300/50">
								<span className="relative z-10">Launch Transparency Portal</span>
								<span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/0 via-teal-400/10 to-emerald-400/0 opacity-0 hover:opacity-100 transition" />
							</button>
							<button
								onClick={()=>document.getElementById('features')?.scrollIntoView({behavior:'smooth'})}
								className="group relative inline-flex items-center gap-2.5 justify-center px-8 py-3.5 rounded-full font-semibold text-sm md:text-base
								bg-white/70 backdrop-blur text-emerald-700 ring-1 ring-emerald-200 shadow-sm
								before:absolute before:inset-0 before:rounded-full before:p-[1.5px] before:bg-gradient-to-r before:from-emerald-400/60 before:via-teal-400/40 before:to-emerald-400/60 before:opacity-0 hover:before:opacity-100 before:transition
								after:absolute after:inset-[2px] after:rounded-full after:bg-white/80 after:transition group-hover:after:bg-white
								overflow-hidden transition-colors">
								<span className="relative z-10 flex items-center gap-2">
									<span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 animate-pulse" />
									<span>Explore Features</span>
									<svg className="w-4 h-4 text-emerald-600 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></svg>
								</span>
							</button>
						</div>
						<ul className="flex flex-wrap gap-6 md:gap-10 text-sm text-gray-600/90">
							<li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"/>On‑Chain Provenance</li>
							<li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-teal-500"/>Role Governance</li>
							<li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"/>ML Price Insight</li>
							<li className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-sky-500"/>Consumer QR</li>
						</ul>
					</div>
					<div className="relative lg:col-span-5 flex items-center justify-center">
						<div ref={snapshotRef} className={`snapshot-card group relative w-full max-w-md aspect-[5/6] rounded-[2.5rem] p-[1px] bg-gradient-to-br from-emerald-400/40 via-teal-400/20 to-emerald-400/0 shadow-xl overflow-hidden transition-all duration-[1100ms] ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}> 
							<div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/55 to-white/30 backdrop-blur-xl" />
							<div className="absolute -top-32 -left-16 w-72 h-72 bg-gradient-to-br from-emerald-200 via-teal-200 to-cyan-100 rounded-full blur-3xl opacity-50 animate-pulse" />
							<div className="absolute bottom-[-60px] right-[-40px] w-80 h-80 bg-gradient-to-br from-amber-100 via-yellow-100 to-lime-100 rounded-full blur-3xl opacity-40" />
								<div className="relative z-10 h-full flex flex-col p-8">
									<div>
									<h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 mb-5">Platform Snapshot</h3>
									<ul className="space-y-5 text-[13px] font-medium text-gray-700">
										<li className="flex items-start gap-3"><span className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 text-sm">✓</span><span>Immutable batch creation + custody transitions</span></li>
										<li className="flex items-start gap-3"><span className="w-6 h-6 rounded-lg bg-teal-100 flex items-center justify-center text-teal-600 text-sm">✓</span><span>Quality & price linkage enriched by ML signals</span></li>
										<li className="flex items-start gap-3"><span className="w-6 h-6 rounded-lg bg-amber-100 flex items-center justify-center text-amber-600 text-sm">✓</span><span>Role & permission gating for lifecycle integrity</span></li>
										<li className="flex items-start gap-3"><span className="w-6 h-6 rounded-lg bg-sky-100 flex items-center justify-center text-sky-600 text-sm">✓</span><span>Consumer QR scan: origin, handling & freshness</span></li>
									</ul>
									</div>
									{/* Donut integrity visualization (condensed, no duplicate legend) */}
									<div className="flex-1 flex items-center justify-center py-4">
										<div className="relative donut-wrap">
											<svg key={donutKey} width="160" height="160" viewBox="0 0 200 200" className="overflow-visible donut-svg" role="img" aria-label="Platform integrity distribution: tracking, ML, governance and QR provenance">
												<title>Platform Integrity Distribution</title>
												<desc>Four animated ring segments visualize core integrity pillars: tracking, machine learning augmentation, role governance, and consumer QR provenance.</desc>
												<defs>
													<linearGradient id="gradTrack" x1="0%" y1="0%" x2="100%" y2="100%">
														<stop offset="0%" stopColor="#34d399" />
														<stop offset="100%" stopColor="#14b8a6" />
													</linearGradient>
													<linearGradient id="gradML" x1="0%" y1="0%" x2="100%" y2="100%">
														<stop offset="0%" stopColor="#2dd4bf" />
														<stop offset="100%" stopColor="#0ea5e9" />
													</linearGradient>
													<linearGradient id="gradGov" x1="0%" y1="0%" x2="100%" y2="100%">
														<stop offset="0%" stopColor="#fbbf24" />
														<stop offset="100%" stopColor="#f59e0b" />
													</linearGradient>
													<linearGradient id="gradQR" x1="0%" y1="0%" x2="100%" y2="100%">
														<stop offset="0%" stopColor="#38bdf8" />
														<stop offset="100%" stopColor="#3b82f6" />
													</linearGradient>
												</defs>
											{/* Base ring */}
											<circle cx="100" cy="100" r="70" stroke="#e2e8f0" strokeWidth="14" fill="none" className="donut-base" />
											{/* Segments */}
											<circle cx="100" cy="100" r="70" stroke="url(#gradTrack)" strokeWidth="14" fill="none" strokeDasharray="440" strokeDashoffset="0" strokeLinecap="round" className="[animation:dash1_1.8s_ease_.2s_forwards] opacity-0" />
											<circle cx="100" cy="100" r="70" stroke="url(#gradML)" strokeWidth="14" fill="none" strokeDasharray="440" strokeDashoffset="110" strokeLinecap="round" className="[animation:dash2_1.8s_ease_.4s_forwards] opacity-0" />
											<circle cx="100" cy="100" r="70" stroke="url(#gradGov)" strokeWidth="14" fill="none" strokeDasharray="440" strokeDashoffset="220" strokeLinecap="round" className="[animation:dash3_1.8s_ease_.6s_forwards] opacity-0" />
											<circle cx="100" cy="100" r="70" stroke="url(#gradQR)" strokeWidth="14" fill="none" strokeDasharray="440" strokeDashoffset="330" strokeLinecap="round" className="[animation:dash4_1.8s_ease_.8s_forwards] opacity-0" />
											<text x="100" y="104" textAnchor="middle" className="fill-green-800 font-semibold donut-text" fontSize="20">Integrity</text>
										</svg>
										</div>
									</div>
									<div className="grid grid-cols-3 gap-4 pt-5 mt-auto border-t border-emerald-200/40 text-center">
									<div className="flex flex-col"><span className="text-2xl font-bold text-green-800">100+</span><span className="text-[11px] font-semibold tracking-wide text-emerald-700/80 mt-1">Farm Nodes</span></div>
									<div className="flex flex-col"><span className="text-2xl font-bold text-green-800">500+</span><span className="text-[11px] font-semibold tracking-wide text-emerald-700/80 mt-1">Product Lots</span></div>
									<div className="flex flex-col"><span className="text-2xl font-bold text-green-800">100%</span><span className="text-[11px] font-semibold tracking-wide text-emerald-700/80 mt-1">On‑Chain Proof</span></div>
									</div>
							</div>
						</div>
					</div>
			</div>
		</div>
			<style>{`
					.snapshot-card { transition: transform .9s cubic-bezier(.22,1,.36,1), box-shadow .6s; }
					.snapshot-card:hover { box-shadow:0 18px 48px -12px rgba(16,185,129,0.35),0 8px 22px -6px rgba(13,148,136,0.25); }
					.snapshot-card::after { content:""; position:absolute; inset:0; background:radial-gradient(circle at 65% 35%,rgba(16,185,129,.08),transparent 60%); opacity:0; transition:opacity .6s; }
					.snapshot-card:hover::after { opacity:1; }
					.donut-wrap { transition: transform 1.2s cubic-bezier(.22,1,.36,1); }
					.snapshot-card:hover .donut-wrap { transform: scale(1.06) rotate(-4deg); }
					.donut-svg { filter: drop-shadow(0 4px 10px rgba(16,185,129,.25)); transition: filter .6s; }
					.snapshot-card:hover .donut-svg { filter: drop-shadow(0 6px 18px rgba(13,148,136,.35)); }
					.snapshot-card:hover .donut-base { stroke: #d1fae5; }
					.snapshot-card:hover [animation^=dash] { animation-play-state: running; }
					.donut-text { --dx:0px; --dy:0px; transition: transform .8s cubic-bezier(.22,1,.36,1); transform: translate(var(--dx), var(--dy)); }
					.snapshot-card:hover .donut-text { transform: translate(var(--dx), var(--dy)) scale(1.08); }
					@media (prefers-reduced-motion: reduce){
						.snapshot-card:hover { transform:none; }
						.donut-wrap, .donut-text { transform:none !important; }
					}
					@keyframes dash1 { 0% { stroke-dashoffset: 440; opacity:0 } 100% { stroke-dashoffset: 0; opacity:1 } }
					@keyframes dash2 { 0% { stroke-dashoffset: 440; opacity:0 } 100% { stroke-dashoffset: 110; opacity:1 } }
					@keyframes dash3 { 0% { stroke-dashoffset: 440; opacity:0 } 100% { stroke-dashoffset: 220; opacity:1 } }
					@keyframes dash4 { 0% { stroke-dashoffset: 440; opacity:0 } 100% { stroke-dashoffset: 330; opacity:1 } }
					[animation:dash1_1.8s_ease_.2s_forwards] { animation: dash1 1.8s ease .2s forwards; }
					[animation:dash2_1.8s_ease_.4s_forwards] { animation: dash2 1.8s ease .4s forwards; }
					[animation:dash3_1.8s_ease_.6s_forwards] { animation: dash3 1.8s ease .6s forwards; }
					[animation:dash4_1.8s_ease_.8s_forwards] { animation: dash4 1.8s ease .8s forwards; }
				@media (prefers-reduced-motion: reduce){
					section[aria-label="Hero"] * { animation: none !important; transition: none !important; }
				}
			`}</style>
		</section>
	);
};

export default Hero;