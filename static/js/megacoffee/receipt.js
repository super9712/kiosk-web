// for using data
let clickData = [];

// for menu
let orderMenu = [];
let total_price = 0;

// for timer
let remain_time = 0;

const getClickData = () => {
    
}

window.addEventListener('DOMContentLoaded', function(){
    if ( ! localStorage.getItem('clickData') ) {
        window.alert('잘못된 접근입니다.');
        this.window.location.href = window.history.back();
    } else {
        console.log(localStorage.getItem("total_price"));
    }
    
    // get datas from local storage
    clickData = JSON.parse(localStorage.getItem("clickData"));
    orderMenu = JSON.parse(localStorage.getItem("orderMenu"));
    remain_time = localStorage.getItem("remain_time");
    total_price = localStorage.getItem("total_price").replaceAll(',', '').replaceAll('\"', '');
    
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