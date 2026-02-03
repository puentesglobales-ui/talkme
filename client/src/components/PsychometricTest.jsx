import React from 'react';
import { motion } from 'framer-motion';
import { Brain, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PsychometricTest = () => {
    return (
        <div className="min-h-screen bg-slate-950 text-white p-6">
            <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white mb-8">
                <ArrowLeft size={20} /> Volver al Inicio
            </Link>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto text-center pt-20"
            >
                <div className="w-24 h-24 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Brain className="text-purple-400 w-12 h-12" />
                </div>
                <h1 className="text-4xl font-bold mb-4">Test Psicométrico</h1>
                <p className="text-xl text-slate-400 mb-8">
                    Próximamente disponible. Analiza tus fortalezas y debilidades para el mercado europeo.
                </p>
                <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
                    <p className="text-slate-300">Estamos calibrando nuestra IA para ofrecerte el perfil más preciso.</p>
                </div>
            </motion.div>
        </div>
    );
};

export default PsychometricTest;
