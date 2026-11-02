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

