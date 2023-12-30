export const server = axios.create({
    baseURL: 'http://localhost:3001'
})

export const messageSignin = $('.message-signin')

server.get('/message').then((respose) => {
    if (respose.data.message !== '') {
        messageSignin.text(respose.data.message)
        messageSignin.addClass('success-signin')

        setTimeout(() => {
            messageSignin.removeClass('success-signin')
        }, 2200)
    }
})

$('.option-exit').on('click', () => pageHref('./'))
$('.option-schedule').on('click', () => pageHref('./agendamento.html'))

export function pageHref(location) {
    window.location.href = location
}