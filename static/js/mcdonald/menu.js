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
    const setHeader = () => {
        const missions = JSON.parse(sessionStorage.getItem('mission'));
        const headerMissionList = document.querySelector('.mission-list');

        let missionList = '';
        missionList += `<h3>미션</h3>`
        missionList += `<div>결제 방식 : ${missions[0].payment}</div>`;
        missionList += `<div>포장 여부 : ${missions[0].packing}</div>`;
        missions.map((e) => {
            missionList += `
                <div>
                    ${e.menu} / ${e.quantity}개
                </div>
            `;
        })

        headerMissionList.innerHTML = missionList;
    }

    setHeader();

    // timer
    let time = parseInt(sessionStorage.getItem('time'));
    setInterval(() => {
        time += 1;
        sessionStorage.setItem('time', time);
    }, 1000);  
});
