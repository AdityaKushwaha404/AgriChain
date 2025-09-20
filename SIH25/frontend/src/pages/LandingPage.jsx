import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Hero from '../components/Hero.jsx';
import About from '../components/About.jsx';
import Problem from '../components/Problem.jsx';
import Features from '../components/Features.jsx';
import Workflow from '../components/Workflow.jsx';
import Benefits from '../components/Benefits.jsx';
import Footer from '../components/Footer.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Contact from '../components/Contact.jsx';

const LandingPage = () => {
	const location = useLocation();
	// Ensure reload without hash shows hero (top) instead of last scroll position retained by browser...
	useEffect(() => {
		if ('scrollRestoration' in window.history) {
			window.history.scrollRestoration = 'manual';
		}
		if (!location.hash) {
			// Delay to allow layout paint
			requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: 'instant' in window ? 'instant' : 'auto' }));
		}
	}, []); // run once on mount
	useEffect(() => {
		if (location.hash) {
			const id = location.hash.replace('#','');
			setTimeout(() => {
				const el = document.getElementById(id);
				if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}, 80);
		}
	}, [location.hash]);
	return (
		<div className="bg-white min-h-screen flex flex-col">
			<Navbar />
			<main className="flex-1">
				<section id="home" className="scroll-mt-24">
					<Hero />
				</section>
				<section id="about" className="scroll-mt-24 relative">
					<div className="section-shell"><About /></div>
					<div className="section-separator" aria-hidden="true"></div>
				</section>
				<section id="problems" className="scroll-mt-24 relative">
					<div className="section-shell"><Problem /></div>
					<div className="section-separator" aria-hidden="true"></div>
				</section>
				<section id="features" className="scroll-mt-24 relative">
					<div className="section-shell"><Features /></div>
					<div className="section-separator" aria-hidden="true"></div>
				</section>
				<section id="workflow" className="scroll-mt-24 relative">
					<div className="section-shell"><Workflow /></div>
					<div className="section-separator" aria-hidden="true"></div>
				</section>
				<section id="benefits" className="scroll-mt-24 relative">
					<div className="section-shell"><Benefits /></div>
					<div className="section-separator" aria-hidden="true"></div>
				</section>
				<section id="testimonials" className="scroll-mt-24 relative">
					<div className="section-shell"><Testimonials /></div>
					<div className="section-separator" aria-hidden="true"></div>
				</section>
				<section id="contact" className="scroll-mt-24 relative">
					<div className="section-shell"><Contact /></div>
				</section>
				<style>{`
					.section-shell {padding-top:4.5rem; padding-bottom:4.5rem;}
					@media (min-width: 1024px){ .section-shell{padding-top:5.5rem; padding-bottom:5.5rem;} }
					.section-separator { position: absolute; left:0; right:0; bottom:0; height:72px; pointer-events:none; background: radial-gradient(ellipse at center, rgba(16,185,129,0.18), transparent 70%); filter: blur(12px); opacity:.65; }
					#features .section-shell, #benefits .section-shell { padding-top:5rem; padding-bottom:5.5rem; }
				`}</style>
			</main>
			<Footer />
		</div>
	);
};

export default LandingPage;

