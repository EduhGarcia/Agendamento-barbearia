import { messageSignin, pageHref } from "./user-page.js"

const server = axios.create({
    baseURL: 'http://localhost:3001'
})

const DataCorteDeCabelo = $('.services')
const select = $('.options-services')
const typeService = $('.type-services')
const containerTimes = $('.container-times')
const btnScheduling = $('.btn-confirm-scheduling')

let timeActually = 5.30
let tranformTime = timeActually + ""
const dataAtual = new Date
const infosSchediling = {}

const dataFormatada = dataAtual.getFullYear() + '-' + (dataAtual.getMonth() + 1) + '-' + dataAtual.getDate()

while (timeActually < 19.00) {
    let stringTimeActually = ''

    if (tranformTime[2] == '3' || tranformTime[3] == '3') {
        timeActually += 0.70

        tranformTime = timeActually < 10.0 ? "0" + timeActually.toFixed(2) :
            timeActually.toFixed(2) + ""

        for (let i = 0; i < tranformTime.length; i++) {
            if (tranformTime[i] === '.') {
                stringTimeActually += ':'
            } else {
                stringTimeActually += tranformTime[i]
            }
        }

    } else {
        timeActually += 0.30

        tranformTime = timeActually < 10.0 ? "0" + timeActually.toFixed(2) :
            timeActually.toFixed(2) + ""

        for (let i = 0; i < tranformTime.length; i++) {
            if (tranformTime[i] === '.') {
                stringTimeActually += ':'
            } else {
                stringTimeActually += tranformTime[i]
            }
        }
    }

    containerTimes.append(`<button class="time">${stringTimeActually}</button>`)
}

identifyTimeSelected()

DataCorteDeCabelo.prepend(`
    <div class="haircut-date">
        <label for="input-date">Data do agendamento</label>
        <input id="input-date" type="date" min="${dataFormatada}">
    </div>
`)

$('#input-date').val(dataFormatada)

select.on('change', screenTypeServices)
btnScheduling.on('click', validateData)

function screenTypeServices() {
    const valueTotal = $('.value-total')
    const option = $('.services :selected')
    let countValue = 0

    typeService.html('<option id="default-option" class="placeholder-option">Escolha um tipo</option>')

    if (option[0].innerText.toUpperCase() === 'CABELO') {
        $('#option-placeholder').addClass('placeholder-option')

        typeService.append(`
        <option>Corte infantil</option>
        <option>Corte degradê</option>
        <option>Corte social</option>
        <option>Corte militar</option>
        <option>Barba + corte degradê em V</option>
        `)

        countValue = 30
    } else if (option[0].innerText.toUpperCase() === 'BARBA') {
        typeService.append(`
        <option>Barba com acabamento</option>
        <option>Barba tradicional</option>
        `)

        countValue = 30
    } else {
        typeService.append(`
        <option>Barba + corte social</option>
        <option>Barba + corte degradê</option>
        <option>Barba + corte social</option>
        <option>Barba + corte degradê em V</option>
        `)

        countValue = 60
    }

    valueTotal.text(`Valor: R$ ${countValue.toFixed(2)}`)
}

function validateData() {
    const option = $('.services :selected')
    const timeSelect = $('.container-times .time-selected').text()

    if (option[0].id === 'default-option' || option[1].id === 'default-option' ||
        timeSelect === '') {

        const alertError = $('.alert-error')
        alertError.addClass('active-alert')

        setTimeout(() => {
            alertError.removeClass('active-alert')
        }, 1800)
    } else {
        confirmScheduling(option, timeSelect)
    }
}

function confirmScheduling(serviceInfo, timeSelect) {
    const mainContent = $('main').html()

    printDate()
    $('.service').text(serviceInfo[0].innerText)
    $('.time-confirm').text(timeSelect + ' horas')

    infosSchediling.time = timeSelect
    infosSchediling.service = serviceInfo[0].innerText
    infosSchediling.typeService = serviceInfo[1].innerText

    $('.confirm-infos').addClass('diplay-enable')
    $('main').html('')

    $('.btn-cancel').on('click', () => {
        $('main').html(mainContent)

        backToScheduling(serviceInfo.id)
        identifyTimeSelected()
    })

    $('.btn-confirm-infos').on('click', () => {
        const { date, time, service, typeService } = infosSchediling

        server.post('/agendamento', {
            date,
            time,
            service,
            typeService
        })

        pageHref('./usuario.html')
    })
}

function identifyTimeSelected() {
    $('*.time').map((index, item) => {
        item.addEventListener('click', () => {
            $('.container-times .time-selected').removeClass('time-selected')
            item.classList.add('time-selected')
        })
    })
}

function backToScheduling(idSelect) {
    $(`#${idSelect}`).attr('selected', () => {
        return "true"
    })

    $('#input-date').val(dataFormatada)
    $('.confirm-infos').removeClass('diplay-enable')
    $('.btn-confirm-scheduling').on('click', validateData)
}

function printDate() {
    const dateValue = $('#input-date').val()
    const date = new Date(dateValue)
    let dateFormatBR = date.toLocaleString('pt-BR', { timeZone: 'UTC' });
    let dateFormatString = ''

    for (let i = 0; i < 10; i++) {
        dateFormatString += dateFormatBR[i]
    }

    $('.confirm-date').text(dateFormatString)
    infosSchediling.date = date
}