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
            <div>${e.menu} ${e.quantity}개</div>
            <div>${e.option}</div>
        </div>`;
    })

    document.querySelector('.order-list').innerHTML = result1;
    document.querySelector('.method-order').innerHTML = '결제 수단 :' + orderMenu[0].method;

    // 주문 했어야 하는 내역 출력
    let result2 = '';
    order.missions.map((e) => {
        result2 += `
        <div class = "m-5">
            <div>${e.menu} ${e.quantity}개</div>
            <div>${e.option}</div>
        </div>`;
    })

    document.querySelector('.answer-list').innerHTML = result2;
    document.querySelector('.method-mission').innerHTML = '결제 수단 :' + order.method;

    // 내역 삭제
    sessionStorage.removeItem("clickData");
    sessionStorage.removeItem("orderMenu");
    sessionStorage.removeItem("remain_time");
    sessionStorage.removeItem("total_price");
    sessionStorage.removeItem("mission");
});