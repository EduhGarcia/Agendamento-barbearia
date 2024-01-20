export const connecting = $('.connecting')
const main = $('main')

let next = 0

const server = axios.create({
    baseURL: '11.000.111.00'
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
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (inputs.length === 3) {
            console.log(email);
            if (!emailRegex.test(email)) changeTextLabel('Email inválido', labelError[0]);
            
            if (inputs[1].value.length < 6) changeTextLabel('A senha deve ter no minimo 6 digitos', labelError[1])
            
            if ($('.info-user .info-input *.display-disable').length !== 3) return;
            
            server.post('/cadastro', {
                email,
                password,
                name
            }).then(response => {
                response.data.message === 'Usuário criado' ? userAllowed() : 
                emailUsing.removeClass('display-disable')
            })
        } else {
            console.log(email)
            server.post('/login', {
                email,
                password
            }).then(response => {
                console.log(response)
                const messageLabel = response.data.message
                let label = messageLabel === 'Senha incorreta' ? labelError[1] : labelError[0]

                messageLabel === 'Usuário encontrado' ? userAllowed() : 
                changeTextLabel(messageLabel, label)
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
    window.location.href += './usuario.html'
    clearValueInput()
    return next = 0
}

export function openScreenConnect(functionButton) {
    connecting.removeClass('display-disable')
    main.addClass('filterBlur')

    $('.icon-exit').on('click', functionButton)
}

export function hideOrShowPassword() {
    const iconEye = $('#icon-eye')

    iconEye.on('click', (item) => {
        
        if ($('.fa-eye').length !== 0) {
            $('#password').attr('type', 'text')
    
            iconEye.removeClass().addClass('fa-regular fa-eye-slash')
        } else {
            $('#password').attr('type', 'password')
        
            iconEye.removeClass().addClass('fa-regular fa-eye')
        }         
    })  
}

export function closeScreenConnect() {
    connecting.addClass('display-disable')
    main.removeClass('filterBlur')

    removeLabelError()

    $('#password').attr('type', 'password')
    $('#icon-eye').removeClass().addClass('fa-regular fa-eye')
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