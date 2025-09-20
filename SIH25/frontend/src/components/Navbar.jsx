import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';

const navLinks = [
	{ name: "Home", href: "#home", id: 'home' },
	{ name: "Features", href: "#features", id: 'features' },
	{ name: "About", href: "#about", id: 'about' },
	{ name: "Contact", href: "#contact", id: 'contact' },
];

const Navbar = () => {
	const [scrolled, setScrolled] = useState(false);
	const [active, setActive] = useState("Home");
    const location = useLocation();
    const navigate = useNavigate();

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 20);
		window.addEventListener("scroll", onScroll);
		// Intersection Observer for active link
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						const id = entry.target.getAttribute('id');
						const match = navLinks.find(l => l.id === id);
						if (match) setActive(match.name);
					}
				});
			},
			{ rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] }
		);
		navLinks.forEach(l => {
			const el = document.getElementById(l.id);
			if (el) observer.observe(el);
		});
		return () => {
			window.removeEventListener("scroll", onScroll);
			observer.disconnect();
		};
	}, []);

	const handleNavClick = (name, href, e) => {
		e.preventDefault();
		const id = href.replace('#','');
		setActive(name);
		const onHome = location.pathname === '/' || location.pathname === '';
		if (!onHome) {
			navigate('/' + href); // navigates to /#section
			// delay scroll until after route change render
			setTimeout(() => {
				const target = document.getElementById(id);
				if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}, 60);
		} else {
			const target = document.getElementById(id);
			if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
		setTimeout(() => {
			const target = document.getElementById(id);
			if (target) target && target.setAttribute('tabindex','-1');
		}, 120);
	};

	const handleRipple = (e) => {
		const btn = e.currentTarget;
		const ripple = document.createElement("span");
		ripple.className = "ripple";
		ripple.style.left = e.nativeEvent.offsetX + "px";
		ripple.style.top = e.nativeEvent.offsetY + "px";
		btn.appendChild(ripple);
		setTimeout(() => ripple.remove(), 600);
	};

	const handleLogoClick = () => {
		if (location.pathname !== '/') {
			navigate('/');
			setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 40);
		} else {
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
		setActive('Home');
	};

	return (
		<nav
			className={`top-0 z-50 transition-all duration-500 ${
				scrolled
					? "fixed inset-x-0 bg-white/55 backdrop-blur-xl shadow-[0_4px_32px_-4px_rgba(0,0,0,0.08)] border-b border-white/30 py-2 supports-[backdrop-filter]:backdrop-saturate-150"
					: "absolute w-full bg-transparent py-5"
			}`}
			style={{
				transitionProperty: 'background,backdrop-filter,box-shadow,padding',
			}}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center transition-all duration-500">
				<div className="flex items-center gap-2 select-none cursor-pointer group focus:outline-none" role="button" tabIndex={0} onClick={handleLogoClick} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleLogoClick(); } }}>
					<span className="text-2xl mr-1 transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
						<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
							<circle cx="14" cy="14" r="14" fill="#e0ffe6"/>
							<path d="M10.5 17.5l7-7" stroke="#22c55e" strokeWidth="2.2" strokeLinecap="round"/>
							<path d="M13.5 10.5a3 3 0 0 1 4.24 4.24l-2.12 2.12a3 3 0 0 1-4.24-4.24l.7-.7" stroke="#14b8a6" strokeWidth="2.2" strokeLinecap="round"/>
						</svg>
					</span>
					<span className="text-2xl font-extrabold bg-gradient-to-r from-green-600 via-teal-400 to-green-400 bg-clip-text text-transparent tracking-tight transition-transform duration-300 group-hover:scale-105 group-active:scale-95">AgriChain</span>
				</div>
				<div className="hidden md:flex items-center gap-2">
					{navLinks.map((link) => (
						<a
							key={link.name}
							href={link.href}
							onClick={(e) => handleNavClick(link.name, link.href, e)}
							className={`relative px-6 py-1 font-medium transition text-lg nav-link group ${
								active === link.name
									? "text-green-700 font-bold"
									: "text-gray-800"
							}`}
						>
							<span>{link.name}</span>
							<span className="nav-underline absolute left-0 bottom-0 h-0.5 w-0 bg-gradient-to-r from-green-400 via-teal-400 to-green-600 transition-all duration-300 group-hover:w-full group-hover:h-0.5 rounded-full"></span>
						</a>
					))}
				</div>
				<div className="ml-4">
					<button
						className="hero-btn-gradient-border relative font-semibold py-2 px-7 rounded-full shadow-lg transition duration-300 text-white overflow-hidden focus:outline-none text-base scale-100 hover:scale-105"
						onClick={(e) => { handleRipple(e); navigate('/transparency'); }}
					>
						<span className="relative z-10">Explore Now</span>
						<span className="hero-btn-border absolute inset-0 rounded-full pointer-events-none"></span>
					</button>
				</div>
			</div>
			<style>{`
				.nav-link { overflow: hidden; }
				.nav-underline { position: absolute; left:0; bottom:0; width:0%; height:2px; background: linear-gradient(90deg,#22c55e,#2dd4bf,#14b8a6); transition: width .35s cubic-bezier(.4,0,.2,1), height .2s; }
				.nav-link:hover .nav-underline { width:100%; }
				.hero-btn-gradient-border { background: linear-gradient(90deg,#22c55e 0%,#2dd4bf 100%); position:relative; z-index:1; transition: transform .18s cubic-bezier(.4,2,.6,1), box-shadow .18s; }
				.hero-btn-gradient-border .ripple { position:absolute; border-radius:9999px; transform:translate(-50%,-50%); pointer-events:none; width:10px; height:10px; background:rgba(255,255,255,0.5); animation:rippleEffect .6s linear; z-index:2; }
				.hero-btn-border { content:''; display:block; border-radius:9999px; padding:2px; background:linear-gradient(270deg,#22c55e,#2dd4bf,#14b8a6,#22c55e); background-size:400% 400%; z-index:1; animation:borderGradientMove 4s linear infinite; -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0); -webkit-mask-composite:xor; mask-composite:exclude; transition:filter .18s, box-shadow .18s; }
				.hero-btn-gradient-border:hover { background:linear-gradient(270deg,#22c55e,#2dd4bf,#14b8a6,#22c55e); background-size:400% 400%; animation:btnFillGradientMove 2.5s linear infinite; transform:scale(1.06); box-shadow:0 0 0 4px #2dd4bf33,0 4px 32px 0 #2dd4bf66,0 0 8px 2px #fff8; }
				.hero-btn-gradient-border:hover .hero-btn-border { filter:brightness(1.15) drop-shadow(0 0 12px #2dd4bfcc); }
				@keyframes btnFillGradientMove { 0% {background-position:0% 50%;} 100% {background-position:100% 50%;} }
				@keyframes borderGradientMove { 0% {background-position:0% 50%;} 100% {background-position:100% 50%;} }
				@keyframes rippleEffect { 0% {opacity:.7;width:10px;height:10px;} 80% {opacity:.3;width:120px;height:120px;} 100% {opacity:0;width:160px;height:160px;} }
			`}</style>
		</nav>
	);
};

export default Navbar;