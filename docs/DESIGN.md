# RELIZ — Spécification design

> Référence visuelle et UX. Alignée sur [Web Interface Guidelines](https://github.com/vercel-labs/web-interface-guidelines) (Vercel).

## Direction artistique

### Ambiance

Site **editorial luxury** : espaces généreux, typographie expressive, images plein écran, transitions fluides. Sensation de **lenteur maîtrisée** — chaque scroll révèle une couche de l’expérience RELIZ.

Inspirations conceptuelles (non littérales) : maisons d’hospitalité premium, magazines culinaires, galeries d’art, soirées privées.

### Palette proposée (à valider avec assets marque)

| Rôle | Valeur | Usage |
|------|--------|-------|
| **Fond principal** | `#0F0E0D` (noir chaud) | Hero, sections immersives |
| **Fond secondaire** | `#F7F4EF` (crème) | Sections contenu, respiration |
| **Accent or** | `#C4A962` | CTA, détails, séparateurs |
| **Accent terre** | `#8B7355` | BROOKLYN, touches chaleureuses |
| **Texte clair** | `#FAFAF8` | Sur fond sombre |
| **Texte foncé** | `#1A1816` | Sur fond clair |

> Si logo / charte existants : la palette s’adapte en priorité.

### Typographie proposée

| Rôle | Police | Caractère |
|------|--------|-----------|
| **Display / titres** | Cormorant Garamond ou Playfair Display | Élégance, éditorial |
| **Corps** | Inter ou DM Sans | Lisibilité, modernité |
| **Accent / labels** | tracking élargi, uppercase discret | Premium, hospitality |

### Motion & interactions

- Animations **input-driven** (scroll, hover) — pas d’autoplay agressif
- **`prefers-reduced-motion`** respecté systématiquement
- Propriétés GPU : `transform`, `opacity` uniquement
- Révélations progressives au scroll (Intersection Observer / CSS)
- Transitions 400–800 ms, easing `cubic-bezier(0.22, 1, 0.36, 1)`

### Principes UX (Vercel Guidelines)

- Navigation clavier complète, focus visible
- Liens `<Link>` pour toute navigation
- Images avec dimensions explicites (pas de CLS)
- Formulaires accessibles (labels, erreurs inline)
- `theme-color` aligné sur fond
- Skip link « Aller au contenu »
- Textes typographiques : guillemets courbes « »

## Architecture des pages

```
/                     → Accueil (vision globale RELIZ)
/experiences          → Offre événementielle 360°
/innovation           → Solution digitale QR
/brooklyn             → Street food internationale
/collection           → Voitures de mariage
/familles             → Repas maison
/a-propos             → Elize Rapisarda & histoire
/contact              → Formulaire + coordonnées
```

### Accueil — sections

1. **Hero immersif** — tagline, vidéo/image plein écran, CTA « Créer votre expérience »
2. **Manifeste** — « De l’idée à l’événement » en un seul interlocuteur
3. **Piliers** — 5–6 cartes (gastronomie, service, décoration, coordination, innovation)
4. **Univers RELIZ** — navigation vers BROOKLYN, Collection, Familles
5. **Partenaires** — Zandbergen, Festin
6. **Fondatrice** — portrait + parcours condensé
7. **CTA contact**

### Ton éditorial

- Voix : **nous** (RELIZ) ou **vous** (client) — chaleureux, assuré, jamais corporate
- Phrases courtes, impact émotionnel
- Éviter le jargon technique en surface (QR = « expérience digitale fluide »)

## Stack technique proposée

| Couche | Choix | Raison |
|--------|-------|--------|
| Framework | **Next.js 15** (App Router) | SEO, performance, i18n future |
| Styling | **Tailwind CSS 4** | Design system rapide |
| Animations | **CSS + Framer Motion** (ciblé) | Fluidité premium |
| Fonts | **next/font** | Performance, pas de CLS |
| Déploiement | **Vercel** | Edge, preview branches |
| i18n | **next-intl** (phase 2) | Clientèle LU/FR/DE/EN |

## États à designer

Chaque page : empty, loading (skeleton), error, contenu dense.

## Checklist qualité (pre-launch)

- [ ] Lighthouse Performance ≥ 90
- [ ] Accessibilité WCAG 2.1 AA
- [ ] Mobile-first (44px touch targets)
- [ ] Meta OG + favicon
- [ ] `prefers-reduced-motion`
- [ ] Formulaire contact fonctionnel
