const setAccuracy = (orderMenu, mission) => {
    let correct = 0;
    let total = 2;

    console.log('orderMenu', orderMenu)
    console.log('mission', mission)

    if ( mission[0].method === orderMenu[0].method ) {
        console.log('same method')
        correct++; // 결제 방식
    }
    if ( mission[0].packaging === orderMenu[0].packaging ) {
        console.log('same packaging')
        correct++; // 포장 여부
    }

    mission.map((m) => {
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
            } 
        }
    })

    return { correct, total }
}

window.addEventListener('DOMContentLoaded', function() {
    const orderMenu = JSON.parse(sessionStorage.getItem("orderMenu"));
    const total_price = sessionStorage.getItem("total_price");
    const mission = JSON.parse(sessionStorage.getItem("mission"));
    const remain_time = parseInt(sessionStorage.getItem("remain_time")); // remain_time 가져옴.

    document.querySelector('.complete-btn').addEventListener('click', () => {
        // 정확도 계산
        const { correct, total } = setAccuracy(orderMenu, mission);
        console.log(correct, total, correct/total*100);
        sessionStorage.setItem('accuracy', correct/total*100);
        //변수 저장 추가 작업

        const accuracy = sessionStorage.getItem("accuracy");

        const data = {
            remain_time: remain_time,
            accuracy: accuracy
        };

        // CSRF 토큰을 가져오는 함수
        function getCookie(name) {
            let cookieValue = null;
            if (document.cookie && document.cookie !== '') {
                const cookies = document.cookie.split(';');
                for (let i = 0; i < cookies.length; i++) {
                    const cookie = cookies[i].trim();
                    if (cookie.substring(0, name.length + 1) === (name + '=')) {
                        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                        break;
                    }
                }
            }
            return cookieValue;
        }

        fetch('/complete/?brand=megacoffee', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken') // CSRF 토큰을 가져옴
            },
            body: JSON.stringify(data)
        })
        
        console.log(data)
        

        // redirecting
        //location.href = '/complete/?brand=megacoffee';
    });
});