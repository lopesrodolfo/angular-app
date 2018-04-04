import ItemCarrinho from "./shared/item-carrinho.model";
import { Oferta } from "./shared/oferta.model";

class CarrinhoService {


    public itens: ItemCarrinho[] = []

    public exibirItens(): ItemCarrinho[] {
        return this.itens
    }

    public incluirItem(oferta: Oferta): void {
        console.log("Oferta recebida no cerviço ", oferta)
    }

}

export default CarrinhoService