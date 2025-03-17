# ISmiley - Webcomputer

ISmiley er en webcomputer med brugerregistrering og login ved hjælp af en egen database. Projektet inkluderer en loading-screen, registrering, login og en desktop-side.

## Funktioner
- **Loading-screen**: Viser en animeret loading-skærm, før brugeren sendes til login.
- **Brugerregistrering**: Opret en konto med brugernavn, adgangskode og email.
- **Login-system**: Brugere kan logge ind og blive sendt til en "desktop".
- **Egen database**: Bruger en selvhostet database til at håndtere brugere og data.

## Hvad er en database?
En database er en struktureret samling af data, der kan tilgås, administreres og opdateres. ISmiley bruger en database til at gemme brugeroplysninger som brugernavn, adgangskode (hashed) og andre relevante data. Databasen sikrer, at brugere kan logge ind og få adgang til deres egne oplysninger.

## Filer
- **index.html** - Loading-screen
- **signin.html** - Registrering af brugere
- **login.html** - Log ind-side
- **desktop.html** - "Desktop" efter login
- **auth.js** - JavaScript-fil til authentication
- **database.js** - Databaseforbindelse og forespørgsler

## Fremtidige funktioner
- Desktop med ikoner og apps
- Bedre UI og design
- Database til brugerdata

## Licens
Dette projekt er open-source og kan bruges frit.

