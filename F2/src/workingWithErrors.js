import { is, prop, pipe, curry } from 'ramda';
import { Either } from 'ramda-fantasy';

const { Left, Right } = Either;
const isNumber = is(Number);

const tax = curry((tax, price) => (
   !isNumber(price)
      ? Left(new Error("Price must be numeric"))
      : Right(price + (tax * price))
));

const discount = curry((dis, price) => {
   if (!isNumber(price)) return Left(new Error("Price must be numeric"));
   if (price < 10) return Left(new Error("discount cant be applied for items priced below 10"));

   return Right(price - (price * dis));
});

const getItemPrice = pipe(prop('price'), Right);

const displayTotal = (total) => console.log(`Total Price: ${total}`);
const logError = (error) => console.log(`Error: ${error.message}`);
const eitherLogOrShow = Either.either(logError, displayTotal);

const addCaliTax = tax(0.1); // 10%
const apply25PercDisc = discount(0.25); // 25%

const getFinalPrice = item => getItemPrice(item)
   .chain(apply25PercDisc)
   .chain(addCaliTax);

const showTotalPrice = pipe(getFinalPrice, eitherLogOrShow);


const tShirt = { name: 't-shirt', price: 11 };
const pants = { name: 'pants', price: '10 dollars' };
const chips = { name: 'chirps', price: 5 };


showTotalPrice(tShirt) // Total Price: 9.075
showTotalPrice(pant)   // Error: Price must be numeric
showTotalPrice(chips)  // Error: discount cant be applied for items priced below 10



