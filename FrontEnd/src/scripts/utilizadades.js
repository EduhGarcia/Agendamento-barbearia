export const connecting = $('.connecting')
const main = $('main')

let next = 0

export function checkInputs() {
    const inputs = $('*.input-login')

    if (next === 2) {
        inputs.each(index => {
            inputs[index].value = ''
        })

        closeScreenConnect()
        return next = 0
    }

    next = 0

    inputs.each((index, item) => {
        item.addEventListener('change', () => indentifyInputError(item, index))

        indentifyInputError(item, index)
    })
}

export function indentifyInputError(item, index) {
    const labelError = $('*.input-error')

    if (item.value === '') {
        labelError[index].classList.remove('display-disable')
    } else {
        labelError[index].classList.add('display-disable')
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
}