window.addEventListener('DOMContentLoaded', function() {
    const clickData = JSON.parse(sessionStorage.getItem("clickData"));
    const orderMenu = JSON.parse(sessionStorage.getItem("orderMenu"));
    const remain_time = parseInt(sessionStorage.getItem("remain_time"));
    const total_price = sessionStorage.getItem("total_price");
    const order = JSON.parse(sessionStorage.getItem("mission"));
    const accuracy = sessionStorage.getItem("accuracy");
    
    // 주문한 내역 출력
    console.log(orderMenu, order);

    let result1 = '';
    orderMenu.map((e) => {
        result1 += `
        <div class = "m-5">
            <div>${e.menu_name.split('/')[0]} ${e.quantity}개</div>
            <div>${e.menu_name.split('/')[1] ? e.menu_name.split('/')[1] : '추가 옵션 없음'}</div>
        </div>`;
    })

    document.querySelector('.order-list').innerHTML = result1;
    document.querySelector('.method-order').innerHTML = '결제 수단 : ' + orderMenu[0].method;

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
    document.querySelector('.method-mission').innerHTML = '결제 수단 : ' + order.method;

    // 정확도 및 시간 출력
    document.querySelector('.accuracy').innerHTML = '정확도 : ' + Math.round(accuracy) + '%';
    document.querySelector('.using-time').innerHTML = '걸린 시간 : ' + (60 - remain_time) + '초';
});