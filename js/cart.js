const jsonUrl = "http://127.0.0.1:5500/json/products.json";

const loadCart = () => {
  const cartJson = localStorage.getItem("cart");
  const cartText = JSON.parse(cartJson);
  const cart = new Map(cartText);
  

  if (!cartJson) {
    console.log("pas de panier");
    noCart();
  } else {
    console.log(cart);
    showProducts(cart)
  }
};

const noCart = () => {
  const panierHtml = document.getElementById("panier");
  const commandeHtml = document.getElementById("commande");
  const main = panierHtml.parentElement;

  console.log(panierHtml, commandeHtml, main);
  panierHtml.style.display = "none";
  commandeHtml.style.display = "none";
  main.innerHTML = "<div><p>Votre panier est vide!</p></div>";

  const mainDiv = main.firstChild
  const mainDivP = mainDiv.firstChild
  mainDiv.style.background = 'red'
  mainDiv.style.display = 'flex'
  mainDiv.style.justifyContent = 'center'
  mainDivP.style.fontSize = '30px'
  mainDivP.style.color = 'white'
};

const showProducts = (cart) => {
  fetch(jsonUrl)
  .then((response) => response.json())
  .then((responseJson) => {
    const formElement = document.getElementById('form-commande');
    formElement.style.display = 'block' 

    responseJson.products.forEach(product => {
      cart.forEach(function(value, key){
        if(key === product.id){
          const panierElement = document.getElementById('panier')
          const tablePanier = panierElement.firstElementChild
          console.log(tablePanier)
          const innerHTML = `
          <tbody>
                <tr>
                    <td><img src="/img/products/${product.category}/${
                      product.subCategory
                    }/${product.image}"
                            alt="${product.name}"></td>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td><input type="number" id="${product.id}" min="1" max="50" value="${value}"></td>
                    <td>${product.price * value}</td>
                    <td><a href="1" >X</a></td>
                </tr>
            </tbody>
            </table>
          `
          tablePanier.insertAdjacentHTML('beforeend', innerHTML)

        }
      })
    });
  })
  .catch((error) => console.error(error));
}
loadCart();