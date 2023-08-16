window.addEventListener('DOMContentLoaded', function() {
    const clickData = JSON.parse(sessionStorage.getItem("clickData"));
    const orderMenu = JSON.parse(sessionStorage.getItem("orderMenu"));
    const remain_time = parseInt(sessionStorage.getItem("remain_time"));
    const total_price = sessionStorage.getItem("total_price");
    const order = JSON.parse(sessionStorage.getItem("mission"));
    
    // 주문한 내역 출력
    let result1 = '';
    orderMenu.map((e) => {
        result1 += `
        <div class = "m-5">
            <div>${e.menu}</div>
            <div>${e.option}</div>
        </div>`;
    })

    document.querySelector('.answer-list').innerHTML = result1;

    // 주문 했어야 하는 내역 출력
    let result2 = '';
    order.missions.map((e) => {
        result2 += `
        <div class = "m-5">
            <div>${e.menu}</div>
            <div>${e.option}</div>
        </div>`;
    })

    document.querySelector('.answer-list').innerHTML = result2;
});