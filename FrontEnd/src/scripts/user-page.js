export const server = axios.create({
    baseURL: 'http://localhost:3001'
})

export const messageSignin = $('.message-signin')

server.get('/message').then((respose) => {
    $('.username').text(respose.data.name)
    if (respose.data.alertAnnimation !== '') {
        messageSignin.text(respose.data.alertAnnimation)
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