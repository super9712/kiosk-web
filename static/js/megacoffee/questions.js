const getClickData = (button_name) => {
    clickData = sessionStorage.getItem('clickData');
    const date = new Date();
    clickData.push({
        button_name: button_name,
        datetime: date.toString()
    });

    console.log("click data: ", clickData);
    sessionStorage.setItem('clickData', JSON.stringify(clickData));
}

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
    
    // onclicks for other options     
    const packageBtns = document.querySelectorAll('.btn-packaging');
    if ( packageBtns.length !== 0 ) {
        packageBtns.forEach((e) => {
            const href = e.dataset['href'];
            e.addEventListener('click', () => {
                sessionStorage.setItem('packaging', e.dataset['pack']);
                console.log('포장여부', e.dataset['pack'])
                location.href = href;
            })
        })
    };
});