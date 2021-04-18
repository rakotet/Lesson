const URL = 'server.php';

let calendar = document.querySelector('#calendar')
let buttonVoice = document.querySelector('#button-voice')
let audioDiv = document.querySelector('#audio')

buttonVoice.addEventListener('click', function(event) {
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
        console.log(response)
        let audioList = response.split(';')
        
        for(let i = 0; i < audioList.length; i++) {
            let audio = document.createElement('audio');
            audio.src = audioList[i]
            audio.controls = true;
            audio.autoplay = false;
            audioDiv.append(audio);
        }
    }
}