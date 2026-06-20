# Guide d'administration — Portfolio Catherine St-Germain

> **Site :** https://catherinesaintgermain.ca  
> **Admin :** https://catherinesaintgermain.ca/#admin  
> **Mot de passe :** `catherineadmin2026`

---

## Table des matières

1. [Accéder au panneau d'administration](#1-accéder-au-panneau-dadministration)
2. [Aperçu du tableau de bord](#2-aperçu-du-tableau-de-bord)
3. [Modifier le contenu — section par section](#3-modifier-le-contenu--section-par-section)
4. [Héberger des images (solution externe)](#4-héberger-des-images-solution-externe)
5. [Publier les changements en direct](#5-publier-les-changements-en-direct)
6. [Que faire et ne pas faire](#6-que-faire-et-ne-pas-faire)
7. [Dépannage](#7-dépannage)

---

## 1. Accéder au panneau d'administration

1. Ouvrez https://catherinesaintgermain.ca/#admin dans votre navigateur
2. Entrez le mot de passe : **catherineadmin2026**
3. Cliquez sur **Accéder à l'administration**

---

## 2. Aperçu du tableau de bord

Le panneau est divisé en trois zones :

```
┌─────────────────────────────────────────────────┐
│  SIDEBAR (menu gauche)      │   ÉDITEUR         │
│                             │                   │
│  ● Hero                     │   [contenu de     │
│  ● À Propos                 │    la section     │
│  ● CV & Compétences         │    sélectionnée]  │
│  ● Vidéo Démo               │                   │
│  ● Galerie                  │                   │
│  ● Contact                  │                   │
│  ● Navigation               │                   │
│  ● Pied de page             │                   │
│  ● Images & Fichiers        │                   │
│                             │                   │
├─────────────────────────────┴───────────────────┤
│  BARRE DU BAS                                   │
│  [Sauvegarder l'aperçu] [Réinitialiser]         │
│  [Publier en direct]                            │
└─────────────────────────────────────────────────┘
```

- **Sidebar** : cliquez sur une section pour l'éditer
- **Éditeur** : modifiez les champs de la section sélectionnée
- **Barre du bas** : sauvegarder un aperçu, réinitialiser, ou publier

---

## 3. Modifier le contenu — section par section

### Hero (page d'accueil)

Ce que vous pouvez modifier :
| Champ | Description | Exemple |
|-------|-------------|---------|
| Salutation | Petit texte d'intro | `Portfolio Artistique` |
| Prénom | Votre prénom | `Catherine` |
| Nom | Votre nom | `St-Germain` |
| Tagline | Phase sous le nom | `Actrice • Créatrice • Performeuse` |
| Bouton CV | Texte du bouton CV | `Télécharger CV` |
| Bouton Expérience | Texte du lien vers la section expérience | `Voir l'expérience` |
| Bouton Démo | Texte du lien vers la vidéo démo | `Démo Jeu` |

---

### À Propos

Ce que vous pouvez modifier :
| Champ | Description | Exemple |
|-------|-------------|---------|
| Étiquette de section | Texte au-dessus du titre | `À Propos` |
| Début du titre | Première partie du titre | `Une approche` |
| Mot accentué | Mot en couleur (italique) | `organique` |
| Fin du titre | Fin du titre | `de la création.` |
| Citation | Phrase citation sur la photo | `Artiste non UDA` |
| Biographie | Texte de présentation (retours à la ligne possibles) | Texte libre |
| Statistiques | Taille, Cheveux, Yeux, Poids + leurs étiquettes | `5' 3"` / `Taille` |

> **Rendu du titre :** *Une approche **organique** de la création.*

---

### CV & Compétences

Ce que vous pouvez modifier :

**Crédits (expériences)**
Ajoutez, modifiez ou supprimez chaque expérience :
- Titre, Rôle, Directeur, Année, Compagnie, Type (Film / Théâtre / Formation)

**Compétences**
- Une **catégorie** par ligne (ex : Jeu, Création, Sports, Qualités)
- Chaque ligne devient un élément dans la liste
- Appuyez sur **Entrée** pour ajouter une nouvelle compétence
- Laissez une ligne vide pour supprimer une compétence

> ⚠️ Les lignes vides apparaîtront vides sur le site — effacez-les complètement pour les retirer.

---

### Vidéo Démo

Ce que vous pouvez modifier :
| Champ | Description | Exemple |
|-------|-------------|---------|
| Étiquette de section | Texte au-dessus du titre | `Démo` |
| Titre | Titre de la section | `Extrait Vidéo` |
| Superposition | Texte superposé sur la vignette | `Démo Jeu` |
| ID Vidéo YouTube | L'ID après `v=` dans l'URL YouTube | `I7bIiB_sSSA` |

> **Comment trouver l'ID YouTube :** Dans l'URL `https://www.youtube.com/watch?v=I7bIiB_sSSA`, l'ID est `I7bIiB_sSSA`.

---

### Galerie

Ce que vous pouvez modifier :
| Champ | Description |
|-------|-------------|
| Étiquette de section | Texte au-dessus du titre |
| Titre | Titre de la section |
| Texte "Voir" | Texte au survol des images |
| URLs des images | **Une URL d'image par ligne** |

> ⚠️ **Important :** Vous ne pouvez pas uploader d'images directement. Vous devez d'abord héberger vos images sur un service externe (voir section 4), puis copier-coller l'URL obtenue ici.

---

### Contact

Ce que vous pouvez modifier :
| Champ | Description |
|-------|-------------|
| Étiquette de section | Texte au-dessus du titre |
| Titre | Phrase d'accroche |
| Texte d'invite | Petit texte au-dessus de l'email |
| Email | Votre adresse courriel |
| URI formulaire | Ne pas modifier (sauf si vous changez de service) |
| Sujet email | Objet des messages reçus |
| Téléphone / Localisation | Coordonnées affichées |
| Étiquettes | Texte au-dessus de chaque info |
| Formulaire | Textes des champs (Nom, Email, Message, bouton) |
| **Réseaux Sociaux** | URLs Instagram, YouTube, Facebook, TikTok |

> **Réseaux sociaux :** Laissez un champ vide pour ne pas afficher l'icône correspondante.
> Exemple : si vous n'avez pas TikTok, laissez le champ vide → l'icône n'apparaît pas.

---

### Navigation

Ce que vous pouvez modifier :
- **Nom** des liens dans le menu (ex : `À Propos`, `Expérience`, `Démo`, `Portfolio`, `Contact`)
- **Section cible** (lecture seule) — ne peut pas être modifiée

> ⚠️ Vous ne pouvez changer que le **nom** affiché dans le menu. La section de destination est verrouillée pour éviter de casser la navigation.

---

### Pied de page

Ce que vous pouvez modifier :
- Texte de copyright
- Liens légaux (Politique de Confidentialité, Termes et Conditions) — nom affiché et contenu HTML

---

### Images & Fichiers

Ce que vous pouvez modifier :
| Champ | Description |
|-------|-------------|
| Portrait | URL de votre photo principale |
| CV (PDF) | URL de votre CV en PDF |

> ⚠️ Comme pour la galerie, vous devez héberger ces fichiers sur un service externe et copier l'URL.

---

## 4. Héberger des images (solution externe)

Puisque vous n'avez pas accès au code du site, vous devez utiliser un service gratuit pour héberger vos images. Voici la méthode la plus simple :

### Option recommandée : **Imgur** (https://imgur.com)

1. Allez sur https://imgur.com
2. Cliquez sur **New post** (ou glissez-déposez votre image)
3. Une fois l'image uploadée, faites un clic droit dessus → **Copier l'adresse de l'image**
4. Vous obtenez une URL qui finit par `.jpg`, `.png`, etc. (ex : `https://i.imgur.com/abc123.jpg`)
5. Collez cette URL dans le champ correspondant du tableau de bord

### Option alternative : **Cloudinary** (https://cloudinary.com)

1. Créez un compte gratuit
2. Uploader vos images
3. Copiez l'URL fournie par Cloudinary

> **Conseils pour les images :**
> - **Portrait** : utilisez une image carrée ou portrait, environ 800×1000px
> - **Galerie** : ratio 3:4 suggéré (ex: 600×800px), maximum 6 images
> - Le site accepte les formats JPG, PNG, WebP
>
> ⚠️ **Ne PAS utiliser :** Google Drive, Dropbox, ou OneDrive — leurs URLs ne fonctionnent pas directement sur le web.

### Pour le CV (PDF)

Recommandation : utilisez **Google Drive**
1. Uploader votre PDF sur Google Drive
2. Partagez le fichier en "Visible pour tous"
3. Copiez le lien et collez-le dans le champ **CV (PDF)**

Ou utilisez un service comme **Docdroid** (https://docdroid.net) pour héberger votre PDF et obtenir une URL directe.

---

## 5. Publier les changements en direct

### Sauvegarder un aperçu local
1. Cliquez sur **Sauvegarder l'aperçu** (barre du bas)
2. Ouvrez le site dans un nouvel onglet pour voir vos changements
3. **Note :** l'aperçu n'est visible que par vous, sur votre navigateur

### Publier en direct (rendre visible pour tout le monde)
1. Cliquez sur **Publier en direct** (barre du bas)
2. Attendez 1-2 secondes
3. Un message vert confirme la publication
4. Rafraîchissez le site pour voir les changements en ligne

> **La publication est instantanée** — pas d'attente de build, pas de GitHub.

### Réinitialiser
- **Réinitialiser** supprime votre aperçu local et recharge le contenu actuellement publié
- Utile si vous voulez repartir de zéro

---

## 6. Que faire et ne pas faire

### ✅ Possibilités

- Modifier **tout le texte** du site (titres, descriptions, bios)
- Changer les **URLs des images** de la galerie et du portrait
- Mettre à jour le **CV**
- Ajouter des **liens vers vos réseaux sociaux**
- Modifier les **noms des liens** dans le menu de navigation
- Ajouter ou retirer des **crédits d'expérience** (film, théâtre, formation)
- Ajouter ou retirer des **compétences**
- Changer l'**ID de la vidéo YouTube** pour la démo
- Mettre à jour le **formulaire de contact**
- Modifier les **textes légaux** (Politique de confidentialité, Termes)
- **Publier instantanément** tous les changements

### ❌ Pas possible (limitations techniques)

- **Changer la mise en page** (position des sections, ordre, colonnes)
- **Modifier les couleurs, polices ou styles** (cela nécessite du code)
- **Uploader des images directement** (vous devez utiliser un hébergement externe)
- **Ajouter une nouvelle section** (ex : "Témoignages" ou "Blog")
- **Modifier la destination des liens de navigation** (protégé pour éviter les erreurs)
- **Supprimer des pages ou sections entières**
- **Ajouter des animations ou effets personnalisés**
- **Créer des comptes utilisateurs ou permissions multiples**

> 💡 **Si vous avez besoin d'un changement plus important** (nouvelle section, modification du design), contactez votre développeur.

---

## 7. Dépannage

| Problème | Solution |
|----------|----------|
| **L'image ne s'affiche pas** | Vérifiez que l'URL est complète et valide. Testez-la dans un nouvel onglet. |
| **Les changements ne sont pas visibles** | Avez-vous cliqué sur **Publier en direct** ? L'aperçu local n'est visible que par vous. |
| **La vidéo YouTube ne fonctionne pas** | Vérifiez que l'ID YouTube est correct (ex : `I7bIiB_sSSA`, pas l'URL complète) |
| **Le formulaire de contact ne fonctionne pas** | Vérifiez que l'email dans l'admin est correct (`catherine4812@hotmail.com`) |
| **Mot de passe incorrect** | Le mot de passe est `catherineadmin2026` (sans les guillemets) |
| **Erreur lors de la publication** | Attendez 30 secondes et réessayez. Si persiste, contactez votre développeur. |
| **La page reste blanche** | Rafraîchissez la page (F5 ou Ctrl+R). Essayez en navigation privée. |

---

*Document généré le 2026-06-17 — Pour assistance, contactez votre développeur.*
