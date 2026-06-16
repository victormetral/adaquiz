// ════════════════════════════════════════════
//   ADAQUIZ — script.js
//   Certaines fonctions sont déjà écrites.
//   Les fonctions marquées TODO sont à compléter.
// ════════════════════════════════════════════

// ── Sélection des éléments DOM ──────────────
// Ces lignes récupèrent les éléments HTML par leur id.
// Tu n'as pas besoin de les modifier.

//... Crée autant de constantes que d'éléments HTML à récupérer
const ecranAccueil = document.getElementById("ecran-accueil");
const ecranQuestion = document.getElementById("ecran-question");
const ecranResultats = document.getElementById("ecran-resultats");

const boutonCommencer = document.getElementById("bouton-commencer");
const boutonSuivant = document.getElementById("bouton-suivant");
const boutonRejouer = document.getElementById("bouton-rejouer");

const numeroQuestion = document.getElementById("numero-question")
const titreQuestion = document.getElementById("titre-question")

const messageReponse = document.getElementById("message-reponse")
const descriptionQuestion = document.getElementById("description-question");
const listeReponses = document.getElementById("liste-reponses");

const scoreFinal = document.getElementById("score-final");
const messageFinal = document.getElementById("message-final");

const footer = document.querySelector("footer");

// ── État du quiz ─────────────────────────────
// Ces variables stockent les données en cours de partie.
// Tu n'as pas besoin de les modifier.

let questions = []; // tableau des questions chargées depuis le JSON
let indexCourant = 0; // numéro de la question en cours (commence à 0)
let score = 0; // nombre de bonnes réponses

// ── Chargement du JSON ───────────────────────
// Cette fonction est déjà écrite.
// Elle charge le fichier questions.json et remplit l'écran d'accueil.

fetch("questions.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data.questions;
  });

// ── Navigation entre les écrans ──────────────
// Cette fonction est déjà écrite.
// Elle cache tous les écrans puis affiche celui qu'on lui donne.

const afficher = (ecran) => {
  ecranAccueil.classList.add("cache");
  ecranQuestion.classList.add("cache");
  ecranResultats.classList.add("cache");

  ecran.classList.remove("cache");

  if (ecran === ecranQuestion) {
    footer.classList.add("cache");
  } else {
    footer.classList.remove("cache");
  }
};

// ════════════════════════════════════════════
//   TODO — Fonctions à compléter
// ════════════════════════════════════════════

// ── TODO : afficherQuestion ──────────────────
// Cette fonction doit afficher la question en cours.
// Elle est appelée au début de chaque nouvelle question.
//
// Ce qu'elle doit faire :
//   1. Récupérer la question courante : questions[indexCourant]
//   2. Mettre à jour la barre de progression
//   3. Mettre à jour le compteur ("Question X / Y")
//   4. Afficher la description de la question dans #description-question
//   5. Cacher le bouton "Question suivante"
//   6. Vider #liste-reponses, puis créer un bouton pour chaque réponse
//      Chaque bouton doit appeler verifierReponse() au clic

const afficherQuestion = () => {
  const question = questions[indexCourant];

  numeroQuestion.textContent = `Question ${indexCourant + 1} / ${questions.length}`;

  titreQuestion.textContent = question.title;
  descriptionQuestion.textContent = question.description;

  titreQuestion.textContent = question.title
  descriptionQuestion.textContent = question.description

  listeReponses.innerHTML = ""
  messageReponse.textContent = ""
  messageReponse.className = ""
  boutonSuivant.classList.add("cache")
  listeReponses.innerHTML = "";
  boutonSuivant.classList.add("cache");
  question.answers.forEach((reponse, index) => {
    const bouton = document.createElement("button");

    bouton.textContent = reponse;
    bouton.classList.add("bouton-reponse");

    bouton.addEventListener("click", () => {
      verifierReponse(index);
    });

    listeReponses.appendChild(bouton);
  });
};

// ── TODO : verifierReponse ───────────────────
// Cette fonction est appelée quand une apprenante clique sur une réponse.
// Elle reçoit en paramètre l'index de la réponse choisie (0, 1, 2 ou 3).
//
// Ce qu'elle doit faire :
//   1. Récupérer la question courante
//   2. Désactiver tous les boutons de réponse
//   3. Colorier en vert la bonne réponse (ajouter la classe "correcte")
//   4. Si la réponse choisie est mauvaise, la colorier en rouge ("incorrecte")
//   5. Si la réponse est bonne, incrémenter le score
//   6. Afficher le bouton "Question suivante"

const verifierReponse = (indexChoisi) => {
  const question = questions[indexCourant]
  const boutonsReponse = listeReponses.querySelectorAll(".bouton-reponse")

  boutonsReponse.forEach((bouton, index) => {
    bouton.disabled = true

    if (index === question.correctAnswer) {
      bouton.classList.add("correcte")
    }

    if (index === indexChoisi && indexChoisi !== question.correctAnswer) {
      bouton.classList.add("incorrecte")
    }
  })

  if (indexChoisi === question.correctAnswer) {
    score++
    messageReponse.textContent = "Bonne réponse !"
    messageReponse.className = "correct"
  } else {
    messageReponse.textContent = "Mauvaise réponse."
    messageReponse.className = "incorrect"
  }

  boutonSuivant.classList.remove("cache")
}

// ── TODO : afficherResultats ─────────────────
// Cette fonction est appelée quand toutes les questions ont été répondues.
//
// Ce qu'elle doit faire :
//   1. Afficher le score dans #score-final (ex. "4 / 7")
//   2. Afficher un message dans #message-fin selon le score
//   3. Appeler afficher(ecranResultats) pour passer à l'écran résultats

const afficherResultats = () => {
  scoreFinal.textContent = `${score} / ${questions.length}`;

  if (score >= questions.length / 2) {
    messageFinal.textContent = "Bravo !";
  } else {
    messageFinal.textContent = "Tu peux faire mieux.";
  }

  afficher(ecranResultats);
};

// ── TODO : écouteurs d'événements ───────────
// Branche les boutons sur les bonnes fonctions.
//
// À faire :
//   - btn-commencer → afficher l'écran question + appeler afficherQuestion()
//   - btn-suivant   → passer à la question suivante ou aux résultats
//   - btn-rejouer   → remettre indexCourant et score à 0, revenir à l'accueil

// Écris ton code ici
boutonCommencer.addEventListener("click", () => {
  if (questions.length === 0) {
    return;
  }

  afficher(ecranQuestion);
  afficherQuestion();
});
boutonSuivant.addEventListener("click", () => {
  indexCourant++;

  if (indexCourant < questions.length) {
    afficherQuestion();
  } else {
    afficherResultats();
  }
});

boutonRejouer.addEventListener("click", () => {
  indexCourant = 0;
  score = 0;
  afficher(ecranAccueil);
});
