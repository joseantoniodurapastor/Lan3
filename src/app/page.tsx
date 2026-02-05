"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParallax } from "@/hooks/useParallax";
import ChatCloser from "@/components/ChatCloser";

export default function Home() {
 const parallax = useParallax();
 const [mounted, setMounted] = useState(false);

 useEffect(() => {
  setMounted(true);
 }, []);

 // Scroll to bottom trigger for CTA
 const scrollToClosure = () => {
  window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
 };

 if (!mounted) return <div className="bg-black h-screen w-screen" />;

 return (
  <main className="steel-container">
   {/* --- LAYERS (Z-Index Ordered) --- */}

   {/* 1. GLOBAL BACKGROUND (The Steel Wall) */}
   <div className="parallax-element wall-texture" style={{ transform: `translateY(0px)` }}></div>

   {/* =========================================================
                NARRATIVE FLOW - ABSOLUTE POSITIONED "STATIONS"
               ========================================================= */}

   {/* --- 1. IMPACT (0vh - 100vh) --- 
                "Aquí dentro hay algo que aguanta peso." */}
   <div className="parallax-element" style={{ top: '15vh', transform: parallax.heroLamp }}>
    <div className="lamp-light" />
   </div>

   <div className="parallax-element interactive" style={{ top: '30vh', textAlign: 'center', transform: parallax.heroBg }}> {/* Reusing heroBg for logo/main element */}
    <Image
     src="/Utils/ZUNCHOS.png"
     alt="ZUNCHOS STRUCTURE"
     width={500}
     height={150}
     className="mx-auto grayscale contrast-125 drop-shadow-2xl opacity-90"
     priority
    />
    <h1 className="sr-only">ZUNCHOS - Infraestructura Comercial Autónoma</h1>
   </div>


   {/* --- 2. DESCENT (100vh - 200vh) --- 
                "No faltan leads. Falta estructura." */}
   <div className="parallax-element" style={{ top: '120vh', transform: parallax.descentBg }}>
    <div className="flex flex-col gap-32 items-center">
     <h2 className="text-engraved statement-huge">NO FALTAN LEADS</h2>
     <h2 className="text-engraved statement-huge text-black/50" style={{ transform: 'translateX(100px)' }}>FALTA ESTRUCTURA</h2>

     <div className="text-technical mt-20 border-l-4 border-rust-dark pl-6 max-w-md mx-auto">
      <p className="text-xl text-rust-mid font-bold">DEPENDÉNCIA HUMANA</p>
      <p className="text-4xl text-dim font-space font-bold">=</p>
      <p className="text-xl text-rust-mid font-bold">SISTEMA FRÁGIL</p>
     </div>
    </div>
   </div>


   {/* --- 3. TENSION (200vh - 300vh) --- 
                "Camión. Carga. Personas sujetando." */}
   <div className="parallax-element" style={{ top: '220vh', transform: parallax.tensionBg }}>
    <div className="w-full text-center relative">
     <div className="absolute left-[10%] opacity-20 text-[12rem] font-bold text-black select-none pointer-events-none -z-10">CAMIÓN</div>
     <div className="absolute right-[10%] top-40 opacity-20 text-[12rem] font-bold text-black select-none pointer-events-none -z-10">CARGA</div>

     <div className="flex flex-col gap-8 items-center bg-black/40 backdrop-blur-sm p-12 border-y border-steel-border inline-block mx-auto">
      <p className="text-3xl font-space text-dim">Personas sujetando ≠ Solución</p>
      <h2 className="text-5xl font-space text-white uppercase tracking-widest mt-4">
       ZUNCHOS = <span className="text-rust-mid">ZUNCHO DE ACERO</span>
      </h2>
     </div>
    </div>
   </div>


   {/* --- 4. CORE (300vh - 400vh) --- 
                "Technical Spec Sheet" */}
   <div className="parallax-element interactive" style={{ top: '320vh', transform: parallax.coreBg }}>
    <div className="spec-sheet shadow-2xl">
     <h3 className="text-2xl font-space mb-8 border-b border-rust-mid pb-4 tracking-widest text-rust-bright">
      ESPECIFICACIÓN TÉCNICA // MOD. ARS-01
     </h3>

     <div className="spec-row">
      <span className="spec-label">TIPO:</span>
      <span className="spec-value">INFRAESTRUCTURA</span>
     </div>
     <div className="spec-row">
      <span className="spec-label">ARQUITECTURA:</span>
      <span className="spec-value">AUTÓNOMA</span>
     </div>
     <div className="spec-row">
      <span className="spec-label">FUNCIÓN:</span>
      <span className="spec-value">SISTEMA OPERATIVO</span>
     </div>

     <div className="mt-8 text-right text-sm font-mono text-dim">
      <span className="denial">CHATBOT</span>
      <span className="denial">CRM DE JUGUETE</span>
      <span className="denial">AUTOMATIZACIÓN SUELTA</span>
     </div>
    </div>
   </div>


   {/* --- 5. RESULT (400vh - 500vh) --- 
                "Menos caos. Más margen." */}
   <div className="parallax-element" style={{ top: '420vh', transform: parallax.result && parallax.result.bg }}>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-center px-4">
     <div className="border border-steel-highlight bg-steel-dark p-10 flex flex-col justify-center h-64">
      <h3 className="text-4xl font-space text-dim">MENOS CAOS</h3>
     </div>
     <div className="border border-steel-highlight bg-steel-dark p-10 flex flex-col justify-center h-64 mt-12 md:mt-0">
      <h3 className="text-4xl font-space text-dim">MENOS DEPENDENCIA</h3>
     </div>
     <div className="border border-rust-dark bg-rust-dark/10 p-10 flex flex-col justify-center h-64 mt-24 md:mt-0">
      <h3 className="text-5xl font-space text-rust-bright">MÁS MARGEN</h3>
     </div>
    </div>

    <div className="text-center mt-24">
     <p className="text-engraved text-2xl tracking-[1em]">EL SISTEMA AGUANTA SOLO</p>
    </div>
   </div>


   {/* --- 6. CLOSURE (500vh - 600vh) --- 
                "Revisar puntos de tensión." */}
   <div className="parallax-element interactive" style={{ top: '520vh', zIndex: 50 }}>
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-t from-black via-black/90 to-transparent w-full">
     <p className="text-center text-2xl md:text-4xl font-space text-gray-400 mb-12 max-w-4xl px-6 leading-relaxed">
      Si tu agencia depende de personas para no romperse,<br />
      está <span className="text-rust-bright border-b-4 border-rust-dark">DESZUNCHADA</span>.
     </p>

     <button
      onClick={() => {
       // Trigger Chat-Closer (Will implement custom event logic in Phase 2)
       window.dispatchEvent(new CustomEvent('zunchos:open-chat'));
      }}
      className="cta-primary"
     >
      REVISAR PUNTOS DE TENSIÓN
     </button>

     <div className="mt-32 w-full border-t border-white/10 pt-8 pb-16 text-center text-xs text-dim font-mono uppercase tracking-widest">
      ZUNCHOS INFRAESTRUCTURA © 2026
      <span className="mx-4">|</span>
      <span className="cursor-pointer hover:text-white transition">AVISO LEGAL</span>
     </div>
    </div>
   </div>

   {/* --- CHAT COMPONENT (PHASE 2) --- */}
   <ChatCloser />
  </main>
 );
}
