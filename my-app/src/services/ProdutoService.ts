import { LocaStorageService, LocalStorageData } from "./LocalStorageService"

const LOCAL_STORAGE_KEY = 'PRODUTO'

export interface Produto extends LocalStorageData {
    nome: string
    preco: number
    anoSafra: number
    anoPeriodo: number;
    mesPeriodo: number;
}

export class ProdutoService {

    localStorageService = new LocaStorageService<Produto>(LOCAL_STORAGE_KEY)

    async salvarProduto(produto: Produto) {
        return this.localStorageService.salvar(produto)
    }

    async retornarProduto(id: string) {
        return this.localStorageService.retornar(id)
    }

    async removerProduto(id: string) {
        this.localStorageService.remover(id)
    }

    async listarProdutos() {
        return this.localStorageService.listar()
    }

    async atualizar(p: Produto) {
        return this.localStorageService.atualizar(p)
    }

}