import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import WhatsAppWidget from './WhatsAppWidget';
import {
    ArrowRight, Globe, MessageCircle, Calendar, Briefcase,
    CheckCircle, Mic, Star, Menu, X, FileText, UserCheck, Bot, Brain, Search, Sparkles
} from 'lucide-react';

const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-cyan-500/30">

            {/* --- NAVIGATION BAR --- */}
            <nav className="fixed top-0 w-full z-50 bg-slate-950/90 backdrop-blur-lg border-b border-cyan-500/10">
                <div className="container mx-auto px-6 py-5 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-cyan-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform shadow-lg shadow-cyan-500/20">
                            <Globe className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
                            Puentes Globales
                        </span>
                    </Link>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center gap-4">
                        <a href="https://ats-career-client.vercel.app/#/login" className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 rounded-full font-bold text-base shadow-lg shadow-cyan-500/40 transition-all flex items-center gap-2">
                            Crear Cuenta <ArrowRight size={18} />
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden text-slate-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="md:hidden bg-slate-900 border-b border-white/10"
                    >
                        <div className="px-6 py-6 flex flex-col gap-6 text-lg">
                            <a href="https://www.puentesglobales.com/home/#/login" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-cyan-400 py-2 border-b border-white/5" onClick={() => setIsMenuOpen(false)}>Talkme AI (Idiomas)</a>
                            <a href="https://ats-career-client.vercel.app/#/login" className="text-cyan-400 font-bold py-2">Ingresar / Registrarse</a>
                        </div>
                    </motion.div>
                )}
            </nav>

            {/* 1. HERO SECTION */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-24 overflow-hidden bg-slate-950">
                {/* Abstract Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] filter mix-blend-screen"></div>
                    <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] filter mix-blend-screen"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                </div>

                <div className="relative z-10 container mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight text-white">
                            Emigrar con <span className="text-cyan-400">confianza</span> es posible
                        </h1>

                        <p className="text-xl md:text-2xl text-slate-300 font-light max-w-4xl mx-auto mb-10 leading-relaxed">
                            No es improvisar, es planificar. Tu futuro en Europa comienza hoy.
                        </p>

                        {/* HERO BUTTONS */}
                        <div className="flex flex-col md:flex-row justify-center gap-6 mb-20">
                            {/* Primary: Build CV with AI */}
                            <a
                                href="https://ats-career-client.vercel.app/#/login"
                                className="px-8 py-4 bg-white text-slate-900 rounded-full font-extrabold text-lg hover:bg-slate-100 transition-all shadow-xl flex items-center justify-center gap-2 transform hover:-translate-y-1"
                            >
                                <Sparkles className="text-cyan-600" size={24} />
                                Construir tu CV con IA
                            </a>

                            {/* Secondary: Talkme */}
                            <a
                                href="https://www.puentesglobales.com/home/#/login"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-slate-800 border border-slate-700 text-white rounded-full font-bold text-lg hover:bg-slate-700 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
                            >
                                <Bot className="text-indigo-400" size={24} />
                                Probar Talkme Ahora
                            </a>
                        </div>

                        {/* 4 PILLARS GRID */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto text-left">

                            {/* 1. Build CV with AI */}
                            <a href="https://ats-career-client.vercel.app/#/login" className="group p-8 bg-slate-900/80 border border-slate-800 rounded-3xl hover:border-cyan-500/50 transition-all cursor-pointer hover:shadow-2xl hover:bg-slate-900 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Sparkles size={100} className="text-cyan-500" />
                                </div>
                                <div className="w-14 h-14 bg-cyan-600/20 rounded-xl flex items-center justify-center mb-4">
                                    <Sparkles className="text-cyan-400 w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Construcción de CV con IA</h3>
                                <p className="text-slate-400">Crea un CV de alto impacto optimizado para sistemas ATS en minutos.</p>
                            </a>

                            {/* 2. ATS Scanner */}
                            <a href="https://ats-career-client.vercel.app/#/login" className="group p-8 bg-slate-900/80 border border-slate-800 rounded-3xl hover:border-blue-500/50 transition-all cursor-pointer hover:shadow-2xl hover:bg-slate-900 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <FileText size={100} className="text-blue-500" />
                                </div>
                                <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center mb-4">
                                    <FileText className="text-blue-400 w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Scanner ATS</h3>
                                <p className="text-slate-400">Optimiza tu CV para superar los filtros automáticos de los reclutadores.</p>
                            </a>

                            {/* 3. Roleplay */}
                            {/* 3. Roleplay */}
                            <a href="https://ats-career-client.vercel.app/#/login" className="group p-8 bg-slate-900/80 border border-slate-800 rounded-3xl hover:border-purple-500/50 transition-all cursor-pointer hover:shadow-2xl hover:bg-slate-900 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <UserCheck size={100} className="text-purple-500" />
                                </div>
                                <div className="w-14 h-14 bg-purple-600/20 rounded-xl flex items-center justify-center mb-4">
                                    <UserCheck className="text-purple-400 w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Roleplay con IA</h3>
                                <p className="text-slate-400">Practica entrevistas técnicas y de RRHH en tiempo real.</p>
                            </a>

                            {/* 4. Psychometric Test */}
                            {/* 4. Psychometric Test */}
                            <a href="https://ats-career-client.vercel.app/#/login" className="group p-8 bg-slate-900/80 border border-slate-800 rounded-3xl hover:border-pink-500/50 transition-all cursor-pointer hover:shadow-2xl hover:bg-slate-900 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Brain size={100} className="text-pink-500" />
                                </div>
                                <div className="w-14 h-14 bg-pink-600/20 rounded-xl flex items-center justify-center mb-4">
                                    <Brain className="text-pink-400 w-7 h-7" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2">Test Psicométrico</h3>
                                <p className="text-slate-400">Descubre tu perfil profesional ideal para el mercado global.</p>
                            </a>

                        </div>
                    </motion.div>
                </div>
            </section>

            {/* 2. SOMOS PUENTES GLOBALES (Modernizado) */}
            <section className="py-24 bg-slate-950 relative border-t border-slate-900">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-cyan-500 font-bold tracking-widest uppercase mb-4 text-sm">SOBRE NOSOTROS</h2>
                        <h3 className="text-4xl md:text-6xl font-black text-white">Somos Puentes</h3>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <p className="text-xl text-slate-400 mb-8 leading-relaxed font-light">
                                En Puentes Globales no solo te damos herramientas; te damos un sistema. Integramos tecnología de punta con la experiencia humana para asegurar tu éxito migratorio y profesional.
                            </p>
                            <ul className="space-y-6">
                                <li className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400"><CheckCircle size={20} /></div>
                                    <span className="text-slate-200 text-lg">Validación de perfil profesional (Europa & USA)</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400"><CheckCircle size={20} /></div>
                                    <span className="text-slate-200 text-lg">Entrenamiento de soft-skills y confianza</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400"><CheckCircle size={20} /></div>
                                    <span className="text-slate-200 text-lg">Networking estratégico</span>
                                </li>
                            </ul>
                        </div>

                        {/* Logo Puentes Globales */}
                        <div className="relative h-[400px] w-full bg-slate-900 rounded-3xl border border-cyan-500/20 overflow-hidden flex items-center justify-center group p-12 shadow-2xl">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_60%)]"></div>
                            <img
                                src="/logo-new.png"
                                alt="Puentes Globales Logo"
                                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CTA FINAL */}
            <section className="py-32 relative overflow-hidden bg-slate-950 border-t border-slate-900">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]"></div>

                <div className="relative container mx-auto px-6 text-center z-10">
                    <h2 className="text-5xl md:text-7xl font-bold mb-10 text-white">¿Listo para dar el salto?</h2>
                    <div className="flex flex-col md:flex-row justify-center gap-6">
                        <a href="https://ats-career-client.vercel.app/#/login" className="px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-full font-bold text-xl hover:shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-all transform hover:-translate-y-1">
                            Crear Cuenta
                        </a>
                        <a href="https://calendly.com/puentesglobales" target="_blank" rel="noopener noreferrer" className="px-10 py-5 bg-transparent border border-white/10 text-white rounded-full font-bold text-xl hover:bg-white/5 transition-all outline-none focus:ring-2 focus:ring-cyan-500">
                            Agendar Mentoría
                        </a>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-slate-950 py-16 border-t border-slate-900/50">
                <div className="container mx-auto px-6 text-center text-slate-500 text-base">
                    <p>&copy; 2026 Puentes Globales. Todos los derechos reservados.</p>
                </div>
            </footer>
            {/* FLOATING CTA for ATS - Added per user request */}
            <div className="fixed bottom-24 right-6 z-40">
                <a
                    href="https://ats-career-client.vercel.app/#/login"
                    className="flex items-center gap-3 px-6 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-lg shadow-blue-500/30 transition-all hover:scale-105 font-bold border border-blue-400/30 animate-pulse"
                >
                    <Sparkles size={20} className="text-yellow-300 fill-yellow-300" />
                    <span>Utiliza nuestro: Simulador ATS y Revolución de CV con IA</span>
                </a>
            </div>

            <WhatsAppWidget />
        </div>
    );
};

export default LandingPage;
