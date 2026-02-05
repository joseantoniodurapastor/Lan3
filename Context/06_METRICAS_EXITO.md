# ZUNCHOS // Métricas y Medición de Éxito

## PRINCIPIO DE MEDICIÓN

Todo lo que no se puede medir en € o tiempo ahorrado es ruido.

**Regla:** Si una métrica no afecta a la facturación del cliente o al coste operativo, no la mostramos.

---

## MÉTRICAS CLAVE (DASHBOARD CLIENTE)

### 1. LEADS VÁLIDOS VS BASURA

**Definición:**
- **Válido:** Cumple BANT (presupuesto, autoridad, necesidad, timing)
- **Basura:** No cumple algún criterio BANT

**Fórmula:**
```
Tasa de validez = (Leads válidos / Total leads) × 100
```

**Objetivo:** >70%

**Por qué importa:**
Un lead basura cuesta tiempo de agenda. Un lead válido genera facturación.

**Impacto económico:**
Si antes 40% de leads eran válidos y ahora 75%, el cliente ahorra 35% del tiempo de su equipo comercial.

---

### 2. RECUPERACIÓN DE GHOSTING

**Definición:**
Leads que respondieron después del protocolo de 7 días.

**Fórmula:**
```
Tasa de recuperación = (Leads recuperados / Leads ghosteados) × 100
```

**Objetivo:** >20%

**Por qué importa:**
Cada lead recuperado es facturación que antes se perdía.

**Impacto económico:**
Si el cliente recibe 100 leads/mes, pierde 60 por ghosting, y recuperamos 20% = 12 leads.
Si cada lead cierra 5k en promedio → 60k€/mes recuperados.

---

### 3. TIEMPO A AGENDA

**Definición:**
Tiempo desde que el lead entra al sistema hasta que hay reunión agendada.

**Fórmula:**
```
Tiempo promedio a agenda = Σ(tiempo por lead) / Total leads agendados
```

**Objetivo:** <24 horas

**Por qué importa:**
Cuanto más rápido la agenda, mayor probabilidad de cierre.

**Impacto económico:**
Antes: 3-5 días. Ahora: <24h. Incremento en tasa de cierre: +15-25%.

---

### 4. € GENERADO POR EL SISTEMA

**Definición:**
Facturación atribuible a leads procesados por ZUNCHOS.

**Fórmula:**
```
€ generado = Σ(ticket cerrado × leads desde ZUNCHOS)
```

**Objetivo:** >10x el coste mensual del sistema

**Por qué importa:**
Esta es la métrica de ROI directo.

**Impacto económico:**
Sistema cuesta 1.000€/mes. Si genera 15k€/mes en cierres → ROI 15x.

---

### 5. REDUCCIÓN DE HEADCOUNT COMERCIAL

**Definición:**
Personas que el cliente ya no necesita contratar porque ZUNCHOS hace su trabajo.

**Fórmula:**
```
Ahorro headcount = (SDRs evitados × coste promedio) - coste ZUNCHOS
```

**Objetivo:** >1 SDR ahorrado

**Por qué importa:**
Un SDR cuesta 2.500€/mes + formación + rotación. ZUNCHOS cuesta 1.000€/mes y no renuncia.

**Impacto económico:**
1 SDR ahorrado = 1.500€/mes en margen neto. 18k€/año.

---

## MÉTRICAS SECUNDARIAS (ANÁLISIS INTERNO)

### 6. CALIDAD DE FILTRADO

**Definición:**
Precisión del módulo de intercepción al separar leads válidos de basura.

**Fórmula:**
```
Precisión = (True positives / (True positives + False positives)) × 100
```

**Objetivo:** >90%

**Uso interno:**
Detectar si el filtro necesita ajustes.

---

### 7. TASA DE RESPUESTA POR CANAL

**Definición:**
% de leads que responden según el canal usado (WhatsApp, email, SMS).

**Fórmula:**
```
Tasa por canal = (Respuestas en canal X / Contactos en canal X) × 100
```

**Objetivo:** WhatsApp >60%, Email >30%, SMS >40%

**Uso interno:**
Optimizar distribución de canales en protocolo ghosting.

---

### 8. CONVERSIÓN AGENTE → REUNIÓN

**Definición:**
% de leads contactados que terminan con reunión agendada.

**Fórmula:**
```
Conversión = (Reuniones agendadas / Leads contactados) × 100
```

**Objetivo:** >40%

**Uso interno:**
Medir efectividad del agente conversacional.

---

## COMPARATIVA ANTES/DESPUÉS

### ESCENARIO TÍPICO (ANTES DE ZUNCHOS)

**Datos del cliente:**
- Leads mensuales: 150
- Leads válidos: 60 (40%)
- Ghosting: 40 leads (67% de válidos)
- Tiempo a agenda: 3-5 días
- Tasa de cierre: 20%
- SDRs en equipo: 2 (5.000€/mes)

**Resultado:**
- Reuniones: 20/mes
- Cierres: 4/mes
- Facturación: 20k€/mes (ticket 5k)
- Coste comercial: 5.000€/mes (SDRs)
- Margen: 15k€/mes

---

### ESCENARIO TÍPICO (DESPUÉS DE ZUNCHOS)

**Datos del cliente:**
- Leads mensuales: 150 (mismo tráfico)
- Leads válidos: 110 (73%, +83% mejora)
- Ghosting recuperado: 25% de 40 = 10 leads
- Tiempo a agenda: <24h
- Tasa de cierre: 25% (+5pp por velocidad)
- SDRs en equipo: 1 (2.500€/mes, -50%)

**Resultado:**
- Reuniones: 32/mes (+60%)
- Cierres: 8/mes (+100%)
- Facturación: 40k€/mes (+100%)
- Coste comercial: 3.500€/mes (1 SDR + ZUNCHOS)
- Margen: 36.5k€/mes (+143%)

**ROI:**
- Inversión inicial: 15k€
- Ahorro mensual: 1.500€ (SDR) + facturación extra: 20k€ = 21.5k€/mes
- Payback: <1 mes

---

## DASHBOARD EJECUTIVO (DISEÑO)

### SECCIÓN 1: FLUJO DE LEADS

**Visual:** Embudo

```
Leads entrantes: 150
  ↓
Leads válidos: 110 (73%)
  ↓
Contactados: 110 (100%)
  ↓
Respondieron: 75 (68%)
  ↓
Agendados: 32 (29%)
```

**Insight:** "De cada 100 leads que entran, 32 terminan en agenda."

---

### SECCIÓN 2: RECUPERACIÓN

**Visual:** Gráfico de barras

```
Ghosteados: 40
Recuperados: 10 (25%)
No recuperados: 30 (75%)
```

**Insight:** "Recuperaste 10 reuniones que antes se perdían."

---

### SECCIÓN 3: € GENERADO

**Visual:** Número grande

```
40.000€
Facturación atribuible a ZUNCHOS este mes
```

**Insight:** "Sistema generó 40x su coste mensual."

---

### SECCIÓN 4: AHORRO OPERATIVO

**Visual:** Comparativa

```
Antes:
2 SDRs × 2.500€ = 5.000€/mes

Ahora:
1 SDR × 2.500€ + ZUNCHOS 1.000€ = 3.500€/mes

Ahorro: 1.500€/mes (18k€/año)
```

**Insight:** "Ahorras 1 SDR completo. Y facturas el doble."

---

## REPORTES MENSUALES

### FORMATO

**No PDF. Email directo con datos:**

```
Subject: ZUNCHOS // Reporte Febrero 2026

Hola [nombre],

Números de febrero:

Leads procesados: 150
Válidos: 110 (73%)
Reuniones: 32
€ generado: 40.000€

Recuperación ghosting: 10 leads (25%)
Tiempo a agenda: 18h promedio

Sistema funcionó 99.7% del tiempo (1 caída de 2h el día 15).

Ajustes este mes:
- Mejoré filtro de presupuesto (ahora detecta mejor leads <5k)
- Optimicé timing de WhatsApp (ahora contacta a las 10:00 en lugar de 9:00)

Próximos pasos:
- Vamos a testear voz en lugar de solo texto para leads high-ticket

Cualquier duda, avísame.

Que no se caiga nada.

[Firma]
```

---

## MÉTRICAS PROHIBIDAS (NO MOSTRAR AL CLIENTE)

❌ "Mensajes enviados" → irrelevante
❌ "Tasa de apertura de email" → vanity metric
❌ "Clics en enlaces" → no afecta facturación
❌ "Tiempo promedio de respuesta del agente" → el cliente no lo necesita saber
❌ "Uptime del servidor" → solo si es <99%

**Regla:** Si no se traduce a € o tiempo, no lo mostramos.

---

## DEFINICIÓN DE ÉXITO POR FASE

### MES 1 (POST-INSTALACIÓN)

**Éxito si:**
- Sistema funciona >95% del tiempo
- Leads válidos >60%
- Cliente entiende el dashboard

**Fracaso si:**
- Errores críticos >2
- Cliente no puede leer métricas
- Leads válidos <50%

---

### MES 2-3 (OPTIMIZACIÓN)

**Éxito si:**
- Recuperación ghosting >15%
- € generado >5x coste mensual
- Cliente reduce 1 SDR

**Fracaso si:**
- Recuperación <10%
- € generado <2x coste mensual
- Cliente no ve ROI

---

### MES 6+ (MADUREZ)

**Éxito si:**
- Recuperación ghosting >25%
- € generado >10x coste mensual
- Cliente renovó sin objeciones

**Fracaso si:**
- Cliente considera cancelar
- Métricas planas sin mejora
- Competencia hace mejor trabajo

---

## REGLAS DE MEDICIÓN

1. **Toda métrica debe tener impacto económico cuantificable.**
   Si no puedes traducirla a €, no la midas.

2. **Comparar siempre con baseline.**
   "Antes teníamos X, ahora tenemos Y" > "Tenemos Y".

3. **Mostrar tendencias, no solo números.**
   "Mes 1: 15%, Mes 2: 20%, Mes 3: 25%" > "25%".

4. **Ser brutalmente honesto con lo que no funciona.**
   "El módulo de voz falló 3 veces este mes, lo estamos arreglando" > silencio.

5. **El cliente debe poder leer el dashboard en <60 segundos.**
   Si necesita más tiempo, el dashboard está mal diseñado.

---

## UMBRAL DE CANCELACIÓN

**Señales de que el cliente va a cancelar:**

- € generado <3x coste mensual durante 3 meses consecutivos
- Recuperación ghosting <10% durante 2 meses
- Cliente deja de revisar dashboard
- Cliente no responde a propuestas de mejora

**Acción preventiva:**
Llamada urgente para diagnóstico. Si no se puede mejorar en 30 días → ofrecer pausa en lugar de cancelación.

---

## REGLA DE ORO

Si el cliente pregunta "¿está funcionando?" y no puedes mostrarle un número en € → algo está mal.

El zuncho se mide por la carga que aguanta, no por lo bonito que se ve.
