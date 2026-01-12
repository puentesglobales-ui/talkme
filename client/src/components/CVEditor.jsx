import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, Wand2, Check, X } from 'lucide-react';
import api from '../services/api';

const CVEditor = () => {
    const [file, setFile] = useState(null);
    const [rewriting, setRewriting] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const handleFileChange = (e) => {
        if (e.target.files[0]) setFile(e.target.files[0]);
    };

    const handleRewrite = async () => {
        if (!file) {
            setError('Please upload a CV.');
            return;
        }

        setRewriting(true);
        setError('');
        setResult(null);

        const formData = new FormData();
        formData.append('cv', file);

        try {
            const response = await api.post('/rewrite-cv', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setResult(response.data);
        } catch (err) {
            console.error(err);
            setError('Failed to rewrite CV. Please try again.');
        } finally {
            setRewriting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center">
            <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent flex items-center gap-2"
            >
                <Wand2 /> Editor Predictivo STAR
            </motion.h1>
            <p className="text-slate-400 mb-8 max-w-2xl text-center">
                Módulo II: La IA no solo detecta errores, los corrige. Transformamos tus puntos débiles en logros de alto impacto.
            </p>

            {/* UPLOAD SECTION (Simple wrapper if no file loaded yet) */}
            {!result && (
                <div className="w-full max-w-xl space-y-4">
                    <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
                        <div className="border-2 border-dashed border-slate-600 rounded-xl p-8 text-center cursor-pointer relative">
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            {file ? (
                                <div className="text-green-400 flex items-center justify-center gap-2 font-bold">
                                    <FileText /> {file.name}
                                </div>
                            ) : (
                                <span className="text-slate-400">Sube tu CV para optimizar (PDF)</span>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={handleRewrite}
                        disabled={rewriting || !file}
                        className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl shadow-lg transition-all"
                    >
                        {rewriting ? 'Reescribiendo con Método STAR...' : 'OPTIMIZAR AHORA'}
                    </button>
                    {error && <p className="text-red-400 text-center">{error}</p>}
                </div>
            )}

            {/* RESULTS DIFF VIEW */}
            {result && (
                <div className="w-full max-w-5xl space-y-6">
                    <div className="bg-slate-900/50 p-4 rounded-lg border border-slate-700 text-center mb-4">
                        <p className="text-slate-300 italic">"{result.general_advice}"</p>
                    </div>

                    {result.improvements?.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-800 p-6 rounded-2xl border border-slate-700 hover:border-purple-500/50 transition-colors"
                        >
                            {/* BEFORE */}
                            <div className="space-y-2">
                                <div className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1">
                                    <X size={14} /> Antes (Débil)
                                </div>
                                <div className="p-4 bg-red-900/10 border border-red-900/30 rounded-xl text-slate-300 text-sm leading-relaxed">
                                    {item.original}
                                </div>
                            </div>

                            {/* AFTER */}
                            <div className="space-y-2 relative">
                                <div className="absolute -left-6 top-1/2 -translate-y-1/2 hidden md:block text-slate-600">
                                    <ArrowRight />
                                </div>
                                <div className="text-xs font-bold text-green-400 uppercase tracking-wider flex items-center gap-1">
                                    <Check size={14} /> Después (STAR Optimizado)
                                </div>
                                <div className="p-4 bg-green-900/10 border border-green-900/30 rounded-xl text-white text-sm font-medium leading-relaxed shadow-inner shadow-green-900/20">
                                    {item.improved}
                                </div>
                                <button className="w-full mt-2 text-xs bg-green-600 hover:bg-green-500 py-2 rounded text-white font-bold">
                                    ACEPTAR CAMBIO
                                </button>
                            </div>
                        </motion.div>
                    ))}

                    <button
                        onClick={() => setResult(null)}
                        className="mx-auto block text-slate-500 hover:text-white mt-8 underline"
                    >
                        Subir otro CV
                    </button>
                </div>
            )}
        </div>
    );
};

export default CVEditor;
