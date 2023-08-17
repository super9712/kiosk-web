const getClickData = () => {
    const date = new Date();
    clickData.push({
        button_name: button_name,
        datetime: date.toString()
    });

    console.log("click data: ", clickData);
}

window.addEventListener('DOMContentLoaded', function(){
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