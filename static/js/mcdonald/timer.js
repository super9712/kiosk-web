const getClickData = (button_name) => {
    let clickData = sessionStorage.getItem('clickData');
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

});