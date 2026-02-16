# Gestion Produit (Product Management App)

Une application complète de gestion de produits construite avec **Spring Boot** (Backend) et **Angular** (Frontend).

## Fonctionnalités

*   **Gestion des produits (CRUD)** :
    *   Lister tous les produits.
    *   Ajouter un nouveau produit.
    *   Modifier un produit existant.
    *   Supprimer un produit (avec modal de confirmation).
*   **Validation** :
    *   Le nom du produit est obligatoire.
    *   Le prix doit être supérieur à 0.
    *   Validation effectuée à la fois sur le frontend (Angular) et le backend (Hibernate Validator).
*   **Expérience Utilisateur (UX)** :
    *   Notifications "Toast" pour les succès (ajout, modification, suppression) et les erreurs.
    *   Page 404 personnalisée pour les routes inexistantes.
    *   Redirection vers 404 si l'on tente de modifier un ID produit inexistant.
    *   Interface utilisateur stylisée avec **Bootstrap 5**.

## Technologies

### Backend
*   **Java 17**
*   **Spring Boot 3** (Web, Data JPA, Validation)
*   **H2 Database** (Base de données en mémoire pour le développement)
*   **Lombok**

### Frontend
*   **Angular 17+** (Standalone Components)
*   **TypeScript**
*   **Bootstrap 5** (Styling)

## Installation et Lancement

### Prérequis
*   Java JDK 17 installés.
*   Node.js et npm installés.
*   Maven installé (ou utiliser le wrapper `mvnw`).
*   Angular CLI installé (`npm install -g @angular/cli`).

### 1. Backend (Spring Boot)

1.  Ouvrez un terminal dans le dossier `backend`.
2.  Lancez l'application avec Maven :
    ```bash
    mvn spring-boot:run
    ```
    Le backend démarrera sur `http://localhost:8080`.

### 2. Frontend (Angular)

1.  Ouvrez un nouveau terminal dans le dossier `frontend`.
2.  Installez les dépendances (si ce n'est pas déjà fait) :
    ```bash
    npm install
    ```
3.  Lancez le serveur de développement :
    ```bash
    ng serve
    ```
    Le frontend sera accessible sur `http://localhost:4200`.

## Structure du Projet

*   `backend/` : Code source Java / Spring Boot.
*   `frontend/` : Code source TypeScript / Angular.

## Auteur
49maodo
