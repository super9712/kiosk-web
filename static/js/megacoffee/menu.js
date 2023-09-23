// for using data
let clickData = [];

// for menu
let orderMenu = [];
let currentOption = [];

// for timer
const MAX_TIME = 60;
let remain_time = MAX_TIME;
let times = sessionStorage.getItem('times') ? sessionStorage.getItem('times') : '';

// add onClicks & logics
window.addEventListener('DOMContentLoaded', function(){
    const setHeader = () => {
        const missions = JSON.parse(sessionStorage.getItem('mission'));
        console.log(sessionStorage.getItem('mission'))
        const headerMissionList = document.querySelector('.mission-list');

        let missionList = '';
        missionList += `<h3>미션</h3>`
        missionList += `<div>결제 방식 : ${missions[0].payment}</div>`;
        missionList += `<div>포장 여부 : ${missions[0].packing}</div>`;
        missions.map((e) => {
            missionList += `
                <div>
                    ${e.menu} / ${e.quantity}개
                </div>
            `;
        })

        headerMissionList.innerHTML = missionList;
    }

    setHeader();

    // storage에 데이터 있는지 확인
    if ( sessionStorage.getItem("clickData") ) {
        clickData = JSON.parse(sessionStorage.getItem("clickData"));
        console.log('click data: ', clickData, typeof(clickData))
        sessionStorage.removeItem('clickData');
    }

    if ( sessionStorage.getItem("orderMenu") ) {
        orderMenu = JSON.parse(sessionStorage.getItem("orderMenu"));
        console.log(orderMenu)
        sessionStorage.removeItem('orderMenu');
        updateOrderList();
    }

    if ( sessionStorage.getItem("remain_time") ) {
        remain_time = parseInt(sessionStorage.getItem("remain_time"));
        console.log(remain_time)
        sessionStorage.removeItem('remain_time');
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
    document.querySelector('.pay-result-cancel2').addEventListener('click', closeOrderModal);

    // order button
    document.querySelector('.btn-order').addEventListener('click', setMenu);

    // delete items 
    document.querySelector('.delete-all-items').addEventListener('click', deleteItems);

    // order
    document.querySelector('.order-btn').addEventListener('click', checkOrder);
    // 먹고가기
    document.querySelectorAll('.pay-result-check')[0].addEventListener('click', () => submitOrder(true));
    // 포장하기
    document.querySelectorAll('.pay-result-check')[1].addEventListener('click', () => submitOrder(false));
});

// CSRF 토큰을 가져오는 함수
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// CSRF 토큰 가져오기
const csrftoken = getCookie('csrftoken');

const getClickData = (button_name) => {
    const date = new Date();
    clickData.push({
        button_name: button_name,
        datetime: date.toString()
    });

    console.log("click data: ", clickData);

    // MenuTemplateView로 click data 전송
    fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
         'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify({ data: clickData }),
    })

//    .then(response => response.json())
//    .then(data => {
//      // 서버에서 반환한 응답 처리
//      console.log(data);
//    })
//    .catch(error => {
//      console.error('데이터 전송 오류:', error);
//    });

}


const clickTab = (e) => {
    getClickData('탭 변경' + e.target.innerHTML);
    // 데이터 local storage에 저장 
    sessionStorage.setItem("clickData", JSON.stringify(clickData));
    sessionStorage.setItem("orderMenu", JSON.stringify(orderMenu));
    sessionStorage.setItem("remain_time", JSON.stringify(remain_time));
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


const removeItem = (event) => {
    console.log(event.target.nextElementSibling.innerHTML)
    getClickData("메뉴 개별 삭제 " + event.target.nextElementSibling.innerHTML);
    for (let i = 0; i < orderMenu.length; i++) {
        if (orderMenu[i].menu_name.split(" / ")[0] === event.target.nextElementSibling.innerHTML.split(" / ")[0]) {
            orderMenu.splice(i, 1);
        }
    }
    // 렌더링
    updateOrderList();
    // window.location.reload();
}

const updateOrderList = () => {
    // 주문 목록 업데이트
    const order_list = document.querySelector('.order-list');
    let render_list = '';
    console.log('rerender ', orderMenu)
    orderMenu.map((e, id) => {
        render_list += `
            <li key="${id}" id="${id}" class="order-item">
                <button class="remove-item far fa-times-circle" onclick='removeItem(event)'></button>
                <span class="item-name">${e.menu_name} / ${e.quantity}개</span>
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
            console.log('option', element)
            menu_name += ` / ${element.optionName}`;
            menu_price = (parseInt(menu_price.replaceAll(',', '').replaceAll('원', '')) + parseInt(parseInt(element.optionPrice.replaceAll(',', '')) * parseInt(element.quantity ? element.quantity : 1))) + "원";
        })
    } 

    let flag = false; 

    orderMenu.map((e) => {
        if ( e.menu_name === menu_name ) {
            // 동일한 메뉴가 이미 담겨있을 경우
            e.quantity++;
            e.menu_price = (parseInt(e.menu_price.replaceAll(',', '').replaceAll('원', '')) + parseInt(menu_price.replaceAll(',', '').replaceAll('원', ''))) + "원";
            flag = true;
        } 
    })

    if ( !flag ) {
        console.log(sessionStorage.getItem('method'));
        orderMenu.push({
            menu_name: menu_name,
            menu_price: menu_price,
            quantity: 1,
            method: sessionStorage.getItem('method'),
            packaging: sessionStorage.getItem('packaging'),
        });
    }

    // 옵션 초기화
    currentOption = [];

    // click data 
    getClickData('주문 담기 ' + menu_name);

    // update item count
    let menuCount = 0;
    orderMenu.map((e) => {
        menuCount += e.quantity;
    })
    document.querySelector('.selected-item-num').innerHTML = menuCount + '개';
    
    // 렌더링
    updateOrderList();

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

const submitOrder = (isHere) => {
    getClickData('submit order');
    const modal = document.querySelector('.pay-modal-container');
    modal.setAttribute('style', 'opacity: 0; z-index: -10;');

    // 포장 여부 저장
    sessionStorage.setItem('packaging', isHere===true ? '매장' : '포장');

    // 데이터 local storage에 저장 
    sessionStorage.setItem("clickData", JSON.stringify(clickData));
    sessionStorage.setItem("orderMenu", JSON.stringify(orderMenu));
    sessionStorage.setItem('times', sessionStorage.getItem('times') + ' / ' + 60 - remain_time )
    sessionStorage.setItem("remain_time", JSON.stringify(remain_time));
    sessionStorage.setItem("total_price", JSON.stringify(document.querySelector('.total-item-price') ? document.querySelector('.total-item-price').innerHTML : null));

    console.log(document.querySelector('.total-item-price').innerHTML);

    window.location.href="/megacoffee/receipt/";
}

const addOption = (e) => {
    let optionName = "";
    let optionPrice = 0;

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

    getClickData('option 추가 ' + optionName);

    flag = false; // 이미 존재하는 옵션인지 확인 

    currentOption.map((item) => {
        console.log(currentOption)
        if ( item.optionName === optionName ) {
            console.log('중복')
            flag = true;
            item.quantity++;
        }
    });
    
    if ( ! flag ) {
        currentOption.push({
            optionName: optionName,
            optionPrice: optionPrice.replaceAll(',', '').replaceAll('원', ''),
            quantity: 1,
        });
    };

    let optionString = '';
    currentOption.map((e, i) => {
        optionString += ( e.optionName + ' ' + e.quantity + '개' );
        if ( i !== currentOption.length - 1 ) {
            optionString += ', '; 
        }
    })
    document.querySelector('.selected-options').innerHTML = optionString;
}