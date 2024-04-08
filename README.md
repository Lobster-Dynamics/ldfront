# Frida Research Engine

## Dependencias
### Node.js
La vesión mínima de Node.js requerida para este proyecto es la 18.17. Para instalar la versión más reciente de Node.js, puedes hacerlo desde el sitio oficial de [Node.js](https://nodejs.org/).

### Dependencias del proyecto
Para instalar las dependencias del proyecto y de desarrollo, puedes correr el siguiente comando en la raíz del proyecto:
```bash
npm install
```
## Correr el proyecto
Para correr el proyecto en modo de desarrollo, puedes correr el siguiente comando en la raíz del proyecto:
```bash
npm run dev
```

Además, dentro del mismo directorio, corre el siguiente comando para compilar los archivos TypeScript en tiempo real:
```bash
npx tsc --watch
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el proyecto.

## Construir el proyecto
Para construir el proyecto, puedes correr el siguiente comando en la raíz del proyecto:
```bash
npm run build
```

Generará una carpeta llamada 'out' en la raíz del proyecto con los archivos necesarios para correr el proyecto en modo de producción.

## Correr el proyecto en modo de producción
Para correr el proyecto en modo de producción, puedes correr el siguiente comando en la raíz del proyecto:
```bash
npm run start
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el proyecto.

Nota: Para correr el proyecto en modo de producción, primero debes construir el proyecto.

## Hacer deploy del proyecto
Para hacer deploy del proyecto en firebase, debes tener instalado el CLI de firebase. Puedes instalarlo con el siguiente comando:
```bash
npm install -g firebase-tools
```

Luego, debes loguearte en firebase con el siguiente comando:
```bash
firebase login
```

Habilitar la vista previa de frameworks web:
```bash
firebase experiments:enable webframeworks
```

Una vez logueado, debes inicializar el proyecto de firebase con el siguiente comando:
```bash
firebase init hosting
```

Seleccionar las siguientes opciones:
- Please select an option: Use an existing project
- Select a default Firebase project for this directory: frida-research (FRIDA RESEARCH)
- Detected an existing Next.js codebase in the current directory, should we use this? Yes
- In which region would you like to host server-side content, if applicable? us-west1 (Oregon)
- Set up automatic builds and deploys with GitHub? No


Finalmente, para hacer deploy del proyecto en firebase, puedes correr el siguiente comando en la raíz del proyecto:
```bash
firebase deploy
```

# Langosta de la verdad
                             ,.---._
                   ,,,,     /       `,
                    \\\\   /    '\_  ;
                     |||| /\/``-.__\;'
                     ::::/\/_
     {{`-.__.-'(`(^^(^^^(^ 9 `.========='
    {{{{{{ { ( ( (  (   (-----:=
     {{.-'~~'-.(,(,,(,,,(__6_.'=========.
                     ::::\/\
                     |||| \/\  ,-'/,
                    ////   \ `` _/ ;
                   ''''     \  `  .'
                             `---'