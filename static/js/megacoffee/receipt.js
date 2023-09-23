// for using data
let clickData = sessionStorage.getItem('clickData') ? sessionStorage.getItem('clickData') : [];

// for menu
let orderMenu = [];
let total_price = 0;

// for timer
let remain_time = 0;
let paying_time = 0;

const getClickData = (button_name) => {
    const date = new Date();
    clickData.push({
        button_name: button_name,
        datetime: date.toString()
    });

    console.log("click data: ", clickData);
    sessionStorage.setItem('clickData', JSON.stringify(clickData));
}

window.addEventListener('DOMContentLoaded', function() {
    const setHeader = () => {
        const missions = JSON.parse(sessionStorage.getItem('mission'));
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
    
    // get datas from local storage
    clickData = JSON.parse(sessionStorage.getItem("clickData"));
    orderMenu = JSON.parse(sessionStorage.getItem("orderMenu"));
    remain_time = sessionStorage.getItem("remain_time");
    total_price = sessionStorage.getItem("total_price") ? sessionStorage.getItem("total_price").replaceAll(',', '').replaceAll('\"', '') : '0';
    
    setInterval(() => {
        remain_time -= 1;
        paying_time += 1;
    }, 1000);

    const paymentBtns = document.querySelectorAll('.btn-pay');
    if ( paymentBtns.length !== 0 ) {
        paymentBtns.forEach((e) => {
            const href = e.dataset['href'];
            e.addEventListener('click', () => {
                getClickData('결제 방법 선택' +  e.dataset['pay']);
                // add payment
                const orderMenuWithPayment = [];
                orderMenu.map((element) => {
                    orderMenuWithPayment.push(Object.assign(element, {method: e.dataset['pay'], packaging: sessionStorage.getItem('packaging')}));
                })
                sessionStorage.setItem("orderMenu", JSON.stringify(orderMenuWithPayment));
                
                sessionStorage.setItem('remain_time', remain_time);
                sessionStorage.setItem('paying_time', paying_time);
                // console.log('결제', e.dataset['pay'])
                location.href = href;
            })
        })
    }

    // render data
    document.querySelector('.total').innerHTML = '총 결제 금액 : ' + parseInt(total_price).toLocaleString() + "원";

    let result = "";
    orderMenu.map((e) => {
        result += `
            <p>${e.menu_name}</p>
        `;
    })

    document.querySelector('.list').innerHTML = result;
});