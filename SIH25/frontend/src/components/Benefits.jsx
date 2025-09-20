import React, { useRef, useEffect, useState } from "react";

// Unified structured data for cards (easier future expansion / i18n / analytics)
const benefitsData = [
	{
		key: 'farmers',
		title: 'Farmers',
		tagline: 'Revenue clarity & faster cash flow',
		accent: 'emerald',
		benefits: [
			'Milestone-based instant payouts',
			'Transparent price formation',
			'Reduced middlemen leakage',
			'Quality-linked revenue uplift',
			'Access to forward demand signals'
		],
		metrics: [
			{ label: 'Payout speed', value: '<24h' },
			{ label: 'Leakage cut', value: '-18%' },
			{ label: 'Price uplift', value: '+12%' }
		]
	},
	{
		key: 'consumers',
		title: 'Consumers',
		tagline: 'Radical transparency & confidence',
		accent: 'teal',
		benefits: [
			'Scan-to-origin authenticity',
			'Visible handling journey',
			'Freshness & nutritional context',
			'Ethical & sustainability proof',
			'Higher trust in safety'
		],
		metrics: [
			{ label: 'Repeat intent', value: '+15%' },
			{ label: 'Scan engagement', value: '3.2×' },
			{ label: 'Trust score', value: '+21%' }
		]
	},
	{
		key: 'partners',
		title: 'Partners',
		tagline: 'Operational precision & assurance',
		accent: 'amber',
		benefits: [
			'Lower reconciliation overhead',
			'Unified audit-ready records',
			'Exception & anomaly alerts',
			'Predictive inventory insight',
			'Faster dispute resolution'
		],
		metrics: [
			{ label: 'Reconciliation time', value: '-30%' },
			{ label: 'Dispute cycle', value: '-40%' },
			{ label: 'Forecast accuracy', value: '+17%' }
		]
	}
];

const accentMap = {
	emerald: {
		bar: 'from-emerald-500 to-teal-400',
		chip: 'bg-emerald-50 text-emerald-700 ring-emerald-100 hover:bg-emerald-100',
		glow1: 'from-emerald-100 via-teal-100',
		glow2: 'from-teal-100 via-green-100',
		metric: 'text-emerald-700'
	},
	teal: {
		bar: 'from-teal-500 to-cyan-400',
		chip: 'bg-teal-50 text-teal-700 ring-teal-100 hover:bg-teal-100',
		glow1: 'from-teal-100 via-cyan-100',
		glow2: 'from-cyan-100 via-teal-100',
		metric: 'text-teal-700'
	},
	amber: {
		bar: 'from-amber-500 to-yellow-400',
		chip: 'bg-amber-50 text-amber-700 ring-amber-100 hover:bg-amber-100',
		glow1: 'from-amber-100 via-yellow-100',
		glow2: 'from-yellow-100 via-amber-100',
		metric: 'text-amber-700'
	}
};

const Card = ({ data, index, inView }) => {
	const { title, tagline, benefits, metrics, accent } = data;
	const a = accentMap[accent] || accentMap.emerald;
	return (
		<div
			tabIndex={0}
			aria-label={`${title} benefits card`}
			className={`benefit-card relative bg-white/90 supports-[backdrop-filter]:backdrop-blur-sm rounded-2xl shadow-[0_4px_14px_-4px_rgba(16,185,129,0.12)] group flex flex-col px-6 pt-6 pb-5 min-h-[320px] overflow-hidden border border-emerald-100/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 transition-all duration-500 will-change-transform opacity-0 translate-y-8 scale-[.97] ${inView ? 'benefit-card-in' : ''}`}
			style={inView ? { transitionDelay: `${index * 80}ms` } : {}}
		>
			<div className="mb-4 flex items-start gap-3">
				<div className="relative w-10 h-10 rounded-xl bg-white ring-1 ring-emerald-100 flex items-center justify-center shadow-sm"> 
					<svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
						<circle cx="12" cy="12" r="8"/>
						<path d="M9 12l2 2 4-4" />
					</svg>
				</div>
				<div className="flex-1">
					<h3 className="text-[22px] md:text-[26px] font-bold text-green-800 tracking-tight leading-snug">{title}</h3>
					<p className="mt-1 text-[12.5px] font-medium text-emerald-700/80 tracking-tight leading-snug">{tagline}</p>
				</div>
			</div>
			<ul className="flex flex-wrap gap-2 mb-4 mt-0.5">
				{benefits.map((b,i)=>(
					<li key={i} className={`px-2.5 py-1 rounded-full text-[11.5px] font-medium tracking-tight ring-1 ring-emerald-100/70 bg-white shadow-[0_1px_0_rgba(0,0,0,0.03)] hover:bg-emerald-50/70 transition ${i>3?'hidden xl:inline-flex':''}`}>
						{b}
					</li>
				))}
			</ul>
			<div className="mt-auto pt-1">
				<div className="flex gap-6 mb-3">
					{metrics.map((m,i)=>(
						<div key={i} className="flex flex-col min-w-[70px]">
							<span className={`text-[13px] font-semibold ${a.metric}`}>{m.value}</span>
							<span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-600/70 leading-tight">{m.label}</span>
						</div>
					))}
				</div>
				<div className="flex items-center gap-2">
					<div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
					<p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-emerald-600">Impact</p>
				</div>
			</div>
			<div className={`pointer-events-none absolute -top-16 -right-14 w-40 h-40 bg-gradient-to-br ${a.glow1} to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-65 transition-all`} />
			<div className={`pointer-events-none absolute bottom-[-70px] -left-14 w-40 h-40 bg-gradient-to-br ${a.glow2} to-transparent rounded-full blur-2xl opacity-45 group-hover:opacity-60 transition-all`} />
		</div>
	);
};

const Benefits = () => {
	const sectionRef = useRef(null);
	const [inView,setInView]=useState(false);
	useEffect(()=>{
		const observer=new window.IntersectionObserver(([entry])=>{ setInView(entry.isIntersecting); },{threshold:0.25});
		if(sectionRef.current) observer.observe(sectionRef.current);
		return ()=>observer.disconnect();
	},[]);
	return (
		<section aria-labelledby="benefits-heading" className="relative py-20 md:py-24 overflow-hidden bg-[radial-gradient(circle_at_15%_25%,rgba(16,185,129,0.14),transparent_60%),radial-gradient(circle_at_85%_30%,rgba(253,230,138,0.25),transparent_70%),linear-gradient(to_bottom_right,#f9fffb,#f4fcfa,#fffef7)]" id="benefits" ref={sectionRef}>
			<div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-70">
				<div className="absolute -top-24 left-1/4 w-[460px] h-[460px] rounded-full bg-gradient-to-br from-emerald-100 via-teal-100 to-cyan-100 blur-3xl opacity-40"/>
				<div className="absolute top-1/2 -right-32 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-amber-100 via-yellow-100 to-lime-100 blur-3xl opacity-35"/>
				<div className="absolute bottom-[-160px] -left-32 w-[520px] h-[520px] rounded-full bg-gradient-to-br from-teal-100 via-green-100 to-emerald-100 blur-3xl opacity-30"/>
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(45,212,191,0.12),transparent_70%)]"/>
			</div>
			<div className="relative max-w-7xl mx-auto px-4">
				<h2 id="benefits-heading" className="text-4xl md:text-5xl font-extrabold text-green-800 text-center tracking-tight mb-5">Tangible Stakeholder Benefits</h2>
				<p className="max-w-3xl mx-auto text-center text-gray-700/90 mb-14 text-lg leading-relaxed">Compounding trust, efficiency and margin across every participant through verifiable data, automation & actionable intelligence.</p>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 items-stretch">
					{benefitsData.map((d,i)=>(<Card key={d.key} data={d} index={i} inView={inView} />))}
				</div>
			</div>
			<style>{`
				@keyframes benefitIn {0% {opacity:0; transform:translateY(40px) scale(.94);} 100% {opacity:1; transform:translateY(0) scale(1);} }
				.benefit-card-in {opacity:1 !important; transform:translateY(0) scale(1);}
				.benefit-card {transition: box-shadow .55s, transform .9s cubic-bezier(.22,1,.36,1);}
				.benefit-card.benefit-card-in {animation: benefitIn .85s cubic-bezier(.23,1,.32,1) both;}
				.benefit-card:hover {box-shadow:0 14px 38px -10px rgba(16,185,129,0.26),0 6px 22px -6px rgba(13,148,136,0.22); transform:translateY(-4px) scale(1.01);} 
				.benefit-card:focus-visible {box-shadow:0 0 0 0 rgba(16,185,129,0),0 0 0 3px rgba(16,185,129,.35);} 
				@media (prefers-reduced-motion: reduce){
					.benefit-card, .benefit-card:hover {animation:none !important; transform:none !important; transition:none !important;}
				}
			`}</style>
		</section>
	);
};

export default Benefits;