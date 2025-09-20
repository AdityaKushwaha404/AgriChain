import React from "react";

const Footer = () => (
	<footer className="relative z-10 mt-20 bg-[#181f2a] border-t-4 border-t-green-400/40 shadow-[0_4px_32px_0_rgba(0,0,0,0.10)] text-white">
		<div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row md:justify-between md:items-center gap-8">
			<div className="flex flex-col items-center md:items-start gap-4">
				<div className="flex items-center gap-2">
					<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-500/90 shadow-md">
						<svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="text-white"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18v-7m0 7c-4.418 0-8-1.79-8-4V7m8 13c4.418 0 8-1.79 8-4V7m-8 5L2 7m10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
					</span>
					<span className="font-bold text-lg tracking-wide">AgriChain</span>
				</div>
				<div className="flex gap-3 mt-2">
					<a href="#" aria-label="Twitter" className="transition-transform duration-200 hover:scale-110 hover:text-green-300"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.93 9.93 0 0 1-2.828.775A4.932 4.932 0 0 0 23.337 3.1a9.864 9.864 0 0 1-3.127 1.195A4.916 4.916 0 0 0 16.616 3c-2.72 0-4.924 2.206-4.924 4.924 0 .386.044.762.127 1.124C7.728 8.807 4.1 6.884 1.671 3.965a4.822 4.822 0 0 0-.666 2.475c0 1.708.87 3.216 2.188 4.099A4.904 4.904 0 0 1 .964 9.1v.062a4.927 4.927 0 0 0 3.95 4.827 4.996 4.996 0 0 1-2.212.084 4.936 4.936 0 0 0 4.604 3.417A9.867 9.867 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.009-7.513 14.009-14.009 0-.213-.005-.425-.014-.636A10.012 10.012 0 0 0 24 4.557z"/></svg></a>
					<a href="#" aria-label="LinkedIn" className="transition-transform duration-200 hover:scale-110 hover:text-green-300"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.28c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.28h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.845-1.563 3.043 0 3.604 2.004 3.604 4.609v5.587z"/></svg></a>
					<a href="#" aria-label="Github" className="transition-transform duration-200 hover:scale-110 hover:text-green-300"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.157-1.11-1.465-1.11-1.465-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .268.18.579.688.481C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg></a>
				</div>
			</div>
			<div className="flex flex-col items-center gap-2 md:gap-3 md:items-start">
				<div className="flex flex-wrap gap-4 text-sm font-medium">
					<a href="#about" className="relative group transition-colors duration-200 hover:text-green-300">About<span className="block h-0.5 max-w-0 group-hover:max-w-full transition-all duration-300 bg-green-400 rounded-full"></span></a>
					<a href="#contact" className="relative group transition-colors duration-200 hover:text-green-300">Contact<span className="block h-0.5 max-w-0 group-hover:max-w-full transition-all duration-300 bg-green-400 rounded-full"></span></a>
					<a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="relative group transition-colors duration-200 hover:text-green-300">Github Repo<span className="block h-0.5 max-w-0 group-hover:max-w-full transition-all duration-300 bg-green-400 rounded-full"></span></a>
					<a href="#" className="relative group transition-colors duration-200 hover:text-green-300">SIH 2025<span className="block h-0.5 max-w-0 group-hover:max-w-full transition-all duration-300 bg-green-400 rounded-full"></span></a>
				</div>
			</div>
			<div className="flex flex-col items-center md:items-end gap-3 w-full md:w-auto">
				<form className="flex gap-2 w-full max-w-xs">
					<input type="email" placeholder="Your email" className="flex-1 px-3 py-2 rounded-l bg-[#232b39] text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition" />
					<button type="submit" className="px-4 py-2 rounded-r bg-green-500 text-white font-semibold shadow hover:bg-green-400 transition-colors focus:outline-none">Subscribe</button>
				</form>
				<span className="text-xs text-gray-400">Get updates & news (no spam)</span>
			</div>
		</div>
		<div className="border-t border-white/10 mt-4 py-4 text-center text-xs text-gray-500">&copy; {new Date().getFullYear()} AgriChain. All rights reserved.</div>
	</footer>
);

export default Footer;