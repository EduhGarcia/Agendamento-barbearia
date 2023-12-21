export const connecting = $('.connecting')
const main = $('main')

let next = 0

export function nextPage() {
    const inputs = $('*.input-login')
    const labelError = $('*.input-error')
    next = 0

    inputs.each((index, item) => {
        item.addEventListener('change', () => indentifyInputError(item, labelError[index]))
        indentifyInputError(item, labelError[index])
    })

    if (next === inputs.length) {
        if (inputs.length === 3 && inputs[1].value.length < 6) {
            labelError[1].classList.remove('display-disable')
            labelError[1].innerText = 'a senha deve ter no minimo 6 digitos'
        } else {
            clearValueInput()
            window.location.href = './usuario.html'
            next = 0
            return
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

export function openScreenConnect(functionButton) {
    connecting.removeClass('display-disable')
    main.css("filter", "blur(6px)")

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