import React, { useState, useEffect, useRef } from "react";

const dummyImg = "https://randomuser.me/api/portraits/men/32.jpg";
const testimonials = [
	{ name: "Ravi Kumar", role: "Farmer", quote: "With AgriChain, I get fair prices and know exactly where my produce goes. No more middlemen cheating!", img: dummyImg },
	{ name: "Priya Sharma", role: "Consumer", quote: "I can scan and see the journey of my food. I trust what I eat now!", img: "https://randomuser.me/api/portraits/women/44.jpg" },
	{ name: "Amit Singh", role: "Distributor", quote: "The process is transparent and easy to manage. Everyone benefits!", img: "https://randomuser.me/api/portraits/men/65.jpg" },
];

const Testimonials = () => {
	const [current, setCurrent] = useState(0);
	const timeoutRef = useRef(null);

	useEffect(() => {
		timeoutRef.current = setTimeout(() => {
			setCurrent(prev => (prev + 1) % testimonials.length);
		}, 4000);
		return () => clearTimeout(timeoutRef.current);
	}, [current]);

	const goTo = (idx) => setCurrent(idx);

	return (
		<section className="py-16 bg-white mb-20" id="testimonials">
			<div className="max-w-4xl mx-auto px-4">
				<h2 className="text-4xl md:text-5xl font-extrabold text-green-800 text-center tracking-tight mb-4">Voices From the Value Chain</h2>
				<p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-lg leading-relaxed">Early adopters highlighting measurable impact in traceability, pricing fairness and consumer confidence.</p>
				<div className="relative flex items-center justify-center">
					<div className="w-full flex justify-center relative h-[270px]">
						{testimonials.map((t, i) => {
							let pos = i - current;
							if (pos < -1) pos += testimonials.length;
							if (pos > 1) pos -= testimonials.length;
							return (
								<div key={i} className={`bg-green-50 rounded-xl shadow p-6 flex flex-col items-center absolute w-full max-w-md transition-all duration-1000 ease-[cubic-bezier(.77,0,.18,1)] testimonial-slide${pos === 0 ? ' z-10' : ' z-0 pointer-events-none'}`} style={{ opacity: pos === 0 ? 1 : 0.5, transform: `translateX(${pos * 110}%) scale(${pos === 0 ? 1 : 0.92})` }}>
									<img src={t.img} alt={t.name} className="w-20 h-20 rounded-full object-cover border-4 border-white shadow mb-4" />
									<p className="text-gray-700 italic mb-4 text-center">“{t.quote}”</p>
									<div className="font-semibold text-green-900">{t.name}</div>
									<div className="text-sm text-gray-600">{t.role}</div>
								</div>
							);
						})}
					</div>
				</div>
				<div className="flex justify-center gap-2 mt-8">
					{testimonials.map((_, i) => (
						<button key={i} className={`w-3 h-3 rounded-full ${i === current ? 'bg-green-600' : 'bg-green-200'} transition`} onClick={() => goTo(i)} aria-label={`Go to testimonial ${i + 1}`}></button>
					))}
				</div>
				<style>{`.testimonial-slide { will-change: transform, opacity; }`}</style>
			</div>
		</section>
	);
};

export default Testimonials;