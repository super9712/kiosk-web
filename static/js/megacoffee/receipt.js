// for using data
let clickData = sessionStorage.getItem('clickData') ? sessionStorage.getItem('clickData') : [];

// for menu
let orderMenu = [];
let total_price = 0;

// for timer
let remain_time = 0;

const getClickData = () => {
    const date = new Date();
    clickData.push({
        button_name: button_name,
        datetime: date.toString()
    });

    console.log("click data: ", clickData);
}

window.addEventListener('DOMContentLoaded', function(){

    const paymentBtns = document.querySelectorAll('.btn-pay');
    console.log(paymentBtns);
    if ( paymentBtns.length !== 0 ) {
        paymentBtns.forEach((e) => {
            const href = e.dataset['href'];
            e.addEventListener('click', () => {
                sessionStorage.setItem('method', e.dataset['pay']);
                console.log('결제', e.dataset['pay'])
                location.href = href;
            })
        })
    }

    // get datas from local storage
    clickData = JSON.parse(sessionStorage.getItem("clickData"));
    orderMenu = JSON.parse(sessionStorage.getItem("orderMenu"));
    remain_time = sessionStorage.getItem("remain_time");
    total_price = sessionStorage.getItem("total_price") ? sessionStorage.getItem("total_price").replaceAll(',', '').replaceAll('\"', '') : '0';

    // add payment
    orderMenu = Object.assign(orderMenu, {payment: sessionStorage.getItem('method')});
    sessionStorage.setItem("orderMenu", JSON.stringify(orderMenu));

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