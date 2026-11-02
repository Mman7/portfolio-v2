Senior Creative Developer — Project Architecture Prompt

Act as a Senior Creative Developer and Creative Technologist specializing in high-end interactive websites, Awwwards-level digital experiences, WebGL, Three.js, GSAP, and modern frontend architecture.

Your task is to design and implement a scalable, production-ready website architecture using:

1\. Technology Stack

Next.js (App Router)

React

TypeScript

Three.js

React Three Fiber

@react-three/drei

GSAP

@gsap/react

GSAP ScrollTrigger

GSAP SplitText

Lenis (Smooth Scrolling)

Zustand (Global State Management)

CSS / SCSS

Use modern Next.js conventions and strict TypeScript.

2\. Project Architecture

Create a scalable Feature-based + Layer-based folder architecture.

Organize the project into the following main directories:

app/ — Next.js routing, layouts, pages, metadata and SEO.

components/ — Reusable UI components, layout components and shared elements.

features/ — Page-specific features, sections, animations, hooks and data.

three/ — Three.js scenes, 3D components, models, cameras, materials, shaders and utilities.

animations/ — Global GSAP configuration, reusable animations, transitions and animation utilities.

hooks/ — Reusable React hooks.

providers/ — Global providers such as SmoothScrollProvider and AnimationProvider.

lib/ — Shared utilities and constants.

types/ — Global TypeScript definitions.

public/ — 3D models, textures, images, videos, fonts and icons.

Each page should have its own feature directory.

Example:

features/home/

components/

animations/

hooks/

data/

types.ts

Keep page-specific animations inside their respective feature directories.

3\. GSAP Animation Architecture

Build a centralized GSAP animation system.

Requirements:

Create a centralized GSAP configuration.

Register GSAP plugins in one place.

Use @gsap/react and useGSAP for React integration.

Create reusable animation functions.

Separate global animations from page-specific animations.

Implement reusable text animations.

Implement ScrollTrigger animations.

Implement page transitions.

Implement responsive animations using gsap.matchMedia().

Ensure all animations are properly cleaned up when components unmount.

Avoid unnecessary duplicate ScrollTriggers.

Use scoped selectors to prevent animation conflicts.

Suggested structure:

animations/

gsap.config.ts

scroll-trigger.ts

text-animation.ts

page-transition.ts

common-animation.ts

utils.ts

4\. Three.js Architecture

Use React Three Fiber as the primary React integration for Three.js.

Requirements:

Separate each 3D scene into its own directory.

Separate models, lights, cameras and environments.

Organize reusable 3D components.

Separate materials and shaders.

Support GLTF / GLB models.

Use Drei for reusable 3D helpers.

Support post-processing effects.

Implement responsive 3D scenes.

Optimize rendering performance.

Implement proper resource disposal.

Keep Three.js components modular and reusable.

Suggested structure:

three/

scenes/

components/

hooks/

materials/

shaders/

utils/

types.ts

Each scene should have its own components and index file.

5\. GSAP + Three.js Integration

This is a critical requirement.

Create a clean integration between GSAP and Three.js.

Responsibilities:

Three.js manages Scene, Camera, Mesh, Geometry, Material and rendering.

GSAP controls animation timelines and object properties.

ScrollTrigger controls scroll-driven animations.

React manages component lifecycle.

Lenis manages smooth scrolling.

Support:

Scroll-driven 3D rotation.

Camera movement.

Object position and scale animations.

Timeline-based scene transitions.

Scroll-based model transformations.

Interactive mouse movement.

Responsive animation behavior.

Avoid tightly coupling Three.js rendering logic with GSAP animation logic.

Create reusable animation controllers where appropriate.

Ensure animation instances and ScrollTriggers are properly cleaned up.

6\. Next.js Architecture

Use Next.js App Router.

Requirements:

Keep page.tsx clean and focused on composing sections.

Use Server Components by default.

Use Client Components only when browser APIs, WebGL, GSAP or interactive state are required.

Load Three.js scenes on the client when necessary using dynamic imports.

Implement reusable layouts.

Configure metadata and SEO.

Organize dynamic routes properly.

Avoid unnecessary client-side rendering across the entire application.

7\. Smooth Scrolling

Integrate Lenis with GSAP ScrollTrigger.

Requirements:

Create a reusable SmoothScrollProvider.

Synchronize Lenis scroll updates with ScrollTrigger.

Avoid conflicting scroll systems.

Ensure proper cleanup.

Support reduced-motion preferences.

Keep the integration compatible with Next.js App Router navigation.

8\. Code Quality

Follow these standards:

Strict TypeScript.

Strong typing for components, hooks and animation functions.

Reusable and modular components.

Consistent naming conventions.

Avoid unnecessary abstractions.

Avoid giant components.

Avoid putting all animations in one file.

Avoid putting all Three.js logic inside page components.

Use clear import aliases such as @/.

Follow Next.js and React best practices.

Ensure maintainability and scalability.

9\. Performance Optimization

Optimize the website for production.

Consider:

Lazy loading 3D scenes.

Dynamic imports.

GLTF / GLB optimization.

Texture optimization.

Proper disposal of Three.js resources.

Limiting unnecessary React re-renders.

Responsive rendering resolution and DPR.

Efficient GSAP timelines.

Avoiding excessive ScrollTriggers.

GPU performance.

Mobile performance.

Accessibility and reduced motion.

10\. Expected Deliverables

First, generate the complete project folder structure.

Then:

Explain the responsibility of every major directory.

Identify which files should be Server Components and Client Components.

Set up the centralized GSAP configuration.

Set up the Three.js architecture.

Implement the Lenis + ScrollTrigger integration.

Demonstrate GSAP controlling a Three.js object.

Demonstrate a reusable page-specific animation.

Provide TypeScript types and reusable hooks.

Configure Next.js imports and aliases.

Provide installation commands and dependencies.

11\. Development Rules

IMPORTANT:

Do not put everything into one component.

Do not mix unrelated responsibilities.

Do not duplicate GSAP configurations.

Do not create unnecessary abstractions.

Keep each feature self-contained.

Keep shared systems reusable.

Use clean and readable code.

Ensure all examples are compatible with the selected library versions.

Do not invent unsupported APIs.

Explain architectural decisions when necessary.

Before implementing anything, inspect the existing project structure and package.json.

If the project already exists, preserve its working configuration and adapt the architecture instead of unnecessarily rebuilding everything.

Build this as a professional, scalable creative development foundation suitable for an Awwwards-level 3D interactive website.

## 12. Styling Architecture — Tailwind CSS + CSS Modules

Use **Tailwind CSS as the primary styling system**, supported by CSS Modules and global CSS for advanced visual effects and shared design foundations.

The styling architecture must support high-end creative websites, cinematic layouts, complex scroll-driven experiences, responsive interfaces, and Three.js scenes.

### 12.1 Styling Strategy

Use each styling technology for a clearly defined responsibility.

**Tailwind CSS — Primary Styling**

Use Tailwind CSS for:

- Flexbox and Grid layouts.
- Responsive layouts and breakpoints.
- Spacing, padding and margins.
- Width, height and positioning.
- Basic typography and text alignment.
- Standard backgrounds, borders and colors.
- Common UI states and hover effects.
- Utility-level transitions.
- Accessible focus states.
- Rapid prototyping and layout iteration.

Avoid excessively long or unreadable class strings. Extract repeated UI patterns into reusable React components when appropriate.

**CSS Modules — Advanced Component Styling**

Use CSS Modules for complex, component-specific styling that becomes difficult to maintain with utility classes.

Examples include:

- Complex pseudo-elements and layered compositions.
- Advanced `clip-path` and CSS masking.
- Image reveal effects.
- Custom cursor visuals.
- Complex hover interactions.
- Decorative elements and visual overlays.
- Complex blend modes.
- Component-specific keyframe animations.
- Intricate responsive visual compositions.

Use `.module.css` by default. Introduce `.module.scss` only when Sass features such as nesting or mixins provide a clear benefit.

Do not create a CSS Module for every component unnecessarily.

**Global CSS — Design System Foundation**

Use global CSS only for styles that genuinely apply across the application.

Responsibilities include:

- CSS reset and base styles.
- Font-face declarations when necessary.
- Global typography defaults.
- CSS custom properties and design tokens.
- Shared background and foreground colors.
- Selection styles.
- Global accessibility styles.
- Base document and scrolling behavior.
- Shared utility classes that cannot be expressed cleanly through Tailwind.

Keep global CSS small and intentional.

**GSAP — Animation Behavior**

Use GSAP to control animation behavior rather than duplicating styling responsibilities.

Examples include:

- Scroll-driven transforms.
- Timeline-based transitions.
- Image and text reveals.
- Pinning and parallax.
- Animated clip-path values.
- Scroll-linked 3D object transformations.

Use Tailwind and CSS Modules to establish the initial visual state. Use GSAP to animate the relevant properties when appropriate.

Avoid having Tailwind classes, CSS transitions and GSAP simultaneously control the same animated property.

**Three.js — 3D Visual Styling**

Use Three.js materials, lighting, shaders and post-processing for 3D rendering.

Do not attempt to reproduce 3D material effects using ordinary DOM CSS.

Keep DOM styling and 3D rendering responsibilities separate, while allowing them to share design tokens when appropriate.

### 12.2 Styling Folder Architecture

Organize global styles, design tokens and component-specific styles as follows:

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── ui/
│   │   ├── Button.tsx
│   │   └── Button.module.css
│   │
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Header.module.css
│   │
│   └── sections/
│
├── features/
│   └── home/
│       ├── components/
│       │   └── Hero.tsx
│       │
│       ├── styles/
│       │   └── hero.module.css
│       │
│       ├── animations/
│       ├── hooks/
│       └── data/
│
├── styles/
│   ├── tokens.css
│   ├── typography.css
│   └── utilities.css
│
└── ...
```

The `styles/` directory contains shared styling foundations.

Page-specific styles should remain inside their respective feature directories whenever practical.

Reusable component styles should live beside their components.

Do not create a large central stylesheet containing unrelated page styles.

### 12.3 Design Tokens

Define shared design tokens using CSS custom properties.

Example:

```css
/* src/styles/tokens.css */

:root {
  color-scheme: dark;

  --color-background: #080808;
  --color-surface: #111111;
  --color-foreground: #f5f5f5;
  --color-muted: #929292;
  --color-border: rgba(255, 255, 255, 0.14);

  --font-display: "Space Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "DM Mono", monospace;

  --container-width: 1440px;
  --page-gutter: clamp(1.25rem, 4vw, 4rem);

  --section-spacing: clamp(6rem, 12vw, 12rem);

  --z-content: 1;
  --z-navigation: 100;
  --z-overlay: 200;
  --z-transition: 300;
}
```

Import the shared token stylesheet through the global stylesheet.

```css
/* src/app/globals.css */

@import "../styles/tokens.css";
@import "../styles/typography.css";

@import "tailwindcss";

* {
  box-sizing: border-box;
}

html,
body {
  min-height: 100%;
}

body {
  margin: 0;
  background: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-body);
}

::selection {
  background: var(--color-foreground);
  color: var(--color-background);
}
```

This example assumes Tailwind CSS v4. For Tailwind CSS v3, use its appropriate configuration and directive syntax instead. Do not mix v3 and v4 configuration patterns.

Import global CSS only once through the root layout.

### 12.4 Styling Conventions

Follow these conventions consistently:

1. Use Tailwind for straightforward layout and responsive utilities.
2. Use CSS Modules for complex component-specific visual styling.
3. Use CSS custom properties for shared design tokens.
4. Use semantic HTML before reaching for custom CSS.
5. Use reusable React components for repeated interface patterns.
6. Avoid duplicating the same styles across multiple components.
7. Avoid excessive arbitrary Tailwind values when a reusable token is more appropriate.
8. Avoid using inline styles for static visual styling.
9. Use inline styles or GSAP when dynamic values genuinely need to be calculated at runtime.
10. Avoid `!important` unless there is a documented reason.
11. Keep responsive behavior consistent across Tailwind breakpoints and CSS Modules.
12. Respect `prefers-reduced-motion` and provide accessible alternatives for motion-heavy interactions.
13. Avoid using CSS transitions on properties that GSAP actively controls.
14. Keep visual effects performant, especially when animating large images, masks, filters or full-screen layers.

### 12.5 GSAP and CSS Integration

Establish clear ownership of animated properties.

For example:

- Tailwind establishes the initial layout and positioning.
- CSS Modules define the component's visual appearance.
- GSAP controls the animation timeline and animated properties.
- ScrollTrigger connects the animation to scroll progress.

Do not use CSS transitions to animate the same transform that GSAP is controlling.

Use scoped GSAP selectors and `useGSAP()` to manage animation lifecycles and cleanup.

Avoid relying on React state updates for every animation frame when GSAP can animate a DOM element directly.

For animated elements, ensure the initial CSS state does not leave content permanently invisible if JavaScript fails or reduced motion is enabled.

### 12.6 Styling Quality Requirements

The final website should have a coherent visual language rather than a collection of unrelated effects.

Prioritize:

- Strong typography.
- Intentional spacing.
- Clear visual hierarchy.
- Editorial composition.
- Consistent design tokens.
- Responsive layouts.
- Subtle and purposeful details.
- Smooth integration between DOM elements and 3D scenes.

Do not add visual effects merely because CSS or WebGL makes them possible.

Every styling decision should support the content, interaction or visual narrative.
