const $modal = document.querySelector('.modal');

function modalRender(menu) {
$modal.innerHTML = ` <li id="${menu.id}" class="modal-item">
<figure id="${menu.id}">
    <img class="modal-img"
    src="${menu.imgUrl}">
    <div>
    <figcaption class="modal-title">${menu.menuName}</figcaption>
    <span class="modal-price">${menu.price}원</span>
    </div>
</figure>
</li>
<li id="${menu.id}" class="modal-item modal-option">
<button class="btn btn-size-up"><i class="fa fa-arrow-circle-up" aria-hidden="true"></i> 사이즈 업</button>
<span class="size-up-price">${menu.sizeUpPrice}원</span> 
${
    menu.shot
    ? `<button class="btn btn-addshot"><i class="fa fa-coffee" aria-hidden="true"></i> 샷 추가</button>
<span class="addshot-price">${menu.shotPrice}원</span>`
    : ''
}
</li>
<li id="${menu.id}" class="modal-item modal-order">
<button class="btn-order">주문 담기</button>
<button class="btn-close">취소</button>
</li>`;
}

export default modalRender;