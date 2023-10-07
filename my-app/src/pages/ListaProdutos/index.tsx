import { useState, useEffect } from 'react'
import { Produto, ProdutoService } from '../../services/ProdutoService'
import { useNavigate } from 'react-router-dom'
import styles from './style.module.scss'

const produtoService = new ProdutoService()

export default function ListaProduto() {

    const [produtos, setProdutos] = useState<Produto[]>([])
    const navigate = useNavigate()

    async function carregarProdutos() {
        const storageProdutos = await produtoService.listarProdutos()
        console.log(storageProdutos)
        setProdutos(storageProdutos)
    }

    function irParaPaginaAtualizacao(id: string){
        navigate('/produto/editar/' + id)
    }

    useEffect(() => {
        carregarProdutos()
    }, [])

    function listar(): any {
        return produtos.map(function (e: Produto) {
            return (
                <div className={styles.linha}>
                    <p>{e.nome}</p>
                    <p>{e.preco}</p>
                    <p>{e.anoSafra}</p>
                    <div className={styles.button}>
                        <button onClick={()=>irParaPaginaAtualizacao(e.id!!)}>Atulizar</button>
                        <button>Excluir</button>

                    </div>
                </div>
            )
        })
    }

    function renderizarHeader() {
        return (<div className={styles.linha}>
            <p>Nome</p>
            <p>Preço</p>
            <p>Ano Safra</p>
        </div>)
    }

    return (
        <div className={styles.divPrincipal}>
            <h1>Lista de produtos</h1>
            {renderizarHeader()}
            {listar()}
        </div>
    )
}