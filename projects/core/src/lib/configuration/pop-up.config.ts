import { getUnique } from '../utils/basic-functions';
export function CODE_CONFIRMATION(mail) {
  return {
    width: '600px',
    data: {
      title: "Confirmation de l'adresse e-mail expéditeur",
      content: `<p>Code de sécurité FranceTransfert est réservé aux échanges entre administrations et usagers. Saisissez ici le code envoyé à votre adresse courriel ${mail} Cela nous permet de nous assurer que votre adresse courriel n’a pas été usurpée Pour plus d’informations, <a href="/faq">la FAQ est ici</a></p>`,
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
        getUnique(extentions).length > 1 ? 'Les extentions' : "L'extention"
      }  : <b>${getUnique(extentions).join(' ')}</b> ${
        getUnique(extentions).length > 1 ? 'ne sont pas autorisées' : "n'est pas autorisée"
      }.</p>`,
      button: {
        unDo: 'Ok'
      }
    }
  };
}
