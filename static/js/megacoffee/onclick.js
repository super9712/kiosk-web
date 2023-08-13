// for using data
const clickData = [];

// for menu
let orderMenu = [];

// for timer
const MAX_TIME = 60;
let remain_time = MAX_TIME;


// add onClicks & logics
window.addEventListener('DOMContentLoaded', function(){
    // 종료 카운트 다운
    this.setInterval(() => {
        document.querySelector('.remaining-time').innerHTML = remain_time;
        remain_time -= 1;

        if ( remain_time == 0 ) {
            window.alert('사용 시간이 초과되었습니다.');
            window.location.href = window.location.href;
        }
    }, 1000); 

    // tab buttons
    const tab_btns = document.querySelectorAll('.tab-list');
    tab_btns.forEach((item) => {
        item.addEventListener('click', clickTab);
    })
    
    // menu onclick 
    const menus = document.querySelectorAll('.menu-item')
    menus.forEach((item) => {
        item.addEventListener('click', openModal);
    })

    // close modal 
    document.querySelector('.btn-close').addEventListener('click', closeModal);

    // order button
    document.querySelector('.btn-order').addEventListener('click', setMenu);

    // delete items 
    document.querySelector('.delete-all-items').addEventListener('click', deleteItems);

});


const getClickData = (button_name) => {
    const date = new Date();
    clickData.push({
        button_name: button_name,
        datetime: date.toString()
    });

    console.log("click data: ", clickData);
}

const clickTab = (e) => {
    getClickData('탭 변경' + e.target.innerHTML);
}


// onClick items
const openModal = (e) => {
    // 모달 내부 내용 변경
    if (e.target.tagName === 'IMG') {
         const menu_item = e.target.parentNode;
         const modal_title = document.querySelector('.modal-title');
         modal_title.innerHTML = menu_item.querySelector('div .menu-title').innerHTML;
         const modal_price = document.querySelector('.modal-price');
         modal_price.innerHTML = menu_item.querySelector('.menu-price').innerHTML;
         const modal_img = document.querySelector('.modal-img');
         modal_img.setAttribute('src', e.target.getAttribute('src'));
    } else if (e.target.tagName === 'SPAN' || e.target.tagName === 'FIGCAPTION') {
        const menu_item = e.target.parentNode.parentNode;
         const modal_title = document.querySelector('.modal-title');
         modal_title.innerHTML = menu_item.querySelector('div .menu-title').innerHTML;
         const modal_price = document.querySelector('.modal-price');
         modal_price.innerHTML = menu_item.querySelector('div .menu-price').innerHTML;
        const modal_img = document.querySelector('.modal-img');
        modal_img.setAttribute('src', menu_item.querySelector('.menu-img').getAttribute('src'));
    } else {
        const modal_title = document.querySelector('.modal-title');
        modal_title.innerHTML = e.target.querySelector('div .menu-title').innerHTML;
        const modal_price = document.querySelector('.modal-price');
        modal_price.innerHTML = e.target.querySelector('div .menu-price').innerHTML;
        const modal_img = document.querySelector('.modal-img');
        modal_img.setAttribute('src', e.target.querySelector('.menu-img').getAttribute('src'));
    }

    getClickData('menu-item ' +  document.querySelector('.modal-title').innerHTML);

    // 모달 열기
    const modal = document.querySelector('.menu-modal-container');
    modal.setAttribute('style', 'opacity: 1; z-index: 999;');


}

const closeModal = () => {
    getClickData('close modal');
    const modal = document.querySelector('.menu-modal-container');
    modal.setAttribute('style', 'opacity: 0; z-index: -10;');
}

const updateOrderList = () => {
    // 주문 목록 업데이트
    const order_list = document.querySelector('.order-list');
    let render_list = '';
    orderMenu.map((e, id) => {
        render_list += `
            <li key="${id}" id="${id}" class="order-item">
                <i class="remove-item far fa-times-circle"></i>
                <span class="item-name">${e.menu_name}</span>
                <span class="item-price">${e.menu_price}</span>
            </li>
        `
    })

    if ( orderMenu.length === 0 ) {
        render_list = `<li id="no-item" class="order-item">
                담은 메뉴가 없습니다.
            </li>`;
    }

    // 렌더링
    order_list.innerHTML = render_list;
}

// 메뉴 담기
const setMenu = (e) => {
    const menu_name = document.querySelector('.modal-title').innerHTML;
    const menu_price = document.querySelector('.modal-price').innerHTML;

    getClickData('주문 담기 ' + menu_name);

    orderMenu.push({
        menu_name: menu_name,
        menu_price: menu_price,
        /*
        options: [
            option_name: 
        ]
        */
    });

    // 렌더링
    updateOrderList();

    // 삭제 버튼 onclick 추가
    const remove_btns = document.querySelectorAll('.remove-item');
    remove_btns.forEach((item) => {
        item.addEventListener('click', (event) => {
            getClickData('메뉴 개별 삭제 ' + event.target.nextElementSibling.innerHTML);
            for (let i = 0; i < orderMenu.length; i++) {
                if (orderMenu[i].menu_name === event.target.nextElementSibling.innerHTML) {
                    orderMenu.splice(i, 1);
                }
            }
            // 렌더링
            updateOrderList();
        });
    })

    // 종료
    closeModal();
}

// 전체 아이템 삭제 
const deleteItems = () => {
    getClickData('메뉴 전체 삭제 ');
    orderMenu = [];
    document.querySelector('.order-list').innerHTML = `
        <li id="no-item" class="order-item">
            담은 메뉴가 없습니다.
        </li>
    `;
}