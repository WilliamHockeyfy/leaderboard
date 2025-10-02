**Leaderboard Intervjuuppgift**
Välkommen! Tack för att du tar dig tid att genomföra denna kodutmaning.

**Översikt**
Din uppgift är att bygga en leaderboard-applikation med vår tech stack. Detta hjälper oss att förstå din kodningsstil, problemlösningsförmåga och hur du arbetar med React Native och Firebase.

**Krav på Tech Stack**
- React Native (TypeScript)
- Firebase (Firestore för data, Authentication frivilligt)
- Du får använda vilka bibliotek du vill

**Uppgiftskrav**
Bygg en leaderboard-applikation som inkluderar:

**Kärnfunktioner**
1. Visa Leaderboard
  - Visa en lista med spelare och deras poäng
  - Visa placering, namn, profilbild och poäng
  - Sortera efter poäng (högst till lägst)

2. Realtidsuppdateringar
  - Leaderboarden ska uppdateras i realtid när data ändras
  - Använd Firebase Firestore listeners

**Tekniska Krav**
  - Använd TypeScript genom hela projektet
  - Implementera korrekt type safety
  - Använd React Native best practices (hooks, funktionella komponenter)
  - Konfigurera Firebase på rätt sätt
  - Hantera laddnings- och feltillstånd
  - Se till att UI:t är responsivt och ser bra ut

**Arkitekturkrav**
Strukturera din kod med tydlig separation of concerns:

1. Repository Layer (repositories/)
  - Hanterar all direkt kommunikation med Firebase
  - Innehåller funktioner för CRUD-operationer
  - Exempel: leaderboardRepository.ts
```ts
 // Exempel på struktur
   export const leaderboardRepository = {
     getAll: () => { /* Firestore query */ },
     addScore: (data) => { /* Firestore add */ },
     subscribeToChanges: (callback) => { /* Firestore listener */ }
   }
```
2. Service Layer (services/)
  - Innehåller affärslogik
  - Validering och databehandling
  - Anropar repository-funktioner
  - Exempel: leaderboardService.ts
```ts
// Exempel på struktur
   export const leaderboardService = {
     getLeaderboard: async () => { /* business logic */ },
     addNewScore: async (name, score) => { /* validation + repo call */ }
   }
```
3. Custom Hooks (hooks/)
  - React-specifik logik
  - State management för komponenter
  - Anropar service-funktioner
  - Exempel: useLeaderboard.ts
```ts
// Exempel på struktur
   export const useLeaderboard = () => {
     const [data, setData] = useState([]);
     const [loading, setLoading] = useState(true);
     // ...
     return { data, loading, addScore };
   }
```

**Varför denna struktur?***
  - Gör koden testbar och underhållbar
  - Tydlig separation mellan datalager, affärslogik och UI
  - Enklare att byta ut Firebase mot annan databas i framtiden
  - Följer industry best practices

**Deliverables**
  - En fungerande React Native-applikation
  - Firebase-konfiguration (du kan använda miljövariabler)
  - Ren, läsbar kod med korrekt struktur
  - Grundläggande dokumentation i koden där det behövs

**Vad Vi Letar Efter**
**Kodkvalitet**
  - Ren, underhållbar kod
  - Korrekt användning av TypeScript
  - Komponentstruktur och organisation
  - Felhantering

**Git-Praxis**
  - Meningsfulla commit-meddelanden (t.ex. "Lägg till leaderboard-listkomponent" inte "fixar grejer")
  - Logisk commit-historik (dela upp arbetet i rimliga commits)
  - Tydlig progression av arbetet
  - Användning av branches om det är lämpligt

**Bonuspoäng (Frivilligt)**
  - Laddningsskelett eller animationer
  - Pull-to-refresh funktionalitet
  - Paginering eller infinite scroll för stora dataset
  - Användarautentisering
  - Enhetstester
  - Styling som matchar moderna designprinciper

**Firebase-Setup**
  - Skapa ett Firebase-projekt på Firebase Console
  - Aktivera Firestore Database (Leaderboard data)
  - Aktivera Firebase Storage (Profilbild)
  - Lägg till din Firebase-konfiguration i projektet (använd miljövariabler eller en config-fil)
  - Skapa en collection som heter leaderboard med följande struktur:

**Frågor?**
Om du har några frågor eller behöver förtydliganden, tveka inte att höra av dig till oss.
