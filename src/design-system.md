# Design System - UniFlow Web

Règles de style pour une cohérence visuelle avec la marque UniFlow.

## Couleurs (Tailwind v4)

Définies dans `src/index.css` :

- `--color-primary`: `#1e3a8a` (Royal Blue)
- `--color-primary-light`: `#2563eb`
- `--color-primary-dark`: `#1e3a8a`
- `--color-teal`: `#0d9488` (Teal)
- `--color-teal-light`: `#14b8a6`
- `--color-teal-dark`: `#0f766e`
- `--color-bg`: `#f3f4f6` (Gray-100)
- `--color-surface`: `#ffffff` (White)
- `--color-text`: `#111827` (Gray-900)
- `--color-muted`: `#6b7280` (Gray-500)
- `--color-border`: `#e5e7eb` (Gray-200)

## Composants UI

### Button

- `primary`: `bg-primary text-white hover:bg-primary-light shadow-sm`
- `secondary`: `bg-teal text-white hover:bg-teal-light shadow-sm`
- `outline`: `border border-border bg-surface text-gray-700 hover:bg-bg`
- `ghost`: `text-primary hover:bg-primary/10`
- `danger`: `bg-red-600 text-white hover:bg-red-700`

### Cards

- Standard: `bg-surface rounded-xl border border-border p-6 shadow-sm`

### Badges

- `primary`: `bg-primary/10 text-primary`
- `success`: `bg-emerald-100 text-emerald-700`
- `warning`: `bg-orange-100 text-orange-700`
- `danger`: `bg-red-100 text-red-700`
- `info`: `bg-blue-100 text-blue-700`
- `neutral`: `bg-gray-100 text-gray-700`

### Input

- `border border-border bg-surface rounded-lg focus:border-primary focus:ring-1 focus:ring-primary`

## Règles de mise en page

- **Spacing**: `space-y-6` pour les conteneurs de pages.
- **Radius**: `rounded-xl` pour les conteneurs principaux, `rounded-lg` pour les éléments interactifs.
- **Typography**: Inter (default).
- **PageHeader**: titre + description optionnelle + actions à droite.
