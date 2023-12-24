import { nextPage, closeScreenConnect, openScreenConnect } from "./utilizadades.js"

export function screenLogin() {
    openScreenConnect(closeScreenConnect)

    $('.btn-login').on('click', nextPage)
}