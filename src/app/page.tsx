"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import ChatCloser from "@/components/ChatCloser";

export default function Home() {
 const containerRef = useRef<HTMLDivElement>(null);
 const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ["start start", "end end"]
 });

 // Smooth out the scroll progress for heavier feel
 const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

 const [mounted, setMounted] = useState(false);
 useEffect(() => setMounted(true), []);

 // --- TRANSFORMS ---

 // 1. IMPACT (0 - 15%)
 const impactY = useTransform(smoothProgress, [0, 0.15], ["0%", "50%"]);
 const impactOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);
 const lampScale = useTransform(smoothProgress, [0, 0.15], [1, 1.5]);

 // 2. DESCENT (15% - 35%)
 const descentOpacity = useTransform(smoothProgress, [0.10, 0.15, 0.30, 0.35], [0, 1, 1, 0]);
 const descentY = useTransform(smoothProgress, [0.10, 0.35], ["20%", "-20%"]);
 const statement1X = useTransform(smoothProgress, [0.15, 0.25], ["-50px", "0px"]);
 const statement2X = useTransform(smoothProgress, [0.15, 0.25], ["50px", "0px"]);

 // 3. TENSION (35% - 55%)
 const tensionOpacity = useTransform(smoothProgress, [0.35, 0.40, 0.50, 0.55], [0, 1, 1, 0]);
 const truckY = useTransform(smoothProgress, [0.35, 0.55], ["-10%", "10%"]); // Heavy slow move
 const loadRotate = useTransform(smoothProgress, [0.35, 0.55], [-2, 2]); // Slight unstable tilt

 // 4. CORE (55% - 75%)
 const coreOpacity = useTransform(smoothProgress, [0.55, 0.60, 0.70, 0.75], [0, 1, 1, 0]);
 const coreScale = useTransform(smoothProgress, [0.60, 0.70], [0.95, 1.05]);

 // 5. RESULT (75% - 90%)
 const resultOpacity = useTransform(smoothProgress, [0.75, 0.80, 0.95], [0, 1, 0]);
 const box1Y = useTransform(smoothProgress, [0.75, 0.90], ["50px", "0px"]);
 const box2Y = useTransform(smoothProgress, [0.75, 0.90], ["100px", "0px"]); // Parallax stagger
 const box3Y = useTransform(smoothProgress, [0.75, 0.90], ["150px", "0px"]);

 // 6. CLOSURE (90% - 100%)
 const closureOpacity = useTransform(smoothProgress, [0.90, 0.95], [0, 1]);
 const closureY = useTransform(smoothProgress, [0.90, 1], ["20%", "0%"]);

 // Global Background Wall Movement (Subtle continuous move)
 const wallY = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]);


 if (!mounted) return <div className="bg-bg-dark h-screen w-screen" />;

 return (
  <main ref={containerRef} className="relative w-full min-h-[600vh] bg-bg-dark overflow-hidden">

   {/* --- GLOBAL PARALLAX LAYER (THE WALL) --- */}
   <motion.div
    className="fixed inset-0 w-full h-[120%] -top-[10%] z-0 pointer-events-none opacity-40 mix-blend-hard-light"
    style={{
     y: wallY,
     backgroundImage: "url('/Utils/pared.png')",
     backgroundSize: "cover",
     backgroundRepeat: "repeat-y"
    }}
   />

   {/* --- 1. IMPACT --- */}
   <motion.div
    className="fixed inset-0 z-10 flex items-center justify-center pointer-events-none"
    style={{ opacity: impactOpacity, y: impactY }}
   >
    {/* Lamp */}
    <motion.div
     className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] max-w-[600px] max-h-[600px] bg-radial-gradient from-white/10 to-transparent mix-blend-overlay"
     style={{ scale: lampScale }}
    />

    {/* Content */}
    <div className="relative text-center">
     <Image
      src="/Utils/ZUNCHOS.png"
      alt="ZUNCHOS"
      width={500}
      height={150}
      className="mx-auto grayscale contrast-125 drop-shadow-2xl opacity-90"
      priority
     />
     <h1 className="sr-only">ZUNCHOS - Infraestructura Comercial Autónoma</h1>
    </div>
   </motion.div>


   {/* --- 2. DESCENT --- */}
   <motion.div
    className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none"
    style={{ opacity: descentOpacity, y: descentY }}
   >
    <div className="flex flex-col gap-24 items-center w-full max-w-4xl px-6">
     <motion.h2 className="text-engraved statement-huge" style={{ x: statement1X }}>
      NO FALTAN LEADS
     </motion.h2>
     <motion.h2 className="text-engraved statement-huge text-black/50" style={{ x: statement2X }}>
      FALTA ESTRUCTURA
     </motion.h2>

     <div className="text-technical mt-12 border-l-4 border-rust-dark pl-6">
      <p className="text-xl text-rust-mid font-bold">DEPENDÉNCIA HUMANA</p>
      <p className="text-4xl text-dim font-space font-bold">=</p>
      <p className="text-xl text-rust-mid font-bold">SISTEMA FRÁGIL</p>
     </div>
    </div>
   </motion.div>


   {/* --- 3. TENSION --- */}
   <motion.div
    className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none"
    style={{ opacity: tensionOpacity }}
   >
    <div className="relative w-full h-full flex items-center justify-center">
     {/* Background Massive Text - Parallaxed */}
     <motion.div className="absolute left-[5%] top-[20%] text-[10vw] font-bold text-black opacity-20 select-none" style={{ y: truckY }}>
      CAMIÓN
     </motion.div>
     <motion.div className="absolute right-[5%] bottom-[20%] text-[10vw] font-bold text-black opacity-20 select-none" style={{ y: truckY, rotate: loadRotate }}>
      CARGA
     </motion.div>

     <div className="bg-black/60 backdrop-blur-md p-10 border-y border-steel-border text-center">
      <p className="text-2xl md:text-3xl font-space text-dim mb-4">Personas sujetando ≠ Solución</p>
      <h2 className="text-3xl md:text-5xl font-space text-white uppercase tracking-widest">
       ZUNCHOS = <span className="text-rust-mid">ZUNCHO DE ACERO</span>
      </h2>
     </div>
    </div>
   </motion.div>


   {/* --- 4. CORE --- */}
   <motion.div
    className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
    style={{ opacity: coreOpacity, scale: coreScale }}
   >
    <div className="spec-sheet shadow-2xl w-[90%] md:w-auto pointer-events-auto">
     <h3 className="text-xl md:text-2xl font-space mb-8 border-b border-rust-mid pb-4 tracking-widest text-rust-bright">
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

     <div className="mt-8 text-right text-xs md:text-sm font-mono text-dim flex flex-col gap-1">
      <span className="line-through decoration-rust-mid">CHATBOT</span>
      <span className="line-through decoration-rust-mid">CRM DE JUGUETE</span>
      <span className="line-through decoration-rust-mid">AUTOMATIZACIÓN SUELTA</span>
     </div>
    </div>
   </motion.div>


   {/* --- 5. RESULT --- */}
   <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
    style={{ opacity: resultOpacity }}
   >
    <div className="w-full max-w-6xl px-6">
     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      <motion.div style={{ y: box1Y }} className="border border-steel-highlight bg-steel-dark p-8 flex flex-col justify-center h-48 md:h-64">
       <h3 className="text-xl md:text-4xl font-space text-dim">MENOS CAOS</h3>
      </motion.div>
      <motion.div style={{ y: box2Y }} className="border border-steel-highlight bg-steel-dark p-8 flex flex-col justify-center h-48 md:h-64">
       <h3 className="text-xl md:text-4xl font-space text-dim">MENOS DEPENDENCIA</h3>
      </motion.div>
      <motion.div style={{ y: box3Y }} className="border border-rust-dark bg-rust-dark/10 p-8 flex flex-col justify-center h-48 md:h-64">
       <h3 className="text-2xl md:text-5xl font-space text-rust-bright">MÁS MARGEN</h3>
      </motion.div>
     </div>

     <div className="text-center mt-20">
      <p className="text-engraved text-xl md:text-2xl tracking-[0.5em] md:tracking-[1em]">EL SISTEMA AGUANTA SOLO</p>
     </div>
    </div>
   </motion.div>


   {/* --- 6. CLOSURE --- */}
   <motion.div
    className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-auto"
    style={{ opacity: closureOpacity, y: closureY }}
   >
    <div className="relative z-10 flex flex-col items-center justify-center w-full h-full bg-gradient-to-t from-black via-black/95 to-transparent">
     <p className="text-center text-xl md:text-4xl font-space text-gray-400 mb-12 max-w-4xl px-6 leading-relaxed">
      Si tu agencia depende de personas para no romperse,<br className="hidden md:block" />
      está <span className="text-rust-bright border-b-4 border-rust-dark">DESZUNCHADA</span>.
     </p>

     <button
      onClick={() => window.dispatchEvent(new CustomEvent('zunchos:open-chat'))}
      className="cta-primary relative group overflow-hidden"
     >
      <span className="relative z-10">REVISAR PUNTOS DE TENSIÓN</span>
      <div className="absolute inset-0 bg-rust-bright transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 z-0 opacity-20" />
     </button>

     <Footer />
    </div>
   </motion.div>

   <ChatCloser />
  </main>
 );
}

function Footer() {
 const [modal, setModal] = useState<string | null>(null);

 return (
  <>
   <div className="absolute bottom-10 w-full border-t border-white/10 pt-8 text-center text-[10px] text-dim font-mono uppercase tracking-widest">
    ZUNCHOS INFRAESTRUCTURA © 2026
    <span className="mx-4">|</span>
    <button onClick={() => setModal('legal')} className="hover:text-white transition mr-4">AVISO LEGAL</button>
    <button onClick={() => setModal('privacy')} className="hover:text-white transition">PRIVACIDAD</button>
   </div>

   {modal && (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4" onClick={() => setModal(null)}>
     <div className="bg-steel-dark border border-steel-border p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
      <h3 className="text-xl text-rust-bright mb-4 uppercase">{modal}</h3>
      <p className="text-sm text-secondary">Texto legal placeholder para {modal}...</p>
      <button onClick={() => setModal(null)} className="mt-6 text-xs text-dim underline uppercase">Cerrar</button>
     </div>
    </div>
   )}
  </>
 );
}
