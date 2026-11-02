# MASTER DESIGN PROMPT — ERIC MAN
## Premium Cinematic, Scroll-Driven Developer Portfolio

## 1. DESIGN ROLE & OBJECTIVE

Act as an award-winning digital art director, senior UI/UX designer, creative developer, and motion design specialist.

Design a complete, cohesive, premium personal portfolio website for **Eric Man — Full-Stack Developer / Product Builder**.

The website should combine:
- The visual polish of Framer.
- The typography and clarity of Linear.
- The premium dark aesthetic of Raycast.
- The experimental creativity of Awwwards-recognized websites.
- The cinematic storytelling of high-end interactive digital experiences.

Do not create a generic developer portfolio template.

The website must feel like a carefully art-directed digital experience created by a developer who understands engineering, product thinking, visual design, and interaction.

**The defining characteristic of this website is scroll-driven storytelling.**

Scrolling should actively control how the website evolves. It should feel like navigating through a carefully directed experience, not simply scrolling through a collection of static sections.

---

# 2. BRAND IDENTITY

**Name:** Eric Man  
**Identity:** Full-Stack Developer / Product Builder

**Brand positioning:**

A developer who turns ideas into working products.

**Core message:**

"I care about how things work, not just how they look. From UI to database, I build the whole thing."

**Personality:**
- Curious.
- Ambitious.
- Independent.
- Persistent.
- Creative.
- Technical.
- Always improving.

**Target audience:**
- Recruiters and HR professionals.
- Senior developers and engineering teams.
- Small business owners.
- Potential clients.

The website should communicate engineering ability, product thinking, attention to detail, creativity, and continuous learning.

The identity should feel confident and mature without pretending to be a large technology company.

---

# 3. CORE VISUAL DIRECTION — COSMIC MONOCHROME

Build the entire website around a distinctive Cosmic Monochrome visual language.

Think of a cinematic environment built around darkness, contrast, atmospheric imagery, and expressive typography.

### Color palette

| Element | Direction |
|---|---|
| Main background | #080808 |
| Secondary background | #111111 |
| Elevated surface | #181818 |
| Primary text | #FFFFFF |
| Secondary text | #888888 |
| Subtle text | #C0C0C0 |
| Accent | Restrained cosmic blue |

Black and white should form the foundation.

Color should primarily come from photography, video, landscape imagery, and selected project visuals.

Avoid excessive colorful gradients.

### Visual characteristics
- Deep dark backgrounds.
- Large negative spaces.
- High-contrast typography.
- Atmospheric photography.
- Layered compositions.
- Cinematic image transitions.
- Subtle lighting.
- Editorial layouts.
- Asymmetrical visual balance.
- Strong visual hierarchy.

The website should feel immersive without becoming visually overwhelming.

---

# 4. TYPOGRAPHY SYSTEM

Typography is one of the most important visual elements.

Use a consistent typography system throughout the website.

### Primary typefaces

**Syne — 800**
- Brand logo.
- Large identity statements.
- Selected display elements.

**Space Grotesk — 600–700**
- Main headings.
- Project titles.
- Section headlines.
- Large statements.

**Inter — 400–500**
- Paragraphs.
- Navigation.
- Supporting information.
- Form elements.

**DM Mono — 400**
- Technical metadata.
- Small utility information.
- Technology references when necessary.

### Typography direction
- Oversized headlines.
- Strong contrast between headings and body text.
- Tight but readable headline spacing.
- Carefully controlled line breaks.
- Editorial text alignment.
- Responsive font scaling.

Avoid making every heading the same size.

Use typography to create rhythm and visual hierarchy.

---

# 5. CRITICAL DESIGN PRINCIPLE — MINIMAL COPY

**Avoid unnecessary secondary labels and descriptions. Let the layout and the GSAP motion do the explaining.**

This is mandatory across the entire website.

Do not automatically add:
- Eyebrow labels above every heading.
- Section numbers.
- Repeated descriptions.
- Decorative captions.
- Unnecessary subtitles.
- Floating microcopy.
- Explanatory text that repeats the headline.
- Labels added merely to fill empty space.
- Excessive technical metadata.
- Multiple layers of supporting descriptions.

### Content philosophy

Use fewer words and stronger visual communication.

Let these elements explain the experience:
- Layout.
- Typography.
- Scale.
- Contrast.
- Imagery.
- Spacing.
- Movement.
- Transitions.
- Interaction.

Every text element must have a clear purpose.

Prefer one memorable headline over a headline followed by multiple unnecessary descriptions.

However, do not sacrifice clarity or useful information. Project explanations, technical decisions, contact details, navigation, and genuinely useful supporting content must remain.

**Less explanation. More intention. Let the experience speak for itself.**

---

# 6. GLOBAL LAYOUT SYSTEM

Create a consistent layout language across all pages.

### Grid and spacing
- Use a consistent responsive grid.
- Maintain generous horizontal spacing.
- Use large vertical spacing between major sections.
- Allow controlled asymmetry.
- Use full-width compositions where appropriate.
- Avoid making every section follow the same two-column layout.

### Composition

Mix different visual structures:
- Full-screen cinematic sections.
- Large editorial typography.
- Asymmetrical image compositions.
- Sticky visual elements.
- Split-screen layouts.
- Full-width image showcases.
- Minimal information layouts.
- Overlapping visual layers.
- Layered foreground and background compositions.

Each section should have its own composition while remaining part of the same visual identity.

### Containers

Do not place every piece of content inside a rounded card.

Use direct placement on the page whenever possible.

Cards should only appear when they serve a meaningful functional or visual purpose.

Avoid excessive borders, shadows, and background containers.

---

# 7. GLOBAL MOTION DESIGN — SCROLL-DRIVEN STORYTELLING

**Scroll-driven animation is the primary animation philosophy of this website.**

Do not treat scrolling as merely a trigger for ordinary fade-in animations.

The visitor's scroll progress should directly control meaningful visual transformations.

The website should feel cinematic, immersive, deliberate, and responsive.

Use **GSAP + ScrollTrigger as the primary animation engine**.

Motion may be used for independent interface interactions and micro-interactions.

Lenis is optional. Use it only when it genuinely improves the experience and ensure correct synchronization with GSAP ScrollTrigger.

### 7.1 Core animation techniques

Prioritize the following techniques:

**Scroll-linked transformations**
- Progress-based animation using scrub.
- Typography changing size, position, opacity, and spacing.
- Images scaling, cropping, and moving according to scroll progress.
- Background transformations connected to scroll position.

**Pinned storytelling**
- Pin sections while their content evolves.
- Use sticky visual compositions.
- Let vertical scrolling advance a sequence of visual states.
- Release pinned sections naturally after their story is complete.

**Layered parallax**
- Foreground and background move at different speeds.
- Multiple image layers create depth.
- Text and visual elements move independently.
- Use restrained movement to create cinematic depth.

**Mask and clip-path transitions**
- Circular mask reveals.
- Image clipping and expansion.
- Full-screen mask transitions.
- Text and image reveals controlled by scroll progress.

**Horizontal movement**
- Vertical scrolling controls horizontal content movement.
- Use horizontal project galleries where appropriate.
- Use `containerAnimation` when necessary.

**Video interactions**
- Scroll-controlled video movement or scrubbing where technically appropriate.
- Video transitions between project previews.
- Background video scaling and cropping.
- Do not force video scrubbing when it harms performance or visual quality.

**Typography transformations**
- Line-by-line reveals.
- Word-based movement.
- Oversized text scaling.
- Text transitions between sections.
- Typography that becomes part of the visual composition.

### 7.2 Motion philosophy

1. Scrolling should control the storytelling.
2. Every animation must have a visual purpose.
3. Motion should guide attention.
4. Transitions should connect the narrative.
5. Avoid animating everything.
6. Avoid excessive bounce and elastic effects.
7. Avoid unnecessary continuous animations.
8. Avoid excessive scroll pinning.
9. Preserve natural scrolling.
10. Support reverse scrolling.
11. Respect reduced-motion preferences.
12. Prioritize performance and responsiveness.

### 7.3 Animation hierarchy

**Hero:** Strong cinematic entrance and scroll-controlled transition.

**Introduction:** Typography transformations and pinned storytelling.

**Home project showcase:** Strong scroll-driven interaction.

**About:** Cinematic layered storytelling, parallax, and image transitions.

**Projects:** Scroll-driven image movement, active project states, and controlled transitions.

**Project details:** Focused visual reveals that support technical storytelling.

**Contact:** Minimal, elegant, and functional.

### 7.4 Important creative rule

Do not use the same animation pattern for every section.

Some sections should use pinned storytelling. Others should use parallax, clip-path reveals, horizontal movement, image transitions, or typography transformations.

Each section should have its own visual identity while following one coherent motion language.

**Priority: Scroll-driven storytelling > Traditional entrance animations.**

---

# 8. PAGE DESIGN SYSTEM

Design the following pages as one cohesive website.

## PAGE 01 — HOME

### Purpose

Introduce the developer identity, communicate what I build, and showcase the strongest work.

The Home Page should create a memorable first impression.

### Hero

Create a full-screen cinematic composition.

Use my existing background video featuring golden particles, a grassy outdoor environment, heavy rain, and lightning.

Preserve the original video's atmosphere.

Requirements:
- Configurable video source.
- `object-fit: cover`.
- Subtle dark overlay for text readability.
- Autoplay, muted, loop, and playsInline.
- Graceful fallback if the video fails to load.
- Respect reduced-motion preferences.
- Do not apply excessive filters that destroy the original visual details.

Main content:

**ERIC MAN**

**FULL-STACK DEVELOPER**

**I BUILD IDEAS INTO REAL-WORLD PRODUCTS.**

Primary CTA: Explore My Work  
Secondary CTA: Get in Touch

Keep supporting information minimal.

### Hero animation

- Create a cinematic typography entrance.
- Use layered movement between foreground and background.
- Background video subtly scales according to scroll progress.
- Main typography moves, scales, or transforms as the visitor scrolls.
- Use clip-path or mask transitions to connect the Hero to the Introduction.
- The Hero should transition into the next section rather than simply disappearing.

The animation should feel intentional and controlled.

### Introduction

Create a large editorial statement.

Suggested direction:

**Curious by nature. Driven to build. Always improving.**

Use scroll-linked typography reveals, controlled line transformations, and a strong visual transition from the Hero.

Keep the introduction concise.

### Selected Projects

This is one of the most important sections of the Home Page.

Create a premium scroll-driven project showcase.

Preferred interaction concept:

- Project list on the left.
- Sticky project visual or video preview on the right.
- Pin the showcase container while the visitor scrolls through projects.
- Active project changes according to scroll progress.
- Corresponding project imagery or video transitions smoothly.
- Active project title becomes visually prominent.
- Inactive projects remain visible but muted.
- Use crossfades, image masks, scaling, and cropping to transition between projects.
- Release the pinned section naturally after the final project.

Use actual project visuals wherever possible.

Featured projects:
- Komorebi Ecommerce.
- PocketTogether.
- QuizThis.
- Notely.
- Pokémon Index.
- Tomato Clock.
- JKLM Clone.

Use configurable project data for names, descriptions, technologies, image paths, video paths, status, and destination URLs.

Do not invent project features or claim functionality that has not been implemented.

Each project should link to its own case-study page.

### Engineering Mindset

Communicate how I approach software development.

Focus on:
- Problem-solving.
- Understanding systems.
- Engineering decisions.
- Continuous improvement.
- Building products with intention.

Use strong typography and restrained visual elements.

Avoid turning this into a generic skills or services section.

### Technologies

Present actual technologies in a clean typographic layout.

Use categories where useful:
- Frontend.
- Backend.
- Database.
- Tools and infrastructure.
- Mobile.

Avoid skill percentage bars and excessive technology logos.

### Closing

Create a memorable final section.

Main statement:

**HAVE AN IDEA? LET'S BUILD IT.**

Use a scroll-driven typography transformation or a restrained cinematic transition.

CTA: Get in Touch.

---

## PAGE 02 — ABOUT

### Purpose

Communicate personality, personal journey, mindset, and ambitions.

This page should feel more emotional and cinematic than the Home Page.

Do not design it as a conventional biography.

### Creative concept — Cinematic Image Journey

Use a recurring visual composition:
- A black human silhouette in the foreground.
- A colorful sky in the background.
- Mountain landscapes.
- Atmospheric lighting.
- Clear separation between foreground and background layers.

The foreground remains monochromatic while the background introduces natural color.

Use existing personal visual assets where available.

Do not generate imagery that falsely implies to be an actual personal photograph.

### Chapter 01 — The Beginning

Main statement:

**I'm still figuring things out.**

Create a cinematic introduction using the silhouette and landscape.

Use a large image composition with layered parallax and typography movement.

### Chapter 02 — The Journey

Main statement:

**Different paths. One direction.**

Communicate the transition from different types of work toward software development.

My actual background includes:
- Working as a waiter.
- Working in a kitchen as an apprentice.
- Working in the furniture industry.
- Learning programming independently.
- Building personal development projects.
- Transitioning into software development through an internship.

Avoid fabricated dates or milestones.

Do not portray previous jobs as failures. Explain how different experiences shaped my perspective.

### Chapter 03 — The Discipline

Main statement:

**Progress is built, not given.**

Show the mindset behind learning, problem-solving, and building.

Use a scroll-controlled sequence to reveal the ideas progressively.

### Chapter 04 — Beyond the Screen

Main statement:

**There's more to life than the screen.**

Introduce my interest in:
- Sport motorcycles.
- Engineering and design.
- Speed and stimulation.
- Freedom.
- Exploring unfamiliar places.

Use atmospheric imagery and layered movement.

### Chapter 05 — The Future

Main statement:

**I'm building toward something bigger.**

Three directions:

**Engineering. Building. Freedom.**

Use a strong cinematic composition to connect these ideas.

### Closing

**The journey continues.**

CTAs:
- View Projects.
- Let's Talk.

### About animation direction

- Use scroll-driven image transformations.
- Use layered parallax between silhouette and landscape.
- Let typography move independently from the background.
- Use circular masks, clip-path reveals, and scale transitions.
- Consider pinned storytelling where it genuinely improves the narrative.
- Connect chapters through visual transitions instead of ordinary section breaks.

The entire page should feel like one continuous visual journey.

---

## PAGE 03 — PROJECTS

### Purpose

Showcase my work as a collection of real products and engineering experiences.

This page should feel like an interactive editorial portfolio.

### Layout

Use distinctive project compositions.

Possible structures:
- Large project image on one side.
- Project title and concise description on the other.
- Full-width visual showcases.
- Asymmetrical image compositions.
- Sticky visual elements.
- Large editorial typography.

Avoid conventional uniform card grids.

Do not add category filters.

### Scroll-driven interaction

As visitors scroll:
- Project imagery moves through the viewport.
- Text enters and transforms according to scroll progress.
- Images reveal using clipping masks.
- Active project states change.
- Visual transitions connect projects.
- Different project compositions use different movement patterns.

Consider sticky or pinned project showcases where appropriate.

Do not make every project section identical.

### Project information

Show only useful details:
- Project name.
- What it does.
- My role.
- Main technologies.
- Project status where relevant.

Avoid unnecessary secondary descriptions.

Each project should link to its dedicated case-study page.

---

## PAGE 04 — PROJECT DETAIL / CASE STUDY

### Purpose

Demonstrate real engineering ability, product thinking, and technical decision-making.

This page should combine cinematic presentation with engineering documentation.

### Design direction

**Hybrid Cinematic Editorial + Engineering Documentation.**

Each project should have its own accent color while preserving the global Cosmic Monochrome identity.

Examples:
- Komorebi: Soft pink.
- PocketTogether: Blue.
- QuizThis: Purple.
- Notely: Warm orange.

Use accent colors selectively.

### Page structure

**Hero**
- Project name.
- Short project introduction.
- Role and relevant metadata.
- Large visual showcase.

**Overview**
- The product and its purpose.
- The problem it addresses.

**Product Showcase**
- Actual screenshots.
- Real application interfaces.
- Editorial image compositions.
- Full-width visuals where appropriate.

**Architecture**
- System architecture.
- Frontend and backend relationships.
- Relevant infrastructure.

**Engineering**
- Important business logic.
- Database design.
- Data flow.
- Key implementation decisions.

**Challenges and Decisions**
- Real problems.
- Solutions.
- Trade-offs.
- Lessons learned.

**Gallery**
- Actual product screenshots.
- Annotated visuals where useful.
- Device mockups where appropriate.

**Closing**
- GitHub repository.
- Live demo only if one actually exists.
- Next project.
- Contact CTA.

### Case-study motion

Use scroll-driven storytelling to guide the reader through the engineering process.

Possible interactions:
- Sticky technical sidebar.
- Scroll-controlled architecture diagrams.
- Layered screenshot reveals.
- Image scaling and cropping.
- Pinned product showcase.
- Progressive highlighting of system components.
- Typography transitions between technical sections.

Do not animate technical diagrams in ways that make them difficult to understand.

Technical accuracy is more important than decorative presentation.

Do not invent project features, screenshots, metrics, or engineering decisions.

Use actual screenshots. Never replace real product interfaces with AI-generated fake interfaces.

---

## PAGE 05 — CONTACT

### Purpose

Create a clean, memorable, and functional contact experience.

The Contact Page should feel personal and welcoming without losing the overall cinematic identity.

### Hero

Large headline:

**LET'S TALK.**

Keep supporting text minimal.

### Contact Form

Use a clean, spacious form layout.

Fields:
- Name.
- Email.
- Subject.
- Message.

Use understated input styling.

Focus states should be clear.

The form must be functional. Do not create a fake submission interaction or display a success message unless the message has actually been sent.

### Contact Information

Display verified contact methods:
- Email.
- GitHub.
- LinkedIn.

Do not invent external URLs or contact information.

### Closing

Large statement:

**GOOD THINGS START WITH A CONVERSATION.**

Keep the page visually restrained and practical.

Use subtle scroll-linked typography movement or a minimal closing transition rather than excessive animation.

---

# 9. NAVIGATION SYSTEM

Create a consistent navigation system across every page.

### Desktop

Left:

ERIC MAN

Right:
- Home.
- About.
- Projects.
- Contact.

### Mobile

Use a compact, accessible navigation system.

Navigation should feel minimal and unobtrusive.

Use subtle hover and active states.

All navigation links must lead to actual pages.

Do not introduce an unnecessarily complicated navigation experience.

---

# 10. PAGE TRANSITIONS

Create a consistent transition language between independent routes.

The transition should feel like a cinematic layer passing between pages.

Potential visual direction:
- Full-screen dark overlay.
- Mask-based reveal.
- Controlled typography movement.
- Subtle image or background transition.
- Smooth reveal of the destination page.

Keep transitions short and intentional.

Requirements:
- Support direct URLs.
- Support browser Back and Forward.
- Support page refresh.
- Preserve native navigation expectations.
- Avoid blocking navigation unnecessarily.
- Respect reduced-motion preferences.
- Never make the site unusable if an animation fails.
- Do not sacrifice performance for transition effects.

Page transitions and scroll-driven section transitions are different systems. Both should share a consistent visual language without interfering with one another.

---

# 11. IMAGE AND MEDIA DIRECTION

Use real visual assets wherever possible.

Prioritize:
- Existing Hero video.
- Existing landscape imagery.
- Existing silhouette image.
- Actual project screenshots.
- Actual application recordings.
- Genuine project visuals.

### Image treatment
- Cinematic crops.
- Strong contrast.
- Controlled image scaling.
- Layered compositions.
- Mask-based reveals.
- Subtle parallax.
- Scroll-controlled cropping and positioning.

Avoid random stock photographs.

Never replace real product screenshots with AI-generated fake interfaces.

Never imply that generated imagery is an actual personal photograph.

Use image placeholders only when assets are genuinely unavailable, and clearly identify them for later replacement.

---

# 12. RESPONSIVE DESIGN

Design for:
- Desktop.
- Laptop.
- Tablet.
- Mobile.

### Desktop

Use the full cinematic experience:
- Larger compositions.
- Layered parallax.
- Pinned sections.
- Horizontal movement.
- Scroll-controlled transformations.

### Tablet

Simplify overlapping layouts and reduce motion distances.

### Mobile

- Prioritize readability.
- Preserve visual hierarchy.
- Use natural scrolling.
- Simplify parallax.
- Avoid excessive pinning.
- Keep buttons accessible.
- Avoid horizontal overflow.
- Ensure images crop intentionally.
- Reduce expensive visual effects.
- Use alternative layouts when complex pinned interactions are unsuitable.

Do not simply shrink desktop layouts.

Each page must feel intentionally designed at smaller screen sizes.

The scroll-driven identity should remain, but the implementation can be simplified for mobile.

---

# 13. MOTION ENGINEERING REQUIREMENTS

Use GSAP and ScrollTrigger as the primary animation system.

Preferred techniques:
- `gsap.to()`
- `gsap.fromTo()`
- `gsap.timeline()`
- `scrub`
- `pin`
- `start` and `end`
- `onUpdate`
- `containerAnimation` when necessary
- Scroll-linked clip-path and transforms

### Technical requirements

- Use GSAP context for component-scoped animations.
- Clean up ScrollTriggers when components unmount.
- Refresh ScrollTrigger after relevant layout or media changes.
- Avoid duplicate triggers.
- Avoid unnecessary scroll listeners.
- Prevent layout shifts and content jumping.
- Prefer transforms and opacity for animation performance.
- Avoid expensive layout-changing animations where possible.
- Optimize video loading and playback.
- Avoid pinning every section.
- Test forward and reverse scrolling.
- Ensure animations remain synchronized with the actual scroll position.
- Respect `prefers-reduced-motion`.
- Provide functional fallbacks if animations fail.

Do not introduce Lenis simply because smooth scrolling is fashionable. Native scrolling should remain the foundation.

If Lenis is used, integrate it correctly with ScrollTrigger.

---

# 14. DESIGN CONSISTENCY RULES

The entire website must share:
- One typography system.
- One core color palette.
- One spacing philosophy.
- One navigation system.
- One visual identity.
- One coherent motion language.

However, every page should have its own personality.

**Home:** Identity and impact.  
**About:** Personal storytelling.  
**Projects:** Visual exploration.  
**Project Details:** Engineering depth.  
**Contact:** Simplicity and conversion.

Consistency should come from the design language, not repetitive layouts.

Do not make every page look identical.

---

# 15. STRICT DESIGN RESTRICTIONS

Avoid:
- Generic developer portfolio templates.
- SaaS landing-page aesthetics.
- Glassmorphism.
- Excessive gradients.
- Unnecessary glowing effects.
- Excessive rounded cards.
- Repetitive card grids.
- Skill percentage bars.
- Random floating decorative elements.
- Excessive icons.
- Unnecessary secondary labels and descriptions.
- Repetitive section introductions.
- Overly dense text.
- Fake project screenshots.
- Fake testimonials.
- Fake statistics.
- Fake client logos.
- Excessive animations without purpose.
- Scroll hijacking.
- Overly complicated navigation.
- Repeating the same pinned animation across every section.

Do not add visual elements just because the page looks empty.

Negative space is intentional.

Do not sacrifice usability to demonstrate animation techniques.

---

# 16. FINAL CREATIVE DIRECTION

The website should feel like a carefully art-directed digital experience.

It should combine:
- The atmosphere of a cinematic film.
- The clarity of an editorial publication.
- The precision of a well-engineered product.
- The personality of an independent developer.
- The creativity of an experimental interactive website.

It must look premium without relying on unnecessary visual decoration.

It must feel animated without becoming exhausting.

It must be minimal without becoming empty.

It must communicate technical ability without looking like a resume.

**Scrolling should feel like controlling the story.**

**The design should speak before the text does.**

**Let the layout, imagery, typography, and GSAP motion do the explaining.**