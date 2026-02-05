/* ============================================
   CHAT-CLOSER AUTONOMOUS SALES AGENT
   6-state conversation flow with ICP filtering
   Fixed product: 2,856€ Stripe checkout
   ============================================ */

// Load chat CSS
const chatCSS = document.createElement('link');
chatCSS.rel = 'stylesheet';
chatCSS.href = 'chat-closer.css';
document.head.appendChild(chatCSS);

// State machine
const STATES = {
    TRIGGER: 'trigger',
    ICP_FILTER: 'icp_filter',
    PROPOSAL: 'proposal',
    DATA_COLLECTION: 'data_collection',
    STRIPE_PAYMENT: 'stripe_payment',
    POST_PAYMENT: 'post_payment'
};

// Chat data storage
let chatData = {
    state: STATES.TRIGGER,
    revenue: null,
    businessType: null,
    salesProcess: null,
    customerName: null,
    customerEmail: null,
    company: null,
    problemDescription: null,
    icpQuestion: 1,
    checkoutUrl: null,
    hasPaid: false
};

// Check if user has already paid (cookie/storage check)
function checkPaymentStatus() {
    return localStorage.getItem('zunchos_paid') === 'true';
}

// Initialize chat HTML
function initializeChatHTML() {
    const container = document.getElementById('chat-closer-container');
    if (!container) return;

    container.innerHTML = `
        <div id="chat-trigger" class="hidden">
            <span class="trigger-icon">▬</span>
        </div>
        <div id="chat-closer">
            <div class="chat-header">
                <div class="chat-title">ZUNCHOS // DIAGNÓSTICO</div>
                <button class="chat-close" onclick="closeChat()">&times;</button>
            </div>
            <div class="chat-body" id="chat-messages"></div>
        </div>
    `;
}

// Open chat
window.openChatCloser = function () {
    const chat = document.getElementById('chat-closer');
    const trigger = document.getElementById('chat-trigger');

    if (chat) {
        chat.classList.add('open');
        if (trigger) trigger.classList.add('hidden');

        // Initialize conversation if fresh
        if (document.getElementById('chat-messages').children.length === 0) {
            if (checkPaymentStatus()) {
                chatData.hasPaid = true;
                showPostPaymentMessage();
            } else {
                showTriggerMessage();
            }
        }
    }
};

// Close chat
window.closeChat = function () {
    const chat = document.getElementById('chat-closer');
    const trigger = document.getElementById('chat-trigger');

    if (chat) {
        chat.classList.remove('open');
        if (trigger) trigger.classList.remove('hidden');
    }
};

// Add message to chat
function addMessage(text, isBot = true, buttons = null, inputs = null) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isBot ? 'message-bot' : 'message-user'}`;
    messageDiv.innerHTML = text.replace(/\n/g, '<br>');

    messagesContainer.appendChild(messageDiv);

    // Add buttons if provided
    if (buttons) {
        const buttonsDiv = document.createElement('div');
        buttonsDiv.className = 'button-options';
        buttons.forEach(btn => {
            const button = document.createElement('button');
            button.className = 'chat-button';
            button.textContent = btn.text;
            button.onclick = btn.action;
            buttonsDiv.appendChild(button);
        });
        messagesContainer.appendChild(buttonsDiv);
    }

    // Add input fields if provided
    if (inputs) {
        inputs.forEach(input => {
            const inputGroup = document.createElement('div');
            inputGroup.className = 'input-group';

            const label = document.createElement('label');
            label.className = 'input-label';
            label.textContent = input.label;
            inputGroup.appendChild(label);

            const field = document.createElement(input.type === 'textarea' ? 'textarea' : 'input');
            field.className = 'chat-input';
            field.id = input.id;
            field.placeholder = input.placeholder || '';
            if (input.type === 'email') field.type = 'email';
            inputGroup.appendChild(field);

            messagesContainer.appendChild(inputGroup);
        });

        const submitBtn = document.createElement('button');
        submitBtn.className = 'submit-button';
        submitBtn.textContent = inputs[0].submitText || 'Continuar';
        submitBtn.onclick = inputs[0].onSubmit;
        messagesContainer.appendChild(submitBtn);
    }

    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// STATE 0: TRIGGER
function showTriggerMessage() {
    addMessage(
        'Aquí dentro solo medimos una cosa: si tu operación aguanta o se cae.\n¿Vienes a revisar puntos de tensión de tu agencia o solo estás mirando?',
        true,
        [
            {
                text: 'Revisar puntos de tensión',
                action: () => {
                    addMessage('Revisar puntos de tensión', false);
                    startICPFilter();
                }
            },
            {
                text: 'Solo estoy mirando',
                action: () => {
                    addMessage('Solo estoy mirando', false);
                    addMessage('Perfecto. Mejor no tocar nada si no hay tensión.\nSi algún día ves que el camión empieza a vibrar, vuelve.');
                    setTimeout(() => closeChat(), 3000);
                }
            }
        ]
    );
}

// STATE 1: ICP FILTER
function startICPFilter() {
    chatData.state = STATES.ICP_FILTER;
    chatData.icpQuestion = 1;

    addMessage('Vale. No todo el mundo puede entrar aquí.\nTe hago 3 preguntas y veo si tiene sentido seguir.');

    setTimeout(() => askQuestion1(), 800);
}

function askQuestion1() {
    addMessage(
        '1/3 · Facturación anual aproximada de tu agencia:',
        true,
        [
            { text: '< 300k€', action: () => handleRevenue('< 300k€') },
            { text: '300k€ – 500k€', action: () => handleRevenue('300k€ – 500k€') },
            { text: '500k€ – 1M€', action: () => handleRevenue('500k€ – 1M€') },
            { text: '1M€ – 3M€', action: () => handleRevenue('1M€ – 3M€') },
            { text: '> 3M€', action: () => handleRevenue('> 3M€') }
        ]
    );
}

function handleRevenue(revenue) {
    addMessage(revenue, false);
    chatData.revenue = revenue;

    if (revenue === '< 300k€') {
        addMessage('Ahora mismo tu camión todavía es pequeño para ZUNCHOS.\nMejor crecer un poco antes de meter acero industrial.');
        setTimeout(() => closeChat(), 3000);
    } else {
        setTimeout(() => askQuestion2(), 800);
    }
}

function askQuestion2() {
    addMessage(
        '2/3 · ¿Qué vendes principalmente?',
        true,
        [
            { text: 'Servicios B2B (agencia, consultoría, dev, growth…)', action: () => handleBusinessType('B2B') },
            { text: 'Ecommerce / productos', action: () => handleBusinessType('Ecommerce') },
            { text: 'Coaching / infoproductos', action: () => handleBusinessType('Coaching') },
            { text: 'Negocio local', action: () => handleBusinessType('Local') }
        ]
    );
}

function handleBusinessType(businessType) {
    addMessage(businessType === 'B2B' ? 'Servicios B2B (agencia, consultoría, dev, growth…)' : businessType, false);
    chatData.businessType = businessType;

    if (businessType !== 'B2B') {
        addMessage('ZUNCHOS está diseñado para agencias B2B con ciclo de venta complejo.\nLo que tú vendes ahora mismo no encaja con este sistema.');
        setTimeout(() => closeChat(), 3000);
    } else {
        setTimeout(() => askQuestion3(), 800);
    }
}

function askQuestion3() {
    addMessage(
        '3/3 · ¿Cómo conviertes ahora los leads en reuniones?',
        true,
        [
            { text: 'Con SDRs / setters dedicados', action: () => handleSalesProcess('SDRs') },
            { text: 'Lo hace el dueño / account a ratos', action: () => handleSalesProcess('Owner') },
            { text: 'Casi todo es inbound / formularios', action: () => handleSalesProcess('Inbound') }
        ]
    );
}

function handleSalesProcess(process) {
    const processText = process === 'SDRs' ? 'Con SDRs / setters dedicados' :
        process === 'Owner' ? 'Lo hace el dueño / account a ratos' :
            'Casi todo es inbound / formularios';
    addMessage(processText, false);
    chatData.salesProcess = process;

    // Passed ICP filter -> Show proposal
    setTimeout(() => showProposal(), 800);
}

// STATE 2: PROPOSAL
function showProposal() {
    chatData.state = STATES.PROPOSAL;

    addMessage(
        'Vale. Tu camión tiene el tamaño y el peso.\nLo que te propongo aquí es una sola cosa, muy concreta:\n\nDiagnóstico técnico completo de tu operación + propuesta de arquitectura ZUNCHOS a medida.\nPrecio fijo: 2.856€ + IVA.\nSin demos, sin prueba gratis, sin \'ya veremos\'.\n\n¿Quieres comprar ahora este diagnóstico técnico o prefieres parar aquí?',
        true,
        [
            {
                text: 'Comprar diagnóstico ahora',
                action: () => {
                    addMessage('Comprar diagnóstico ahora', false);
                    setTimeout(() => startDataCollection(), 800);
                }
            },
            {
                text: 'Parar aquí',
                action: () => {
                    addMessage('Parar aquí', false);
                    addMessage('Mejor así. ZUNCHOS entra cuando hay decisión clara, no cuando hay dudas.\nQue no se te caiga nada.');
                    setTimeout(() => closeChat(), 3000);
                }
            }
        ]
    );
}

// STATE 3: DATA COLLECTION
function startDataCollection() {
    chatData.state = STATES.DATA_COLLECTION;

    addMessage('Perfecto. Necesito solo lo mínimo para conectar tu carga con el sistema.');

    setTimeout(() => {
        addMessage(
            '',
            true,
            null,
            [
                {
                    label: 'Nombre y apellido del responsable de la agencia:',
                    id: 'customer-name',
                    type: 'text',
                    submitText: 'Continuar →',
                    onSubmit: collectName
                }
            ]
        );
    }, 500);
}

function collectName() {
    const name = document.getElementById('customer-name').value.trim();
    if (!name) {
        alert('Por favor, introduce tu nombre');
        return;
    }

    chatData.customerName = name;
    addMessage(name, false);

    setTimeout(() => {
        addMessage(
            '',
            true,
            null,
            [
                {
                    label: 'Email donde quieres recibir el informe y la propuesta de arquitectura:',
                    id: 'customer-email',
                    type: 'email',
                    submitText: 'Continuar →',
                    onSubmit: collectEmail
                }
            ]
        );
    }, 500);
}

function collectEmail() {
    const email = document.getElementById('customer-email').value.trim();
    if (!email || !email.includes('@')) {
        alert('Por favor, introduce un email válido');
        return;
    }

    chatData.customerEmail = email;
    addMessage(email, false);

    setTimeout(() => {
        addMessage(
            '',
            true,
            null,
            [
                {
                    label: 'Nombre de la agencia o marca comercial:',
                    id: 'company-name',
                    type: 'text',
                    submitText: 'Continuar →',
                    onSubmit: collectCompany
                }
            ]
        );
    }, 500);
}

function collectCompany() {
    const company = document.getElementById('company-name').value.trim();
    if (!company) {
        alert('Por favor, introduce el nombre de tu agencia');
        return;
    }

    chatData.company = company;
    addMessage(company, false);

    setTimeout(() => {
        addMessage(
            '',
            true,
            null,
            [
                {
                    label: 'En una frase: ¿dónde sientes ahora mismo que se va la carga al suelo?',
                    id: 'problem-description',
                    type: 'textarea',
                    submitText: 'Enviar →',
                    onSubmit: collectProblem
                }
            ]
        );
    }, 500);
}

function collectProblem() {
    const problem = document.getElementById('problem-description').value.trim();
    if (!problem) {
        alert('Por favor, describe brevemente tu situación');
        return;
    }

    chatData.problemDescription = problem;
    addMessage(problem, false);

    // Move to Stripe creation
    setTimeout(() => createStripeCheckout(), 800);
}

// STATE 4: STRIPE CHECKOUT CREATION
function createStripeCheckout() {
    chatData.state = STATES.STRIPE_PAYMENT;

    addMessage('Procesando...', true);

    // Call backend API to create Stripe checkout
    const payload = {
        product: 'Diagnóstico técnico ZUNCHOS + arquitectura',
        price: 2856,
        customer_name: chatData.customerName,
        customer_email: chatData.customerEmail,
        company: chatData.company,
        problem_description: chatData.problemDescription
    };

    // TODO: Replace with actual API endpoint
    // For now, simulate with setTimeout
    console.log('Creating Stripe checkout with payload:', payload);

    setTimeout(() => {
        // Simulated Stripe checkout URL (replace with real API call)
        const checkoutUrl = `https://checkout.stripe.com/c/pay/test_${Math.random().toString(36).substr(2, 9)}`;
        chatData.checkoutUrl = checkoutUrl;

        showStripePaymentButton(checkoutUrl);
    }, 1500);
}

// STATE 5: PAYMENT CTA
function showStripePaymentButton(checkoutUrl) {
    // Remove "Procesando..." message
    const messages = document.getElementById('chat-messages');
    if (messages.lastChild.textContent.includes('Procesando')) {
        messages.removeChild(messages.lastChild);
    }

    addMessage('Listo. He preparado la pasarela de pago segura para tu diagnóstico técnico.\n\nCuando completes el pago:\n• recibes confirmación por email\n• te proponemos fecha para el diagnóstico en menos de 24h hábiles.');

    const messagesContainer = document.getElementById('chat-messages');

    // Primary CTA button
    const ctaBtn = document.createElement('button');
    ctaBtn.className = 'submit-button cta-primary';
    ctaBtn.textContent = 'Pagar diagnóstico ZUNCHOS';
    ctaBtn.onclick = () => {
        window.open(checkoutUrl, '_blank');
    };
    messagesContainer.appendChild(ctaBtn);

    // Small text
    const smallText = document.createElement('div');
    smallText.className = 'small-text';
    smallText.textContent = 'Si no terminas el pago ahora, el enlace caducará en poco tiempo. Mejor hacerlo de una y olvidarte.';
    messagesContainer.appendChild(smallText);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// STATE 6: POST-PAYMENT
function showPostPaymentMessage() {
    chatData.state = STATES.POST_PAYMENT;

    addMessage('Pago recibido.\n\nEl siguiente paso es simple: te escribimos para fijar día y hora y empezar a apretar donde hace falta.');
}

// Auto-trigger after deep scroll (after "tensión" section)
let hasTriggered = false;

function checkScrollTrigger() {
    if (hasTriggered || checkPaymentStatus()) return;

    const tensionSection = document.querySelector('#tension');
    if (!tensionSection) return;

    const tensionBottom = tensionSection.offsetTop + tensionSection.offsetHeight;
    const scrollPosition = window.pageYOffset + window.innerHeight;

    // Trigger when user scrolls past tension section
    if (scrollPosition > tensionBottom) {
        hasTriggered = true;
        const trigger = document.getElementById('chat-trigger');
        if (trigger) {
            trigger.classList.remove('hidden');

            // Auto-open after 2 seconds
            setTimeout(() => {
                window.openChatCloser();
            }, 2000);
        }
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    initializeChatHTML();

    // Listen for scroll to trigger chat
    window.addEventListener('scroll', checkScrollTrigger, { passive: true });

    console.log('ZUNCHOS chat-closer initialized');
});

// Export for use in main script
window.checkPaymentStatus = checkPaymentStatus;
