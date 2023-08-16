window.addEventListener('DOMContentLoaded', function(){
    sessionStorage.removeItem("clickData");
    sessionStorage.removeItem("orderMenu");
    sessionStorage.removeItem("remain_time");
    sessionStorage.removeItem("total_price");
    sessionStorage.removeItem("mission");

    // 시작 버튼 누르면 미션 등록
    const start_btn = document.querySelector('.mission-start');
    start_btn.addEventListener('click', () => {
        mission_menu.setItem("mission", start_btn.dataset['mission']);
    })
});