import setUpSignInBtnListener from './navbar.js';
import { getMenuItemsFromServer } from './serverFunctions.js'
const featureBoxes = document.querySelector('.feature-boxes');
const offers = document.querySelector('.offers');

setUpPage();

async function setUpPage() {
	setUpSignInBtnListener();
	const menuItems = await getMenuItemsFromServer();

	for (let i = 0; i < 6; i++) {
		if (i < 3)
			createFeatureItem(menuItems[i]);
		if (i >= 3)
			createOfferItem(menuItems[i]);
	}


}

function createFeatureItem(pizzaItem) {

	let { name, price, imgSrc } = pizzaItem;

	const itemHTML = `
		<div class="feature-box col-lg-4">
      <h4>${name} Pizza</h4>
      <img src="${imgSrc}" width="200" height="200" alt="pepperoni pizza">
      <p class="price">$${price}</p>
    </div>
	`.trim();

	let newItemElement = document.createElement('template');
	newItemElement.innerHTML = itemHTML;
	newItemElement = newItemElement.content.firstChild;

	featureBoxes.appendChild(newItemElement);
}

function createOfferItem(pizzaItem) {
	let { name, price, ingredients, imgSrc } = pizzaItem;

	const itemHTML = `
		      <div class="pricing-col col-lg-4 col-md-6 offer">
        <div class="card offer">
          <div class="card-header text-center">
            <h4>${name} Pizza</h4>
          </div>
          <div class="card-body text-center">
            <h2>$${price}</h2>
						<img src="${imgSrc}" width="200" height="200" alt="pepperoni pizza">
						<p>${ingredients}</p>
          </div>
        </div>
      </div>
	`.trim();
	let newItemElement = document.createElement('template');
	newItemElement.innerHTML = itemHTML;
	newItemElement = newItemElement.content.firstChild;

	offers.insertAdjacentElement('afterbegin', newItemElement);

}