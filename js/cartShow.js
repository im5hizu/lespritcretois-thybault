const cartJson = localStorage.getItem("cart");
const cartText = JSON.parse(cartJson);
const cart = new Map(cartText);
const cartSpan = document.querySelector(".nbre-produits");
const urlJson = "http://127.0.0.1:5500/json/products.json";

fetch(urlJson)
  .then((response) => response.json())
  .then((responseJson) => {
    let totalPrice = 0; // Initialiser la variable totalPrice à 0
    responseJson.products.forEach((product) => {
      cart.forEach(function (value, key) {
        if (key === product.id) {
          // Vérifier si l'ID du produit est présent dans le panier
          const total = product.price * value; // Calculer le prix total
          totalPrice += total; // Ajouter le prix total à la variable totalPrice
        }
      });
    });
    if (!cartJson) {
    } else {
      cartSpan.innerText = `${cart.size} article(s) ${totalPrice.toFixed(2)}€`;
    } // Afficher le prix total de tous les produits
  })
  .catch((error) => console.error(error));
