# PocketSpotter

Een webapplicatie, door Benjamin Murck, om dieren in Madagaskar te identificeren op basis van verschillende kenmerken zoals type, grootte en kleur.

## Functies

- Filter dieren op basis van verschillende kenmerken
- Bekijk gedetailleerde informatie over elk dier
- Responsief ontwerp voor gebruik op mobiele apparaten
- Offline beschikbaar (na installatie)

## Installatie

1. Clone deze repository
2. Installeer de dependencies:
```bash
npm install
```
3. Start de ontwikkelingsserver:
```bash
npm start
```

## Dierendatabase uitbreiden

Om nieuwe dieren toe te voegen, bewerk het bestand `src/data/animals.json`. Voeg nieuwe dieren toe aan de `animals` array met de volgende structuur:

```json
{
  "id": [uniek nummer],
  "name": "[Nederlandse naam]",
  "scientificName": "[Wetenschappelijke naam]",
  "type": "[type dier]",
  "size": "[grootte]",
  "color": ["kleur1", "kleur2", ...],
  "image": "[URL naar afbeelding]"
}
```

## Gebruik

1. Gebruik de filters bovenaan de pagina om dieren te filteren op:
   - Type (zoogdier, reptiel, etc.)
   - Grootte
   - Kleur

2. Klik op een dier om meer details te zien

## Technologieën

- React
- Material-UI
- JSON voor dataopslag 