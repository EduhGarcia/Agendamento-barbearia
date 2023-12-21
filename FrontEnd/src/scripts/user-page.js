export const messageSignin = $('.message-signin')
messageSignin.addClass('success-signin')

setTimeout(() => {
    messageSignin.removeClass('success-signin')
}, 2200)

$('.option-exit').on('click', () => pageHref('./'))
$('.option-schedule').on('click', () => pageHref('./agendamento.html'))

export function pageHref(location) {
    window.location.href = location
}