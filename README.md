# Wordle (Vue.js + Vitest)

##  Objectif

Ce projet consiste à développer une version simplifiée du jeu **Wordle** en **Vue.js**, tout en mettant l'accent sur les **tests unitaires avec Vitest**. Le but est de construire la logique du jeu et d'assurer sa fiabilité via une stratégie de test complète.

****
## Présentation du Jeu

**Wordle** est un jeu de mots dans lequel l'utilisateur tente de deviner un **mot de 5 lettres** en **6 essais maximum**. Après chaque essai, le jeu affiche des indices de couleur :

- 🟩 **Vert** : La lettre est correcte et bien placée.  
- 🟨 **Jaune** : La lettre est dans le mot, mais mal placée.  
- ⬜ **Gris** : La lettre ne fait pas partie du mot.

---

## Stack

- **Framework** : Vue.js  
- **Testing** : [Vitest](https://vitest.dev/)  
- **Langage** : TypeScript

---

## Fonctionnalités implémentées

- [X] Valider que le mot saisi contient exactement **5 lettres alphabétiques**.
- [X] Implémenter la **logique de vérification des lettres** avec retour des couleurs.
- [X]  Gérer l’**état du jeu** : tentatives restantes, victoire, défaite.
- [X]  Écrire des **tests unitaires avec Vitest**.
- [X]  Obtenir une **couverture minimale de 70%**.

- [X]  Ajouter un **dictionnaire** de mots valides.
- [X] Gérer correctement les **lettres en double**.
- [X]  Couverture de tests minimale : **80%**.


## Lancer l'application
```bash
npm install
npm run dev
```

##  Lancer les Tests

```bash
npm run test
```
