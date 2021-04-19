let div = document.querySelector('#messages')
let startButton = document.querySelector('#start')
let stopButton = document.querySelector('#stop')
let interval
let audioChunks = []
let count = 1
navigator.mediaDevices.getUserMedia({ audio: true})
    .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);

        startButton.addEventListener('click', function(){
            div.innerText = '';
            startButton.classList.add('activ')
            mediaRecorder.start();

            interval = setInterval(() => {
                mediaRecorder.stop()
                mediaRecorder.start()
            }, 10000);
        });
        
        mediaRecorder.addEventListener("dataavailable",function(event) {
            audioChunks.push(event.data);
            
        });

        stopButton.addEventListener('click', function(){
            startButton.classList.remove('activ')
            mediaRecorder.stop();
            clearInterval(interval)
        });

        mediaRecorder.addEventListener("stop", function() {
            const audioBlob = new Blob(audioChunks, {
                type: 'audio/wav'
            });
            
            let fd = new FormData();
            fd.append('voice', audioBlob);
            sendVoice(fd);
            audioChunks = [];
        });
    });


async function sendVoice(form) {
    let promise = await fetch('voice.php', {
        method: 'POST',
        body: form});

    if (promise.ok) {
        let response =  await promise.json();

        if(response.result == 'ok') {
            let ok = document.createElement('div');
            div.innerHTML = '';
            ok.innerText = `Файлов загруженно: ${count}`;
            count++
            div.appendChild(ok);
            
        } else {
            let no = document.createElement('div');
            no.innerText = 'Ошибка загрузки файла';
            div.appendChild(no);
        }
    } else {
        let no = document.createElement('p');
        no.innerText = 'Нет соединения с сервером';
        div.appendChild(no);
    }
}
