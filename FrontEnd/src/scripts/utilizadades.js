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
        if (inputs.length === 3 && inputs[1].value.length < 6) {
            labelError[1].classList.remove('display-disable')
            labelError[1].innerText = 'A senha deve ter no minimo 6 digitos'
        } else {
            const email = inputs[0].value
            const password = inputs[1].value
            const name = inputs[2] !== undefined ? inputs[2].value : ''

            if ($('.title-conneting').text() === 'Página de cadastro') {
                server.post('/cadastro', {
                    email,
                    password,
                    name
                }).then((response) => {
                    emailUsing.removeClass('display-disable')
                })
            } else {
                server.post('/login', {
                    email,
                    password
                }).then((response) => {
                    if (response.data.message.toUpperCase() === 'SENHA INCORRETA') {
                        labelError[1].innerText = 'senha incorreta';
                        labelError[1].classList.remove('display-disable')
                        
                    } else if (response.data.message.toUpperCase() === 'USUÁRIO NÃO ENCONTRADO') {
                        labelError[0].innerText = 'Usuário não encontrado';
                        labelError[0].classList.remove('display-disable')
                        
                    }

                    console.log(response);

                    return
                })

                clearValueInput()
                // window.location.href = './usuario.html'
                next = 0
            }
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