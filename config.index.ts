import {writeFile} from 'fs';
// @ts-ignore
import {name, version} from './package.json';

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
   production: true,
   apiUrl: 'https://currency-exchange-rates-api.azurewebsites.net',
   firebase: {
      apiKey: '${process.env.FIREBASE_API_KEY}',
      authDomain: 'my-dollar-a4115.firebaseapp.com',
      projectId: 'my-dollar-a4115',
      storageBucket: 'my-dollar-a4115.appspot.com',
      messagingSenderId: '505467433054',
      appId: '1:505467433054:web:a8074f0ab02abc30ce04cf'
    },
    name: '${name}',
    version: '${version}'
};
`;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }
});
