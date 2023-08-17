window.addEventListener('DOMContentLoaded', function(){
    // 기존 내용이 있다면 삭제
    sessionStorage.removeItem("clickData");
    sessionStorage.removeItem("orderMenu");
    sessionStorage.removeItem("remain_time");
    sessionStorage.removeItem("total_price");
    sessionStorage.removeItem("mission");


    // 미션 가져오기
    const form = this.document.querySelector('.mission_text');
    const missions = [];

    for ( let i = 0 ; i < form.children.length - 2 ; i++ ) {
        // packaging, method 제외 나머지 확인
        missions.push({
            menu: form.children[i].querySelector('.menu_name').value,
            option: form.children[i].querySelector('.option_name').value,
            quantity: form.children[i].querySelector('.quantity').value,
        })
    }

    const order = {
        missions: missions,
        packaging: form.children[form.children.length - 2].value,
        method: form.children[form.children.length - 1].value,
    }

    // 시작 버튼 누르면 미션 등록
    const start_btn = document.querySelector('.mission-start');
    start_btn.addEventListener('click', () => {
        this.sessionStorage.setItem("mission", JSON.stringify(order));
        console.log(JSON.stringify(order));
        location.href = '/megacoffee/question/';
    })
});