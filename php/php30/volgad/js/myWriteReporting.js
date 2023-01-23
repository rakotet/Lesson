document.addEventListener('DOMContentLoaded', function (event) { 
  let myWriteReporting = document.querySelector('.myWriteReporting')
  let user = document.querySelector('.right__user')

  myWriteReporting.addEventListener('click', addFileUpload);
  myWriteReporting.addEventListener('click', btnHide);
  myWriteReporting.addEventListener('click', hideComments);
  myWriteReporting.addEventListener('click', openDeleteSign);
  myWriteReporting.addEventListener('click', openAddSign);

  let signObj = {};
  let textObj = {};

  function openDeleteSign(event) {
    if(event.target.getAttribute('data-userSingId') && !event.target.getAttribute('style') && user.innerText != event.target.innerText) {
      let target = event.target.getAttribute('data-userSingId')
      let sign = myWriteReporting.querySelector(`div[data-userSingId="${event.target.getAttribute('data-userSingId')}"]`)
      signObj[target] = sign
      let w = sign.offsetWidth
      textObj[target] = sign.innerText
      sign.innerHTML = `<a href="/page/myWriteReporting?deleteSign=${event.target.getAttribute('data-userSingId')}" class="coordinating__delete">Удалить</a>`
      sign.style.width = `${w - 52}px`
      sign.style.backgroundColor = `red`

    } else if(event.target.getAttribute('data-userSingId') && event.target.getAttribute('style')) {
        let target = event.target.getAttribute('data-userSingId')
        let sign = signObj[target]
        sign.innerHTML = textObj[target]
        sign.removeAttribute('style')
        delete signObj[target]
        delete textObj[target]
    }
  }

  function openAddSign(event) {
    if(event.target.getAttribute('data-addSing')) {
      let form = myWriteReporting.querySelector(`form[data-addSingOpen="${event.target.getAttribute('data-addSing')}"]`)
      if(form.getAttribute('style')) {
        form.removeAttribute('style')
        event.target.innerText = 'Добавить согласующего'
      } else {
        form.style.display = 'flex';
        event.target.innerText = 'Скрыть добавление'
      }
    }
  }

  function hideComments(event) {
    if(event.target.classList.contains('item-comments__span')) {
      let comments = myWriteReporting.querySelector(`div[data-comment="${event.target.getAttribute('data-id')}"]`)
      if(event.target.innerText == 'Открыть комментарии') {
        comments.style.display = 'block';
        event.target.innerText = 'Закрыть комментарии';
      } else {
        comments.style.display = 'none';
        event.target.innerText = 'Открыть комментарии';
      }
    }
  }
 
  function addFileUpload(event) {
    if(event.target.classList.contains('uploads-btn1')) {
      event.preventDefault();
      event.target.insertAdjacentHTML('beforebegin','<input name="upload_files[]" type="file">');
      let input = document.querySelector(`div[data-id="${event.target.getAttribute('data-id')}"] input:last-of-type`);
      input.click();
    }
  }

  function btnHide(event) {
    if(event.target.classList.contains('item-btn__hide')) {
      let download = myWriteReporting.querySelector(`div[data-id="${event.target.getAttribute('data-id')}"]`)
      download.style.display = 'block';
      event.target.style.display = 'none';
      let input = download.querySelector('input');
      setTimeout(() => {
        input.click();
      }, 200)
    }
  }
});