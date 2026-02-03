import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Loader2, CheckSquare, Square, Globe } from 'lucide-react'; // Added icons
import { motion } from 'framer-motion';

export default function Login() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accessCode, setAccessCode] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [accountType, setAccountType] = useState('student'); // 'student' or 'freemium'
    const [message, setMessage] = useState('');

    // GDPR Consent States
    const [consentTerms, setConsentTerms] = useState(false); // Mandatory
    const [consentFuture, setConsentFuture] = useState(false); // Optional

    const navigate = useNavigate();

    const logConsent = async (userId) => {
        try {
            await api.post('/consent/log', {
                userId,
                consents: [
                    { type: 'process_specific', status: consentTerms },
                    { type: 'future_matching', status: consentFuture }
                ]
            });
        } catch (err) {
            console.error("Failed to log consent", err);
        }
    };

    const handleGoogleLogin = async () => {
        if (isSignUp && !consentTerms) {
            setMessage("Debes aceptar los Términos para continuar co Google.");
            return;
        }
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin + '/languages'
                }
            });
            if (error) throw error;
        } catch (error) {
            setMessage(error.message);
            setLoading(false);
        }
    };

    const handleAuth = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        if (isSignUp && !consentTerms) {
            setLoading(false);
            setMessage("Debes aceptar los Términos y Condiciones obligatorios.");
            return;
        }

        try {
            if (isSignUp) {
                // 1. Verify Access Code if Student
                if (accountType === 'student') {
                    if (accessCode.length < 6) {
                        throw new Error('El código debe tener 6 caracteres.');
                    }
                }

                // 2. Proceed with Signup
                const { data, error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        emailRedirectTo: 'https://www.puentesglobales.com/home/',
                        data: {
                            is_student: accountType === 'student',
                            access_code: accountType === 'student' ? accessCode : null
                        }
                    }
                });

                if (error) throw error;

                if (data.user) {
                    await logConsent(data.user.id);
                    // Sync Email for Super Admin Logic
                    await api.post('/profile', { userId: data.user.id, email });
                }

                setMessage('¡Registro exitoso! Revisa tu email para confirmar.');

                if (accountType === 'freemium') {
                    navigate('/payment-setup');
                } else {
                    navigate('/languages');
                }
            } else {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;

                if (data.user) {
                    // Sync Email on Login too
                    await api.post('/profile', { userId: data.user.id, email });
                }

                navigate('/languages');
            }
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-slate-100"
            >
                <div className="flex justify-center mb-6">
                    <img src="/home/logo.jpg" alt="Puentes Globales" className="h-32 w-auto object-contain" />
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2 text-center">
                    {isSignUp ? 'Crear Cuenta' : 'Bienvenido'}
                </h1>

                {/* LOGIN / SIGNUP TOGGLE */}
                <div className="flex justify-center gap-4 mb-6 text-sm">
                    <button onClick={() => setIsSignUp(false)} className={`pb-1 border-b-2 transition-colors ${!isSignUp ? 'border-cyan-500 text-cyan-600 font-bold' : 'border-transparent text-slate-400'}`}>Iniciar Sesión</button>
                    <button onClick={() => setIsSignUp(true)} className={`pb-1 border-b-2 transition-colors ${isSignUp ? 'border-cyan-500 text-cyan-600 font-bold' : 'border-transparent text-slate-400'}`}>Registrarse</button>
                </div>

                {/* GOOGLE LOGIN */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full mb-4 py-3 bg-white text-slate-900 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-md border border-slate-200"
                >
                    <Globe size={18} className="text-blue-500" />
                    Continuar con Google
                </button>

                <div className="relative flex py-2 items-center mb-4">
                    <div className="flex-grow border-t border-slate-200"></div>
                    <span className="flex-shrink-0 mx-4 text-slate-400 text-xs uppercase">O usa tu email</span>
                    <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <form onSubmit={handleAuth} className="space-y-4">
                    {/* ACCOUNT TYPE SELECTOR IN SIGNUP */}
                    {isSignUp && (
                        <div className="flex bg-slate-100 p-1 rounded-xl mb-4">
                            <button
                                type="button"
                                onClick={() => setAccountType('student')}
                                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${accountType === 'student' ? 'bg-white text-cyan-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Soy Alumno
                            </button>
                            <button
                                type="button"
                                onClick={() => setAccountType('freemium')}
                                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${accountType === 'freemium' ? 'bg-white text-cyan-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                Prueba Gratis
                            </button>
                        </div>
                    )}

                    <div>
                        <label className="block text-slate-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-sm"
                            placeholder="tu@email.com"
                            required
                        />
                    </div>

                    {isSignUp && accountType === 'student' && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>
                            <label className="block text-slate-700 text-sm font-bold mb-2">Código de Alumno (6 Caracteres)</label>
                            <input
                                type="text"
                                value={accessCode}
                                onChange={(e) => setAccessCode(e.target.value)}
                                className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-sm"
                                placeholder="Ej: 123456"
                                minLength={6}
                                required
                            />
                        </motion.div>
                    )}

                    <div>
                        <label className="block text-slate-700 text-sm font-bold mb-2">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white border border-slate-200 rounded-xl p-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all shadow-sm"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {/* GDPR CHECKBOXES */}
                    {isSignUp && (
                        <div className="space-y-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                            {/* OBLIGATORIO */}
                            <div className="flex items-start gap-3 cursor-pointer" onClick={() => setConsentTerms(!consentTerms)}>
                                {consentTerms ? <CheckSquare className="text-cyan-600 shrink-0 mt-0.5" size={18} /> : <Square className="text-slate-400 shrink-0 mt-0.5" size={18} />}
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    <span className="font-bold text-cyan-600">OBLIGATORIO:</span> Acepto Términos y Condiciones y Política de Privacidad de Puentes Globales.
                                </p>
                            </div>

                            {/* OPCIONAL */}
                            <div className="flex items-start gap-3 cursor-pointer" onClick={() => setConsentFuture(!consentFuture)}>
                                {consentFuture ? <CheckSquare className="text-green-600 shrink-0 mt-0.5" size={18} /> : <Square className="text-slate-400 shrink-0 mt-0.5" size={18} />}
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    <span className="font-bold text-green-600">OPCIONAL:</span> Autorizo el uso de mis datos para futuros procesos de selección o mejoras del servicio.
                                </p>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className={`p-3 rounded-xl text-sm ${message.includes('exitoso') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {message}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading || (isSignUp && !consentTerms)}
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading && <Loader2 className="animate-spin" size={20} />}
                        {isSignUp ? 'Crear Cuenta' : 'Entrar'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-slate-500">
                    {isSignUp ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="ml-2 text-cyan-600 font-bold hover:text-cyan-700 transition-colors"
                    >
                        {isSignUp ? 'Ingresa aquí' : 'Regístrate gratis'}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
