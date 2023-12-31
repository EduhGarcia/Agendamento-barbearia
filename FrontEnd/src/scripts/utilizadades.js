export const connecting = $('.connecting')
const main = $('main')

let next = 0

const server = axios.create({
    baseURL: 'http://localhost:3001'
})

export function nextPage() {
    const inputs = $('*.input-login')
    const labelError = $('*.input-error')
    const emailUsing = $('.email-using')
    next = 0

    emailUsing.addClass("display-disable")

    inputs.each((index, item) => {
        item.addEventListener('change', () => indentifyInputError(item, labelError[index]))
        indentifyInputError(item, labelError[index])
    })

    if (next === inputs.length) {
        const email = inputs[0].value
        const password = inputs[1].value
        const name = inputs[2] !== undefined ? inputs[2].value : ''

        if (inputs.length === 3) {
            if (inputs[1].value.length < 6) {
                return changeTextLabel('A senha deve ter no minimo 6 digitos', labelError[1])
            }
            server.post('/cadastro', {
                email,
                password,
                name
            }).then((response) => {
                response.data.message === 'User create' ? userAllowed() : emailUsing.removeClass('display-disable')
            })
        } else {
            server.post('/login', {
                email,
                password
            }).then((response) => {
                const messageLabel = response.data.message
                let label = messageLabel === 'Senha incorreta' ? labelError[1] : labelError[0]

                messageLabel === 'User found' ? userAllowed() : changeTextLabel(messageLabel, label)
            })
        }
    }
}

export function indentifyInputError(item, labelError) {
    if (item.value === '') {
        labelError.classList.remove('display-disable')
    } else {
        labelError.classList.add('display-disable')
        next++
    }
}

function changeTextLabel(message, label) {
    label.classList.remove('display-disable')
    label.innerText = message
}

function userAllowed() {
    clearValueInput()
    window.location.href = './usuario.html'
    return next = 0
}

export function openScreenConnect(functionButton) {
    connecting.removeClass('display-disable')
    main.addClass('filterBlur')

    $('.icon-exit').on('click', functionButton)
}

export function closeScreenConnect() {
    connecting.addClass('display-disable')
    main.css("filter", "blur(0)")

    removeLabelError()
}

function removeLabelError() {
    const labelError = $('*.input-error')

    labelError.each((index, item) => {
        item.classList.add('display-disable')
    })

    clearValueInput()
}

function clearValueInput() {
    $('*.input-login').each((i, element) => {
        element.value = ''
    })
}