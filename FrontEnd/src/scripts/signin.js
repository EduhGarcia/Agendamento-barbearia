import { closeScreenConnect, connecting, nextPage, openScreenConnect } from "./utilizadades.js"

export function screenSignin() {
    const screenDefault = connecting.html()

    $('.default-btn').remove()
    $('.title-conneting').text('Página de cadastro')

    $('.info-user').append(`
    <div class="info-input">
       <label for="name">Nome</label>
       <input class="input-login" id="name" type="text">
       <label class="input-error display-disable" for="name">* Campo vazio</label>
    </div>
    
    <p class="email-using display-disable">O Email já está em uso</p>`)

    connecting.append('<button class="default-btn btn-signin">Cadastrar</button>')

    $('.btn-signin').on('click', () => {
        nextPage()
    })

    openScreenConnect(() => closeSignin(screenDefault))
}

function closeSignin(screen) {
    connecting.html(screen)
    closeScreenConnect()
}