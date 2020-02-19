import { getUnique } from '../utils/basic-functions';
export function CODE_CONFIRMATION(mail) {
  return {
    width: '600px',
    data: {
      title: 'Code de sécurité',
      content: `<p class="text-center"></br>FranceTransfert est réservé aux échanges entre administrations et usagers.</br> Saisissez ici le code envoyé à votre adresse courriel ${mail}.</br></br> Cela nous permet de nous assurer que votre adresse courriel n’a pas été usurpée.</br> Pour plus d’informations, <a target="_blank" href="/faq">la FAQ est ici</a></p>`,
      input: { placeholder: 'Code de confirmation' },
      button: {
        do: 'Envoyer',
        unDo: 'Annuler'
      }
    }
  };
}

export function BAD_EXTENTION_POPUP(extentions) {
  return {
    width: '350px',
    data: {
      title: 'Mauvaises extensions :',
      content: `<p class='text-error'>${
        getUnique(extentions).length > 1 ? 'Les extensions' : "L'extension"
      }  : <strong>${getUnique(extentions).join(' ')}</strong> ${
        getUnique(extentions).length > 1 ? 'ne sont pas autorisées' : "n'est pas autorisée"
      }.</p>`,
      button: {
        unDo: 'Ok'
      }
    }
  };
}
