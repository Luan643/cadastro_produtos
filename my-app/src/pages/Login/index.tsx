import { useState } from 'react';
import styles from './style.module.scss'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../components/Input';
import { Input2 } from '../../components/Input/index2';

interface LoginForm {
    usuario: string;
    senha: string
}

const valorInicial: LoginForm = {
    usuario: '',
    senha: ''
}

export default function Login() {

    const [login, setLogin] = useState<LoginForm>(valorInicial)
    const navigate = useNavigate()

    function onChange(evt: any) {
        const input = evt.target
        const inputName = input.name
        const value = input.value

        const newLoginValue: any = {
            usuario: login.usuario,
            senha: login.senha
        }

        newLoginValue[inputName] = value
        setLogin(newLoginValue)
    }

    function validarLogin() {
        if (login.usuario === "admin") {
            if (login.senha === "senha") {
                navigate('/produto/lista')
            } else {
                alert('Senha incorreta')
            }
        } else {
            alert('Usuário incorreto')
        }
    }



    return (
        <div className={styles.divPrincipal}>
            <h1>Login</h1>
            <label className={styles.campoInputNome}>
                Usuário:{" "}
                <input type="text" name='usuario' placeholder='Digite seu nome completo' onChange={onChange} />
            </label>
            <label className={styles.campoInputNome}>
                Senha:{" "}
                <input type="text" name='senha' placeholder='Digite sua senha' onChange={onChange} />
            </label>
            <label  className={styles.campoInputNome}>
                {login.usuario}
                <Input2 name='usuario' placeholder='Digite seu nome completo' onChange={onChange} label='Usuário' errorMessage='ERRO!!' />
            </label>
            <button onClick={validarLogin}>Login</button>
        </div>
    )
}

/*
Usuário: admin
Senha: senha

vai para listar
*/