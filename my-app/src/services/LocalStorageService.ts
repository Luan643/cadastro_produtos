import { Produto } from "./ProdutoService"

const STORAGE_ID = 'STORAGE_ID'

export interface LocalStorageData {
    id?: string
}

function getId() {
    let currentId = localStorage.getItem(STORAGE_ID)
    if (!currentId) {
        localStorage.setItem(STORAGE_ID, "0")
        currentId = "0"
    }
        
    const newId = Number(currentId) + 1
    localStorage.setItem(STORAGE_ID, String(newId))
    return String(newId)
}

export class LocaStorageService<T extends LocalStorageData> {

    keyName: string

    constructor(keyName: string) {
        this.keyName = keyName
    }

    salvar(data: LocalStorageData): T {
        let produtos = localStorage.getItem(this.keyName)

        if (!produtos) {
            localStorage.setItem(this.keyName, '[]')
            produtos = '[]'
        }

        const newProdutos = [...JSON.parse(produtos as any), {...data, id: getId()}]
        localStorage.setItem(this.keyName, JSON.stringify(newProdutos))
        return newProdutos[newProdutos.length - 1]
    }

    retornar(id: string): T | undefined {
        const produtos = localStorage.getItem(this.keyName)
        if (produtos) 
            return JSON.parse(produtos).find((p: T) => p.id === id)
        
    }

    remover(id: string) {
        const produtos = localStorage.getItem(this.keyName)
        if (produtos) {
            const newArray = JSON.parse(produtos).filter((p: any) => p.id !== id)
            localStorage.setItem(this.keyName, JSON.stringify(newArray))
        }
    }

    listar(): T[] {
        return JSON.parse(localStorage.getItem(this.keyName) || '[]')
    }

    atualizar(value: T) {
        const data = this.listar()

        const index = data.findIndex((p: T) => p.id === value.id!!)
        if (index >= 0) {
            data[index] = value
            localStorage.setItem(this.keyName, JSON.stringify(data))
        } else {
            throw 'O registro não existe'
        }
        return value
    }

}