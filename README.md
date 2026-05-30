# Reliz — Site web

Site vitrine premium pour la marque Reliz (événementiel, hospitalité, gastronomie).

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) — redirection automatique vers `/fr`.

## Pages

| Route | Description |
|-------|-------------|
| `/fr` ou `/en` | Accueil |
| `/fr/experiences` | Toutes les expériences (Reliz, Brooklyn, Collection, Familles, Innovation) |
| `/fr/contact` | Formulaire de contact |

## Langues

Français (par défaut) et anglais — bascule via le sélecteur FR/EN dans le header.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS 4
- next-intl

## Contact API

Le formulaire envoie vers `/api/contact`. Pour l’instant, les messages sont loggés en console. Brancher un service e-mail (Resend, etc.) en production.
