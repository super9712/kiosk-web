window.addEventListener('DOMContentLoaded', function(){
    // 기존 내용이 있다면 삭제
    sessionStorage.removeItem("clickData");
    sessionStorage.removeItem("orderMenu");
    sessionStorage.removeItem("remain_time");
    sessionStorage.removeItem("total_price");
    sessionStorage.removeItem("mission");
    sessionStorage.removeItem("accuracy");
    sessionStorage.removeItem("paying-time");
    sessionStorage.removeItem("packaging");
    sessionStorage.removeItem("time");

    // mission setting
    const menu_names = document.querySelector('.menu_names').value.split(',');
    const quantities = document.querySelector('.quantity').value.split(',');
    const packing = document.querySelector('.packing').value;
    const payment = document.querySelector('.payment').value;
    const option = document.querySelector('.option').value.split(',');

    console.log(menu_names, option)

    let mission = [];

    for ( let i=0 ; i < menu_names.length ; i++ ) {
        const newMenu = {
            menu: menu_names[i],
            quantity: quantities[i],
            option: option[i],
            packing: packing,
            payment: payment,
        }
        mission.push(newMenu);
    }

    sessionStorage.setItem('mission', JSON.stringify(mission));
    console.log(JSON.stringify(mission));

    // 시작 버튼 누르면 미션 등록
    const start_btn = document.querySelector('.mission-start');
    start_btn.addEventListener('click', () => {
        console.log(JSON.stringify(mission));
        location.href = '/megacoffee/question/';
    })
});