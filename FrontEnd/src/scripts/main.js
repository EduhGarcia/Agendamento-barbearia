const btnLogin = document.getElementById('log-in')
const connecting = document.querySelector('.connecting')
const main = document.querySelector('main')

let next = 0

btnLogin.addEventListener('click', screenLogin)

function screenLogin() {
    const btnLogin = document.querySelector('.btn-enter')

    openScreenConnect()

    btnLogin.addEventListener('click', checkInputs)
    document.querySelector('.icon-exit').addEventListener('click', closeScreenConnect)
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
