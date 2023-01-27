

    /*
    The ideea of the js code is bring the elements using getELementByClass so we can create new divs that populate the transaction list.
    I also implement a way to remove the items in case we want to
    I update the price from total, so dossen`t matter how many items we have, the price will be accurate mecause of the js and Math.round
    I also create a function that makes you able to increase the number of them selecting the quantity and not being able to have a negative number
    I make a function that gives you an alert with Thank you for your purchase after you press it and delete all dives from transactions looping through them
    In the end you it simulates a basket cart for your vacation.
    */



    let removeProductButtn = document.getElementsByClassName('button-alert')
    for (let i = 0; i < removeProductButtn.length; i++) {
        let button = removeProductButtn[i]
        button.addEventListener('click', removeProduct)
    }

    let numberInputs = document.getElementsByClassName('basket-quantity-input')
    for (let i = 0; i < numberInputs.length; i++) {
        let input = numberInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    let addToTransactionsButton = document.getElementsByClassName('store-product-button')
    for (let i = 0; i < addToTransactionsButton.length; i++) {
        let button = addToTransactionsButton[i]
        button.addEventListener('click', addToTransactionClick)
    }

    document.getElementsByClassName('button-shoppings-done')[0].addEventListener('click', buyClicked)


function buyClicked() {
    alert('Thank you for your Transactions')
    let basketItems = document.getElementsByClassName('basket-products')[0]
    while (basketItems.hasChildNodes()) {
        basketItems.removeChild(basketItems.firstChild)
    }
    updateTransactionTotal()
}

function removeProduct(event) {
    let buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateTransactionTotal()
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTransactionTotal()
}

function addToTransactionClick(event) {
    let button = event.target
    let shopItem = button.parentElement.parentElement
    let name = shopItem.getElementsByClassName('store-product-name')[0].innerText
    let price = shopItem.getElementsByClassName('store-product-price')[0].innerText
    let imageSrc = shopItem.getElementsByClassName('store-product-image')[0].src
    addProductToTransactions(name, price, imageSrc)
    updateTransactionTotal()
}

function addProductToTransactions(name, price, imageSrc) {
    let transactionRow = document.createElement('div')
    transactionRow.classList.add('basket-row')
    let basketItems = document.getElementsByClassName('basket-products')[0]
    let transactionProductName = basketItems.getElementsByClassName('basket-product-name')
    for (let i = 0; i < transactionProductName.length; i++) {
        if (transactionProductName[i].innerText == name) {
            alert('This item is already added to the basket')
            return
        }
    }
    let transactionRowContents = `
        <div class="basket-product basket-column">
            <img class="basket-product-image" src="${imageSrc}" width="100" height="100">
            <span class="basket-product-name">${name}</span>
        </div>
        <span class="basket-price basket-column">${price}</span>
        <div class="basket-quantity basket-column">
            <input class="basket-quantity-input" type="number" value="1">
            <button class="buttn button-alert" type="button">REMOVE</button>
        </div>`
    transactionRow.innerHTML = transactionRowContents
    basketItems.append(transactionRow)
    transactionRow.getElementsByClassName('button-alert')[0].addEventListener('click', removeProduct)
    transactionRow.getElementsByClassName('basket-quantity-input')[0].addEventListener('change', quantityChanged)
}

function updateTransactionTotal() {
    let transactionProductContainer = document.getElementsByClassName('basket-products')[0]
    let transactionRows = transactionProductContainer.getElementsByClassName('basket-row')
    let total = 0
    for (let i = 0; i < transactionRows.length; i++) {
        let transactionRow = transactionRows[i]
        let priceElement = transactionRow.getElementsByClassName('basket-price')[0]
        let quantityElement = transactionRow.getElementsByClassName('basket-quantity-input')[0]
        let price = parseFloat(priceElement.innerText.replace('$', ''))
        let quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('basket-total-price')[0].innerText = '$' + total
}