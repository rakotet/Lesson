const URL = 'voice.php';
let div = document.createElement('div');
div.id = 'messages';
let start = document.createElement('button');
start.id = 'start';
start.innerHTML = 'Start';
let stop = document.createElement('button');
stop.id = 'stop';
stop.innerHTML = 'Stop';
document.body.appendChild(div);
document.body.appendChild(start);
document.body.appendChild(stop);
navigator.mediaDevices.getUserMedia({ audio: true})
    .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);

        document.querySelector('#start').addEventListener('click', function(){
            div.innerText = '';
            start.classList.add('activ')
            mediaRecorder.start();
        });
        let audioChunks = [];
        mediaRecorder.addEventListener("dataavailable",function(event) {
            audioChunks.push(event.data);
        });

        document.querySelector('#stop').addEventListener('click', function(){
            start.classList.remove('activ')
            mediaRecorder.stop();
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
    let promise = await fetch(URL, {
        method: 'POST',
        body: form});

    if (promise.ok) {
        let response =  await promise.json();

        if(response.result == 'ok') {
            let ok = document.createElement('div');
            ok.innerText = 'Файл загружен';
            document.querySelector('#messages').appendChild(ok);
            
        } else {
            let no = document.createElement('div');
            ok.innerText = 'Ошибка загрузки файла';
            document.querySelector('#messages').appendChild(no);
        }
    } else {
        let no = document.createElement('p');
        no.innerText = 'Нет соединения с сервером';
        document.querySelector('#messages').appendChild(no);
    }
}