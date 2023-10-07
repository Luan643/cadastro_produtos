import styles from './styles.module.scss'

/**
 * Interface com as propriedades do componente
 * 
 * name: nome da tag do input
 * value: value da tag do input
 * onChange: onChange do input, objeto do evento { target: {name: string, value: string}}
 * placeholder: valor que aparece dentro do input vazio
 * label: nome que aparece acima do input
 * errorMessage: Mensagem de erro que aparece abaixo do input. Mensagem vazia é ignorada
 */
export interface InputProps {
    name: string,
    value?: any,
    onChange?: any,
    placeholder?: string
    label?: string
    errorMessage?: string
}

/**
 * Componente de input para aplicação
 * 1 - CSS padrão da aplicação
 * 2 - Apesentação/Modo de erros
 */
export function Input(props: InputProps) {

    /**
     * Retorna verdadeiro caso a mensagem de erro eteja vazio ou
     * falso caso exista mensagem de erro
     */
    function messageIsEmpty() {
        return props.errorMessage === undefined ||
            props.errorMessage === null ||
            props.errorMessage === ''
    }

    /**
     * Caso haja mensagem de error retorna ' error'
     * Caso amensagem esteja vazia, retorna ''
     * 
     * error: Classe do css que pinta a borda do input de vermelho e
     * coloca a fonte da tag p vermelha
     */
    function getErrorClass() {
        if (!messageIsEmpty())
            return ' ' + styles.error
        return ''
    }

    return (
        <div>
            {
                /**
                 * Se não tiver mensagem a className é 'inputForm'
                 * caso tenha mensagem, a className é 'inputForm error'
                 * 
                 * Se a class for erro, a borda do input fica vermelha e a tag p fica
                 * com a font vermelha
                 */
            }
            <label className={styles.inputForm + getErrorClass()}>
                {
                    /**
                     * Label que aparece acima do input
                     */
                }
                {props.label}
                {
                    /**
                     * Tag input do html recebendo os valores que foram passados 
                     * nos props a partir de quem usou o componente
                     */
                }
                <input
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    placeholder={props.placeholder}
                />

                {
                    /**
                     * hidden: A tag p fica invisível caso não haja mensagem
                     */
                }
                <p hidden={messageIsEmpty()}>{props.errorMessage}</p>
            </label>
        </div>
    )
}



