"use client";

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

// === CONFIGURATION ===
const STRIPE_DIAGNOSIS_PRICE_EUL = "2.856";
// In real prod, this comes from env, but we mock for now or use if available
const ENABLE_STRIPE_MOCK = true;

type ChatState =
    | 'IDLE'
    | 'TRIGGER_PROMPT'
    | 'FILTER_REVENUE'
    | 'FILTER_TYPE'
    | 'FILTER_OPS'
    | 'PROPOSAL'
    | 'DATA_COLLECTION'
    | 'READY_TO_PAY'
    | 'CLOSED_DISQUALIFIED'
    | 'CLOSED_NOT_INTERESTED';

type Message = {
    sender: 'BOT' | 'USER';
    text: string | React.ReactNode;
};

export default function ChatCloser() {
    const [isOpen, setIsOpen] = useState(false);
    const [chatState, setChatState] = useState<ChatState>('IDLE');
    const [messages, setMessages] = useState<Message[]>([]);
    const [userData, setUserData] = useState({ name: '', email: '', company: '', painPoint: '' });
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    // Auto-scroll to bottom of chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // Initial Trigger Listener (from Landing CTA or Scroll)
    useEffect(() => {
        const handleOpenEvent = () => {
            if (chatState === 'IDLE' || chatState === 'CLOSED_NOT_INTERESTED') {
                setIsOpen(true);
                if (messages.length === 0) startConversation();
            } else {
                setIsOpen(true);
            }
        };

        window.addEventListener('zunchos:open-chat', handleOpenEvent);

        // Scroll Trigger (e.g., passing 60% of page)
        const handleScrollTrigger = () => {
            const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
            if (scrollPercent > 0.6 && chatState === 'IDLE' && !isOpen) {
                setIsOpen(true);
                startConversation();
                // Remove listener to prevent re-trigger
                window.removeEventListener('scroll', handleScrollTrigger);
            }
        };
        window.addEventListener('scroll', handleScrollTrigger);

        return () => {
            window.removeEventListener('zunchos:open-chat', handleOpenEvent);
            window.removeEventListener('scroll', handleScrollTrigger);
        };
    }, [chatState, isOpen, messages.length]);


    // === LOGIC HANDLERS ===

    const addBotMessage = (text: string | React.ReactNode, delay = 600) => {
        setTimeout(() => {
            setMessages(prev => [...prev, { sender: 'BOT', text }]);
        }, delay);
    };

    const addUserMessage = (text: string) => {
        setMessages(prev => [...prev, { sender: 'USER', text }]);
    };

    const startConversation = () => {
        setChatState('TRIGGER_PROMPT');
        setMessages([]); // Clear previous if any
        addBotMessage("Aquí dentro solo medimos una cosa: si tu operación aguanta o se cae.");
        addBotMessage("¿Vienes a revisar puntos de tensión de tu agencia o solo estás mirando?", 1200);
    };

    const handleTriggerResponse = (action: 'REVIEW' | 'LOOKING') => {
        if (action === 'LOOKING') {
            addUserMessage("Solo estoy mirando");
            addBotMessage("Perfecto. Mejor no tocar nada si no hay tensión.");
            addBotMessage("Si algún día ves que el camión empieza a vibrar, vuelve.", 1500);
            setTimeout(() => {
                setChatState('CLOSED_NOT_INTERESTED');
                setIsOpen(false);
            }, 4000);
        } else {
            addUserMessage("Revisar puntos de tensión");
            addBotMessage("Vale. No todo el mundo puede entrar aquí.");
            addBotMessage("Te hago 3 preguntas y veo si tiene sentido seguir.", 1200);
            setTimeout(() => setChatState('FILTER_REVENUE'), 2000);
        }
    };

    const handleRevenueResponse = (range: 'LOW' | 'OK') => {
        addUserMessage(range === 'LOW' ? "< 300k€" : "Rango > 300k€"); // Simplified for internal logic
        if (range === 'LOW') {
            addBotMessage("Ahora mismo tu camión todavía es pequeño para ZUNCHOS.");
            addBotMessage("Mejor crecer un poco antes de meter acero industrial.");
            setTimeout(() => {
                setChatState('CLOSED_DISQUALIFIED');
                setIsOpen(false);
            }, 4000);
        } else {
            setTimeout(() => setChatState('FILTER_TYPE'), 800);
        }
    };

    const handleTypeResponse = (type: 'B2B' | 'OTHER') => {
        addUserMessage(type === 'B2B' ? "Servicios B2B" : "Otro (Ecommerce/Info/Local)");
        if (type === 'OTHER') {
            addBotMessage("ZUNCHOS está diseñado para agencias B2B con ciclo de venta complejo.");
            addBotMessage("Lo que tú vendes ahora mismo no encaja con este sistema.");
            setTimeout(() => {
                setChatState('CLOSED_DISQUALIFIED');
                setIsOpen(false);
            }, 4000);
        } else {
            setTimeout(() => setChatState('FILTER_OPS'), 800);
        }
    };

    const handleOpsResponse = (ops: string) => {
        addUserMessage(ops);
        // All options here lead to proposal if previous filters passed
        setTimeout(() => {
            setChatState('PROPOSAL');
            addBotMessage("Vale. Tu camión tiene el tamaño y el peso.");
            addBotMessage("Lo que te propongo aquí es una sola cosa, muy concreta:", 1500);
            addBotMessage(
                <div className="bg-steel-highlight p-4 border border-rust-mid my-2">
                    <p className="font-bold text-white mb-2">DIAGNÓSTICO TÉCNICO ZUNCHOS + ARQUITECTURA</p>
                    <p className="text-sm text-dim mb-4">Análisis completo de operación. Sin demos. Sin pruebas.</p>
                    <p className="text-xl text-rust-bright font-mono">{STRIPE_DIAGNOSIS_PRICE_EUL}€ + IVA</p>
                </div>, 2500
            );
            addBotMessage("¿Quieres comprar ahora este diagnóstico técnico o prefieres parar aquí?", 3500);
        }, 1000);
    };

    const handleProposalResponse = (accepted: boolean) => {
        if (!accepted) {
            addUserMessage("Parar aquí");
            addBotMessage("Mejor así. ZUNCHOS entra cuando hay decisión clara.");
            addBotMessage("Que no se te caiga nada.", 1500);
            setTimeout(() => {
                setChatState('CLOSED_NOT_INTERESTED');
                setIsOpen(false);
            }, 4000);
        } else {
            addUserMessage("Comprar diagnóstico ahora");
            addBotMessage("Perfecto. Necesito solo lo mínimo para conectar tu carga.");
            setTimeout(() => setChatState('DATA_COLLECTION'), 1000);
        }
    };

    const handleDataSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Move to payment state
        addBotMessage("Procesando datos...");

        // Simulate API call to creating checkout logic
        setTimeout(() => {
            setChatState('READY_TO_PAY');
            addBotMessage("Listo. He preparado la pasarela de pago segura.");
            addBotMessage("Cuando completes el pago, recibes confirmación por email y agenda en <24h.", 1500);
        }, 1500);
    };

    const handlePaymentClick = async () => {
        // Here we would call the REAL Stripe API
        // For now, let's simulate the redirect or call a real endpoint if we had one

        if (ENABLE_STRIPE_MOCK) {
            alert("SIMULACIÓN: Redirigiendo a Stripe Checkout...");
            // Redirect to Thank You page directly to simulate success
            router.push('/thank-you.html');
        } else {
            // Real logic: window.location.href = checkoutUrl;
        }
    };


    // === UI RENDERERS ===

    if (!isOpen && chatState === 'IDLE') return null; // Or a mini toggle button

    return (
        <div className={`fixed bottom-0 right-0 md:bottom-10 md:right-10 w-full md:w-[400px] h-[500px] md:h-[600px] bg-steel-dark border border-steel-highlight shadow-2xl z-[9999] flex flex-col transition-transform duration-500 ${isOpen ? 'translate-y-0' : 'translate-y-[120%]'}`}>

            {/* Header */}
            <div className="p-4 border-b border-steel-border bg-steel-mid flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-rust-bright rounded-full animate-pulse" />
                    <span className="font-space font-bold text-sm tracking-widest text-white">ZUNCHOS AUTOMATON</span>
                </div>
                <button onClick={() => setIsOpen(false)} className="text-dim hover:text-white transition">&times;</button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/50 scrollbar-thin scrollbar-thumb-steel-highlight">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.sender === 'BOT' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-[85%] p-3 text-sm font-jetbrains ${msg.sender === 'BOT'
                            ? 'bg-steel-light border-l-2 border-rust-mid text-white'
                            : 'bg-steel-highlight border-r-2 border-dim text-secondary'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            {/* Inputs / Controls Area */}
            <div className="p-4 bg-steel-mid border-t border-steel-border min-h-[80px]">

                {/* STATE: TRIGGER */}
                {chatState === 'TRIGGER_PROMPT' && (
                    <div className="flex flex-col gap-2">
                        <button onClick={() => handleTriggerResponse('REVIEW')} className="chat-btn-primary">REVISAR PUNTOS DE TENSIÓN</button>
                        <button onClick={() => handleTriggerResponse('LOOKING')} className="chat-btn-secondary">SOLO ESTOY MIRANDO</button>
                    </div>
                )}

                {/* STATE: FILTER REVENUE */}
                {chatState === 'FILTER_REVENUE' && (
                    <div className="flex flex-col gap-2">
                        <p className="text-xs text-dim mb-1">Facturación Anual:</p>
                        <button onClick={() => handleRevenueResponse('LOW')} className="chat-btn-secondary text-xs">Menos de 300k€</button>
                        <button onClick={() => handleRevenueResponse('OK')} className="chat-btn-secondary text-xs">300k€ - 500k€</button>
                        <button onClick={() => handleRevenueResponse('OK')} className="chat-btn-secondary text-xs">500k€ - 1M€</button>
                        <button onClick={() => handleRevenueResponse('OK')} className="chat-btn-secondary text-xs">Más de 1M€</button>
                    </div>
                )}

                {/* STATE: FILTER TYPE */}
                {chatState === 'FILTER_TYPE' && (
                    <div className="flex flex-col gap-2">
                        <p className="text-xs text-dim mb-1">Tipo de Negocio:</p>
                        <button onClick={() => handleTypeResponse('B2B')} className="chat-btn-primary">SERVICIOS B2B (Agencia/Consultora)</button>
                        <button onClick={() => handleTypeResponse('OTHER')} className="chat-btn-secondary">Ecommerce / Productos</button>
                        <button onClick={() => handleTypeResponse('OTHER')} className="chat-btn-secondary">Coaching / Info</button>
                        <button onClick={() => handleTypeResponse('OTHER')} className="chat-btn-secondary">Negocio Local</button>
                    </div>
                )}

                {/* STATE: FILTER OPS */}
                {chatState === 'FILTER_OPS' && (
                    <div className="flex flex-col gap-2">
                        <p className="text-xs text-dim mb-1">Conversión actual:</p>
                        <button onClick={() => handleOpsResponse('SDRs / Setters')} className="chat-btn-secondary">Con SDRs / Setters</button>
                        <button onClick={() => handleOpsResponse('Inbound')} className="chat-btn-secondary">Inbound / Forms</button>
                        <button onClick={() => handleOpsResponse('Founder Led')} className="chat-btn-secondary">Lo hace el dueño</button>
                    </div>
                )}

                {/* STATE: PROPOSAL */}
                {chatState === 'PROPOSAL' && (
                    <div className="flex flex-col gap-2">
                        <button onClick={() => handleProposalResponse(true)} className="chat-btn-primary bg-rust-dark hover:bg-rust-mid border-none">COMPRAR DIAGNÓSTICO AHORA</button>
                        <button onClick={() => handleProposalResponse(false)} className="chat-btn-secondary">PARAR AQUÍ</button>
                    </div>
                )}

                {/* STATE: DATA COLLECTION */}
                {chatState === 'DATA_COLLECTION' && (
                    <form onSubmit={handleDataSubmit} className="flex flex-col gap-3">
                        <input
                            className="bg-bg-dark border border-steel-border p-2 text-sm text-white focus:border-rust-mid outline-none"
                            placeholder="Nombre Responsable"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                            required
                        />
                        <input
                            className="bg-bg-dark border border-steel-border p-2 text-sm text-white focus:border-rust-mid outline-none"
                            placeholder="Email Corporativo"
                            type="email"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                            required
                        />
                        <input
                            className="bg-bg-dark border border-steel-border p-2 text-sm text-white focus:border-rust-mid outline-none"
                            placeholder="Nombre Agencia"
                            value={userData.company}
                            onChange={(e) => setUserData({ ...userData, company: e.target.value })}
                            required
                        />
                        <input
                            className="bg-bg-dark border border-steel-border p-2 text-sm text-white focus:border-rust-mid outline-none"
                            placeholder="¿Dónde se cae la carga? (1 frase)"
                            value={userData.painPoint}
                            onChange={(e) => setUserData({ ...userData, painPoint: e.target.value })}
                        />
                        <button type="submit" className="chat-btn-primary mt-2">CONTINUAR AL PAGO</button>
                    </form>
                )}

                {/* STATE: READY TO PAY */}
                {chatState === 'READY_TO_PAY' && (
                    <div className="text-center">
                        <button onClick={handlePaymentClick} className="w-full bg-rust-bright text-black font-bold py-4 uppercase tracking-widest hover:bg-white transition shadow-[0_0_20px_rgba(204,122,78,0.4)]">
                            PAGAR DIAGNÓSTICO
                        </button>
                        <p className="text-[10px] text-dim mt-2 uppercase">Pago seguro vía Stripe • Enlace caduca en 5 min</p>
                    </div>
                )}

            </div>

            <style jsx>{`
                .chat-btn-primary {
                    background: var(--steel-highlight);
                    color: white;
                    border: 1px solid var(--steel-border);
                    padding: 10px;
                    font-size: 0.8rem;
                    text-transform: uppercase;
                    font-weight: bold;
                    transition: all 0.2s;
                }
                .chat-btn-primary:hover {
                    background: var(--rust-mid);
                    border-color: var(--rust-mid);
                }
                .chat-btn-secondary {
                    background: transparent;
                    color: var(--text-secondary);
                    border: 1px solid var(--steel-border);
                    padding: 8px;
                    font-size: 0.8rem;
                    transition: all 0.2s;
                }
                .chat-btn-secondary:hover {
                    border-color: var(--text-primary);
                    color: var(--text-primary);
                }
            `}</style>
        </div>
    );
}
