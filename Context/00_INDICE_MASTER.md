# ZUNCHOS // Índice Master RAG

## PROPÓSITO DE ESTE DOCUMENTO

Este es el punto de entrada para cualquier agente IA que trabaje en el proyecto ZUNCHOS // CORE.

**Contexto:** ZUNCHOS es infraestructura autónoma que sustituye procesos humanos de captación, cualificación y seguimiento en agencias B2B por agentes IA.

---

## ESTRUCTURA DE DOCUMENTACIÓN

### 01 - IDENTIDAD DE MARCA
**Archivo:** `01_IDENTIDAD_MARCA.md`

**Contiene:**
- Qué es ZUNCHOS (posicionamiento nuclear)
- Metáfora del zuncho
- Los 3 pilares (visibilidad inversa, tensión productiva, oxidación noble)
- Personalidad: "professional punk"
- Vocabulario y jerga interna
- Lo que NUNCA decimos vs lo que SÍ decimos
- Manifiesto

**Usar cuando:**
- Redactar contenido de marca
- Definir tono de comunicación
- Crear materiales de marketing
- Responder "¿qué es ZUNCHOS?"

---

### 02 - PRODUCTO CORE
**Archivo:** `02_PRODUCTO_CORE.md`

**Contiene:**
- Definición técnica de ZUNCHOS // CORE
- Problema que resuelve
- Cliente ideal (ICP)
- Arquitectura de 5 módulos
- Modelo de precio
- Promesa central
- Proceso de venta
- Diferenciación vs competencia

**Usar cuando:**
- Explicar el producto
- Preparar propuestas comerciales
- Diseñar flujos técnicos
- Definir alcance de proyecto

---

### 03 - ESTRATEGIA COMERCIAL
**Archivo:** `03_ESTRATEGIA_COMERCIAL.md`

**Contiene:**
- Posicionamiento de venta
- ICP detallado (cuantitativo + cualitativo)
- Proceso de venta paso a paso
- Objeciones comunes y respuestas
- Discurso de venta (pitch framework)
- Momento venta ("Zuncho Test")
- Filtro de cliente (red flags)
- Reglas de venta

**Usar cuando:**
- Preparar reuniones comerciales
- Responder objeciones
- Calificar prospectos
- Diseñar secuencias de prospección

---

### 04 - COMPORTAMIENTO AGENTES
**Archivo:** `04_COMPORTAMIENTO_AGENTES.md`

**Contiene:**
- Principio fundamental de agentes
- Tono general (qué somos / no somos)
- Registro de lenguaje
- Estructura de respuestas
- Flujos por módulo (intercepción, WhatsApp, email, ghosting)
- Reglas de conversación
- Manejo de objeciones
- Lenguaje prohibido vs obligatorio

**Usar cuando:**
- Configurar prompts de agentes
- Diseñar flujos conversacionales
- Ajustar tono de interacciones
- Resolver problemas de calidad conversacional

---

### 05 - IMPLEMENTACIÓN TÉCNICA
**Archivo:** `05_IMPLEMENTACION_TECNICA.md`

**Contiene:**
- Principio operativo
- Fases de implementación (0 a 5)
- Arquitectura técnica (stack recomendado)
- Lógica de cualificación BANT
- Integración con CRM
- Memoria persistente
- Manejo de errores
- Checklist de despliegue
- Soporte post-entrega

**Usar cuando:**
- Instalar sistema para cliente
- Resolver problemas técnicos
- Planificar implementación
- Documentar arquitectura

---

### 06 - MÉTRICAS Y ÉXITO
**Archivo:** `06_METRICAS_EXITO.md`

**Contiene:**
- Principio de medición (€ o tiempo)
- Métricas clave para dashboard cliente
- Métricas secundarias (análisis interno)
- Comparativa antes/después
- Diseño de dashboard ejecutivo
- Reportes mensuales
- Definición de éxito por fase
- Umbral de cancelación

**Usar cuando:**
- Diseñar dashboards
- Medir ROI
- Preparar reportes para clientes
- Detectar señales de churn
- Optimizar sistema

---

## MAPA CONCEPTUAL

```
IDENTIDAD DE MARCA
    ↓
PRODUCTO CORE ←→ ESTRATEGIA COMERCIAL
    ↓                    ↓
COMPORTAMIENTO    IMPLEMENTACIÓN
   AGENTES           TÉCNICA
    ↓                    ↓
       MÉTRICAS Y ÉXITO
```

---

## QUICK REFERENCE (RESPUESTAS RÁPIDAS)

### ¿Qué es ZUNCHOS?
Infraestructura autónoma que sustituye personas por sistemas en agencias B2B.

### ¿Qué problema resuelve?
Dependencia de humanos para convertir leads en dinero. Humanos = lentos, caros, variables.

### ¿Quién es el cliente ideal?
Agencias B2B 500k-5M€, servicios high-ticket, con SDRs quemados, que entienden tecnología.

### ¿Cuánto cuesta?
Instalación: 12k-18k. Mensualidad: 1.000€.

### ¿Qué promete?
+20-30% recuperación de leads, agendas limpias, menos SDRs, más margen.

### ¿Qué NO es?
Chatbot, CRM, automatización básica, consultoría, "acompañamiento".

### ¿Qué SÍ es?
Sistema operativo de ventas, infraestructura autónoma, arquitectura operativa.

### ¿Cómo habla ZUNCHOS?
Como mecánico experto: directo, sin florituras, con jerga industrial (zunchar, tensión, carga).

### ¿Cuál es el enemigo?
PDFs, funnels muertos, consultores, "transformación digital", equipos humanos quemados.

### ¿Cuál es la regla de oro?
Si una frase podría decirla un consultor → no es ZUNCHOS.

---

## GLOSARIO ZUNCHOS

**Zunchar:** Instalar sistema
**Zunchado:** Cliente con infraestructura operativa
**Deszunchado:** Operación frágil sin sistema
**Punto de tensión:** Cuello de botella operativo
**Carga:** Facturación / operación comercial
**Camión:** Negocio del cliente
**Oxidación noble:** Experiencia que fortalece
**Ghosting:** Leads que no responden
**BANT:** Budget, Authority, Need, Timing (cualificación)

---

## FRASES NÚCLEO (MEMORIZAR)

1. **Identidad:**
   "El zuncho es feo a propósito. No venimos a hacer bonito. Venimos a hacer que funcione mientras nadie mira."

2. **Producto:**
   "Instalamos una máquina que convierte tráfico en dinero sin personas en medio."

3. **Venta:**
   "Porque su CRM está a punto de caerse del camión, y nosotros somos lo único que no se rompe antes que él."

4. **Agente:**
   "Perfecto. ¿Cuándo te viene mejor?"

5. **Métrica:**
   "El zuncho se mide por la carga que aguanta, no por lo bonito que se ve."

---

## DECISION TREE (ROUTING)

```
¿La pregunta es sobre...?

→ Marca / tono / comunicación?
  Leer: 01_IDENTIDAD_MARCA.md

→ Qué es / cómo funciona / módulos?
  Leer: 02_PRODUCTO_CORE.md

→ Cómo vender / objeciones / ICP?
  Leer: 03_ESTRATEGIA_COMERCIAL.md

→ Cómo debe hablar un agente?
  Leer: 04_COMPORTAMIENTO_AGENTES.md

→ Cómo implementar / integrar / desplegar?
  Leer: 05_IMPLEMENTACION_TECNICA.md

→ Cómo medir / qué reportar / ROI?
  Leer: 06_METRICAS_EXITO.md
```

---

## REGLAS UNIVERSALES (APLICAR SIEMPRE)

1. **Simplicidad brutal:** Si toma más de 30 min entenderlo, está mal explicado.

2. **Impacto económico:** Si no se traduce a € o días ahorrados, es ruido.

3. **Sin teoría corporativa:** Nada de "soluciones integrales", "transformación digital", etc.

4. **Tono industrial:** Hablar como mecánico, no como consultor.

5. **Resultados > features:** No vender "tiene IA", vender "recuperas 10 leads/mes".

6. **Honestidad cruda:** Si algo no funciona, decirlo. Si funciona, cuantificarlo.

7. **Contexto nunca se mezcla:** Un proyecto es un proyecto. No contaminar con info de otros.

---

## CASOS DE USO TÍPICOS

### CASO 1: Crear propuesta comercial
1. Leer `02_PRODUCTO_CORE.md` (módulos + precio)
2. Leer `03_ESTRATEGIA_COMERCIAL.md` (estructura de propuesta)
3. Leer `06_METRICAS_EXITO.md` (ROI + comparativa antes/después)

### CASO 2: Configurar agente conversacional
1. Leer `04_COMPORTAMIENTO_AGENTES.md` (tono + flujos)
2. Leer `01_IDENTIDAD_MARCA.md` (jerga + vocabulario)

### CASO 3: Implementar para cliente nuevo
1. Leer `05_IMPLEMENTACION_TECNICA.md` (fases + checklist)
2. Leer `02_PRODUCTO_CORE.md` (arquitectura)

### CASO 4: Diseñar dashboard
1. Leer `06_METRICAS_EXITO.md` (métricas clave + diseño)
2. Leer `01_IDENTIDAD_MARCA.md` (tono de insights)

### CASO 5: Responder objeción comercial
1. Leer `03_ESTRATEGIA_COMERCIAL.md` (objeciones comunes)
2. Leer `01_IDENTIDAD_MARCA.md` (cómo hablar)

---

## CONTACTO INTERNO (FICTICIO)

**Arquitecto de marca:** Responsable de identidad y comunicación
**Arquitecto técnico:** Responsable de implementación y stack
**Comercial:** Responsable de ventas y cierre
**Product Owner:** Responsable de roadmap y priorización

---

## VERSIÓN Y ACTUALIZACIÓN

**Versión actual:** 1.0
**Fecha:** Febrero 2026
**Última actualización:** N/A

**Changelog:**
- v1.0 (Feb 2026): Documentación inicial completa

---

## NOTA FINAL

Estos documentos son el cerebro operativo de ZUNCHOS. Todo agente IA que trabaje en el proyecto debe:

1. **Leer el índice primero** (este documento)
2. **Identificar qué documentos necesita** (usar decision tree)
3. **Leer solo lo relevante** (no todo siempre)
4. **Aplicar reglas universales** (siempre)
5. **No inventar nada que contradiga lo documentado** (coherencia absoluta)

El zuncho funciona porque cada pieza está en su lugar y bajo tensión correcta.

Si algo falta o está mal documentado → reportar para actualizar.

Que no se caiga nada.
