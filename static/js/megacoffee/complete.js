const setAccuracy = (orderMenu, mission) => {
    let correct = 0;
    let total = 2;

    console.log('orderMenu', orderMenu)
    console.log('mission', mission)

    if ( mission.method === orderMenu[0].method ) {
        console.log('same method')
        correct++; // 결제 방식
    }
    if ( mission.packaging === orderMenu[0].packaging ) {
        console.log('same packaging')
        correct++; // 포장 여부
    }

    mission.missions.map((m) => {
        total += 3; // 메뉴, 옵션, 개수
        console.log(m)
        for ( let i=0 ; i < orderMenu.length ; i++ ) {
            if ( orderMenu[i].menu_name.split('/')[0] === m.menu ) {
                console.log('same menu')
                correct += 1; // 메뉴

                if ( orderMenu[i].menu_name.split('/')[1] ) {
                    if ( orderMenu[i].menu_name.split('/')[1] === m.option ) {
                        console.log('same option',)
                        correct += 1; // 추가 옵션
                    } 
                    if ( orderMenu[i].quantity == m.quantity ) {
                        correct += 1; // 개수
                    }
                } else {
                    if ( m.option === '추가 옵션 없음' ) {
                        console.log('no option',)
                        correct += 1; // 추가 옵션
                    }
                    if ( orderMenu[i].quantity == m.quantity ) {
                        correct += 1; // 개수
                    }
                }
                break;
            } 
        }
    })

    return { correct, total }
}

window.addEventListener('DOMContentLoaded', function() {
    const orderMenu = JSON.parse(sessionStorage.getItem("orderMenu"));
    const total_price = sessionStorage.getItem("total_price");
    const mission = JSON.parse(sessionStorage.getItem("mission"));

    document.querySelector('.complete-btn').addEventListener('click', () => {
        // 정확도 계산
        const { correct, total } = setAccuracy(orderMenu, mission);
        console.log(correct, total, correct/total*100);
        sessionStorage.setItem('accuracy', correct/total*100);

        // redirecting
        location.href = '/complete/';
    });
});