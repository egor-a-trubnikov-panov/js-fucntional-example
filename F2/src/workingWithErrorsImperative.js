import { is } from 'ramda';

const isNumber = is(Number);

const tax = (tax, price) => {
   if (!isNumber(price)) return new Error("Price must be numeric");

   return price + (tax * price);
};

// Возвращает ошибку или цену, включающую скидку
const discount = (dis, price) => {
   if (!isNumber(price)) return (new Error("Price must be numeric"));

   if (price < 10 && dis !== 0) return new Error("discount cant be applied for items priced below 10");

   return price - (price * dis);
};

const isError = (e) => e && e.name == 'Error';

const getItemPrice = (item) => item.price;

// Выводит общую цену, включая налог и скидку. Требует обработки нескольких ошибок
const showTotalPrice = (item, taxPerc = 0, discountPercent = 0) => {
   let price = getItemPrice(item);
   let result = tax(taxPerc, price);
   if (isError(result)) {
      return console.log('Error: ' + result.message);
   }
   result = discount(discountPercent, result);
   if (isError(result)) {
      return console.log('Error: ' + result.message);
   }
   // выводим результат
   console.log('Total Price: ' + result);
}

let tShirt = { name: 't-shirt', price: 11 };
let pant = { name: 't-shirt', price: '10 dollars' };
let chips = { name: 't-shirt', price: 5 };

showTotalPrice(tShirt, 0.1, 0.2) // Total Price: 9.075
showTotalPrice(pant)   // Error: Price must be numeric
showTotalPrice(chips)  // Error: discount cant be applied for items priced below 10

