# Portfolio copy

Full user-visible text of the portfolio, rewritten for a human voice. English first, then Spanish.

Source of truth: `src/content.ts` (EN and ES objects), plus the `<title>` and `<meta description>` in `index.html` and the accessible labels listed at the bottom. Blocks appear in the same order as the source, one block per content key, so this file can be mapped back field by field. Stack lists and the marquee are data and stay as they are.

---

## Metadata

Title: Arturo Gallardo, AI-First Technology Builder and Automation Engineer

Description: Portfolio of Arturo Gallardo, an AI-First technology builder and automation engineer in Guadalajara, Mexico. He takes a business objective and ships the working AI and automation system himself.

---

# English

## Hero (portal)

Name: ARTURO / GALLARDO

Role: AI-First Technology Builder and Automation Engineer

Tagline: I take a business objective and ship the system that solves it, and it runs in production: the AI, the automation, the cloud infrastructure, and the ERP and CRM it has to talk to. I build it myself without handing the work to an external development team, and I measure it by what changes in daily operations.

Location: Guadalajara, MX

Available for work

Building since 2017

Scroll

Coordinates: 20.67°N · 103.35°W

## About (statement)

I'm a technology builder with a hands-on profile. I take a business objective and ship a working solution for it that runs in production, wiring together ERP and CRM platforms, AI models, cloud infrastructure, and automation, **on my own**, without handing the work to an external development team.

#### Education

Computer Systems Engineering, Tecnológico Superior de Jalisco Zapopan, 2016 to 2022
Informatic Technologist, CETI, 2012 to 2016

#### Languages

Spanish (native)
English (B2, professional)

#### Based in

Guadalajara, Jalisco, Mexico
Remote-friendly

## Selected work

Six cases. Index: 06.

### 01 · Custom MCP for Odoo

Category: AI · Integration

Metric: Real-time ERP access for AI agents

A Model Context Protocol server that lets AI agents query and interact with live Odoo ERP and CRM data. It keeps the model tied to real business context.

- MCP server exposing live Odoo business data
- RAG-style context for the agent
- Connects generative AI to operational business data

Stack: Node.js, MCP, Odoo, RAG, Anthropic API

Outcome: Agents query production ERP and CRM records in real time.

### 02 · LinkedIn → n8n → AI → Odoo

Category: Automation pipeline

Metric: 4h manual → ~8s per lead

A prospecting automation: a Tampermonkey button pulls public LinkedIn data, fires an n8n pipeline, AI cleans and enriches it, and the lead lands in Odoo CRM.

- From 4 hours of manual work a day to about 8 seconds per lead
- 10 to 20 leads processed per week
- The lead goes straight into Odoo CRM

Stack: Tampermonkey, n8n, Odoo CRM, OpenRouter, AI cleaning

Outcome: Prospecting went from hours to seconds per lead.

### 03 · Full-stack AI systems

Category: AI applications

Metric: Design to production, on my own

Frontend and backend AI applications I designed and deployed myself, from design to production, for real business workflows.

- Full-stack architecture and deployment
- Cloud-native: Workers, Supabase, Neon
- AI-assisted development, AI-first design

Stack: Node.js, Cloudflare Workers, Supabase, Neon, Claude Code, OpenRouter, Orca, StageWise

Outcome: Applications that went from design to production.

### 04 · Corporate HTML signatures

Category: Internal tool

Metric: ~1 week → under 1 minute

An email signature generator built on Google Sheets and Drive, with the assets hosted on Cloudflare R2. It produces one signature at a time or a full batch.

- From a week of manual work to seconds
- Individual and batch generation
- Cloudflare R2 hosts the assets

Stack: Google Sheets, Google Drive, Cloudflare R2, HTML/CSS

Outcome: A process that used to eat a week now takes seconds.

### 05 · NinjaOne endpoint management

Category: IT operations

Metric: ~100 endpoints · 5 policies

I rolled out NinjaOne across about 100 endpoints (80 Mac, 20 Windows, iPhone), designed the five management policies, and negotiated the commercial terms.

- ~100 endpoints: 80 Mac, 20 Windows, iPhone
- 5 management policies designed
- ITAM module negotiated at near-zero cost

Stack: NinjaOne, ITAM, MDM, Windows, macOS

Outcome: Every endpoint visible and controlled from one place.

### 06 · HR incidents form

Category: Internal automation

Metric: Pilot · ~15 leaders

An internal HR incidents form built with n8n Forms and Cloudflare Access. Only leaders can reach it, the form detects who is filling it in, and the employee list keeps itself in sync with Google Sheets.

- Leader-only access through Cloudflare Access
- Automatic user detection
- Dynamic sync of the employee list from Google Sheets

Stack: n8n Forms, Cloudflare Access, Google Sheets

Outcome: About 15 leaders use it for HR incident intake in the pilot.

## Pipeline (from objective to production)

One pipeline running in production: public data goes in, a clean business record comes out, and it takes seconds. It is the signature automation in my current role at 121 LLC.

Note: LinkedIn → n8n → AI → Odoo CRM · loop

Nodes:
- LinkedIn / Public prospect data
- n8n / Trigger · clean
- AI / Enrich · score
- Odoo CRM / Lead registered

Badge: ~8s

## Measured impact

- 8s per lead, down from 4 hours of manual work a day
- 100+ endpoints under one management platform
- 96% SLA compliance at Toka Internacional
- 30+ meetings summarized per month, one license

Footnote: Email signatures: from about a week to under a minute. Energy: about 20% less after the Synology migration.

## Experience

#### Dec 2025 to present · IT & AI Systems Builder · 121 LLC USA · Hybrid
- I ship AI and automation that runs in production, from prospecting pipelines to internal tools
- Built a custom MCP server for Odoo so the AI answers from live business data
- Run self-hosted n8n as the company's automation platform and rolled out NinjaOne across about 100 endpoints

#### Jan 2024 to Dec 2025 · IT Engineer · GNP · Guadalajara

- Administered Google Workspace for the whole organization
- Windows technical support: performance, security, and functionality
- Preventive and corrective maintenance to keep equipment available

#### Jun 2022 to Jan 2024 · IT Support Engineer · Toka Internacional · Guadalajara
- Administered Active Directory, user accounts, and permissions
- Specialized support: GlobalProtect, Duo, Microsoft Authenticator, Microsoft 365
- 96% SLA compliance and one of the highest ticket resolution volumes

#### Feb 2017 to Feb 2021 · IT Manager · Asia Robótica · Guadalajara

- Formalized the IT department: servers, networks, hosting, databases
- Built out the network: FortiGate, Ubiquiti, TP-Link, Asus
- Moved company data to a Synology NAS, which cut energy use by about 20%

## Capabilities

Development: TypeScript / JavaScript, React, Node.js, SQL / PostgreSQL, GitHub, REST APIs, JSON

AI & Agent Orchestration: Claude / Anthropic API, OpenAI / Codex, Gemini, OpenRouter, MCP Servers, RAG Pipelines, Prompt Engineering, Vertex AI

Automation & Integrations: n8n, Webhooks, OAuth, Tampermonkey, Fireflies.ai, AI-assisted Workflows

Cloud & Infrastructure: Google Cloud, Cloudflare (Access, R2, Workers), Vercel AI Gateway, Docker Compose, Supabase, Neon

Platforms & IT: Odoo CRM/ERP, Google Workspace, Microsoft 365, NinjaOne, Endpoint Management, ITAM

Networking, Servers & Security: Tailscale, VPN / MFA / Duo, FortiGate / Palo Alto, Windows Server, Linux (openSUSE), Synology NAS

Marquee: AI Agents, MCP Servers, RAG Pipelines, n8n, Odoo CRM, Cloudflare, Google Cloud, Node.js, Supabase, Automation, Vertex AI, Workflows

## Contact

Let's build

I'm available for new projects and opportunities right now.

- Email: arturogallardojr@hotmail.com
- WhatsApp / Phone: +52 33 3958 2488
- LinkedIn: in/arturo-javier-gallardo-ruvalcaba
- GitHub: github.com/ArturoGallardoR

You will not find a CV to download here. The work on this page says more.

## Footer

© 2026 Arturo Javier Gallardo Ruvalcaba

Guadalajara, Jalisco, Mexico

React · GSAP · Lenis · Three.js

Back to top

---

# Español

## Hero (portal)

Nombre: ARTURO / GALLARDO

Rol: AI-First Technology Builder and Automation Engineer

Tagline: Me das un objetivo de negocio y entrego el sistema que lo resuelve, y corre en producción: la IA, la automatización, la infraestructura en la nube y los sistemas ERP y CRM con los que tiene que hablar. Lo construyo yo, sin pasarle el trabajo a un equipo externo de desarrollo, y lo mido por lo que cambia en la operación diaria.

Ubicación: Guadalajara, MX

Disponible para trabajar

Construyendo desde 2017

Desliza

Coordenadas: 20.67°N · 103.35°W

## Sobre mí

Soy un technology builder con perfil práctico. Tomo un objetivo de negocio y entrego yo mismo una solución que funciona y corre en producción, uniendo plataformas ERP y CRM, modelos de IA, infraestructura en la nube y automatización, **por mi cuenta**, sin pasarle el trabajo a un equipo externo de desarrollo.

#### Educación

Ingeniería en Sistemas Computacionales, Tecnológico Superior de Jalisco Zapopan, 2016 a 2022
Técnico en Informática, CETI, 2012 a 2016

#### Idiomas

Español (nativo)
Inglés (B2 profesional)

#### Ubicación

Guadalajara, Jalisco, México
Remoto-friendly

## Trabajo seleccionado

Seis casos. Índice: 06.

### 01 · MCP personalizado para Odoo

Categoría: IA · Integración

Métrica: Acceso al ERP en tiempo real para agentes de IA

Un servidor de Model Context Protocol que permite a los agentes de IA consultar e interactuar con datos vivos del ERP y CRM de Odoo. Mantiene el modelo atado al contexto real del negocio.

- Servidor MCP que expone datos vivos de Odoo
- Contexto estilo RAG para el agente
- Conecta la IA generativa con la operación real del negocio

Stack: Node.js, MCP, Odoo, RAG, Anthropic API

Resultado: Los agentes consultan registros de producción del ERP y CRM en tiempo real.

### 02 · LinkedIn → n8n → IA → Odoo

Categoría: Pipeline de automatización

Métrica: 4h manuales → ~8s por lead

Una automatización de prospección: un botón de Tampermonkey extrae datos públicos de LinkedIn, dispara un pipeline en n8n, la IA limpia y enriquece la información, y el lead queda en Odoo CRM.

- De 4 horas de trabajo manual al día a unos 8 segundos por lead
- 10 a 20 leads procesados por semana
- El lead entra directo en Odoo CRM

Stack: Tampermonkey, n8n, Odoo CRM, OpenRouter, Limpieza con IA

Resultado: La prospección pasó de horas a segundos por lead.

### 03 · Sistemas full-stack de IA

Categoría: Aplicaciones de IA

Métrica: Del diseño a producción, por mi cuenta

Aplicaciones de IA de frontend y backend que diseñé y desplegué yo mismo, del diseño a producción, para flujos de trabajo reales de negocio.

- Arquitectura y despliegue full-stack
- Cloud-native: Workers, Supabase, Neon
- Desarrollo asistido por IA, diseño AI-first

Stack: Node.js, Cloudflare Workers, Supabase, Neon, Claude Code, OpenRouter, Orca, StageWise

Resultado: Aplicaciones que pasaron del diseño a producción.

### 04 · Firmas HTML corporativas

Categoría: Herramienta interna

Métrica: ~1 semana → menos de 1 minuto

Un generador de firmas de correo construido sobre Google Sheets y Drive, con los activos alojados en Cloudflare R2. Genera una firma a la vez o un lote completo.

- De una semana de trabajo manual a segundos
- Generación individual y por lotes
- Cloudflare R2 aloja los activos

Stack: Google Sheets, Google Drive, Cloudflare R2, HTML/CSS

Resultado: Un proceso que se comía una semana ahora tarda segundos.

### 05 · Gestión de endpoints con NinjaOne

Categoría: Operaciones de TI

Métrica: ~100 endpoints · 5 políticas

Desplegué NinjaOne en unos 100 endpoints (80 Mac, 20 Windows, iPhone), diseñé las cinco políticas de gestión y negocié las condiciones comerciales.

- ~100 endpoints: 80 Mac, 20 Windows, iPhone
- 5 políticas de gestión diseñadas
- Módulo ITAM negociado a costo casi nulo

Stack: NinjaOne, ITAM, MDM, Windows, macOS

Resultado: Todos los endpoints visibles y controlados desde un solo lugar.

### 06 · Formulario de incidentes de RH

Categoría: Automatización interna

Métrica: Piloto · ~15 líderes

Un formulario interno de incidentes de RH construido con n8n Forms y Cloudflare Access. Solo entran los líderes, el formulario detecta quién lo llena y la lista de empleados se mantiene sincronizada con Google Sheets.

- Acceso solo para líderes mediante Cloudflare Access
- Detección automática del usuario
- Sincronización dinámica de la lista de empleados desde Google Sheets

Stack: n8n Forms, Cloudflare Access, Google Sheets

Resultado: Unos 15 líderes lo usan para levantar incidentes de RH en el piloto.

## Pipeline (del objetivo a la producción)

Un pipeline corriendo en producción: entran datos públicos, sale un registro de negocio limpio, y todo tarda segundos. Es la automatización insignia de mi rol actual en 121 LLC.

Nota: LinkedIn → n8n → IA → Odoo CRM · loop

Nodos:
- LinkedIn / Datos públicos de prospectos
- n8n / Disparo · limpieza
- IA / Enriquecer · puntuar
- Odoo CRM / Lead registrado

Badge: ~8s

## Impacto medido

- 8s por lead, desde 4 horas de trabajo manual al día
- 100+ endpoints bajo una sola plataforma de gestión
- 96% de cumplimiento de SLA en Toka Internacional
- 30+ reuniones resumidas al mes, una licencia

Nota al pie: Firmas de correo: de una semana a menos de un minuto. Energía: cerca de 20% menos después de la migración a Synology.

## Experiencia

#### Dic 2025 a la fecha · IT & AI Systems Builder · 121 LLC USA · Híbrido
- Entrego IA y automatización que corre en producción, de pipelines de prospección a herramientas internas
- Construí un servidor MCP para Odoo, para que la IA responda con datos vivos del negocio
- Mantengo n8n autogestionado como plataforma de automatización y desplegué NinjaOne en unos 100 endpoints

#### Ene 2024 a Dic 2025 · Ingeniero de TI · GNP · Guadalajara

- Administré Google Workspace para toda la organización
- Soporte técnico Windows: rendimiento, seguridad y funcionalidad
- Mantenimiento preventivo y correctivo para mantener los equipos disponibles

#### Jun 2022 a Ene 2024 · Ingeniero de Soporte TI · Toka Internacional · Guadalajara
- Administré Active Directory, cuentas de usuario y permisos
- Soporte especializado: GlobalProtect, Duo, Microsoft Authenticator, Microsoft 365
- 96% de cumplimiento de SLA y uno de los volúmenes de tickets resueltos más altos

#### Feb 2017 a Feb 2021 · Gerente de TI · Asia Robótica · Guadalajara

- Formalicé el departamento de TI: servidores, redes, hosting y bases de datos
- Implementé la infraestructura de red: FortiGate, Ubiquiti, TP-Link, Asus
- Migré los datos de la empresa a un NAS Synology, con cerca de 20% menos consumo eléctrico

## Capacidades

Development: TypeScript / JavaScript, React, Node.js, SQL / PostgreSQL, GitHub, REST APIs, JSON

AI & Agent Orchestration: Claude / Anthropic API, OpenAI / Codex, Gemini, OpenRouter, MCP Servers, RAG Pipelines, Prompt Engineering, Vertex AI

Automation & Integrations: n8n, Webhooks, OAuth, Tampermonkey, Fireflies.ai, AI-assisted Workflows

Cloud & Infrastructure: Google Cloud, Cloudflare (Access, R2, Workers), Vercel AI Gateway, Docker Compose, Supabase, Neon

Platforms & IT: Odoo CRM/ERP, Google Workspace, Microsoft 365, NinjaOne, Endpoint Management, ITAM

Networking, Servers & Security: Tailscale, VPN / MFA / Duo, FortiGate / Palo Alto, Windows Server, Linux (openSUSE), Synology NAS

Marquee: AI Agents, MCP Servers, RAG Pipelines, n8n, Odoo CRM, Cloudflare, Google Cloud, Node.js, Supabase, Automation, Vertex AI, Workflows

## Contacto

Construyamos algo grande

Disponible para nuevos proyectos y oportunidades ahora mismo.

- Correo: arturogallardojr@hotmail.com
- WhatsApp / Teléfono: +52 33 3958 2488
- LinkedIn: in/arturo-javier-gallardo-ruvalcaba
- GitHub: github.com/ArturoGallardoR

Aquí no hay CV para descargar. El trabajo de esta página dice más.

## Pie de página

© 2026 Arturo Javier Gallardo Ruvalcaba

Guadalajara, Jalisco, México

React · GSAP · Lenis · Three.js

Volver arriba

---

## System labels (not prose)

Interface, metadata and accessibility labels, kept as they are. They are not voice copy, and most of them are never localized.

- Masthead: Systems Index (App.tsx, English only, no ES variant)
- Skip link: Skip to content (EN) / Ir al contenido (ES)
- Rail navigation, accessible name: System index (Rail.tsx)
- Section codes, used as visible mono kickers: PORTAL, WORK, PIPELINE, STATEMENT, EXPERIENCE, CAPABILITIES, METRICS, CONTACT, END (lib/sections.ts, never localized)
- Rail legend: [ ] for the menu, keys 1 to 9, ESC; the scroll readout appends a hardcoded % (Rail.tsx)
- Capability tier readout: high, mid, low (lib/capabilities.ts)
- Motion toggle: Pause motion (EN) / Pausar movimiento (ES)
- Language switcher: EN, ES (group label: Language)
- Menu button: Menu (EN) / Menú (ES); Close (EN) / Cerrar (ES)
- Nav links: Work (EN) / Proyectos (ES); About (EN) / Sobre mí (ES); Contact (EN) / Contacto (ES)
- Project toggles: Open case (EN) / Abrir caso (ES); Close (EN) / Cerrar (ES)

Stack lists, the marquee, and these labels are data. Everything else above is prose and was rewritten.
