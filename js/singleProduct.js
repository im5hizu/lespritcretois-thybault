const urlJson = "http://127.0.0.1:5500/json/products.json";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get('id');

const loadProducts = async (urlJson) => {
    fetch(urlJson)
      .then((response) => response.json())
      .then((responseJson) => {
        const products = responseJson.products
        for(let i = 0; i < productId; i++){
          let product = products[i]
          singleProductLoader(product)
        }
    })
  };

const singleProductLoader = (product) => {
  
    console.log(productId);
    const contentDiv = document.getElementById("produit-simple");
    contentDiv.innerHTML = `
    <article>
    <h3>${product.name}</h3>
    <div>
        <figure><img src="./img/products/${product.category}/${product.subCategory}/${product.image}"></figure>
        <div>
            <p></p>
            ${product.description}
            <p></p>
            <footer>
                <form id="panier"><input type="hidden" id="id" value="1"><input type="number" min="1" step="1" value="1"
                        id="price"><span id="calcul-price">${product.price}€</span><button type="submit" class="bt-panier"
                        id="bt-panier" href="panier.html?id=1">Ajouter au panier</button></form>
            </footer>
        </div>
    </div>
  </article>`;
  };

  loadProducts(urlJson)