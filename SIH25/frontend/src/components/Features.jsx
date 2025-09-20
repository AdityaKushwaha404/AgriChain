import React, { useRef, useEffect, useState } from "react";

// Simple SVG icon set for visual consistency (tailwind utility stroke colors)
const iconSet = {
	transparency: (
		<svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" strokeWidth="2.2" strokeLinecap="round">
			<rect x="6" y="6" width="36" height="36" rx="6" className="stroke-emerald-500" />
			<path d="M16 24h16M24 16v16" className="stroke-teal-500" />
		</svg>
	),
	pricing: (
		<svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" strokeWidth="2" strokeLinecap="round">
			<circle cx="24" cy="24" r="18" className="stroke-green-500" />
			<path d="M19 19c0-2.2 2-4 5-4s5 1.2 5 3c0 5-10 3.5-10 9 0 2.3 2.4 4 5 4 2.6 0 4.6-1.3 4.9-3.2M24 14v20" className="stroke-emerald-600" />
		</svg>
	),
	fraud: (
		<svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M24 6 8 14v8c0 9.5 6.8 18.3 16 20 9.2-1.7 16-10.5 16-20v-8L24 6Z" className="stroke-rose-500" />
			<path d="M20 24l3 3 6-6" className="stroke-emerald-600" />
		</svg>
	),
	trace: (
		<svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="24" cy="24" r="10" className="stroke-lime-600" />
			<path d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4.5 4.5M38 38l-4.5-4.5M10 38l4.5-4.5M38 10l-4.5 4.5" className="stroke-emerald-500" />
		</svg>
	),
	roles: (
		<svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="16" cy="20" r="6" className="stroke-pink-500" />
			<circle cx="32" cy="20" r="6" className="stroke-fuchsia-500" />
			<path d="M8 38c1.2-6 5.5-10 8-10m16 0c2.5 0 6.8 4 8 10" className="stroke-emerald-600" />
			<path d="M24 24v-4M24 20v-6M24 14l2-2M24 14l-2-2" className="stroke-emerald-500" />
		</svg>
	),
	ml: (
		<svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<rect x="8" y="12" width="32" height="24" rx="4" className="stroke-indigo-500" />
			<path d="M16 20h2v8h-2zm7 0h2v8h-2zm7 0h2v8h-2z" className="stroke-indigo-600" />
			<path d="M12 12V8m24 4V8M12 36v4m24-4v4" className="stroke-indigo-400" />
		</svg>
	),
	qr: (
		<svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<rect x="8" y="8" width="14" height="14" rx="2" className="stroke-amber-500" />
			<rect x="26" y="8" width="14" height="14" rx="2" className="stroke-amber-600" />
			<rect x="8" y="26" width="14" height="14" rx="2" className="stroke-amber-600" />
			<path d="M30 26h10v6M30 32v8m4-8v8m6-2h-6" className="stroke-emerald-600" />
		</svg>
	),
	cloud: (
		<svg viewBox="0 0 48 48" className="w-10 h-10" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M18 36c-5.5 0-10-4.5-10-10 0-4.8 3.4-8.9 8-9.8A10 10 0 0 1 38 22c.1 0 .2 0 .3 0A8 8 0 0 1 38 36H18Z" className="stroke-gray-500" />
		</svg>
	),
};

const features = [
	{ icon: iconSet.transparency, title: "End‑to‑End Transparency", desc: "Every batch creation, transfer, quality update and pricing action is cryptographically anchored. Stakeholders no longer rely on emailed spreadsheets or unverifiable claims— provenance is visible in near real time.", iconBg: "bg-blue-50" },
	{ icon: iconSet.pricing, title: "Fair & Automated Pricing", desc: "Smart contracts release payments instantly on milestone completion while ML models surface optimal price bands based on quality, seasonality and historical trends.", iconBg: "bg-green-50" },
	{ icon: iconSet.fraud, title: "Tamper & Fraud Resistance", desc: "Immutable ledger entries plus role gating eliminate silent edits. Anomalies and duplicated batch IDs are instantly flaggable.", iconBg: "bg-rose-50" },
	{ icon: iconSet.trace, title: "Granular Traceability", desc: "Drill from consumer QR scan back to seed origin, handling events, quality scores and custody trail— enabling certification alignment.", iconBg: "bg-lime-50" },
	{ icon: iconSet.roles, title: "Role‑Based Governance", desc: "Fine‑grained permissions ensure only authorized actors perform sensitive lifecycle transitions across the chain.", iconBg: "bg-pink-50" },
	{ icon: iconSet.ml, title: "ML Insights & Forecasting", desc: "Models surface quality classification, price forecasting and anomaly signals directly in operational dashboards.", iconBg: "bg-indigo-50" },
	{ icon: iconSet.qr, title: "QR Code Provenance", desc: "Consumer‑facing codes reveal origin, sustainability notes, handling integrity and freshness indicators.", iconBg: "bg-amber-50" },
	{ icon: iconSet.cloud, title: "Cloud Native & Scalable", desc: "Modular, container‑ready services scale horizontally with plug‑in adapters for IoT and certificates.", iconBg: "bg-gray-50" },
];

const animationDelays = [0, 80, 160, 240, 320, 400, 480, 560];

const Features = () => {
	const sectionRef = useRef(null);
	const [inView, setInView] = useState(false);

	useEffect(() => {
		const observer = new window.IntersectionObserver(
			([entry]) => setInView(entry.isIntersecting),
			{ threshold: 0.2 }
		);
		if (sectionRef.current) observer.observe(sectionRef.current);
		return () => observer.disconnect();
	}, []);

	return (
		<section className="relative py-20 md:py-24 overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(16,185,129,0.18),transparent_60%),radial-gradient(circle_at_80%_30%,rgba(45,212,191,0.18),transparent_65%),linear-gradient(to_bottom_right,#f8fff9,#f3fdfb,#fefcf5)]" id="features" ref={sectionRef}>
			{/* Ambient mesh / soft blobs */}
			<div className="pointer-events-none absolute inset-0 opacity-[0.65] mix-blend-multiply">
				<div className="absolute -top-24 -left-20 w-[520px] h-[520px] bg-gradient-to-br from-emerald-200 via-teal-200 to-cyan-100 rounded-full blur-3xl opacity-40" />
				<div className="absolute top-1/3 -right-28 w-[460px] h-[460px] bg-gradient-to-br from-amber-100 via-yellow-100 to-lime-100 rounded-full blur-3xl opacity-35" />
				<div className="absolute bottom-[-180px] left-1/4 w-[520px] h-[520px] bg-gradient-to-br from-teal-100 via-emerald-100 to-green-100 rounded-full blur-3xl opacity-30" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(16,185,129,0.12),transparent_70%)]" />
			</div>
			<div className="relative max-w-7xl mx-auto px-4">
				<h2 className="text-4xl md:text-5xl font-extrabold text-green-800 text-center tracking-tight mb-4">Unified Trust & Intelligence Layer</h2>
				<p className="max-w-3xl mx-auto text-center text-gray-600 mb-10 text-lg leading-relaxed">A composable stack fusing blockchain integrity, governed workflows and predictive ML— eliminating fragmentation while accelerating compliance readiness, operational efficiency and consumer trust.</p>
				<div className="flex flex-wrap justify-center gap-10">
					{features.map((f, i) => (
						<div
							key={i}
							className={`w-full sm:w-[300px] flex flex-col items-center p-6 bg-white rounded-3xl shadow-lg border border-green-100 relative group transition-transform duration-300 ease-out feature-card animate-fadeInUp ${inView ? ' features-animate' : ''} hover:-translate-y-1 hover:scale-[1.08] hover:shadow-2xl will-change-transform transform-gpu`}
							style={inView ? { minHeight: 230, animationDelay: `${animationDelays[i] || 0}ms`, animationDuration: '1.2s', animationFillMode: 'both' } : { minHeight: 230 }}
						>
							<div className={`w-20 h-20 flex items-center justify-center rounded-2xl shadow-md mb-6 ${f.iconBg} group-hover:scale-110 transition-transform duration-300 ring-1 ring-black/5`}>
								{f.icon}
							</div>
							<h3 className="text-2xl font-bold text-green-900 mb-2 text-center leading-tight">{f.title}</h3>
							<p className="text-gray-600 text-base text-center leading-relaxed">{f.desc}</p>
							<div className="absolute inset-0 rounded-3xl pointer-events-none group-hover:ring-4 group-hover:ring-green-200 transition"></div>
						</div>
					))}
				</div>
				<style>{`
					@keyframes fadeInUp { 0% { opacity:0; transform: translateY(40px);} 100% { opacity:1; transform: translateY(0);} }
					.feature-card { opacity:0; }
					.features-animate { opacity:1 !important; animation-name: fadeInUp; animation-timing-function: cubic-bezier(0.23,1,0.32,1); animation-fill-mode: both; animation-play-state: running; }
				`}</style>
			</div>
		</section>
	);
};

export default Features;