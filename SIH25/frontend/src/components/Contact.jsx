import React, { useEffect, useRef, useState } from 'react';

const quickSubjects = [
  'Pilot Program',
  'Integration',
  'Partnership',
  'Pricing',
  'Support',
  'Research'
];

const infoBlocks = [
  { label: 'Email', value: 'support@agritrace.example', icon: '✉️', sr: 'Primary support email' },
  { label: 'Phone', value: '+1 (555) 123-4567', icon: '📞', sr: 'Direct contact number' }
];

const whyItems = [
  'Pilot deployment & onboarding strategy',
  'Smart contract / blockchain integration',
  'Data / analytics extension or ML collaboration',
  'White-label & reseller opportunities',
  'Academic or impact research partnership'
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'sent' | 'error'
  const [touched, setTouched] = useState({});
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);
  const cycleRef = useRef(0);

  useEffect(()=>{
    const el = sectionRef.current; if(!el) return;
    const io = new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting){ visible || cycleRef.current++; setVisible(true); }
      else { setVisible(false); }
    },{threshold:0.25});
    io.observe(el); return ()=> io.disconnect();
  },[visible]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleBlur = e => setTouched(t => ({...t, [e.target.name]: true }));
  const handleQuick = tag => setForm(f => ({ ...f, subject: tag }));

  const handleSubmit = e => {
    e.preventDefault();
    if(status === 'sending') return;
    setStatus('sending');
    // Simulate async send
    setTimeout(()=>{
      // naive success path
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTouched({});
      setTimeout(()=> setStatus(null), 5000);
    }, 1100);
  };

  return (
    <section ref={sectionRef} id="contact" aria-labelledby="contact-heading" className="relative py-28 scroll-mt-24">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-60" style={{background:'radial-gradient(circle at 22% 24%, rgba(0,0,0,0.035) 0%, transparent 55%), radial-gradient(circle at 78% 70%, rgba(0,0,0,0.04) 0%, transparent 62%)'}} />
      </div>
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className={`text-center mb-16 transition-all duration-[1100ms] ease-[cubic-bezier(.22,1,.36,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 id="contact-heading" className="inline-block text-[clamp(1.9rem,4.2vw,2.5rem)] font-extrabold tracking-tight text-green-800 relative">
            <span className="relative z-10">Start Your Traceability Journey</span>
            <span className={`block h-[3px] mt-4 bg-gradient-to-r from-emerald-500/90 via-teal-500/90 to-emerald-600/90 rounded-full w-0 transition-all duration-[1200ms] ease-[cubic-bezier(.22,1,.36,1)] ${visible ? '!w-72' : ''}`} />
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mt-5 text-[0.9rem] md:text-[0.97rem] leading-relaxed">Explore pilots, integrations or co‑innovation — our team engages quickly with a solution-first mindset.</p>
        </div>
        <div className="grid xl:grid-cols-12 gap-16 lg:gap-14 items-start">
          {/* Left column */}
          <div className={`space-y-12 xl:col-span-5 transition-all duration-[1000ms] ease-[cubic-bezier(.22,1,.36,1)] ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>            
            <ul className="flex flex-col gap-7" role="list">
              {infoBlocks.map((b,i)=> (
                <li key={b.label} style={{transitionDelay:`${i*90+120}ms`}} className={`group flex items-start gap-4 min-w-0 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} aria-label={b.sr}>
                  <div className="relative mt-0.5 shrink-0">
                    <div className="w-11 h-11 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-emerald-500 via-teal-500 to-emerald-600 text-white flex items-center justify-center text-[16px] font-medium shadow-sm shadow-emerald-500/25 ring-1 ring-emerald-400/30 group-hover:shadow-md group-hover:scale-105 group-hover:ring-emerald-400/50 transition" aria-hidden="true">{b.icon}</div>
                  </div>
                  <div className="space-y-1 min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.17em] text-emerald-600/90 group-hover:text-emerald-700 transition-colors whitespace-nowrap">{b.label}</p>
                    <p className="text-sm font-medium leading-snug text-gray-800 group-hover:text-emerald-700 transition-colors break-words break-all sm:break-normal min-w-0">{b.value}</p>
                    <span className="block h-px w-0 bg-gradient-to-r from-emerald-400/70 to-teal-400/70 group-hover:w-14 transition-all duration-500" aria-hidden="true" />
                  </div>
                </li>
              ))}
            </ul>
            <div className="space-y-4">
              <h3 className="text-[1.05rem] font-semibold text-green-800 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-sm bg-emerald-500" />Why reach out?
              </h3>
              <ul className="space-y-2">
                {whyItems.map((w,i)=>(
                  <li key={i} style={{transitionDelay:`${i*70+260}ms`}} className={`text-sm text-gray-600 flex items-start gap-2 transition-all duration-700 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                    <span className="mt-[6px] w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.15)]" />{w}
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-600">Quick subject</p>
              <div className="flex flex-wrap gap-2">
                {quickSubjects.map(tag => {
                  const active = form.subject === tag;
                  return (
                    <button key={tag} type="button" onClick={()=>handleQuick(tag)} aria-pressed={active}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-medium border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/70 focus-visible:ring-offset-2 relative overflow-hidden ${active ? 'bg-emerald-500 text-white border-emerald-500 shadow shadow-emerald-500/30' : 'bg-white/80 border-emerald-200 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-50'} before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/50 before:to-white/0 before:translate-x-[-120%] hover:before:translate-x-[120%] before:transition-transform before:duration-700`}>{tag}</button>
                  );
                })}
              </div>
            </div>
            <div id="contact-disclaimer" className="text-[11px] text-gray-500 leading-relaxed max-w-sm">
              We never share your information. By contacting us you consent to a response related to your inquiry.
            </div>
          </div>
          {/* Right column (form) */}
          <form onSubmit={handleSubmit} aria-describedby="contact-disclaimer" className={`relative xl:col-span-7 bg-white border border-gray-200 rounded-2xl shadow-sm p-8 md:p-10 space-y-7 transition-all duration-[1000ms] ease-[cubic-bezier(.22,1,.36,1)] ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-[.97]'}`}>            
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-[11px] font-semibold tracking-wide uppercase text-emerald-700">Name</label>
                <input id="name" name="name" value={form.name} onChange={handleChange} onBlur={handleBlur} required autoComplete="name" className={`w-full border rounded-lg px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition ${touched.name && !form.name ? 'border-rose-300' : 'border-emerald-200'}`} placeholder="Jane Doe" />
                {touched.name && !form.name && <p className="text-[11px] text-rose-500 font-medium">Name is required.</p>}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-[11px] font-semibold tracking-wide uppercase text-emerald-700">Email</label>
                <input id="email" type="email" name="email" value={form.email} onChange={handleChange} onBlur={handleBlur} required autoComplete="email" className={`w-full border rounded-lg px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition ${touched.email && !form.email ? 'border-rose-300' : 'border-emerald-200'}`} placeholder="you@example.com" />
                {touched.email && !form.email && <p className="text-[11px] text-rose-500 font-medium">Email is required.</p>}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="subject" className="block text-[11px] font-semibold tracking-wide uppercase text-emerald-700">Subject</label>
              <input id="subject" name="subject" value={form.subject} onChange={handleChange} onBlur={handleBlur} required className={`w-full border rounded-lg px-3.5 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition ${touched.subject && !form.subject ? 'border-rose-300' : 'border-emerald-200'}`} placeholder="e.g. Pilot Program Opportunity" />
              {touched.subject && !form.subject && <p className="text-[11px] text-rose-500 font-medium">Subject is required.</p>}
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="block text-[11px] font-semibold tracking-wide uppercase text-emerald-700">Message</label>
              <textarea id="message" name="message" value={form.message} onChange={handleChange} onBlur={handleBlur} required className={`w-full border rounded-lg px-3.5 py-3 text-sm h-40 resize-none bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition leading-relaxed ${touched.message && !form.message ? 'border-rose-300' : 'border-emerald-200'}`} placeholder="Tell us what you're building or exploring..." />
              {touched.message && !form.message && <p className="text-[11px] text-rose-500 font-medium">Message cannot be empty.</p>}
            </div>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button type="submit" disabled={status==='sending'} className={`relative inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold tracking-wide transition focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white shadow hover:shadow-emerald-500/25 hover:brightness-[1.05] active:scale-[.97]`}>
                <span className="inline-block">{status==='sending' ? 'Sending...' : status==='sent' ? 'Sent' : 'Send Message'}</span>
                <span className={`inline-block w-2 h-2 rounded-full bg-white transition-opacity ${status==='sent' ? 'opacity-100 animate-ping' : status==='sending' ? 'opacity-90 animate-pulse' : 'opacity-60'}`} />
                {status==='sending' && <span className="absolute inset-x-0 bottom-0 h-0.5 overflow-hidden rounded-b-lg"><span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/70 to-white/0 animate-[progress_1.1s_linear_infinite]" /></span>}
              </button>
              {status==='sent' && <span className="text-xs font-medium text-emerald-600">Message sent! We'll respond soon.</span>}
            </div>
          </form>
        </div>
      </div>
      <style>{`
        @media (prefers-reduced-motion: reduce){
          #contact * { transition:none !important; animation:none !important; }
        }
        @keyframes progress { 0% { transform:translateX(-100%);} 100% { transform:translateX(100%);} }
      `}</style>
    </section>
  );
};

export default Contact;
