export default function ThankYou() {
    return (
        <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E")`
            }}></div>

            <div className="z-10 max-w-2xl text-center border border-zinc-800 bg-zinc-900/50 p-12 backdrop-blur-md">
                <div className="mb-8 text-rust-bright text-6xl">
                    ✓
                </div>

                <h1 className="text-4xl md:text-5xl font-bold font-sans uppercase tracking-tighter mb-6 text-zinc-100">
                    Diagnóstico Zunchado
                </h1>

                <div className="h-px w-24 bg-rust-mid mx-auto mb-8"></div>

                <p className="text-xl text-zinc-400 font-mono mb-8">
                    Pago confirmado. La estructura está asegurada.
                </p>

                <p className="text-sm text-zinc-500 uppercase tracking-widest border border-zinc-800 p-4 inline-block">
                    En{" "}<span className="text-white font-bold">&lt; 24h hábiles</span>{" "}te contactamos para agendar.
                </p>

                <div className="mt-12">
                    <a href="/" className="text-xs text-zinc-600 hover:text-white transition uppercase border-b border-transparent hover:border-white pb-1">
                        Volver al inicio
                    </a>
                </div>
            </div>
        </main>
    );
}
