document.addEventListener('DOMContentLoaded', function (event) { 
  let fileBtn = document.querySelector('.uploads-btn1')
  let myWriteReporting = document.querySelector('.myWriteReporting')

  myWriteReporting.addEventListener('click', addFileUpload);
  myWriteReporting.addEventListener('click', btnHide);
 
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