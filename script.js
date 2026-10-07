let chapter;
let dialog;
let currentChapter = "reveil";
let currentDialog = 0;
let canPlayAudio = true;
let time = 0;
const sound = new Audio("https://pub-85731fb31eb14eecb6f8ad043e5ebde4.r2.dev/live-die-repeat/chapter.mp4");

const dom = {
  subtitle: document.querySelector('.subtitle'),
  dialog: document.querySelector('.dialog'),
  options: document.querySelector('.options'),
  media: document.querySelector('.medias'),
  wrapper: document.querySelector('.wrapper'),
  sound: document.querySelector('.sound'),
  reset: document.querySelector('.reset'),
};

const chaptersObj = {
  reveil: {
    subtitle: 'Le réveil',
    dialog: [
      {
        speaker: "cage",
        text: "Où suis-je sergent?",
        options: [
          {
            text: "Suivant",
            action: "nextDialog()"
          }
        ]
      },
      {
        speaker: "sergent",
        text: "À la base Heathrow. Vous venez d'arriver avec les nouvelles recrues.",
        options: [
          {
            text: "Suivant",
            action: "nextDialog()"
          }
        ]
      },
      {
        speaker: "cage",
        text: "Il doit surement y avoir une erreur!",
        options: [
          {
            text: "Suivant",
            action: "nextDialog()"
          }
        ]
      },
      {
        speaker: "sergent",
        text: "J'en doute M. Cage, il est inscrit ici que vous êtes un déserteur et en conséquence, vous serez envoyez au front demain matin.",
        options: [
          {
            text: "Chapitre Suivant",
            action: "goToChapter('plage')"
          }
        ]
      },
    ]
  },
  plage: {
    subtitle: 'La plage',
    dialog: [
      {
        speaker: "kimmel",
        text: "Hey le déserteur, surveille tes arrières sur le champs de bataille tantôt... car personne d'autre ne le fera! 🤣",
        options: [
          {
            text: "Suivant",
            action: "nextDialog()"
          }
        ]
      },
      {
        text: "Un aéronef dans l'angle mort de Kimmel menace de s'effondrer sur lui.",
        img: "kimmel-danger.jpg", 
        options: [
          {
            text: "Le laisser mourir",
            action: "goToChapter('kimmelMeurt')"
          },
          {
            text: "L'avertir",
            action: "goToChapter('kimmelMeurt')"
          }, 
          {
            text: "Tenter de le sauver",
            action: "goToChapter('sauverKimmel')"
          }
        ]
      },
    ]
  },
  sauverKimmel: {
    subtitle: "Sauver Kimmel",
    dialog: [
      {
        text: "Vous avez sauvé Kimmel. Cependant, l'aéronef s'écrase sur vous.",
        img: "sauver-kimmel.jpg",
        options: [
          {
            text: "Recommencer",
            action: "goToChapter('plage')"
          }
        ]
      }
    ]
  },
  kimmelMeurt: {
    subtitle: "Un soldat tombe au combat",
    dialog: [
      {
        text: "Kimmel meurt écrasé.",
        img: "kimmel-meurt.jpg",
        options: [
          {
            text: "Se sauver rapidement",
            action: "goToChapter('truck')"
          },
          {
            text: "Analyser la situation",
            action: "goToChapter('rencontreRita')"
          }
        ]
      }
    ]
  },
  truck: {
    subtitle: "Oups",
    dialog: [
      {
        video: "truck.mp4",
        options: [
          {
            text: "Recommencer",
            action: "goToChapter('plage')"
          },
        ]
      }
    ]
  }, 
  rencontreRita: {
    subtitle: "Arrières à découverts",
    dialog: [
      {
        img: "rita-danger.jpg",
        text: "Un extra-terrestre s'apprête à attaquer par surprise Rita, la plus grande héroine de l'armée.",
        options: [
          {
            text: "La laisser mourir",
            action: "goToChapter('kamikaze')"
          },
          {
            text: "L'avertir",
            action: "goToChapter('maison')"
          },
          {
            text: "La sauver",
            action: "goToChapter('ritaTue')"
          },
        ]
      }
    ]
  },
  kamikaze: {
    subtitle: "Kamikaze",
    dialog: [
      {
        text: "L'extra-terreste abat Rita. À court de munitions, vous, vous faite exploser pour l'éliminer avec vous.",
        img: "cage-explose.jpg",
        options: [
          {
            text: "Recommencer",
            action: "goToChapter('plage')"
          },
        ]
      }
    ]
  },
  ritaTue: {
    subtitle: "En vain",
    dialog: [
      {
        text: "Vous prenez une balle pour Rita. En guise de remerciement, elle profite de votre blessure afin de vous dérober la batterie de votre armure, vous laissant ainsi mourir sur le champs de bataille.",
        img: "rita-vole-batterie.jpg",
        options: [
          {
            text: "Recommencer",
            action: "goToChapter('plage')"
          },
        ]
      }
    ]
  },
  maison: {
    subtitle: "La maison",
    dialog: [
      {
        text: "Rita évite le coup et grâce à son aide vous êtes en mesure d'éliminer plusieurs extra-terrestres.",
        video: "rita-attaque.mp4",
        options: [
          {
            text: "Suivant",
            action: "nextDialog()"
          }
        ]
      }, 
      {
        text: "Ensemble vous réussissez à vous frayer un chemin jusqu'à une maison en bordure de la plage où vous trouvez un hélicoptère",
        img: "maison.jpg",
        options: [
          {
            text: "Suivant",
            action: "nextDialog()"
          }
        ]
      },
      {
        text: "Derrière la maison vous trouver un hélicoptère",
        img: "helico.jpg",
        options: [
          {
            text: "Suivant",
            action: "setFate()"
          }
        ]
      },
    ]
  },
  tropLent: {
    subtitle: "On y arrivera pas",
    dialog: [
      {
        speaker: "rita",
        text: "Nous avons mis trop de temps pour arriver ici. Je suis épuisée. On recommence. Pas de mauvaises décisions cette fois!",
        options: [
          {
            text: "Recommencer",
            action: "reset()"
          }
        ]
      },
    ]
  },
  pilote: {
    subtitle: "Qui pilote?",
    dialog: [
      {
        speaker: "rita",
        text: "Pourquoi conduire quand on peut voler!",
        options: [
          {
            text: "Laisser Rita piloter",
            action: "goToChapter('victoire')"
          },
          {
            text: "Piloter soi-même",
            action: "goToChapter('mortHelico')"
          }
        ]
      },
    ]
  },
  mortHelico: {
    subtitle: "En un instant",
    dialog: [
      {
        text: "Les extra-terrestres vous attaquent dès que vous démarrer le moteur et vous, vous écraser.",
        img: "accident-helico.jpg",
        options: [
          {
            text: "Recommencer",
            action: "goToChapter('plage')"
          },
        ]
      }
    ]
  },
  victoire: {
    subtitle: "Est-ce que...",
    dialog: [
      {
        text: "Rita meurt, attaquée dès qu'elle démarre l'hélicoptère, mais sa mort provoque une diversion...",
        img: "rita-morte.jpg",
        options: [
          {
            text: "Suivant",
            action: "nextDialog()"
          }
        ]
      },
      {
        text: "Cette diversion vous permet d'éliminer l'Omega, chef de l'armée extra-terrestre et de sauver l'humanité. Félicitation!",
        img: "omega.jpg",
      }
    ]
  }
};


dom.sound.addEventListener('change', () => canPlayAudio = dom.sound.checked);
dom.reset.addEventListener('click', reset);

function setChapter(c) {
  time++;
  localStorage.setItem('time', time);

  localStorage.setItem('chapter', c);
  chapter = chaptersObj[c];

  if(canPlayAudio) {
    sound.currentTime = 0;
    sound.play();
  }

  document.body.classList.remove(`chapter-${currentChapter}`);
  currentChapter = c;
  document.body.classList.add(`chapter-${currentChapter}`);
  currentDialog = 0;
  
  if (chapter.subtitle) {
    dom.subtitle.innerText = chapter.subtitle;
  }

  setScene();
}

function setFate() {
  if(time < 8) {
    goToChapter('pilote');
  } else {
    goToChapter('tropLent');
  }
}

function setScene() {
  dialog = chapter.dialog[currentDialog];

  if (dialog.init) {
    dialog.init();
  }
  
  let content = "";
  let media = "";

  if (dialog.text) {
    content = `<div class="text">${dialog.text}</div>`;
  }
  
  if (dialog.speaker) {
    content += `<img class="icon ${dialog.speaker}" src="https://pub-85731fb31eb14eecb6f8ad043e5ebde4.r2.dev/live-die-repeat/${dialog.speaker}.jpg">`;
  }
  
  if (dialog.video) {
    media = `<video src="https://pub-85731fb31eb14eecb6f8ad043e5ebde4.r2.dev/live-die-repeat/${dialog.video}" class="media" autoplay muted loop>`;
  } else if (dialog.img) {
    media = `<img src="https://pub-85731fb31eb14eecb6f8ad043e5ebde4.r2.dev/live-die-repeat/${dialog.img}" class="media">`;
  }
 
  dom.dialog.innerHTML = content;
  dom.media.innerHTML = media;
  
  let options = "";
  if (dialog.options) {
    
    for(let x=0; x<dialog.options.length; x++) {
      const o = dialog.options[x];
      options += `
        <button class="btn" onclick="${o.action}">${o.text}</button>
      `;
    }
  }
  
  dom.options.innerHTML = options;
}

function nextDialog() {
  currentDialog++;
  setScene();
}

function goToChapter(chapter) {
  setChapter(chapter);
}

function reset() {
  localStorage.clear();
  time = 0;
  goToChapter('reveil');
}

const savedChapter = localStorage.getItem('chapter');

if(savedChapter != null) {
  currentChapter = savedChapter;
}

const savedTime = localStorage.getItem('time');
if(savedTime != null) {
  time = savedTime;
}

setChapter(currentChapter);
