const getClickData = (button_name) => {
    let clickData = [];
    if ( sessionStorage.getItem('clickData') ) {
        clickData = JSON.parse(sessionStorage.getItem('clickData'));
    }
    const date = new Date();
    clickData.push({
        button_name: button_name,
        datetime: date.toString()
    });

    console.log("click data: ", clickData);
    sessionStorage.setItem('clickData', JSON.stringify(clickData));
}

// 로딩 시 셋팅 
window.addEventListener('DOMContentLoaded', function(){
    // timer
    let time = parseInt(sessionStorage.getItem('time'));
    setInterval(() => {
        time += 1;
        sessionStorage.setItem('time', time);
        console.log(time)
    }, 1000);

    // click data event listener
    document.querySelectorAll('.payment')[0].addEventListener('click', getClickData('카드 결제'));
    document.querySelectorAll('.payment')[1].addEventListener('click', getClickData('현금 결제'));
    document.querySelector('.payment-back').addEventListener('click', getClickData('결제 이전 단계로'));
});