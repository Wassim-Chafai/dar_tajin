/* ===== 1. Année automatique dans le footer ===== */
const annee = document.getElementById("annee");
if (annee) {
  annee.textContent = new Date().getFullYear();
}

/* ===== 2. Lien actif dans la navbar ===== */
const pageActuelle = window.location.pathname.split("/").pop() || "index.html";
const liens = document.querySelectorAll(".navbar .nav-link");

liens.forEach(function (lien) {
  if (lien.getAttribute("href") === pageActuelle) {
    lien.classList.add("active");
  }
});

/* ===== 3. Salutation selon l'heure ===== */
const salutation = document.getElementById("salutation");
if (salutation) {
  const heure = new Date().getHours();
  let message = "Bonsoir";

  if (heure < 12) {
    message = "Bonjour";
  } else if (heure < 18) {
    message = "Bon après-midi";
  }

  salutation.textContent = message + " et bienvenue chez";
}

/* ===== 4 + 5. Navbar et bouton "Retour en haut" (au scroll) ===== */
const navbar = document.querySelector(".navbar");
const btnHaut = document.getElementById("btnHaut");

window.addEventListener("scroll", function () {
  // Navbar : change de couleur quand on descend de 50px
  if (navbar) {
    if (window.scrollY > 50) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  }

  // Bouton : visible seulement après 300px
  if (btnHaut) {
    if (window.scrollY > 300) {
      btnHaut.classList.add("visible");
    } else {
      btnHaut.classList.remove("visible");
    }
  }
});

if (btnHaut) {
  btnHaut.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ===== 6a. Compteur animé (0 -> valeur) ===== */
function animerCompteur(element) {
  const cible = Number(element.dataset.cible); // lit data-cible="20"
  const pas = Math.ceil(cible / 60);
  let valeur = 0;

  const timer = setInterval(function () {
    valeur = valeur + pas;
    if (valeur >= cible) {
      valeur = cible;
      clearInterval(timer);
    }
    element.textContent = valeur;
  }, 30);
}

/* ===== 6b. Apparition au scroll + lancement des compteurs ===== */
const observateur = new IntersectionObserver(function (elements) {
  elements.forEach(function (el) {
    if (el.isIntersecting) {
      el.target.classList.add("visible");

      // si l'élément contient des compteurs, on les lance
      el.target.querySelectorAll(".compteur").forEach(animerCompteur);

      observateur.unobserve(el.target); // une seule fois
    }
  });
});

document.querySelectorAll(".reveal").forEach(function (el) {
  observateur.observe(el);
});