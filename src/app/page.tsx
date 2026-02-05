"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Script from "next/script";

// Components will be imported here
// For now, inline simple components or keep structure

export default function Home() {
    const [modalOpen, setModalOpen] = useState<string | null>(null);
    const [cookieBannerVisible, setCookieBannerVisible] = useState(false);

    useEffect(() => {
        // Parallax configuration
        const parallaxConfig: any = {
            hero: { background: 0.5, lamp: 0.3, foreground: 1.0 },
            descenso: { background: 0.4, midground: 0.7, foreground: 1.0, deep: 1.2 },
            tension: { background: 0.3, midground: 0.6, foreground: 1.0 },
            nucleo: { background: 0.6, foreground: 1.0 },
            resultado: { background: 0.8, foreground: 1.0 },
            cierre: { background: 0.9, foreground: 1.0 }
        };

        let rafId: number | null = null;

        const handleParallax = () => {
            const scrolled = window.scrollY;

            // Section 1: IMPACTO
            const impacto = document.querySelector('#impacto') as HTMLElement;
            if (impacto) {
                // const impactoOffset = impacto.offsetTop; // 0 usually
                const impactoHeight = impacto.offsetHeight;
                if (scrolled < impactoHeight) {
                    const bgWall = impacto.querySelector('.background-wall') as HTMLElement;
                    const lamp = impacto.querySelector('.lamp-light') as HTMLElement;
                    const fg = impacto.querySelector('.foreground') as HTMLElement;

                    if (bgWall) bgWall.style.transform = `translateY(${scrolled * parallaxConfig.hero.background}px)`;
                    if (lamp) lamp.style.transform = `translateY(${scrolled * parallaxConfig.hero.lamp}px)`;
                    if (fg) fg.style.transform = `translateY(${scrolled * parallaxConfig.hero.foreground * 0.2}px)`;
                }
            }

            // Section 2: DESCENSO
            const descenso = document.querySelector('#descenso') as HTMLElement;
            if (descenso) {
                const descensoOffset = descenso.offsetTop;
                const descensoHeight = descenso.offsetHeight;
                const relativeScroll = scrolled - descensoOffset;

                if (relativeScroll > -window.innerHeight && relativeScroll < descensoHeight) {
                    const bgWall = descenso.querySelector('.background-wall') as HTMLElement;
                    const mg = descenso.querySelector('.midground') as HTMLElement;
                    const fg = descenso.querySelector('.foreground') as HTMLElement;
                    const deep = descenso.querySelector('.deep-foreground') as HTMLElement;

                    if (bgWall) bgWall.style.transform = `translateY(${relativeScroll * parallaxConfig.descenso.background}px)`;
                    if (mg) mg.style.transform = `translateY(${relativeScroll * parallaxConfig.descenso.midground}px)`;
                    if (fg) fg.style.transform = `translateY(${relativeScroll * parallaxConfig.descenso.foreground}px)`;
                    if (deep) deep.style.transform = `translateY(${relativeScroll * parallaxConfig.descenso.deep}px)`;

                    // Stagger fade-in for statements (Re-implemented in React/CSS via classes mostly, but if logical trigger needed:)
                    const statements = descenso.querySelectorAll('.statement');
                    statements.forEach((stmt: any, index) => {
                        const delay = index * 200;
                        const triggerPoint = descensoHeight * 0.3 + delay;
                        if (relativeScroll > triggerPoint) {
                            stmt.style.animationDelay = `${delay}ms`;
                        }
                    });
                }
            }

            // Section 3: TENSIÓN
            const tension = document.querySelector('#tension') as HTMLElement;
            if (tension) {
                const tensionOffset = tension.offsetTop;
                const tensionHeight = tension.offsetHeight;
                const relativeScroll = scrolled - tensionOffset;

                if (relativeScroll > -window.innerHeight && relativeScroll < tensionHeight) {
                    const bgWall = tension.querySelector('.background-wall') as HTMLElement;
                    const mg = tension.querySelector('.midground') as HTMLElement;
                    const fg = tension.querySelector('.foreground') as HTMLElement;

                    if (bgWall) bgWall.style.transform = `translateY(${relativeScroll * parallaxConfig.tension.background}px)`;
                    if (mg) mg.style.transform = `translateY(${relativeScroll * parallaxConfig.tension.midground}px)`;
                    if (fg) fg.style.transform = `translateY(${relativeScroll * parallaxConfig.tension.foreground}px)`;
                }
            }

            // Section 4: NÚCLEO
            const nucleo = document.querySelector('#nucleo') as HTMLElement;
            if (nucleo) {
                const nucleoOffset = nucleo.offsetTop;
                const nucleoHeight = nucleo.offsetHeight;
                const relativeScroll = scrolled - nucleoOffset;

                if (relativeScroll > -window.innerHeight && relativeScroll < nucleoHeight) {
                    const bgWall = nucleo.querySelector('.background-wall') as HTMLElement;
                    const fg = nucleo.querySelector('.foreground') as HTMLElement;

                    if (bgWall) bgWall.style.transform = `translateY(${relativeScroll * parallaxConfig.nucleo.background}px)`;
                    if (fg) fg.style.transform = `translateY(${relativeScroll * parallaxConfig.nucleo.foreground * 0.3}px)`;
                }
            }

            // Section 5: RESULTADO
            const resultado = document.querySelector('#resultado') as HTMLElement;
            if (resultado) {
                const resultadoOffset = resultado.offsetTop;
                const resultadoHeight = resultado.offsetHeight;
                const relativeScroll = scrolled - resultadoOffset;

                if (relativeScroll > -window.innerHeight && relativeScroll < resultadoHeight) {
                    const bgWall = resultado.querySelector('.background-wall') as HTMLElement;
                    const fg = resultado.querySelector('.foreground') as HTMLElement;

                    if (bgWall) bgWall.style.transform = `translateY(${relativeScroll * parallaxConfig.resultado.background}px)`;
                    if (fg) fg.style.transform = `translateY(${relativeScroll * parallaxConfig.resultado.foreground * 0.2}px)`;
                }
            }

            // Section 6: CIERRE
            const cierre = document.querySelector('#cierre') as HTMLElement;
            if (cierre) {
                const cierreOffset = cierre.offsetTop;
                const cierreHeight = cierre.offsetHeight;
                const relativeScroll = scrolled - cierreOffset;

                if (relativeScroll > -window.innerHeight && relativeScroll < cierreHeight) {
                    const bgWall = cierre.querySelector('.background-wall') as HTMLElement;
                    const fg = cierre.querySelector('.foreground') as HTMLElement;

                    if (bgWall) bgWall.style.transform = `translateY(${relativeScroll * parallaxConfig.cierre.background}px)`;
                    if (fg) fg.style.transform = `translateY(${relativeScroll * parallaxConfig.cierre.foreground * 0.1}px)`;
                }
            }
        };

        const onScroll = () => {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(handleParallax);
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        // Initial call
        handleParallax();

        return () => {
            window.removeEventListener('scroll', onScroll);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("zunchos_cookie_consent", "accepted");
        setCookieBannerVisible(false);
    };

    const rejectCookies = () => {
        localStorage.setItem("zunchos_cookie_consent", "rejected");
        setCookieBannerVisible(false);
    };

    const closeModal = () => setModalOpen(null);

    return (
        <main>
            <ParallaxSection id="impacto" parallaxId="hero" className="section">
                <div className="parallax-layer background-wall"></div>
                <div className="parallax-layer lamp-light"></div>
                <div className="parallax-layer foreground">
                    <div className="hero-content">
                        <h1 className="sr-only">ZUNCHOS: Infraestructura comercial autónoma para agencias B2B</h1>
                        <p className="sr-only">Sustituimos la dependencia humana y el caos operativo por sistemas de acero.</p>
                        <Image src="/Utils/ZUNCHOS.png" alt="Logo Industrial ZUNCHOS" width={300} height={100} className="hero-logo" priority />
                    </div>
                </div>
            </ParallaxSection>

            <ParallaxSection id="descenso" parallaxId="descenso" className="section">
                {/* ... (rest of the sections remain same, using ParallaxSection as wrapper) ... */}
                <div className="parallax-layer background-wall"></div>
                <div className="parallax-layer midground">
                    <div className="content-block">
                        <div className="text-engraved">
                            <h2 className="statement">No faltan leads</h2>
                        </div>
                    </div>
                </div>
                <div className="parallax-layer foreground">
                    <div className="content-block">
                        <div className="text-engraved">
                            <h2 className="statement">Falta estructura</h2>
                        </div>
                    </div>
                </div>
                <div className="parallax-layer deep-foreground">
                    <div className="content-block">
                        <div className="text-engraved">
                            <p className="statement statement-critical">Dependencia humana = sistema frágil</p>
                        </div>
                    </div>
                </div>
            </ParallaxSection>

            <ParallaxSection id="tension" parallaxId="tension" className="section section-tension">
                <div className="parallax-layer background-wall"></div>
                <div className="parallax-layer midground">
                    <div className="content-block tension-metaphor">
                        <div className="metaphor-line"><span className="metaphor-item">Camión</span></div>
                        <div className="metaphor-line"><span className="metaphor-item">Carga</span></div>
                        <div className="metaphor-line"><span className="metaphor-item">Personas sujetando</span></div>
                    </div>
                </div>
                <div className="parallax-layer foreground">
                    <div className="content-block tension-conclusion">
                        <p className="inequality">≠ solución</p>
                        <h2 className="solution-statement">ZUNCHOS = zuncho de acero</h2>
                    </div>
                </div>
            </ParallaxSection>

            <ParallaxSection id="nucleo" parallaxId="nucleo" className="section section-nucleo">
                <div className="parallax-layer background-wall"></div>
                <div className="parallax-layer foreground">
                    <div className="content-block nucleo-content">
                        <div className="nucleo-denial">
                            <p className="denial-item">No es chatbot</p>
                            <p className="denial-item">No es CRM</p>
                            <p className="denial-item">No es automatización suelta</p>
                        </div>
                        <div className="nucleo-affirmation">
                            <h2 className="affirmation-header">Sí es:</h2>
                            <ul className="affirmation-list">
                                <li>Infraestructura</li>
                                <li>Sistema operativo</li>
                                <li>Arquitectura autónoma</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </ParallaxSection>

            <ParallaxSection id="resultado" parallaxId="resultado" className="section section-resultado">
                <div className="parallax-layer background-wall"></div>
                <div className="parallax-layer foreground">
                    <div className="content-block resultado-content">
                        <div className="resultado-list">
                            <h3 className="resultado-item">Menos caos</h3>
                            <h3 className="resultado-item">Menos dependencia</h3>
                            <h3 className="resultado-item">Más margen</h3>
                        </div>
                        <div className="resultado-conclusion">
                            <p className="conclusion-statement">El sistema aguanta solo</p>
                        </div>
                    </div>
                </div>
            </ParallaxSection>

            <ParallaxSection id="cierre" parallaxId="cierre" className="section section-cierre">
                <div className="parallax-layer background-wall"></div>
                <div className="parallax-layer foreground">
                    <div className="content-block cierre-content">
                        <p className="final-statement">
                            Si tu agencia depende de personas para no romperse,<br />
                            está <span className="highlight-term">deszunchada</span>.
                        </p>
                        <button className="cta-button" id="cta-main" onClick={() => (window as any).openChatCloser && (window as any).openChatCloser()}>Revisar puntos de tensión</button>
                    </div>
                </div>
            </ParallaxSection>

            <section id="faq" className="section bg-almost-black p-20 border-t border-steel-border">
                <div className="content-block text-left max-w-4xl mx-auto">
                    <h2 className="affirmation-header text-center mb-12">Preguntas Frecuentes</h2>
                    <div className="mb-8">
                        <h3 className="text-white text-xl mb-2 font-space">¿Qué es ZUNCHOS?</h3>
                        <p className="text-secondary text-sm">ZUNCHOS es una infraestructura comercial autónoma diseñada para agencias B2B.</p>
                    </div>
                    <div className="mb-8">
                        <h3 className="text-white text-xl mb-2 font-space">¿Cómo funciona?</h3>
                        <p className="text-secondary text-sm">Se integra como una capa operativa que intercepta, cualifica y cierra reuniones de forma automática.</p>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-links">
                        <button className="footer-link" onClick={() => setModalOpen('legal')}>Aviso Legal</button>
                        <span className="footer-separator">·</span>
                        <button className="footer-link" onClick={() => setModalOpen('privacidad')}>Privacidad</button>
                        <span className="footer-separator">·</span>
                        <button className="footer-link" onClick={() => setModalOpen('cookies')}>Cookies</button>
                    </div>
                    <div className="footer-copyright">
                        © 2026 ZUNCHOS. Infraestructura autónoma.
                    </div>
                </div>
            </footer>

            {/* Legal Android Modals */}
            {modalOpen && (
                <div className="fixed inset-0 z-[12000] flex items-center justify-center">
                    <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={closeModal}></div>
                    <div className="relative z-[12001] bg-almost-black border border-steel-border w-[90%] max-w-2xl max-h-[85vh] overflow-y-auto p-8 shadow-2xl">
                        <button className="absolute top-4 right-4 text-2xl text-dim hover:text-rust" onClick={closeModal}>&times;</button>
                        <LegalContent type={modalOpen} />
                    </div>
                </div>
            )}

            {/* Cookie Banner */}
            {cookieBannerVisible && (
                <div className="fixed bottom-0 left-0 w-full bg-almost-black border-t-2 border-steel-border p-6 z-[11000] shadow-2xl animate-slideUp">
                    <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-8">
                        <div className="flex-1 min-w-[300px]">
                            <h4 className="text-rust uppercase tracking-widest text-sm mb-2">Protocolo de Cookies</h4>
                            <p className="text-secondary text-xs">Usamos cookies propias y de terceros para que esta web zunche. Tú decides qué tornillos apretar.</p>
                        </div>
                        <div className="flex gap-4">
                            <button onClick={acceptCookies} className="bg-steel-mid text-primary border border-steel-border px-6 py-3 text-xs font-bold uppercase hover:bg-rust-dark">Aceptar Todo</button>
                            <button onClick={rejectCookies} className="bg-transparent text-dim border border-steel-border px-6 py-3 text-xs font-bold uppercase hover:text-primary">Solo Necesarias</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Chat Component Injection */}
            <Script src="/_legacy/chat-closer.js" strategy="afterInteractive" />
            <div id="chat-closer-container"></div>
            <ChatCloserWrapper />
        </main>
    );
}

// Helper Components (Simplified)
function ParallaxSection({ id, parallaxId, className, children }: any) {
    return (
        <section id={id} className={className} data-parallax={parallaxId}>
            {children}
        </section>
    );
}

function LegalContent({ type }: { type: string }) {
    if (type === 'legal') return (
        <div className="legal-content text-secondary text-sm space-y-4">
            <h3 className="text-primary text-lg uppercase mb-4">Aviso Legal</h3>
            <p>Titular: ZUNCHOS | NIF: 74369784 | Tel: 965441687 | Email: info@zunchos.io</p>
            <p>Regula el acceso y uso del sitio web...</p>
        </div>
    );
    if (type === 'privacidad') return (
        <div className="legal-content text-secondary text-sm space-y-4">
            <h3 className="text-primary text-lg uppercase mb-4">Política de Privacidad</h3>
            <p>Responsable: ZUNCHOS | NIF: 74369784</p>
            <p>Tratamos datos para...",</p>
        </div>
    );
    return (
        <div className="legal-content text-secondary text-sm space-y-4">
            <h3 className="text-primary text-lg uppercase mb-4">Política de Cookies</h3>
            <p>Usamos cookies técnicas y analíticas...</p>
        </div>
    );
}

function ChatCloserWrapper() {
    // This component helps bridge the React world with the legacy chat-closer.js
    // ensuring the container exists and event listeners are attached if needed.
    useEffect(() => {
        // Initialize chat if script is loaded
        if ((window as any).initializeChatHTML) {
            (window as any).initializeChatHTML();
        }
    }, []);
    return null;
}
