const URL = 'server.php';
let audioListlistened = [];

let calendar = document.querySelector('#calendar')
let buttonVoice = document.querySelector('#button-voice')
let audioDiv = document.querySelector('#audio')

calendar.setAttribute('value', '2021-04-19')

buttonVoice.addEventListener('click', function(event) {
    audioDiv.innerHTML = ''
    downloadAudio(calendar.value)
})

async function downloadAudio(date) {
    let promise = await fetch(URL, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({name: 'motor', date: date})
    });

    if (promise.ok) {
        let response =  await promise.text()
        let audioList = response.split(';')
        
        for(let i = 0; i < audioList.length - 1; i++) {
            let audio = document.createElement('audio');
            let p = document.createElement('p');
            let dateTime = new Date(audioList[i].split('.')[1] * 1000)
            p.innerText = dateTime.getHours() + 'ч ' + dateTime.getMinutes() + 'м ' + dateTime.getSeconds() + 'с'
            audio.src = audioList[i]
            audio.controls = true;
            audio.autoplay = false;
            audioDiv.append(p);
            audioDiv.append(audio); 
        }
    }
}
