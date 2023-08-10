import model from './model/model.js';
import footerRender from './views/footer-render.js';
//State
let menus = [];
//DOM
const $modalContainer = document.querySelector('.menu-modal-container');
//Function
const initialize = async () => {
    try {
        const menu = await model.getMenu(`/${model.state}`);
        menus = menu;
    } catch (e) {
        console.error(e);
    }
};
const setPrice = (e) => {
const target = menus.find((menu) => menu.id === +e.target.parentNode.id);
    if (e.target.matches('.btn-size-up')) {
        target.price += target.sizeUpPrice;
        target.menuName = `${target.menuName} / 사이즈 업 `;
        document.querySelector('.modal-price').textContent = `${target.price}원`;
    } else if (e.target.matches('.btn-addshot')) {
        target.price += target.shotPrice;
        target.menuName = `${target.menuName} / 샷 추가 `;
        document.querySelector('.modal-price').textContent = `${target.price}원`;
    }
    e.target.disabled = true;
};
const setActiveOrder = (e) => {
    const target = {
        ...menus.find((menu) => menu.id === +e.target.parentNode.id),
    };
    target.active = true;
    target.id = model.menu.length;
    model.menu.push(target);
    footerRender(model.menu);
    initialize();
};
//Event
document.addEventListener('DOMContentLoaded', initialize);
$modalContainer.addEventListener('click', (e) => {
    if (e.target.matches('.btn-close') || e.target === e.currentTarget) {
        initialize();
    } else if (e.target.matches('.btn-order')) {
        setActiveOrder(e);
    } else {
        return setPrice(e);
    }
    $modalContainer.classList.toggle('active');
});
export default initialize;
