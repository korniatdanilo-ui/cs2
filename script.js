const buttons = document.querySelectorAll(".filter-btn")
const cards = document.querySelectorAll(".card")

buttons.forEach(button => {
    button.addEventListener('click', () => {
      const cards = document.querySelectorAll(".card")
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active')
        
        
        const category = button.getAttribute('data-filter')
        cards.forEach(card => {
            if(category === 'all' || card.getAttribute('data-category') === category){
                card.style.display = 'block'
            }else{ 
                card.style.display = 'none'
            }
        })
    })
})

const cardsContainer = document.querySelector(".cards");
const cartItems = document.querySelector(".cart-items");

fetch("./cards.json")
  .then((res) => res.json())
  .then((cards) => {
    cards.forEach((card) => {
      const div = document.createElement("div");
      div.className = "card";
      div.setAttribute("data-category", card.category);
      div.innerHTML = `
                <img src="${card.img}" alt="Card Image">
                <h3>${card.name}</h3>
                <p>${card.description}</p>
                <button class="buy-button">Buy Now</button>
                <p class="card-price">$${card.price}</p>
            `;
      cardsContainer.appendChild(div);
    });

    updateCartTotal();
  });

  const cardsData = localStorage.getItem("cartItems");
  if (cardsData) {
  const cards = JSON.parse(cardsData);
  cartItems.innerHTML = cards.map((item) => `<li>${item}</li>`).join("");

  const total = document.querySelector(".cart-total");

  const totalPrice = cards.reduce((sum, item) => {
    const price = parseFloat(item.split("$")[1]);
    return sum + price;
  }, 0);

  total.textContent = totalPrice;
}

const cartIcon = document.querySelector(".cart-icon");
const cartModal = document.querySelector(".cart-modal");

cartIcon.addEventListener("click", () => {
    cartModal.classList.add("active")
})

function clearCart() {
  cartModal.classList.remove("active");
  document.querySelector(".cart-total").textContent = "";
  document.querySelector(".cart-items").innerHTML = "";
  localStorage.removeItem("cartItems");

}
document.querySelector("#btn-clear").addEventListener("click", () => {
    clearCart()
})  
document.querySelector("#btn-buy").addEventListener("click", () => {
    cartModal.classList.remove("active")
    const total = document.querySelector(".cart-total")
    if (total.textContent > 0) {
        alert("Дякуємо за покупку!")
        clearCart()
    }else {
        alert("Ваш кошик порожній!")
    }
})

function updateCartTotal() {
  const buyButtons = document.querySelectorAll(".buy-button");

  buyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const total = document.querySelector(".cart-total");
      const btnCard = btn.closest(".card");
      const price = btnCard
        .querySelector(".card-price")
        .textContent.replace("$", "");
      const name = btnCard.querySelector("h3").textContent;

      cartItems.appendChild(document.createElement("li")).textContent =
        `${name} - $${price}`;

        const cartItemsData = localStorage.getItem("cartItems");
      localStorage.setItem(
        "cartItems",
        JSON.stringify([
          ...(cartItemsData ? JSON.parse(cartItemsData) : []),
          `${name} - $${price}`,
        ]),
      );

      total.innerHTML = total.innerHTML
        ? parseFloat(total.innerHTML) + parseFloat(price)
        : parseFloat(price);
    });
  });
}

try{
  const closeBtn = document.querySelector(".btn-close");
  closeBtn.addEventListener("click", () => {
      cartModal.classList.remove("active")
  })
}catch (error) {
  console.error("Close button not found:", error);
}
