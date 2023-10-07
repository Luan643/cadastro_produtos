import { wait } from '@testing-library/user-event/dist/utils';
import { Produto, ProdutoService } from '../../services/ProdutoService';
import styles from './style.module.scss'
import { useState, useEffect } from 'react'
import {useParams} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Input } from '../../components/Input';

const REX_REMOVER_STR = /[^\d]/ig

interface ProdutoForm {
    nome: string;
    preco: string;
    anoSafra: number;
    anoPeriodo: string;
    mesPeriodo: string;
}

const initialValue: ProdutoForm = {
    nome: '',
    preco: '',
    anoSafra: 0,
    anoPeriodo: '',
    mesPeriodo: '',
}

const produtoService = new ProdutoService() 

export default function CadastroAtualizarProduto() {

    const params = useParams()
    const [form, setForm] = useState<ProdutoForm>(initialValue)
    const navigate = useNavigate()
    
    function anoPeriodoMask(value: string) {
        let ano = ''
        value = value.replace(/[^\d]/ig, '')

        if (!value)
            return ''

        if (Number(value) > 1) {
            ano = " anos"
        } else {
            ano = " ano"
        }
        return value + ano
    }

    function mesPeriodoMask(value: string) {
        let mes
        value = value.replace(/[^\d]/ig, '')

        if (!value || Number(value) >= 12)
            return ''

        if (Number(value) > 1) {
            mes = " meses"
        } else {
            mes = " mês"
        }

        return `${value} ${mes}`
    }

    function mask(inputName: string, value: string) {
        switch (inputName) {
            case 'anoPeriodo':
                return anoPeriodoMask(value)
            case 'mesPeriodo':
                return mesPeriodoMask(value)
            default:
                return value
        }
    }

    function onChange(evt: any) {
        const value = mask(evt.target.name, evt.target.value)
        setForm({ ...form, [evt.target.name]: value })
    }

    function salvar(){
        const produto: Produto = {
            id: params.editarId,
            nome: form.nome,
            preco: Number(form.preco.replace(REX_REMOVER_STR, '')),
            anoSafra: form.anoSafra,
            anoPeriodo: Number(form.anoPeriodo.replace(REX_REMOVER_STR, '')),
            mesPeriodo: Number(form.mesPeriodo.replace(REX_REMOVER_STR, ''))
        }
        
        if (params.editarId)
            produtoService.atualizar(produto)
        else
            produtoService.salvarProduto(produto)

        navigate('/produto/lista')
    }

    async function recuperarProduto(){
        const produto = await produtoService.retornarProduto(params.editarId!!)

        if (produto) {
            const newForm: ProdutoForm = {
                nome: produto.nome,
                preco: String(produto.preco),
                anoSafra: produto.anoSafra,
                anoPeriodo: anoPeriodoMask(String(produto.anoPeriodo)),
                mesPeriodo: mesPeriodoMask(String(produto.mesPeriodo))
            }

            setForm(newForm)
        }
    }

    useEffect(() => {
        recuperarProduto()
    }, [])

    return (
        <div className={styles.formCadastro}>
            <label className={styles.formLabel + ' ' + styles.pname} >
                NOME:{" "}
                <input className={styles.input} value={form.nome} type="text" placeholder="Digite o nome do produto" name="nome" onChange={onChange} />
            </label>

            <div className={styles.row + ' ' + styles.row2}>
                <label className={styles.formLabel} >
                    PREÇO:{" "}
                    <input className={styles.input} value={form.preco} type="text" placeholder="Digite o preço do produto" name="preco" onChange={onChange} />
                </label>

                <label className={styles.formLabel} >
                    ANO SAFRA:{" "}
                    <input className={styles.input} value={form.anoSafra} type="number" placeholder="Digite o ano safra" name="anoSafra" onChange={onChange} />
                </label>
            </div>

            <label className={styles.formLabel} >
                PERIODO SAFRA:{" "}
                <div className={styles.row + ' ' + styles.min}>
                    <input className={styles.input} value={form.anoPeriodo} type="text" placeholder="Anos" name="anoPeriodo" onChange={onChange} />
                    <input className={styles.input + ' ' + styles.paddinLeft} value={form.mesPeriodo} type="text" placeholder="Meses" name="mesPeriodo" onChange={onChange} />
                </div>
            </label>
            <button onClick={salvar}>{params.editarId? 'Atualizar': 'Salvar'}</button>
        </div>
    )
}