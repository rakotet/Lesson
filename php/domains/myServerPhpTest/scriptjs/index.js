const login = document.getElementById('input-login')
const password = document.getElementById('input-password')
const button = document.getElementById('button-input')

button.addEventListener('click', async function(event) {
    console.log(login.value + '; ' + password.value)

    let response = await fetch('corephp/authorization.php');
            let data = await response.json()
            if(response.ok) {
                console.log(data['a'])
            }

    password.value = ''
})