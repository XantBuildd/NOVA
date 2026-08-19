# NØVA — Creative Digital Studio

<p align="center">
  <strong>A digital experience built around motion, interaction and visual storytelling.</strong>
</p>

<p align="center">
  NØVA is a creative studio website focused on experimental UI, immersive animations and interactive experiences.
</p>

---

## ✦ Overview

NØVA is a creative digital studio experience designed to explore the intersection between:

- UI/UX
- Creative development
- Motion design
- Interactive experiences
- Canvas rendering
- Generative visuals
- Responsive design

The project was built with the goal of creating a website that feels alive rather than static.

Instead of relying only on traditional CSS animations, NØVA combines React, Next.js, Framer Motion and a custom Canvas rendering engine to create an interactive visual identity.

The Hero section, in particular, uses a custom particle/constellation system that reacts to the user's pointer and creates an organic spatial composition.

---

# ✦ Design Philosophy

NØVA follows a simple principle:

> The interface should feel like an experience, not just a collection of components.

The visual language is based around:

- Deep dark backgrounds
- Purple atmospheric lighting
- Soft glows
- Large typography
- Spatial compositions
- Motion
- Parallax
- Depth
- Interactive elements
- Generative particles

The interface intentionally avoids excessive visual noise.

Motion and interaction are used to reinforce hierarchy rather than distract from the content.

---

# ✦ Tech Stack

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Framer Motion

## Graphics

- HTML Canvas API
- Custom particle engine
- Custom physics system
- Procedural constellation generation

## Icons

- Lucide React
- React Icons

---

# ✦ Main Technologies

### Next.js

Used as the main application framework.

Responsibilities include:

- Application structure
- Routing
- Production builds
- Optimization
- Static rendering
- Deployment

---

### React

Used to build the interface through reusable components.

The UI is separated into independent sections and interactive components.

---

### TypeScript

The Canvas engine is written in TypeScript to maintain strong typing across:

- Particles
- Physics
- Rendering
- Connections
- Mouse interaction
- Shape generation

This is particularly useful for the custom animation engine because many objects interact with each other.

---

### Framer Motion

Framer Motion is used for UI-level animations such as:

- Entrance animations
- Hover interactions
- Scroll animations
- Transitions
- Navigation animations
- Parallax effects

The Canvas engine is intentionally separated from Framer Motion because particle rendering is handled directly through Canvas.

---

# ✦ Architecture

The project separates the visual engine from the React UI.

```text
React / Next.js
      │
      ├── UI Components
      │
      ├── Framer Motion
      │
      └── Canvas
            │
            └── Engine
                  │
                  ├── ParticleSystem
                  │      │
                  │      ├── Particle
                  │      ├── Physics
                  │      ├── ShapeGenerator
                  │      └── ConnectionSystem
                  │
                  ├── Renderer
                  │
                  └── Cursor
