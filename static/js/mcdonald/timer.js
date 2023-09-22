// 로딩 시 셋팅 
window.addEventListener('DOMContentLoaded', function(){
    // timer
    let time = parseInt(sessionStorage.getItem('time'));
    setInterval(() => {
        time += 1;
        sessionStorage.setItem('time', time);
        console.log(time)
    }, 1000);
});