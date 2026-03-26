# About Page Sanity CMS Schema Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Sanity `aboutPage` document type and wire every About page section to CMS-managed content with hardcoded fallbacks.

**Architecture:** One new Sanity schema file (`aboutPage.ts`) with document-level fields for all page sections and an inline `teamMembers` array (max 4). `about.astro` fetches the document at build time and renders Sanity values with null-safe fallbacks matching current static content. No new utilities needed — uses existing `sanityClient` and `urlFor` patterns from `salon.astro`.

**Tech Stack:** Sanity (schema), Astro (SSG), GROQ (query), `@sanity/image-url` (photo URLs), TypeScript (interfaces)

---

## File Map

| Action | File | Responsibility |
|---|---|---|
| Create | `studio/schemaTypes/aboutPage.ts` | Full `aboutPage` document schema |
| Modify | `studio/schemaTypes/index.ts` | Register `aboutPage` |
| Modify | `src/pages/about.astro` | GROQ fetch + CMS-driven rendering |

---

## Task 1: Create `aboutPage` Sanity schema

**Files:**
- Create: `studio/schemaTypes/aboutPage.ts`

- [ ] **Step 1: Create the schema file**

```typescript
// studio/schemaTypes/aboutPage.ts
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    // Hero
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroSubtext',
      title: 'Hero Subtext',
      type: 'text',
      rows: 4,
    }),
    // Why section
    defineField({
      name: 'whyTitle',
      title: '"Why We Do This" Title',
      type: 'string',
    }),
    defineField({
      name: 'whyBody',
      title: '"Why We Do This" Body Paragraphs',
      description: 'Each item is one paragraph. Add up to 3.',
      type: 'array',
      of: [{type: 'text'}],
    }),
    // How section
    defineField({
      name: 'howTitle',
      title: '"How It Works" Title',
      type: 'string',
    }),
    defineField({
      name: 'howBody',
      title: '"How It Works" Body',
      type: 'text',
      rows: 4,
    }),
    // Team section
    defineField({
      name: 'teamTitle',
      title: 'Team Section Title',
      type: 'string',
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'teamMember',
          title: 'Team Member',
          fields: [
            defineField({
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (R) => R.required(),
            }),
            defineField({
              name: 'photo',
              title: 'Photo',
              type: 'image',
              options: {hotspot: true},
            }),
            defineField({
              name: 'bio',
              title: 'Bio',
              type: 'text',
              rows: 3,
            }),
          ],
          preview: {
            select: {title: 'name', subtitle: 'title', media: 'photo'},
          },
        },
      ],
      validation: (R) => R.max(4),
    }),
    // CTA section
    defineField({
      name: 'ctaHeadline',
      title: 'CTA Headline',
      type: 'string',
    }),
  ],
})
```

---

## Task 2: Register `aboutPage` in the schema index

**Files:**
- Modify: `studio/schemaTypes/index.ts`

- [ ] **Step 1: Add the import and registration**

Replace the entire file contents:

```typescript
// studio/schemaTypes/index.ts
import bakeryMenu from './bakeryMenu'
import plumberPage from './plumberPage'
import salonPage from './salonPage'
import aboutPage from './aboutPage'

export const schemaTypes = [bakeryMenu, plumberPage, salonPage, aboutPage]
```

- [ ] **Step 2: Commit**

```bash
git add studio/schemaTypes/aboutPage.ts studio/schemaTypes/index.ts
git commit -m "feat: add aboutPage Sanity schema"
```

---

## Task 3: Update `about.astro` — fetch from Sanity

**Files:**
- Modify: `src/pages/about.astro` (frontmatter only in this task)

- [ ] **Step 1: Verify build passes before touching the template**

```bash
npm run build
```

Expected: build succeeds with no errors. If it fails, stop and resolve before proceeding.

- [ ] **Step 2: Replace the frontmatter**

Replace lines 1–4 (the existing `---` block) in `src/pages/about.astro`:

```typescript
---
import BaseLayout from '../layouts/BaseLayout.astro';
import '../styles/hub.css';
import { sanityClient } from '../lib/sanityClient';
import { urlFor } from '../lib/imageUrl';

interface TeamMember {
  name: string;
  title: string;
  photo?: object;
  bio?: string;
}

interface AboutPageData {
  heroHeadline?: string;
  heroSubtext?: string;
  whyTitle?: string;
  whyBody?: string[];
  howTitle?: string;
  howBody?: string;
  teamTitle?: string;
  teamMembers?: TeamMember[];
  ctaHeadline?: string;
}

const aboutData = await sanityClient.fetch<AboutPageData | null>(
  `*[_type == "aboutPage"][0] {
    heroHeadline,
    heroSubtext,
    whyTitle,
    whyBody,
    howTitle,
    howBody,
    teamTitle,
    teamMembers[] {
      name,
      title,
      photo,
      bio
    },
    ctaHeadline
  }`
);

const heroHeadline = aboutData?.heroHeadline;
const heroSubtext = aboutData?.heroSubtext ?? "The Web Foundry is a volunteer initiative based in Cincinnati. We use AI-powered development to completely rebuild outdated local business websites — for free. No strings attached, no ongoing fees. Just a better web for the businesses that make our neighborhoods special.";
const whyTitle = aboutData?.whyTitle ?? "Why we do this";
const whyBody = aboutData?.whyBody ?? [
  "Small businesses are the backbone of every community. They sponsor little league teams, know your name when you walk in, and make neighborhoods feel like home. But too often, their online presence doesn't reflect who they are — it's a website from 2009 that barely works on a phone.",
  "Meanwhile, technology has moved fast. AI tools now let us build in hours what used to take weeks. We think that speed should benefit the people who need it most — not just the ones who can afford a $15,000 redesign.",
];
const howTitle = aboutData?.howTitle ?? "How it works";
const howBody = aboutData?.howBody;
const teamTitle = aboutData?.teamTitle ?? "The Team";
const teamMembers = aboutData?.teamMembers ?? [
  { name: "Dreux Bontempo", title: "Co-Founder", photo: undefined, bio: "Cincinnati-based technologist passionate about putting modern tools to work for the community." },
  { name: "Partner Name", title: "Co-Founder", photo: undefined, bio: "Bio coming soon." },
];
const ctaHeadline = aboutData?.ctaHeadline ?? "Know a business that deserves better?";
---
```

---

## Task 4: Update `about.astro` — replace hardcoded HTML with CMS values

**Files:**
- Modify: `src/pages/about.astro` (template section)

- [ ] **Step 1: Replace the hero section content**

Find the `<section class="about-hero">` block. Replace the inner content of `about-hero__inner`:

```astro
<div class="about-hero__inner reveal">
  <span class="section-tag">About Us</span>
  <h1 class="about-hero__title">
    {heroHeadline ?? <>We build websites<br/>for the people<br/><em>who build communities.</em></>}
  </h1>
  <p class="about-hero__sub">{heroSubtext}</p>
</div>
```

Note: when `heroHeadline` is set via Sanity it renders as plain text (no `<em>`). The styled fallback with italic gold emphasis only shows when no Sanity content exists. This is the expected behavior.

- [ ] **Step 2: Replace the "Why we do this" section content**

Find the `<section class="about-why">` block. Replace the inner div:

```astro
<div class="reveal">
  <h2 class="about-why__title">{whyTitle}</h2>
  {whyBody.map((para) => (
    <p class="about-why__text">{para}</p>
  ))}
</div>
```

- [ ] **Step 3: Replace the "How it works" section content**

Find the `<section class="about-how">` block. Replace the inner div:

```astro
<div class="about-how__inner reveal">
  <h2 class="about-how__title">{howTitle}</h2>
  <p class="about-how__text">
    {howBody ?? <>We call it <strong>AI vibe coding</strong> — using modern AI development tools to rapidly prototype, iterate, and ship polished websites. We volunteer our time, pair with business owners to capture their vision, and deliver a site that actually represents what they do. Every site is custom. Every site is free.</>}
  </p>
</div>
```

- [ ] **Step 4: Replace the team section content**

Find the `<section class="about-team">` block. Replace it:

```astro
<section class="about-team">
  <div class="container">
    <div class="about-team__inner">
      <h2 class="about-team__title reveal">{teamTitle}</h2>
      <div class="about-team__grid">
        {teamMembers.map((member, i) => (
          <div class={`team-card reveal reveal-delay-${i + 1}`}>
            {member.photo
              ? <img class="team-card__photo" src={urlFor(member.photo).width(240).height(240).fit('crop').url()} alt={member.name} />
              : <div class="team-card__photo-placeholder" aria-label={`${member.name} photo placeholder`}></div>
            }
            <h3 class="team-card__name">{member.name}</h3>
            <p class="team-card__role">{member.title}</p>
            <p class="team-card__bio">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Replace the CTA section headline**

Find `<h2 class="about-cta__title">`. Replace the line:

```astro
<h2 class="about-cta__title">{ctaHeadline}</h2>
```

---

## Task 5: Add `.team-card__photo` CSS and verify build

**Files:**
- Modify: `src/pages/about.astro` (style block)

- [ ] **Step 1: Add photo image style**

In the `<style is:global>` block, after the `.team-card__photo-placeholder` rule, add:

```css
.team-card__photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 2px solid var(--border);
  margin: 0 auto 1.2rem;
  display: block;
  object-fit: cover;
}
```

- [ ] **Step 2: Run the build**

```bash
npm run build
```

Expected: build succeeds with no TypeScript errors. If you see a type error on `urlFor(member.photo)`, cast the photo: `urlFor(member.photo as object)`.

- [ ] **Step 3: Verify in dev server**

```bash
npm run dev
```

Navigate to `http://localhost:4321/about`. Confirm:
- All section text renders (fallback content visible since Sanity doc not yet created)
- Photo placeholders show for both team cards
- No console errors

- [ ] **Step 4: Commit**

```bash
git add src/pages/about.astro
git commit -m "feat: wire about.astro to Sanity aboutPage CMS content"
```

---

## Task 6: Seed initial content in Sanity Studio

- [ ] **Step 1: Open Sanity Studio**

Navigate to `http://localhost:3333` (or the deployed Studio at `cincinnati-web-foundry.sanity.studio`).

- [ ] **Step 2: Create the `aboutPage` document**

In the Studio sidebar, find "About Page" under the document list. Click "Create new". You should see all fields from the schema: Hero Headline, Hero Subtext, Why section, How section, Team Members, CTA Headline.

- [ ] **Step 3: Add one team member to verify the photo upload flow**

Under Team Members, click "Add item". Fill in Name and Title. Upload a photo. Save and publish.

- [ ] **Step 4: Trigger a rebuild and verify**

```bash
npm run build && npm run preview
```

Navigate to `http://localhost:4321/about`. Confirm the team member photo renders as a circular image, not the placeholder div.
