const btnLogin = $('#log-in')
const btnSignin = $('#sign-in')
const connecting = document.querySelector('.connecting')
const main = document.querySelector('main')

let next = 0

btnLogin.on('click', screenLogin)
btnSignin.on('click', screenSignin)

function screenLogin() {
    const btnLogin = document.querySelector('.btn-enter')
    openScreenConnect()

    btnLogin.addEventListener('click', checkInputs)
}

function screenSignin() {
    const ScreenDefault = connecting.innerHTML
    const titleConnect = document.querySelector('.title-conneting')
    titleConnect.innerText = 'Página de Cadastro'

    openScreenConnect()
}

function checkInputs() {
    const inputs = document.querySelectorAll('.input-login')
    next = 0

    inputs.forEach((item, index) => {
        item.addEventListener('change', () => indentifyInputError(item, index))

        indentifyInputError(item, index)
    })

    if (next === 2) {
        inputs.forEach(item => {
            item.value = ''
            closeScreenConnect()
        })
    }
}

function openScreenConnect() {
    connecting.classList.remove('display-disable')
    main.style.filter = "blur(6px)"

    document.querySelector('.icon-exit').addEventListener('click', closeScreenConnect)
}

function closeScreenConnect() {
    connecting.classList.add('display-disable')
    main.style.filter = "blur(0)"
}

function indentifyInputError(item, index) {
    const labelError = document.querySelectorAll('.input-error')

    if (item.value === '') {
        labelError[index].classList.remove('display-disable')
    } else {
        labelError[index].classList.add('display-disable')
        next++
    }
}
