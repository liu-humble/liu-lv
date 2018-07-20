import i18next from 'i18next';
import i18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import resources from '../locales';

i18next
  .use(i18nextBrowserLanguageDetector)
  .init({
    lng: localStorage.getItem('language'),
    fallbackLng: 'de',
    resources: resources
  }, function (err, t) {
    const currentLanguage = i18next.language.substr(0, 2);
    document.querySelector('.btn-lang[data-lang=' + currentLanguage + ']').classList.add('active');
    updateContent();
  });

function updateContent() {
  document.querySelectorAll('[data-text]').forEach(element => {
    element.innerText = i18next.t(element.dataset.text);
  });
  document.querySelectorAll('[data-title-text]').forEach(element => {
    element.title = i18next.t(element.dataset.titleText);
  });
}

i18next.on('languageChanged', () => {
  updateContent();
});

const languageButtons = document.querySelectorAll('.btn-lang');
languageButtons.forEach(langButton => {
  langButton.onclick = () => {
    const language = langButton.dataset.lang;
    i18next.changeLanguage(language);
    localStorage.setItem('language', language);
    languageButtons.forEach(b => b.classList.remove('active'));
    langButton.classList.add('active');
  };
});
