import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      username: "Username",
      password: "Password",
      rememberMe: "Remember me",
      login: "Login",
      invalidCredentials: "Invalid username or password",
    },
  },
  es: {
    translation: {
      username: "Nombre de usuario",
      password: "Contraseña",
      rememberMe: "Recuérdame",
      login: "Iniciar sesión",
      invalidCredentials: "Nombre de usuario o contraseña inválidos",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', 
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false, 
  },
});

export default i18n;
