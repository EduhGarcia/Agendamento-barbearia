import { screenLogin } from "./login.js"
import { screenSignin } from "./signin.js"

const btnLogin = $('#log-in')
const btnSignin = $('#sign-in')

btnLogin.on('click', screenLogin)
btnSignin.on('click', screenSignin)