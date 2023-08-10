import changeButtonColor from '../footerController';

// order list
// 주문내역 랜더 식별자
const $orderList = document.querySelector('.order-list');
const $selectedItemNum = document.querySelector('.selected-item-num');
const $totalPrice = document.querySelector('.total-price');

// 결제내역 랜더 식별자
const $payList = document.querySelector('.pay-list');
const $totalItemNum = document.querySelector('.total-item-num');
const $totalItemPrice = document.querySelector('.total-item-price');

let _list = [];

const render = (list) => {
    let orderHtml = '';
    let payHtml = '';

    _list = list;

    _list.forEach(({ id, menuName, price }) => {
        orderHtml += `<li id="${id}" class="order-item">
        <i class="remove-item far fa-times-circle"></i>
        <span class="item-name">${menuName}</span>
        <span class="item-price">${price}원</span>
        </li>`;
    });

    _list.forEach(({ id, menuName, price }) => {
        payHtml += `<li id="${id}" class="pay-item">
        <span class="item-name">${menuName}</span>
        <span><span class="item-price">${price}</span>원</span>
    </li>`;
    });

    if (_list.length) {
        $orderList.innerHTML = orderHtml;
        $payList.innerHTML = payHtml;

        $selectedItemNum.textContent = _list.length + '개';
        $totalPrice.textContent =
        _list.reduce((acc, cur) => acc + cur.price, 0) + '원';

        $totalItemNum.textContent = _list.length + '개';
        $totalItemPrice.textContent = $totalPrice.textContent;
    } else {
        $orderList.innerHTML = orderHtml;
        $payList.innerHTML = payHtml;

        $selectedItemNum.textContent = '';
        $totalPrice.textContent = '';
    }
    changeButtonColor();
    console.log('장바구니', _list);
};

export default render;
