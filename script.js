const buttons = document.querySelectorAll(".filter-btn")
const cards = document.querySelectorAll(".card")

buttons.forEach(button => {
    button.addEventListener('click', () => {
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

const cartIcon = document.querySelector(".cart-icon");
const cartModal = document.querySelector(".cart-modal");

cartIcon.addEventListener("click", () => {
    cartModal.classList.add("active")
})

document.querySelector("#btn-clear").addEventListener("click", () => {
    cartModal.classList.remove("active")
    document.querySelector(".cart-total").textContent = ""
})

document.querySelector("#btn-buy").addEventListener("click", () => {
    cartModal.classList.remove("active")
    const total = document.querySelector(".cart-total")
    if (total.textContent > 0) {
        alert("Дякуємо за покупку!")
    }else {
        alert("Ваш кошик порожній!")
    }
})

const buyButtons = document.querySelectorAll(".buy-button")

buyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const total = document.querySelector(".cart-total")
        const price = btn.closest('.card').querySelector('.card-price').textContent.replace('$', '')

        total.innerHTML = total.innerHTML ? parseFloat(total.innerHTML) + parseFloat(price) : parseFloat(price)
    })
})