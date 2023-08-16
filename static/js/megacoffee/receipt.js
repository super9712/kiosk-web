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
    if ( ! sessionStorage.getItem('clickData') ) {
        window.alert('잘못된 접근입니다.');
        this.window.location.href = window.history.back();
    } else {
        console.log(sessionStorage.getItem("total_price"));
    }
    
    // get datas from local storage
    clickData = JSON.parse(sessionStorage.getItem("clickData"));
    orderMenu = JSON.parse(sessionStorage.getItem("orderMenu"));
    remain_time = sessionStorage.getItem("remain_time");
    total_price = sessionStorage.getItem("total_price").replaceAll(',', '').replaceAll('\"', '');
    
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