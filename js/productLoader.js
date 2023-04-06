const urlJson = "http://127.0.0.1:5500/json/products.json";
const productSection = document.getElementById("produits");
const singleProductSection = document.getElementById("produit-simple");
const ulProduct = document.createElement("ul");
if (productSection) {
  productSection.appendChild(ulProduct);
}

const loadProducts = async (urlJson) => {
  fetch(urlJson)
    .then((response) => response.json())
    .then((responseJson) => {
      responseJson.products.forEach((product) => {
        // Appel de la fonction pour afficher les produits.
        if (productSection) {
          createProducts(product);
        };
      });
    })
    .catch((error) => console.error(error));
};

loadProducts(urlJson);

const createProducts = (product) => {
  // Création des éléments HTML
  const liProduct = document.createElement("li");
  const hrefProduct = document.createElement("a");
  const productImg = document.createElement("img");
  const productH3 = document.createElement("h3");
  const productSpan = document.createElement("span");
  const hrefProduct2 = document.createElement("a");

  // Organisation du DOM
  ulProduct.appendChild(liProduct);
  liProduct.appendChild(hrefProduct);
  liProduct.appendChild(hrefProduct2);
  hrefProduct.appendChild(productImg);
  hrefProduct2.appendChild(productH3);
  hrefProduct2.appendChild(productSpan);

  // Ajout des attributs
  productImg.src = `/img/products/${product.category}/${product.subCategory}/${product.image}`;
  hrefProduct.href = `${window.location.href}?id=${product.id}`;
  productH3.innerHTML = `${product.name}`;
  productSpan.innerHTML = `${product.price}€`;
  hrefProduct2.href = `http://127.0.0.1:5500/produit-simple.html?id=${product.id}`;
};
