# ZUNCHOS // Implementación y Operaciones Técnicas

## PRINCIPIO OPERATIVO

ZUNCHOS // CORE no es software que el cliente maneja. Es infraestructura que instalamos, configuramos y mantenemos.

**Regla:** El cliente no toca el código. Nosotros no tocamos su operación comercial.

---

## FASES DE IMPLEMENTACIÓN

### FASE 0: PRE-INSTALACIÓN (ANTES DE FIRMAR)

**Duración:** 1-2 días

**Actividades:**
1. Auditoría técnica del stack del cliente
2. Identificación de integraciones necesarias
3. Mapeo de flujo actual
4. Definición de métricas de éxito

**Entregables:**
- Mapa de flujo con puntos de tensión
- Lista de integraciones requeridas
- Propuesta técnica específica
- Timeline de implementación

**Responsable:** Arquitecto técnico ZUNCHOS

---

### FASE 1: SETUP INICIAL (SEMANA 1)

**Objetivo:** Infraestructura base operativa

**Tareas:**

1. **Integración CRM**
   - Webhooks entrantes/salientes
   - Mapeo de campos
   - Testing de sincronización

2. **APIs de enriquecimiento**
   - Clearbit / Apollo setup
   - Rate limits configurados
   - Fallback APIs

3. **Canales de comunicación**
   - WhatsApp Business API
   - Email (SMTP/SendGrid)
   - SMS (Twilio) [opcional]

4. **Base de datos**
   - Schema de memoria persistente
   - Índices vectoriales para contexto
   - Backup automático

5. **Monitorización**
   - Logs centralizados
   - Alertas de errores
   - Dashboard interno

**Checkpoint:** Sistema puede recibir leads y almacenarlos correctamente.

---

### FASE 2: AGENTES Y LÓGICA (SEMANA 2)

**Objetivo:** Capacidad autónoma de conversación y cualificación

**Tareas:**

1. **Módulo Intercepción**
   - Interface conversacional web
   - Lógica de filtrado (presupuesto, rol, urgencia)
   - Enriquecimiento en tiempo real

2. **Módulo Agente**
   - Prompts base configurados
   - Memoria de conversación
   - Lógica BANT
   - Tono y personalidad

3. **Integración con calendario**
   - API de Google Calendar / Calendly
   - Slots disponibles dinámicos
   - Confirmaciones automáticas

4. **Testing conversacional**
   - 50+ simulaciones de leads
   - Ajustes de tono
   - Validación de filtros

**Checkpoint:** Agente puede conversar, cualificar y agendar sin intervención.

---

### FASE 3: PROTOCOLO GHOSTING (SEMANA 3)

**Objetivo:** Recuperación automática de leads perdidos

**Tareas:**

1. **Timeline de contacto**
   - 7 días, 12 impactos
   - Distribución temporal optimizada
   - Canales rotativos (WhatsApp → Email → SMS)

2. **Progresión de tono**
   - Día 1-2: Neutro
   - Día 3-4: Empático
   - Día 5-6: Directo
   - Día 7: Valor puro

3. **Condiciones de salida**
   - Lead responde → volver a agente activo
   - Lead dice "no" → cerrar conversación
   - 12 impactos sin respuesta → archivar

4. **Testing de recuperación**
   - 30 leads fantasma simulados
   - Medición de tasa de respuesta
   - Ajustes de timing

**Checkpoint:** Sistema recupera >20% de leads ghosteados en test.

---

### FASE 4: DASHBOARD Y HANDOVER (SEMANA 4)

**Objetivo:** Visibilidad operativa para el cliente

**Tareas:**

1. **Dashboard ejecutivo**
   - Métricas clave en tiempo real
   - Leads válidos vs basura
   - Pipeline actualizado
   - € generado por el sistema

2. **Alertas configuradas**
   - Lead high-value detectado
   - Sistema caído (error crítico)
   - Integración fallida

3. **Documentación**
   - Cómo interpretar métricas
   - Qué hacer si algo falla
   - Contactos de soporte

4. **Sesión de formación**
   - 1 hora con el equipo del cliente
   - Recorrido por dashboard
   - Q&A técnico

**Checkpoint:** Cliente puede operar el dashboard sin asistencia.

---

### FASE 5: MONITORIZACIÓN CONTINUA (POST-ENTREGA)

**Frecuencia:** Permanente

**Actividades:**

1. **Revisión semanal (interna)**
   - Análisis de logs
   - Detección de anomalías
   - Ajustes preventivos

2. **Revisión mensual (con cliente)**
   - Métricas de rendimiento
   - Ajustes de tono/lógica
   - Mejoras incrementales

3. **Mantenimiento reactivo**
   - Corrección de errores <4h
   - Ajustes de integración <24h
   - Cambios mayores <1 semana

---

## ARQUITECTURA TÉCNICA

### STACK RECOMENDADO

**Backend:**
```
- Python 3.11+
- FastAPI (APIs REST)
- Celery (tareas asíncronas)
- Redis (cache + cola de mensajes)
- PostgreSQL (datos estructurados)
- Qdrant (base de datos vectorial)
```

**LLM:**
```
- Claude API (Anthropic)
- Modelo: claude-sonnet-4-20250514
- Fallback: claude-opus-4 si necesario
```

**Integraciones:**
```
- WhatsApp Business API
- SendGrid / Postmark (email)
- Twilio (SMS opcional)
- Clearbit / Apollo (enriquecimiento)
- CRM del cliente (webhooks)
```

**Infraestructura:**
```
- AWS / GCP
- Docker + Kubernetes (orquestación)
- Datadog / Grafana (monitorización)
- Sentry (error tracking)
```

---

## LÓGICA DE CUALIFICACIÓN (BANT)

### BUDGET (PRESUPUESTO)

**Umbral mínimo:** 5.000€

**Preguntas del agente:**
- "¿Con cuánto estás trabajando para esto?"
- "¿Tienes presupuesto definido o es exploración?"

**Descalificación:**
- <5k → "Por ahora trabajamos con proyectos desde 5k. Cuando escales, vuelve."

---

### AUTHORITY (AUTORIDAD)

**Rol válido:** CEO, COO, Director Comercial, Fundador

**Preguntas del agente:**
- "¿Eres tú quien decide comprar tecnología?"
- "¿Hay alguien más involucrado en la decisión?"

**Descalificación:**
- No es decisor y no puede conectar con uno → "Ok, ¿me puedes pasar con quien decide?"
- Respuesta evasiva → "Entiendo. Cuando esté definido quién toma la decisión, volvemos a hablar."

---

### NEED (NECESIDAD)

**Dolor real:** Leads que se mueren, SDRs quemados, caos operativo

**Preguntas del agente:**
- "¿Qué se te está cayendo ahora mismo?"
- "¿Tu equipo comercial está al límite?"

**Descalificación:**
- "Solo curiosidad" → "Ok, cuando sea una necesidad real, avísame."
- "Explorando opciones" → "Perfecto. Cuando tengas un problema concreto, hablamos."

---

### TIMING (URGENCIA)

**Timeline válido:** <3 meses

**Preguntas del agente:**
- "¿Esto es para ya o tienes tiempo?"
- "¿Cuándo necesitas que esté operativo?"

**Descalificación:**
- "En 6 meses" → "Ok, te contacto en 4 meses para ver cómo está la situación."
- "No hay urgencia" → "Perfecto. Cuando apriete, aquí estoy."

---

## INTEGRACIÓN CON CRM DEL CLIENTE

### FLUJO ESTÁNDAR

**Entrada:**
Lead llega a web → ZUNCHOS intercepta → enriquece → cualifica → pushea a CRM

**Salida:**
CRM marca lead como "cerrado" → ZUNCHOS archiva conversación

### WEBHOOK SETUP

**Endpoint entrante (recibir del CRM):**
```
POST /api/v1/leads/webhook
{
  "lead_id": "abc123",
  "name": "Juan Pérez",
  "email": "juan@agencia.com",
  "phone": "+34600123456",
  "source": "web_form",
  "custom_fields": {}
}
```

**Endpoint saliente (enviar al CRM):**
```
POST [CRM_WEBHOOK_URL]
{
  "lead_id": "abc123",
  "status": "qualified",
  "bant_score": 85,
  "meeting_scheduled": true,
  "meeting_date": "2026-02-15T10:00:00Z",
  "notes": "Lead válido, presupuesto 15k, timing inmediato"
}
```

---

## MEMORIA PERSISTENTE

### ESTRUCTURA DE DATOS

**Por lead:**
```json
{
  "lead_id": "abc123",
  "name": "Juan Pérez",
  "company": "Agencia X",
  "history": [
    {
      "timestamp": "2026-02-01T10:00:00Z",
      "channel": "web",
      "content": "Usuario pregunta por automatización"
    },
    {
      "timestamp": "2026-02-01T10:05:00Z",
      "channel": "whatsapp",
      "content": "Agente confirma interés y agenda llamada"
    }
  ],
  "bant": {
    "budget": 15000,
    "authority": true,
    "need": "leads que se mueren",
    "timing": "inmediato"
  },
  "status": "qualified",
  "next_action": "meeting_scheduled"
}
```

### VECTORIZACIÓN PARA CONTEXTO

**Uso:**
Cada conversación se vectoriza para recuperar contexto relevante en futuras interacciones.

**Ejemplo:**
Lead vuelve después de 2 meses → Agente recuerda conversación previa y retoma desde ahí.

---

## MANEJO DE ERRORES

### ERRORES CRÍTICOS (REQUIEREN ATENCIÓN INMEDIATA)

1. **API de LLM caída**
   - Fallback: Mensaje genérico + notificación a humano
   - SLA: <15 minutos para corrección

2. **CRM no responde**
   - Fallback: Almacenar lead localmente + retry cada 5 min
   - SLA: <1 hora para resolución

3. **WhatsApp API bloqueada**
   - Fallback: Cambiar a email
   - SLA: <30 minutos para diagnóstico

### ERRORES NO CRÍTICOS (MANEJO AUTOMÁTICO)

1. **Enriquecimiento falla**
   - Fallback: Continuar sin datos extra
   - Log: Registrar para análisis posterior

2. **Lead sin teléfono válido**
   - Fallback: Solo email
   - Acción: Pedir teléfono en siguiente mensaje

3. **Rate limit de API**
   - Fallback: Cola de espera + retry exponencial

---

## MÉTRICAS DE SISTEMA (INTERNAS)

### PERFORMANCE

- Latencia de respuesta: <200ms (módulo intercepción)
- Tiempo de contacto: <30 seg (módulo agente)
- Uptime: >99.5%

### CALIDAD

- Leads cualificados correctamente: >90%
- False positives (leads basura que pasan): <5%
- False negatives (leads válidos rechazados): <2%

### RECUPERACIÓN

- Tasa de respuesta protocolo ghosting: >20%
- Conversión ghosting → meeting: >10%

---

## CHECKLIST DE DESPLIEGUE

**Antes de dar por finalizada la instalación:**

- [ ] CRM integrado y testeado (10 leads mínimo)
- [ ] Agente cualifica correctamente (50 tests)
- [ ] Protocolo ghosting funcional (30 tests)
- [ ] Dashboard muestra datos en tiempo real
- [ ] Alertas configuradas y testeadas
- [ ] Cliente formado (sesión completada)
- [ ] Documentación entregada
- [ ] Contacto de soporte asignado

---

## DOCUMENTACIÓN ENTREGABLE

### PARA EL CLIENTE

1. **Guía de Dashboard** (PDF, máx. 5 páginas)
   - Cómo leer métricas
   - Qué significan los estados de leads
   - Cuándo contactar soporte

2. **FAQ Técnico** (Markdown)
   - ¿Qué hago si no veo leads en el dashboard?
   - ¿Cómo cambio la disponibilidad de mi calendario?
   - ¿Puedo ajustar el tono del agente?

### PARA EL EQUIPO ZUNCHOS

1. **Runbook de Cliente** (Markdown)
   - Stack específico del cliente
   - Integraciones activas
   - Configuración de agente
   - Contactos técnicos del cliente

2. **Registro de Cambios** (Git)
   - Cada ajuste documentado
   - Razón del cambio
   - Fecha y responsable

---

## SOPORTE POST-ENTREGA

### CANALES

1. **Urgente (errores críticos):** WhatsApp directo
2. **Normal (ajustes, dudas):** Email
3. **Planificado (mejoras):** Reunión mensual

### SLA

- Respuesta a urgente: <15 min
- Respuesta a normal: <4 horas
- Resolución crítica: <4 horas
- Resolución normal: <24 horas

---

## REGLA OPERATIVA

Si el cliente tiene que tocar algo para que funcione → fallamos.
Si el cliente ni siquiera sabe cómo funciona pero genera más reuniones → éxito.

El zuncho hace su trabajo en silencio. La operación humana solo ve resultados.
