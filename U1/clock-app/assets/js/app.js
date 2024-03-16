const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const formAlarm = document.getElementById('formAlarm');
let isPermitShowNotification = false;
let isCreatedNotification = false;

document.addEventListener('DOMContentLoaded', (e) => {

    if('Notification' in window){

        Notification.requestPermission((request)=>{
            isPermitShowNotification = request === 'granted';
            if(!isPermitShowNotification){
                const [input, button] = formAlarm.children;
                input.value = "";
                input.disabled = true;
                button.disabled = true;
            }

        })

    }

    if(localStorage.getItem('alarma') !== null){

        const input = formAlarm.children[0];
        const alarm = new Date(localStorage.getItem('alarma'));
        input.value = formatNumber(alarm.getHours()) + ":" + formatNumber(alarm.getMinutes());

    }
    getCurrentTime();
});

formAlarm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const value = formData.get('time');

    if (value === null || value === "") 
    {
        alert("Seleccione una hora precisa")

    } else 
    {
        let alarmHours = parseInt(value.substring(0,2));
        let alarmMin = parseInt(value.substring(3));

        const currentDate = new Date();
        const setAlarm = new Date();

        const lasHorasSonMenores = alarmHours < currentDate.getHours();
        const lasHorasSonIguales = alarmHours === currentDate.getHours();
        const lasMinutosSonMenoresOiguales = alarmHours <= currentDate.getMinutes();

        if(lasHorasSonMenores || (lasHorasSonIguales && lasMinutosSonMenoresOiguales)){
            setAlarm.setDate(setAlarm.getDate + 1);
        }

        setAlarm.setHours(alarmHours);
        setAlarm.setMinutes(alarmMin);
        setAlarm.setSeconds(0);

        alarm = setAlarm;
        localStorage.setItem("alarma", setAlarm.toString());
    }
})

function formatNumber (value) {
    if( value < 10){
        return "0"+ value;
    }
    else{
        return value;
    }
}

const showNotification = () => {
    
    if(isPermitShowNotification && localStorage.getItem('alarma') !== null){
        const currentTime = new Date();
        const alarm = new Date(localStorage.getItem('alarma'));

        const isTheSameDay = currentTime.getDate() === alarm.getDate();
        const isTheSameHour = currentTime.getHours() === alarm.getHours();
        const isTheSameMinutes = currentTime.getMinutes() === alarm.getMinutes();

        if( isTheSameDay && isTheSameHour && isTheSameMinutes){
            let notification = new Notification("This is the alarm!");
        }
    }

}

function getCurrentTime () {
    showNotification();

    const currentDate = new Date();

    const currentHours = currentDate.getHours();
    const currentMinutes = currentDate.getMinutes();
    const currentSeconds = currentDate.getSeconds();

    hours.innerText = formatNumber(currentHours);
    minutes.innerText = formatNumber(currentMinutes);
    seconds.innerText = formatNumber(currentSeconds);
}

setInterval(function() {
    getCurrentTime();
}, 1000);