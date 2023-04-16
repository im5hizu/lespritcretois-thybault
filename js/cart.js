const jsonUrl = "http://127.0.0.1:5500/json/products.json";
const orderForm = document.forms["form-commande"];


const loadCart = () => {
  const cartJson = localStorage.getItem("cart");
  const cartText = JSON.parse(cartJson);
  const cart = new Map(cartText);

  if (!cartJson) {
    noCart();
  } else {
    showProducts(cart);

    orderForm.addEventListener('submit', (e)=>{
      const formData = new FormData();
    
      // Ajouter les données du panier au formulaire
      cart.forEach((value, key) => {
        formData.append(`command[cart][${key}][id]`, key);
        formData.append(`command[cart][${key}][qt]`, value);
      });
    
      // Ajouter les données de livraison au formulaire
      const shipping = {
        Prenom: orderForm.elements["firstName"].value,
        nom: orderForm.elements["lastName"].value,
        adresse: orderForm.elements["adress"].value,
        ville: orderForm.elements["city"].value,
        telephone: orderForm.elements["tel"].value
      };
    
      for (const key in shipping) {
        if (shipping.hasOwnProperty(key)) {
          const value = shipping[key];
          if (value !== undefined && value !== null && value !== '') {
            formData.append(`command[shipping][${key}]`, value);
          }
        }
      }
    
      // Envoyer le formulaire
      fetch('#', {
        method: 'POST',
        body: formData
      })
      .then(localStorage.clear())
    });
    
       
  }
};



const noCart = () => {
  const panierHtml = document.getElementById("panier");
  const commandeHtml = document.getElementById("commande");
  const main = panierHtml.parentElement;
  
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