// for using data
let clickData = [];

// for menu
let orderMenu = [];
let currentOption = [];

// for timer
const MAX_TIME = 60;
let remain_time = MAX_TIME;


// add onClicks & logics
window.addEventListener('DOMContentLoaded', function(){
    // local storage에 데이터 있는지 확인
    if ( localStorage.getItem("clickData") ) {
        clickData = JSON.parse(localStorage.getItem("clickData"));
        console.log('click data: ', clickData, typeof(clickData))
        localStorage.removeItem('clickData');
    }

    if ( localStorage.getItem("orderMenu") ) {
        orderMenu = JSON.parse(localStorage.getItem("orderMenu"));
        console.log(orderMenu)
        localStorage.removeItem('orderMenu');
        updateOrderList();
    }

    if ( localStorage.getItem("remain_time") ) {
        remain_time = parseInt(localStorage.getItem("remain_time"));
        console.log(remain_time)
        localStorage.removeItem('remain_time');
    }

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

    // option onclick
    const option_btns = document.querySelectorAll('.btn')
    option_btns.forEach((item) => {
        item.addEventListener('click', addOption);
    })
    // close modal 
    document.querySelector('.btn-close').addEventListener('click', closeMenuModal);
    document.querySelector('.pay-result-cancel').addEventListener('click', closeOrderModal);

    // order button
    document.querySelector('.btn-order').addEventListener('click', setMenu);

    // delete items 
    document.querySelector('.delete-all-items').addEventListener('click', deleteItems);

    // order
    document.querySelector('.order-btn').addEventListener('click', checkOrder);
    document.querySelector('.pay-result-check').addEventListener('click', submitOrder);
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
    // 데이터 local storage에 저장 
    localStorage.setItem("clickData", JSON.stringify(clickData));
    localStorage.setItem("orderMenu", JSON.stringify(orderMenu));
    localStorage.setItem("remain_time", JSON.stringify(remain_time));
    // 링크 이동
    window.location.href = e.target.querySelector('span').getAttribute('href');
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

const closeMenuModal = () => {
    getClickData('close menu modal');
    currentOption = [];
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
    let menu_name = document.querySelector('.modal-title').innerHTML;
    let menu_price = document.querySelector('.modal-price').innerHTML;

    if ( currentOption.length !== 0 ) {
       currentOption.map((element) => {
            menu_name += ` / ${element.optionName} ${ parseInt(element.optionCount) !== 1 ? element.optionCount + '회' : '' }` 
            menu_price = parseInt(menu_price.replaceAll(',', '')) + parseInt(element.optionPrice.replaceAll(',', '')) * parseInt(element.optionCount) + "원";
        })
    } 
    
    orderMenu.push({
        menu_name: menu_name,
        menu_price: menu_price,
    });

    // 옵션 초기화
    currentOption = [];

    getClickData('주문 담기 ' + menu_name);
    
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
    const modal = document.querySelector('.menu-modal-container');
    modal.setAttribute('style', 'opacity: 0; z-index: -10;');
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


// 결제하기
const checkOrder = () => {
    getClickData('주문 확인');

    // 선택된 메뉴 없을 경우 return
    if ( orderMenu.length === 0 ) {
        window.alert('선택된 메뉴가 없습니다. 주문하실 메뉴를 선택해주세요.');
        return;
    }

    // 모달 렌더링
    // 주문 목록
    const pay_list = document.querySelector('.pay-list');
    let render_list = '';
    let total_price = 0;

    orderMenu.map((e, id) => {
        render_list += `
            <li id="${id}" class="pay-item">
                <span class="item-name">${e.menu_name}</span>
                <span class="item-price">${e.menu_price}</span>
            </li>
        `;

        e.menu_price.replace
        total_price += parseInt(e.menu_price.replaceAll(',', ''));
    });
    pay_list.innerHTML = render_list;

    // 총 금액
    const pay_result = document.querySelector('.pay-result');
    pay_result.querySelector('.total-item-num').innerHTML = orderMenu.length + '개';
    pay_result.querySelector('.total-item-price').innerHTML = total_price + '원';

    // 모달 열기
    const modal = document.querySelector('.pay-modal-container');
    modal.setAttribute('style', 'opacity: 1; z-index: 999;');
}

const closeOrderModal = () => {
    getClickData('close order modal');
    const modal = document.querySelector('.pay-modal-container');
    modal.setAttribute('style', 'opacity: 0; z-index: -10;');
}

const submitOrder = () => {
    getClickData('submit order');
    const modal = document.querySelector('.pay-modal-container');
    modal.setAttribute('style', 'opacity: 0; z-index: -10;');
    // 데이터 local storage에 저장 
    localStorage.setItem("clickData", JSON.stringify(clickData));
    localStorage.setItem("orderMenu", JSON.stringify(orderMenu));
    localStorage.setItem("remain_time", JSON.stringify(remain_time));
    localStorage.setItem("total_price", JSON.stringify(document.querySelector('.total-item-price').innerHTML));

    console.log(document.querySelector('.total-item-price').innerHTML);

    window.location.href="/megacoffee/receipt/";
}

const addOption = (e) => {
    let optionName = "";
    let optionPrice = "";

    console.log(e.target)
    if ( e.target.tagName === "BUTTON" ) {
        optionName = e.target.querySelector('span').innerHTML;
        optionPrice = e.target.nextElementSibling.innerHTML;
    } else if ( e.target.tagName === "I" ) {
        optionName = e.target.nextElementSibling.innerHTML;
        optionPrice = e.target.parentNode.nextElementSibling.innerHTML;
    } else  {
        optionName = e.target.innerHTML;
        optionPrice = e.target.parentNode.nextElementSibling.innerHTML;
    }

    flag = false; // 이미 존재하는 옵션인지 확인 

    currentOption.map((item) => {
        if ( item.optionName === optionName ) {
            flag = true;
            item.optionCount++;
        }
    });
    
    if ( ! flag ) {
        currentOption.push({
            optionName: optionName,
            optionPrice: optionPrice,
            optionCount: 1,
        });
    };

    console.log(currentOption);
}