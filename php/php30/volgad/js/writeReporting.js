document.addEventListener('DOMContentLoaded', function (event) { 
  let sign = document.querySelector('.copy')
  let signsBtn = document.querySelector('.signs-btn')
  let fileBtn = document.querySelector('.uploads-btn')

  signsBtn.addEventListener('click', addSigns);
  fileBtn.addEventListener('click', addFileUpload);

  function addSigns(event) {
    event.preventDefault();

    let select = sign.cloneNode(true);
    sign.after(select);
  }

  function addFileUpload(event) {
    event.preventDefault();
    fileBtn.insertAdjacentHTML('beforebegin','<input name="upload_files[]" type="file">');
    let input = document.querySelector('.form-content__text input:last-of-type');
    input.click();
  }


});