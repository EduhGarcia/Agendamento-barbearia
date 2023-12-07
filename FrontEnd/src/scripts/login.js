import { checkInputs, closeScreenConnect, openScreenConnect } from "./utilizadades.js"

export function screenLogin() {
    openScreenConnect(closeScreenConnect)

    $('.btn-enter').on('click', checkInputs)
}