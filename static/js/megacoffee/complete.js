const setAccuracy = (orderMenu, mission) => {
    let correct = 0;
    let total = 0;
    
    mission.missions.map((m) => {
        total += 2
        for ( let i=0 ; i < orderMenu.length ; i++ ) {
            if ( orderMenu[i].split('/')[0] === m.menu_name ) {
                correct += 1;
                if ( orderMenu[i].split('/')[1] === m.option_name ) {
                    correct += 1; 
                }
                if ( orderMenu[i].split('/')[2] && orderMenu[i].split('/')[2] === m.quantity ) {
                    correct += 1; 
                }
            }
        }
    })

    return { correct, total }
}

window.addEventListener('DOMContentLoaded', function() {
    const clickData = JSON.parse(sessionStorage.getItem("clickData"));
    const orderMenu = JSON.parse(sessionStorage.getItem("orderMenu"));
    const remain_time = parseInt(sessionStorage.getItem("remain_time"));
    const total_price = sessionStorage.getItem("total_price");
    const order = JSON.parse(sessionStorage.getItem("mission"));

    document.querySelector('.complete-btn').addEventListener('click', () => {
        const href = document.querySelector('.complete-btn').dataset['href'];

        // 정확도 계산
        // 현재는 단일 string으로 들어오기 때문에 그냥 돌리지만 이후에는 누적 계산해야 함
        const { correct, total } = setAccuracy(orderMenu, order);
        console.log(correct, total);
        
        // send data ( 예정 )

        // redirecting
        // window.location.href = href;
    });
});