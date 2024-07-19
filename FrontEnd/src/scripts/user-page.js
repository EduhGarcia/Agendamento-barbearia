import { dateFormat } from "./agender.js"

const server = axios.create({
    baseURL: 'https://agendamento-barbearia-production.up.railway.app'
})

const containerMessage = $('.container-message')

$('.option-exit').on('click', () => pageHref('./'))
$('.option-schedule').on('click', () => pageHref('./agendamento.html'))
$('.option-cancel-schedule').on('click', optionCancelScheduling)
$('.option-historic').on('click', historic)

server.get('/message').then(response => {
    $('.username').text(response.data.name)

    if (response.data.alertAnnimation !== '') {
        containerMessage.text(response.data.alertAnnimation)
        containerMessage.addClass('success-message')

        setTimeout(() => {
            containerMessage.removeClass('success-message')
        }, 2200)
    }
})

function optionCancelScheduling() {
    setScreenFloat('habilitar')

    $('.title-screen-float').text('Agendamentos disponíveis')
    $('.query-scheduling').append('<p class="messageAttention">⚠️ Nao é possivel cancelar o agendamento no mesmo dia</p>')

    server.get('/agendamento').then(response => {
        let schedulingsAvailables = false
        $('.icon-exit').on('click', setScreenFloat)

        if (response.data.length !== undefined) {
            response.data.map((item) => {
                const data = convertData(item.data_agendada)
                const datePermited = certifyDate(data)

                if (datePermited) {
                    $('.container-historic').append(`
                    <li class="item-historic">
                        <span>Data</span>: ${data} 
                        <span>Horário</span>: ${item.horario} <br/>
                        <span>Serviço</span>: ${item.servico} <br/>
                        <span>Tipo de serviço</span>: ${item.tipo_servico}
                        <abbr title="Cancelar o agendamento">
                            <i id="${item.id}" class="fa-solid fa-trash"></i>
                        </abbr>
                    </li>
                    `)

                    schedulingsAvailables = true
                }
            })

            if (schedulingsAvailables) {
                $('.fa-trash').on('click', (i) => trashScheduling(i,
                    $('.container-historic').html()))
            }
        }

        if (!schedulingsAvailables) {
            $('.container-historic').html(`
            <li class="not-found">Nenhum agendamento disponível para cancelar</li>
            `)
        }
    })
}

function trashScheduling(i, HistoricContent) {
    $('.container-historic').html(HistoricContent)
    containerMessage.css("background-color", "darkred")

    const itemSelected = $(`.container-historic #${i.target.id}`).parent().parent()
    const itemSelectedContent = itemSelected.html()

    itemSelected.html(`
    <p>Você deseja cancelar o agendamento?</p>
    <div>
        <button class="btn-back">Voltar</button>
        <button class="cancel-scheduling">Cancelar Agendamento</button>
    </div>
    `)

    itemSelected.css("padding", "9px")

    $('.fa-trash').on('click', (i) => trashScheduling(i, HistoricContent))

    $('.btn-back').on('click', () => {
        itemSelected.html(itemSelectedContent)
        itemSelected.css("padding-right", "30px")
        $('.fa-trash').on('click', (i) => trashScheduling(i, HistoricContent))
    })

    $('.cancel-scheduling').on('click', () => {
        setScreenFloat()

        server.delete('/agendamento/' + i.target.id).then(response => {
            containerMessage.text(response.data.message)
            containerMessage.addClass('success-message')

            setTimeout(() => {
                containerMessage.removeClass('success-message')
            }, 2200)
        })
    })
}

export function pageHref(location) {
    window.location.href = location
}

function certifyDate(data) {
    const dateFormatBR = convertData(dateFormat)

    if (dateFormatBR.slice(6, 10) < data.slice(6, 10)) {
        return true
    } else if (dateFormatBR.slice(6, 10) > data.slice(6, 10)) {
        return false
    } else if (dateFormatBR.slice(3, 5) <= data.slice(3, 5)) {
        if (dateFormatBR.slice(3, 5) === data.slice(3, 5)) {
            if (dateFormatBR.slice(0, 2) < data.slice(0, 2)) return true

            return false
        }
        return true
    }

    return false
}

function historic() {
    setScreenFloat('habilitar')

    server.get('/agendamento').then(response => {
        if (response.data.length !== undefined) {
            response.data.map((item) => {
                const data = convertData(item.data_agendada)

                $('.container-historic').append(`
                    <li class="item-historic">
                        <span>Data</span>: ${data} 
                        <span>Horário</span>: ${item.horario} <br/>
                        <span>Serviço</span>: ${item.servico} <br/>
                        <span>Tipo de serviço</span>: ${item.tipo_servico}
                    </li>
                `)
            })
        } else {
            $('.container-historic').html(`
            <li class="not-found">Não há histórico de agendamento</li>
            `)
        }
    })

    $('.icon-exit').on('click', setScreenFloat)
}

function setScreenFloat(action) {
    if (action === 'habilitar') {
        $('.options-user').addClass('filterBlur')
        $('.query-scheduling').addClass('display-enable')
    } else {
        $('.options-user').removeClass('filterBlur')
        $('.query-scheduling').removeClass('display-enable')
        $('.container-historic').html('')
        $('.messageAttention').remove()
    }
}

function convertData(data) {
    const dia = data.slice(8, 10)
    const mes = '/' + data.slice(5, 7) + '/'
    const ano = data.slice(0, 4)

    return dia + mes + ano
}