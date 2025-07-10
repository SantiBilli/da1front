# 🩺 MediGo - App de Turnos Médicos

MediGo es una aplicación móvil desarrollada con **Expo (React Native)** que permite a los usuarios registrarse, iniciar sesión, reservar turnos médicos, ver su historial de consultas, modificar datos de perfil y mucho más.

---

## 🚀 Instalación y puesta en marcha

### 1. Clonar el repositorio

```bash
git clone https://github.com/SantiBilli/da1front.git
cd da1front
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar entorno

Crear un archivo `.env` en la raíz del proyecto con las variables necesarias:

```
EXPO_PUBLIC_API_URL='http://149.50.131.211:3500/api' (Back hosteado en VPS de DonWeb)
# EXPO_PUBLIC_API_URL='http://localhost:3500/api' (Back hosteado localmente)
```

### 4. Iniciar el proyecto

```bash
npx expo start
```

> Esto abrirá Expo Developer Tools en tu navegador.

---

## 📱 Probar en un dispositivo móvil

1. **Instalá la app Expo Go** desde [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent) o [App Store](https://apps.apple.com/app/expo-go/id982107779).
2. Escaneá el **código QR** que aparece en la terminal o en Expo Developer Tools.
3. Alternativamente, podés abrir el **link de desarrollo** directamente desde tu celular.

---

## 🧩 Requisitos

- Node.js (v16 o superior recomendado)
- npm
- Expo CLI (`npx expo`)
- Dispositivo físico con Expo Go o emulador Android/iOS

---

## 📂 Estructura general

```
/da1front
├── app/            # Pages de la aplicacion
├── assets/         # Imágenes y recursos estáticos
├── components/     # Componentes reutilizables
├── constants/      # Constantes para facil acceso a imagenes e iconos
├── hooks/          # Hooks personalizados
├── package.json    # Dependencias y scripts
└── README.md
```

---

## 👨‍⚕️ Autores

Desarrollado por **Santiago Felipe Billinghurst, Juana Estarli y Nicolas Estepañuk**
