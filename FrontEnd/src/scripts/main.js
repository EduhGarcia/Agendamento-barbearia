import { screenLogin } from "./login.js"
import { screenSignin } from "./signin.js"
import { hideOrShowPassword } from "./utilizadades.js"

$('#log-in').on('click', screenLogin)
$('#sign-in').on('click', screenSignin)

hideOrShowPassword()