# Design-fit copy

This file adapts the copy from `PORTFOLIO-COPY.md` to the text slots in `DESIGN-SPEC.md`. Each slot copies the reference slot's geometry: character count, number of lines, where lines break, and word length. The meaning comes from your copy. None of the reference wording is reused.

Line breaks (`⏎`) follow where the reference text wrapped at 1440 px wide. Counts are characters with the line breaks turned into spaces. `ref` is the reference slot, measured from the live site.

Rules kept: facts only come from `PORTFOLIO-COPY.md`, there are no em or en dashes, and the colored word sits in the same spot as in the reference. **Green** = the word that uses `--color-tech-green`.

---

## Loader

| Slot | ref | EN | ES |
|---|---|---|---|
| Top label (mono 11) | DAVIDE CATTANEO · 15 | ARTURO GALLARDO · 15 | ARTURO GALLARDO · 15 |
| Bottom label (mono 11) | PERSONAL WEBSITE · 16 | GUADALAJARA, MX · 15 | GUADALAJARA, MX · 15 |

## Navbar, menu, nav-spy

| Slot | ref | EN | ES |
|---|---|---|---|
| Toggle label | Menu | Menu | Menú |
| Menu 01 | Servizi | About | Sobre mí |
| Menu 02 | Case History | Work | Proyectos |
| Menu 03 | Contatti | Contact | Contacto |
| Info title 1 (13 light) | Connect | Email | Correo |
| Info value 1 (mono 10) | INFO@… | ARTUROGALLARDOJR@HOTMAIL.COM | ARTUROGALLARDOJR@HOTMAIL.COM |
| Info title 2 | Cellulare | WhatsApp | WhatsApp |
| Info value 2 | +39 … | +52 33 3958 2488 | +52 33 3958 2488 |
| Nav-spy 1 | ABOUT | STATEMENT | STATEMENT |
| Nav-spy 2 | SERVIZI | CAPABILITIES | CAPABILITIES |
| Nav-spy 3 | CASE HISTORY | WORK | WORK |
| Nav-spy 4 | CONTATTI | CONTACT | CONTACT |

The nav-spy labels are your existing section codes (`lib/sections.ts`, never localized). The menu labels are your existing nav links.

---

## 4.1 Hero

**Description** · `t-lg` 350, right-aligned, 517 px · ref 120 ch, 3 lines (44/48/26)

- EN · 121 ch (45/44/30)
  From objective to production: I build the AI, ⏎
  automation and ERP links myself, and measure ⏎
  them by what changes each day.
- ES · 119 ch (43/42/32)
  Del objetivo a producción: construyo la IA, ⏎
  la automatización y el enlace al ERP, y lo ⏎
  mido por lo que cambia cada día.

On the live site, the words inside `<em>` show at 50% opacity. To match that, dim the final clause: "them by what changes each day." / "mido por lo que cambia cada día."

**H1** · `t-2xl`, max 75% · ref 43 ch, 2 lines (25/17)

- EN / ES (the role stays in English, as in your source) · 46 ch (21/24)
  AI-First Tech Builder ⏎
  and Automation Engineer.

**Scroll cue** · `t-eye-xs` · ref 21 ch

- EN: Scroll to see the work (22)
- ES: Desliza para explorar (21)

---

## 4.2 About intro

**H2** · `t-xl`, max 80%, 4 lines on green · ref 265 ch (75/70/72/48)

- EN · 259 ch (71/69/71/45)
  I'm a hands-on technology builder. You bring a business objective and I ⏎
  ship a working solution that runs in production, wiring together ERP, ⏎
  CRM, AI models, cloud infrastructure and automation. I do it on my own, ⏎
  with no external development team in between.
- ES · 261 ch (67/69/69/53)
  Soy un technology builder con perfil práctico. Me das un objetivo y ⏎
  entrego una solución que funciona y corre en producción, uniendo ERP, ⏎
  CRM, modelos de IA, nube y automatización. Lo hago por mi cuenta, sin ⏎
  pasarle el trabajo a un equipo externo de desarrollo.

---

## 4.3 Data-viz

**Center title** · `t-2lg`, 1 line, last word green · ref 27 ch

- EN: From four hours to 8 **seconds.** (29)
- ES: De cuatro horas a 8 **segundos.** (29)

**Center text** · max 370 px · ref 129 ch, 3 lines (49/47/33)

- EN · 129 ch (50/44/33)
  LinkedIn feeds n8n, AI cleans and scores the lead, ⏎
  and it lands in Odoo CRM. It's the signature ⏎
  automation in my role at 121 LLC.
- ES · 126 ch (47/47/30)
  LinkedIn alimenta n8n, la IA limpia y puntúa, y ⏎
  el lead queda en Odoo CRM. Es la automatización ⏎
  insignia de mi rol en 121 LLC.

**Bottom-right caption** · `t-lg`, right-aligned, max 512 px · ref 136 ch, 3 lines (43/45/47)

- EN · 135 ch (44/46/43)
  One pipeline in production: public data goes ⏎
  in, a clean business record comes out, and the ⏎
  whole trip takes seconds, about 8 per lead.
- ES · 133 ch (43/43/45)
  Un pipeline corriendo en producción: entran ⏎
  datos públicos, sale un registro de negocio ⏎
  limpio y todo tarda unos 8 segundos por lead.

---

## 4.4 Services (maps to Capabilities)

**Title** · `t-2xl`, line 2 green · ref 38 ch (22/15)

- EN · 37 ch: One builder, from goal ⏎ **to production.**
- ES · 36 ch: Un builder, de la meta ⏎ **a producción.**

**Text** · `t-md`, right-aligned, max 30em · ref 208 ch, 3 lines (81/74/53)

- EN · 208 ch (81/76/49)
  I take the objective and ship the system behind it: AI, automation, cloud and the ⏎
  ERP and CRM it has to talk to. No external development team, and the measure ⏎
  is simple: what changes in your daily operations.
- ES · 201 ch (79/79/41)
  Tomo el objetivo y entrego el sistema detrás: IA, automatización, nube y el ERP ⏎
  y CRM con los que tiene que hablar. Sin equipo externo de desarrollo, y lo mido ⏎
  por lo que cambia en la operación diaria.

**Cards** · title `t-2lg` 2 lines, label mono 9, text `t-md` 4 lines

| | ref | EN | ES |
|---|---|---|---|
| Card 1 title | Consulenze ⏎ continuative (23) | AI agents ⏎ on live data (22) | Agentes IA ⏎ con datos vivos (26) |
| Card 1 label | [001] | [001] | [001] |
| Card 2 title | Progetti a ⏎ scadenza (19) | Automation ⏎ pipelines (20) | Pipelines de ⏎ automatización (27) |
| Card 2 label | [002] | [002] | [002] |
| Card 3 title | Formazione ed ⏎ Training (22) | Endpoints ⏎ and IT ops (20) | Endpoints ⏎ y operación TI (24) |
| Card 3 label | [003] | [003] | [003] |

Card 1 text · ref 143 ch (43/40/37/21)

- EN · 149 ch
  Custom MCP servers that let AI agents read ⏎
  live Odoo ERP and CRM data, plus full-stack ⏎
  AI apps I design and deploy myself, from ⏎
  design to production.
- ES · 159 ch
  Servidores MCP a medida para que los agentes ⏎
  de IA lean datos vivos del ERP y CRM de Odoo, ⏎
  y apps full-stack que diseño y despliego ⏎
  yo mismo, hasta producción.

Card 2 text · ref 163 ch (45/45/47/24)

- EN · 158 ch
  Pipelines in n8n that take work off people: ⏎
  a prospecting flow went from 4 hours of manual ⏎
  work a day to about 8 seconds per lead, and ⏎
  the lead lands in Odoo.
- ES · 165 ch
  Pipelines en n8n que quitan trabajo manual: ⏎
  la prospección pasó de 4 horas al día a unos ⏎
  8 segundos por lead, y el lead entra directo ⏎
  en Odoo CRM sin captura manual.

Card 3 text · ref 154 ch (37/39/35/39)

- EN · 150 ch
  NinjaOne across about 100 endpoints, five ⏎
  management policies I designed, plus Google ⏎
  Workspace, Active Directory and network ⏎
  infrastructure I've run.
- ES · 163 ch
  NinjaOne en unos 100 endpoints, con las cinco ⏎
  políticas de gestión que diseñé, más Google ⏎
  Workspace, Active Directory e infraestructura ⏎
  de red que he administrado.

---

## 4.5 Case histories (maps to Selected work)

**Title** · `t-2xl`, line 2 green · ref 30 ch (14/15)

- EN · 32 ch: Selected work, ⏎ **built since 2017.**
- ES · 34 ch: Trabajo elegido, ⏎ **hecho desde 2017.**

**Text** · `t-md`, right-aligned, 322 px, last sentence at 50% · ref 176 ch, 4 lines (42/39/50/42)

- EN · 175 ch (44/42/51/35)
  Six systems I built and put into production, ⏎
  each one measured by what it changed. *Open ⏎
  a case to see the stack, the numbers and the result ⏎
  it had on the day-to-day operation.*
- ES · 172 ch (48/42/47/32)
  Seis sistemas que construí y puse en producción, ⏎
  cada uno medido por lo que cambió. *Abre un ⏎
  caso para ver el stack, los números y el efecto ⏎
  que tuvo en la operación diaria.*

(*italic here* = the 50% opacity span; it is not set in italics.)

**Rows** · index `t-xl` · title `t-xl` (ref 15 to 24 ch) · year `t-eye-sm` `[YYYY]` · type `t-eye-sm` (ref 19 to 31 ch)

| # | Title EN | Title ES | Year | Type EN | Type ES |
|---|---|---|---|---|---|
| 01 | Custom MCP for Odoo | MCP para Odoo | [YYYY] | AI · Integration | IA · Integración |
| 02 | LinkedIn → Odoo pipeline | Pipeline LinkedIn → Odoo | [YYYY] | Automation pipeline | Pipeline de automatización |
| 03 | Full-stack AI systems | Sistemas full-stack de IA | [YYYY] | AI applications | Aplicaciones de IA |
| 04 | Corporate HTML signatures | Firmas HTML corporativas | [YYYY] | Internal tool | Herramienta interna |
| 05 | NinjaOne endpoints | Endpoints con NinjaOne | [YYYY] | IT operations | Operaciones de TI |
| 06 | HR incidents form | Formulario de RH | [YYYY] | Internal automation | Automatización interna |

`[YYYY]`: your copy doesn't give a year for each case. Fill these in, or put the metric in the slot instead (for example `[~8S]`, `[~100]`).

---

## 4.6 Call section (maps to Contact)

**Title** · `t-2xl`, 1 line, last word green with glow · ref 22 ch

- EN: Let's build the **system** (22)
- ES: Construyamos algo **grande** (24)

**Text** · `t-md`, max 384 px, centered · ref 74 ch, 2 lines (53/20)

- EN · 71 ch: Open to projects and opportunities right now. ⏎ The work here beats a CV.
- ES · 78 ch: Abierto a proyectos y oportunidades ahora. ⏎ Aquí el trabajo pesa más que un CV.

**CTA** · mono uppercase button, 303 px · ref 20 ch

- EN: WRITE ME ON WHATSAPP (20)
- ES: ESCRÍBEME POR WHATSAPP (22)

---

## 4.7 Footer

| Slot | ref | EN | ES |
|---|---|---|---|
| Marquee (10.573vw) | Lavora con me (13) | Let's build (11) | Construyamos (12) |
| Info label (mono) | Informazioni di contatto (24) | Contact information (19) | Información de contacto (23) |
| Info link 1 | email | arturogallardojr@hotmail.com | arturogallardojr@hotmail.com |
| Info link 2 | phone | +52 33 3958 2488 | +52 33 3958 2488 |
| Nav 01 / 02 / 03 | Servizi / Case History / Contatti | About / Work / Contact | Sobre mí / Proyectos / Contacto |
| End bar left (mono 11) | Privacy · Cookie · Preferenze | GUADALAJARA, JALISCO, MEXICO · BACK TO TOP | GUADALAJARA, JALISCO, MÉXICO · VOLVER ARRIBA |
| End bar right | CREDITS: STUDIO ZEROTREDICI | © 2026 ARTURO JAVIER GALLARDO RUVALCABA | © 2026 ARTURO JAVIER GALLARDO RUVALCABA |

---

## Metadata

- Title (ref 56 ch): AI-First Tech Builder, automation, ERP and cloud systems. (57)
- ES: AI-First Tech Builder: IA, automatización, ERP y nube. (54)

## Copy with no slot in the reference

The reference layout has nowhere to put these. They are left out here, not rewritten: Measured impact, Experience, full Capabilities lists, per-case bullets/stack/outcome, Education, Languages, coordinates, "Available for work", LinkedIn and GitHub links.
