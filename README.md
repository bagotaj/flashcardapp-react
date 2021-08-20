# Szókártya Applikáció - Full Stack Vizsgaremek

## Könyvtárak

- `frontend`: frontend kód React használatával
- `backend`: backend kód Node.js és Expressz.js használatával
- `open-api-doc`: Swagger használatával api dokumentáció

## Tartalomjegyzék

- [A projekt áttekintése](#a-projekt-áttekintése)
- [A folyamat](#a-folyamat)
- [Szerepek](#szerepek)
- [Főbb jellemzők](#főbb-jellemzők)
- [Technikai követelmények](#technikai-követelmények)
- [Felépítés, szerkezet](#felépítés,-szerkezet)
- [Applikáció indítása](#applikáció-indítása)

## A projekt áttekintése

Az applikáció célja, hogy megkönnyítse az idegen nyelvek, vagy egyéb témákban a fogalmak, deffiníciók tanulását.

## A folyamat

A felhasználó megnyitva az applikációt felhasználói ranglistát és regisztráció, bejelentkezés gombokat talál.

A felhasználó reigsztráció után saját szókártya csomagokat készíthet és tárolhat az applikációhoz tartozó adatbázisban.

A kártyák megtekintése után pontokat kap, amelyek alapján a felhasználói ranglistában szerepel.

## Szerepek

1. Regisztráció nélküli felhasználó

   - Megtekintheti a felhasználói ranglista első 5 helyezettjét. Regisztrálhat az applikációba.

2. Regisztrációval rendelkező felhasználó

   - Saját szókártya csomagokat hozhat létre
   - A csomagokat mentheti/tárolhatja későbbi felhasználásra, módosíthatja és törölheti azokat
   - A kártyák megtekintése után pontokat kap, amelyek alapján a felhasználói ranglistában szerepel az összegyűjtött pontoknak megfelelő helyezéssel
   - Megtekintheti az adatlapját, azt módosíthatja

3. Adminisztrátor

   - Felhasználók kezelése: listázás, szerkesztés, törlés
   - Kezelheti a felhasználók által létrehozott szókártyákat: listázás, szerkesztés, törlés

## Főbb jellemzők

1. Felhasználók
   - létrehozása,
   - módosítása,
   - törlése
2. Szókártya csomagok
   - létrehozása,
   - módosítása,
   - törlése
3. Felhasználók rangsorolása a megtekintett szókártyák mennyisége szerint

## Technikai követelmények

### Backend

- Node.js
- Express.js
- MongoDB/Mongoose
- JSON Web Token
- Docker

### Frontend

- React

### API dokumentáció

- [OpenAPI/Swagger] (open-api-doc)

## Felépítés, szerkezet

### Regisztráció

- A regisztráció vezetéknév, keresztnév, email cím és jelszó megadásával történik

### Belépés

- A regisztrált felhasználók,
- Az adminisztrátor

email cím és jelszó megadásával beléphetnek az oldalra

### Navigáció - Navbar

1. Bejelentkezés nélkül

   - Flashcards (Applikáció elnevezése)
   - Home gomb
   - Regisztráció
   - Bejelentkezés
     menüpontok láthatóak

2. Bejelentkezés után
   Felhasználó esetében:

   - Flashcards (Applikáció elnevezése)
   - Home gomb
   - Szókártyáim
   - A felhasználó keresztneve/felhasználónév
   - Ranglista
   - Kilépés

   Adminisztrátor esetében:

   - Flashcards (Applikáció elnevezése)
   - Home gomb
   - Az adminisztrátor keresztneve/felhasználónév
   - Adminisztrátor felirat
   - Kilépés

     menüpontok láthatóak

### Flashcards - Home - Szókártyáim

Jelenleg mindhárom gombbal belépés után a kártyacsomagokat (Szókártyák, Egyéb kártyák) lehet elérni

#### Szókártyák / Egyéb kártyák

Üres adatbázis esetén:

- "Nincs még szókártyád?" felirat
- "Készíts egyet!" gomb

Kártyacsomag esetén:

- A kártyacsomag, kártyacsomagok listája látható

A kártyacsomag "dobozában":

- A csomag neve
- Szerkesztés gomb
- Törlés gomb

#### Kártyacsomag

A kártyacsomag nevére kattintva betöltődnek a kártyák.

A kártyák megtekintése után, az oldalt elhagyva, mentődik a megtekintések után járó pontszám az adatbázisban.

### Keresztnév

A keresztnévre kattintva az adott felhasználó szerkeszthető adatlapja jelenik meg. Jelszó megadásával menthetőek az adatok.

### Ranglista

A ranglista menüpontra kattintva az applikációt használók ranglistája tekinthető meg

### Kilépés

Kijelentkezés

### Adminisztrátor

Adminisztrátor esetében:

- Felhasználók listája
- Felhasználók ranglistája
- Szókártya lista
- Egyéb kártyák listája

látható.

#### Felhasználók listája

Adminisztrátor esetében lehetőség van a felhasználók listájának lekérésére.

- Felhasználók adatai szerkeszthetőek
- A felhasználó törölhető

## Applikáció indítása

Az applikáció a

```
docker-compose up
```

paranccsal indítható a terminálból.

Utána a `[http://localhost:3000/](http://localhost:3000/)` url-en tekinthető meg.

Általános felhasználóként a `Regisztráció` menüre kattintva **regisztráció** és **belépés** után használható az applikáció.

Adminisztrátorként a `[http://localhost:3000/admin/login](http://localhost:3000/admin/login)` url-en

```
teszt@admin.hu
teszt1234
```

emailcím és jelszó megadásával lehet belépni az oldalra.

További információ:
Instructions regarding dependencies, installation and execution of frontend, backend and documentation separately:

- [Frontend](frontend/README.md)
- [Backend](backend/README.md)
- [Open API dokumentáció](open-api-doc/README.md)
