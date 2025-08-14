import i18n from 'i18next';
import { initReactI18next } from 'react-i18next'; // importação do 'conector' q faz o i18next funcionar ok
import LanguageDetector from 'i18next-browser-languagedetector'; // plugin p detectar automaticamente o idioma do navegador
import Backend from 'i18next-http-backend'; //plugin q permite carregar arquivos de tradução de forma assíncrona de um srv ou pasta local

i18n
  .use(Backend) // carrega as traduções do servidor e/ou arquivos externos
  .use(LanguageDetector)
  .use(initReactI18next) //plugin p conectar ao react
  .init({
    fallbackLng: 'pt-br', // idioma padrão e caso o idioma não seja buscado corretamente
    debug: true, // modo de depuração ativado p verificar logs no console
    interpolation: {
      escapeValue: false, // evita escapes de caracteres HTML
    },
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // caminho para carregar os arquivos de tradução
    },
  });

export default i18n;
