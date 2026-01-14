import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ArrowRight, Globe, MessageCircle, Calendar, Briefcase,
    CheckCircle, Mic, Star, Menu, X, FileText, UserCheck, Bot
} from 'lucide-react';

const LandingPage = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const staggerContainer = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500/30">

            {/* --- NAVIGATION BAR --- */}
            <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-white/10">
                <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                            <Globe className="text-white w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                            Puentes Globales
                        </span>
                    </Link>

                    {/* Desktop Modules Link */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                        <Link to="/ats-scanner" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                            <FileText size={16} /> Scanner ATS
                        </Link>
                        <Link to="/interview" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                            <UserCheck size={16} /> Roleplay Entrevista
                        </Link>
                        <Link to="/dashboard" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                            <Bot size={16} /> Talkme AI
                        </Link>
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link to="/login" className="px-5 py-2 bg-white text-slate-900 rounded-full font-bold hover:bg-blue-50 transition-colors text-sm">
                            Ingresar
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button className="md:hidden text-slate-300" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="md:hidden bg-slate-900 border-b border-white/10"
                    >
                        <div className="px-6 py-4 flex flex-col gap-4">
                            <Link to="/ats-scanner" className="text-slate-300 hover:text-white py-2 border-b border-white/5">Scanner ATS</Link>
                            <Link to="/interview" className="text-slate-300 hover:text-white py-2 border-b border-white/5">Roleplay Entrevista</Link>
                            <Link to="/dashboard" className="text-slate-300 hover:text-white py-2 border-b border-white/5">Talkme AI</Link>
                            <Link to="/login" className="text-blue-400 font-bold py-2">Ingresar / Registrarse</Link>
                        </div>
                    </motion.div>
                )}
            </nav>

            {/* 1. HERO SECTION */}
            <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="/img/landing/uploaded_image_0_1768144162832.jpg"
                        alt="Hero Background"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950/0 to-slate-950"></div>
                </div>

                <div className="relative z-10 container mx-auto px-6 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 mb-8 backdrop-blur-sm">
                            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                            <span className="text-sm font-semibold tracking-wide uppercase">Plataforma Integral de Carrera</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight tracking-tight text-white">
                            Emigrar no es suerte.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Es Estrategia.</span>
                        </h1>

                        <p className="text-xl text-slate-400 font-light max-w-2xl mx-auto mb-12">
                            La primera suite de herramientas impulsadas por IA diseñada específicamente para profesionales latinos que buscan su futuro en Europa.
                        </p>

                        {/* MAIN UTILITIES GRID (Direct Access) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
                            {/* Card 1: ATS */}
                            <Link to="/ats-scanner" className="group p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-blue-500/50 hover:bg-slate-800/80 transition-all cursor-pointer">
                                <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <FileText className="text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Scanner ATS</h3>
                                <p className="text-slate-400 text-sm">Analiza tu CV contra ofertas reales y descubre por qué no te llaman.</p>
                                <div className="mt-4 flex items-center text-blue-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    Probar ahora <ArrowRight size={14} className="ml-1" />
                                </div>
                            </Link>

                            {/* Card 2: Interview */}
                            <Link to="/interview" className="group p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all cursor-pointer">
                                <div className="w-12 h-12 bg-emerald-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <UserCheck className="text-emerald-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Roleplay Entrevista</h3>
                                <p className="text-slate-400 text-sm">Simula entrevistas técnicas y de RRHH con feedback en tiempo real.</p>
                                <div className="mt-4 flex items-center text-emerald-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    Practicar ahora <ArrowRight size={14} className="ml-1" />
                                </div>
                            </Link>

                            {/* Card 3: Talkme */}
                            <Link to="/dashboard" className="group p-6 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-purple-500/50 hover:bg-slate-800/80 transition-all cursor-pointer">
                                <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <Bot className="text-purple-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Talkme AI</h3>
                                <p className="text-slate-400 text-sm">Tu coach de idiomas inteligente disponible 24/7.</p>
                                <div className="mt-4 flex items-center text-purple-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                                    Chatear ahora <ArrowRight size={14} className="ml-1" />
                                </div>
                            </Link>
                        </div>

                    </motion.div>
                </div>
            </section>

            {/* 2. SOMOS PUENTES GLOBALES (Modernizado) */}
            <section className="py-24 bg-slate-950 relative border-t border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-blue-500 font-bold tracking-wider uppercase mb-3 text-sm">Metodología Comprobada</h2>
                            <h3 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                                Más que una plataforma,<br />tu ecosistema de éxito.
                            </h3>
                            <p className="text-lg text-slate-400 mb-6">
                                En Puentes Globales no solo te damos herramientas; te damos un sistema. Integramos tecnología de punta con la experiencia humana de haber recorrido el camino.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400"><CheckCircle size={14} /></div>
                                    <span className="text-slate-300">Validación de perfil profesional (Europa & USA)</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400"><CheckCircle size={14} /></div>
                                    <span className="text-slate-300">Entrenamiento de soft-skills y confianza</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-400"><CheckCircle size={14} /></div>
                                    <span className="text-slate-300">Networking estratégico</span>
                                </li>
                            </ul>
                        </div>
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl transform rotate-3 blur-lg opacity-30"></div>
                            <img src="/img/landing/uploaded_image_2_1768150943006.jpg" className="relative rounded-3xl shadow-2xl border border-white/10" alt="Dashboard Preview" />
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. CTA FINAL */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-900/20"></div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-4xl font-bold mb-8">¿Listo para dar el salto?</h2>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <Link to="/login" className="px-8 py-4 bg-white text-slate-900 rounded-full font-bold text-lg hover:bg-slate-100 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                            Crear Cuenta Gratuita
                        </Link>
                        <a href="https://calendly.com/puentesglobales" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all">
                            Agendar Mentoría
                        </a>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="bg-slate-950 py-12 border-t border-slate-900">
                <div className="container mx-auto px-6 text-center text-slate-500 text-sm">
                    <p>&copy; 2026 Puentes Globales. Todos los derechos reservados.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
