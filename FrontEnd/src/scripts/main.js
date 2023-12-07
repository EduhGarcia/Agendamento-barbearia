const btnLogin = $('#log-in')
const btnSignin = $('#sign-in')
const connecting = $('.connecting')
const main = $('main')

let next = 0

btnLogin.on('click', screenLogin)
btnSignin.on('click', screenSignin)

function screenLogin() {
    const btnLogin = $('.btn-enter')
    openScreenConnect()

    btnLogin.on('click', checkInputs)
}

function screenSignin() {
    const ScreenDefault = connecting.html()
    $('.title-conneting').text('Página de Cadastro')

    // connecting.append("")
    openScreenConnect()
}

function checkInputs() {
    const inputs = $('*.input-login')
    next = 0

    inputs.each((index, item) => {
        item.addEventListener('change', () => indentifyInputError(item, index))

        indentifyInputError(item, index)
    })

    if (next === 2) {
        inputs.each((index, item) => {
            item.value = ''
            closeScreenConnect()
        })
    }
}

function openScreenConnect() {
    connecting.removeClass('display-disable')
    main.css("filter", "blur(6px)")

    $('.icon-exit').on('click', closeScreenConnect)
}

function closeScreenConnect() {
    connecting.addClass('display-disable')
    main.css("filter", "blur(0)")
}

function indentifyInputError(item, index) {
    const labelError = $('*.input-error')

    if (item.value === '') {
        labelError[index].classList.remove('display-disable')
    } else {
        labelError[index].classList.add('display-disable')
        next++
    }
}
