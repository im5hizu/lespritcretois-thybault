const urlJson = "http://127.0.0.1:5500/json/products.json";
let itemPrice;

export const fetchJson = async (urlJson) => {
    return fetch(urlJson)
      .then((response) => response.json())
      .then((responseJson) => {
        responseJson.products.forEach((product) => {
          itemPrice = product.price;
        });
        return itemPrice;
      })
      .catch((error) => console.error(error));
  };
  
  fetchJson(urlJson)
  .then((itemPrice) => console.log(itemPrice))
  .catch((error) => console.error(error));