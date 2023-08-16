const setAccuracy = (orderMenu, mission) => {
    let correct = 0;
    let total = 0;
    
    // 3중 for문 ... 추후 자료구조 사용하여 개선 필요
    total = mission.split('/').length;

    orderMenu.map((menu) => {
        menu.split('/').map((e) => {
            mission.split('/').map((a) => {
                // 메뉴명이 동일할 경우에만 비교 
                if ( menu[0].split('/')[0] === mission.split('/')[0] && a === e ) {
                    correct += 1;
                }
            })
        })
    })

    return { correct, total }
}

window.addEventListener('DOMContentLoaded', function() {
    const clickData = JSON.parse(sessionStorage.getItem("clickData"));
    const orderMenu = JSON.parse(sessionStorage.getItem("orderMenu"));
    const remain_time = parseInt(sessionStorage.getItem("remain_time"));
    const total_price = sessionStorage.getItem("total_price");
    const mission = JSON.parse(sessionStorage.getItem("mission"));

    document.querySelector('.complete-btn').addEventListener('click', () => {
        const href = document.querySelector('.complete-btn').dataset['href'];

        // 정확도 계산
        // 현재는 단일 string으로 들어오기 때문에 그냥 돌리지만 이후에는 누적 계산해야 함
        const { correct, total } = setAccuracy(orderMenu, mission);
        console.log(correct, total);
        
        // send data ( 예정 )
        
        // remove datas
        sessionStorage.getItem("clickData");
        sessionStorage.getItem("orderMenu");
        sessionStorage.getItem("remain_time");
        sessionStorage.getItem("total_price");
        sessionStorage.getItem("mission");

        // redirecting
        // window.location.href = href;
    });
});