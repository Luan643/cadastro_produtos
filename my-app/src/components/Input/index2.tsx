import styles from "./styles.module.scss"

// interface com minha propriedades.
// objeto com as propriedades para usar no meu input
//  1. name: nome da tag Input
//  2. value: onde fica o que se digita no input

export interface InputProps {
    name: string,
    value?: any,
    onChange?: any,
    errorMessage?: string,
    placeholder?: string,
    label?: string
}

//minha propriedade onde vou criar meu input

export function Input2(props: InputProps) {

//função que retorna true ou false. Estou usando para controlar o hidden(mostra a tag na tela caso o resultado for true, caso for false = display none)
    function verificarErro() {
        if (props.errorMessage === undefined || null || '') {
            return true
        } else {
            return false
        }
    }

//função para controlar se o meu input vai acrescentar a class "error" ou não, depedendo se a condição do if for verdadeira ou não
//  1. condição verdadeira: não muda nada
//  2. condição falsa: acrescenta a class CSS

    function alertErro() {
        if (verificarErro()) {
            return ''
        } else {
            return ' ' + styles.error
        }
    }

//Meu retorn    
    return (<div>
        <label className={styles.inputForm + alertErro()}>
            {props.label}
            <input name={props.name} value={props.value} onChange={props.onChange} placeholder={props.placeholder} />
            <p hidden={verificarErro()}>{props.errorMessage}</p>
        </label>
    </div>)
}