
import model from './model/model.js';
import footerRender from './views/footer-render.js';

// 결제 모달 관련
const $orderBtn = document.querySelector('.order-btn');
const $resultCheck = document.querySelector('.pay-result-check');
const $resultCancel = document.querySelector('.pay-result-cancel');
const $modalDisplay = document.querySelector('.pay-modal-container');
const $deleteAllItems = document.querySelector('.delete-all-items');
const $orderList = document.querySelector('.order-list');

// deleteAllItems
const deleteAllItems = () => {
if (!model.menu.length) return;
model.menu = [];
footerRender(model.menu);
};

// removeItem
const removeItem = (id) => {
model.menu = model.menu.filter((item) => item.id !== +id);
footerRender(model.menu);
};

// change order button color
const changeButtonColor = () => {
if (model.menu.length) {
    $orderBtn.classList.replace('order-btn-invalid', 'order-btn-valid');
} else {
    $orderBtn.classList.replace('order-btn-valid', 'order-btn-invalid');
}
};
$deleteAllItems.onclick = () => {
deleteAllItems();
};
$orderList.onclick = (e) => {
if (!e.target.classList.contains('remove-item')) return;
removeItem(e.target.parentNode.id);
};

// 결제 모달 띄우기 관련 이벤트
$orderBtn.onclick = () => {
if (!model.menu.length) return;
$modalDisplay.classList.replace('modal-invisible', 'modal-visible');
};
$resultCheck.onclick = () => {
window.location.reload();
};
$resultCancel.onclick = () => {
$modalDisplay.classList.replace('modal-visible', 'modal-invisible');
};
$modalDisplay.onclick = (e) => {
console.log(e.target, e.currentTarget);
if (e.target === e.currentTarget) {
    $modalDisplay.classList.replace('modal-visible', 'modal-invisible');
}
};

// 주문 내역있을 시 새로고침 물어보기
window.addEventListener('beforeunload', function (e) {
if (!model.menu.length) return;
if ($modalDisplay.classList.contains('modal-visible')) return;
e.preventDefault();
e.returnValue = '';
});
export default changeButtonColor;
