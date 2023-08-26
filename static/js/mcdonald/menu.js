
// 로딩 시 셋팅 
window.addEventListener('DOMContentLoaded', function(){
    const setHeader = () => {
        const missions = JSON.parse(sessionStorage.getItem('mission'));
        const headerMissionList = document.querySelector('.mission-list');

        let missionList = '';
        missionList += `<h3>미션</h3>`
        missionList += `<div>결제 방식 : ${missions.method}</div>`;
        missionList += `<div>포장 여부 : ${missions.packaging}</div>`;
        missions.missions.map((e) => {
            missionList += `
                <div>
                    ${e.menu} / ${e.option} / ${e.quantity}
                </div>
            `;
        })
        console.log(headerMissionList)
        headerMissionList.innerHTML = missionList;
    }

    // setHeader();


    // add onclick
    
});
