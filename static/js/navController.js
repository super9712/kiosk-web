import model from '../model/model';
import menuRender from '../views/menu-render';
import initialize from './menuModalController';
import img from './img.jpg';

// DOM
const $nav = document.querySelector('.menu-tab');
const $home = document.querySelector('.btn-home');

// Event
$nav.onclick = (e) => {
if (e.target === e.currentTarget) return;
[...$nav.children].forEach((navList) =>
    navList.classList.remove('btn-active')
);
e.target.classList.add('btn-active');
model._state = e.target.id;
model.getMenu(`/${model.state}`).then(menuRender);
initialize();
};

// 초기 이미지 클릭시 시작 이벤트
const $img = document.querySelector('.start-window');
console.log(img);
$img.style.backgroundImage = `url(${img})`;
$img.onclick = (e) => {
e.target.classList.add('modal-invisible');
};

// home 버튼 클릭 이벤트
$home.onclick = () => {
window.location.reload();
};
