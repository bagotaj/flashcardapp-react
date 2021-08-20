# Backend

## Szerver

- Háromrétegű (model/service/controller), Express.js-en alapuló szerver
- API végpontokat biztosít a frontend számára
- kommunikál a MongoDB adatbázissal mongoose használatával

## Használat

- Környezeti változók beállítása a `.env.example` fájlban található példa alapján.

- Parancsok:

  - `yarn install` vagy `npm install` - függőségek, stb. telepítése

  - `yarn start` vagy `npm start` - Az app elindítása dev/fejlesztői módban

  - `yarn start:admin` vagy `npm run start:admin` - Adatbázis törlése és alap admin felhasználó beállítása az app indításakor

  - `yarn test` vagy `npm test` - Tesztek indítása
