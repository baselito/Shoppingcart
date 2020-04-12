//let carts = document.querySelectorAll(".add-cart");
import * as productImages from "./images/*.jpg";
import "./styles.scss";

interface IProduct {
	id: string;
	image: string;
	name: string;
	tag: string;
	price: number;
}

interface ICartItem {
	quantity: number;
	product: IProduct;
}

let cart: ICartItem[] = [];

let products: IProduct[] = [
	{
		id: "cart1",
		image: productImages.greytshirt,
		name: "Grey Tshirt",
		tag: "greytshirt",
		price: 15,
		//inCart: 0
	},
	{
		id: "cart2",
		image: productImages.greyhoddie,
		name: "Grey Hoddie",
		tag: "greyhoddie",
		price: 20,
		//inCart: 0
	},
	{
		id: "cart3",
		image: productImages.blacktshirt,
		name: "Black Tshirt",
		tag: "blacktshirt",
		price: 10,
		//inCart: 0
	},
	{
		id: "cart4",
		image: productImages.blackhoddie,
		name: "Black Hoddie",
		tag: "blackhoddie",
		price: 25,
		//inCart: 0
	},
];

window.onload = function () {
	let m = new Main();
	m.init();
	m.navbarAndCart();
};

class Main {
	constructor() {
		// this.generateProductList = this.generateProductList.bind(this);
	}

	navbarAndCart() {
		let header = document.getElementById("webshopheader") as HTMLElement;
		let divHeader = document.createElement("div") as HTMLDivElement;
		let navbar = document.createElement("nav") as HTMLElement;
		let shopTitle = document.createElement("h2") as HTMLHeadingElement;
		let ul = document.createElement("ul") as HTMLElement;
		let li = document.createElement("li") as HTMLElement;
		let ionicon = document.createElement("ion-icon") as HTMLElement;
		let cartnum = document.createElement("span") as HTMLAnchorElement;

		divHeader.className = "overlay";

		li.className = "cart";
		ionicon.setAttribute("name", "basket");
		cartnum.setAttribute("id", "cartnum");
		cartnum.append("0");

		li.appendChild(ionicon);
		li.append("Cart");
		li.appendChild(cartnum);
		ul.appendChild(li);
		navbar.appendChild(shopTitle);
		navbar.appendChild(ul);
		divHeader.appendChild(navbar);
		header.appendChild(divHeader);
	}

	displayCart() {
		let productSum: number[] = [];
		for (let i = 0; i < cart.length; i++) {
			let cartlist = document.getElementById("displayCart") as HTMLDivElement;
			let deleteBtn = document.createElement("div");
			let plus = document.createElement("div");
			let minus = document.createElement("div");
			let productInCart = document.createElement("div") as HTMLDivElement;

			productInCart.className = "products";

			deleteBtn.className = "fas fa-trash-alt delete";
			plus.className = "fas fa-plus";
			minus.className = "fas fa-minus";

			productInCart.appendChild(deleteBtn);
			productInCart.append(cart[i].product.name + " ");
			productInCart.append("qty: " + cart[i].quantity + " ");
			productInCart.appendChild(plus);
			productInCart.appendChild(minus);
			productInCart.append(
				" Price: $" + cart[i].product.price * cart[i].quantity
			);

			cartlist.appendChild(productInCart);

			productSum.push(cart[i].product.price * cart[i].quantity);

			deleteBtn.addEventListener("click", () => {
				cart.splice(cart.indexOf(cart[i]), 1);
				this.updateDisplayCart();
			});
			plus.addEventListener("click", () => {
				cart[i].quantity += 1;
				this.updateDisplayCart();
			});
			minus.addEventListener("click", () => {
				if (cart[i].quantity > 1) {
					cart[i].quantity -= 1;
					this.updateDisplayCart();
				}
			});
		}
		this.totalSum(productSum);
	}

	totalSum(productSum: number[]) {
		let totalElement = document.getElementById("total") as HTMLDivElement;

		totalElement.innerHTML = "";

		let total = productSum.reduce((a, b) => a + b, 0);

		totalElement.append("Total sum: $" + total.toString() + ".00");

		console.log(total);
	}

	updateDisplayCart() {
		(document.getElementById("displayCart") as HTMLDivElement).innerHTML = "";
		this.displayCart();
	}

	generateProductList(product: IProduct) {
		let container = document.getElementById("test") as HTMLDivElement;
		let productContainer = document.createElement("div") as HTMLDivElement;
		let productImage = document.createElement("img") as HTMLImageElement;
		let productName = document.createElement("h3") as HTMLHeadingElement;
		let price = document.createElement("h3") as HTMLHeadingElement;
		let addcart = document.createElement("a") as HTMLAnchorElement;

		productContainer.className = "image";
		productImage.setAttribute("src", product.image);
		productImage.setAttribute("alt", product.name);
		addcart.setAttribute("href", "#");
		productName.append(product.name);
		price.append("$" + product.price.toString() + ",00");
		addcart.className = "add-cart cartItem";
		addcart.innerHTML = "Add to cart";

		productContainer.appendChild(productImage);
		productContainer.appendChild(productName);
		productContainer.appendChild(price);
		productContainer.appendChild(addcart);
		container.appendChild(productContainer);

		addcart.addEventListener("click", () => {
			this.addToCart(product);
			this.updateDisplayCart();
		});

		console.log(container);
	}

	addToCart(product: IProduct) {
		let quantity = 1;
		let objindex = cart.findIndex((item) => product.id === item.product.id);
		if (objindex >= 0) {
			cart[objindex].quantity += 1;
			console.log(cart);
		} else {
			cart.push({ quantity, product });
			console.log(cart);
		}
		this.cartNumbers();
	}

	cartNumbers() {
		let totalCartItems = 0;
		for (let i = 0; i < cart.length; i++) {
			let total = cart[i].quantity;
			totalCartItems += total;
		}
		document.getElementById("cartnum")!.innerHTML = totalCartItems.toString();
	}
	init() {
		// for (let i = 0; i < cart.length; i++) {
		// 	// Skapa html f<r varje sak i din cart
		// 	// Skapa addEventListener
		// 	//cart[i].addEventListener("click", () => {
		// 	//  cartNumbers(products[i]);
		// 	//  totalCost(products[i]);
		// 	//});
		// }

		for (let i = 0; i < products.length; i++) {
			// console.log(products[i].name);
			// Skapa html f<r dina produkter
			// Addeventlistener, lagg i cart, cart.push({ product: ... , quantity: 1 })
			this.generateProductList(products[i]);
		}
	}
}
