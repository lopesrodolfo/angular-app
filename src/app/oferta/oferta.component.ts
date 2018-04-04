import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Oferta } from '../shared/oferta.model'
import { OfertasService } from '../ofetas.service';
import { CarrinhoService } from '../carrinho.service';



@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {

  /*
    private tempoObservableSubscription: Subscription
    private meuObservableTesteSubscription: Subscription
    */

  public oferta: Oferta

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {

    this.route.params.subscribe((parametros: Params) => {

      this.ofertasService.getOfertaPorId(parametros.id)
        .then((oferta: Oferta) => {
          this.oferta = oferta
        })

    })



    /*
  this.route.params.subscribe(
    (parametro: any) => { console.log(parametro) },
    (erro: any) => { console.log(erro) },
    () => { console.log("Processamento foi classificado como concluído!") },
  )
  


    let tempo = Observable.interval(2000)

    this.tempoObservableSubscription = tempo.subscribe((intervalo: number) => {
      console.log(intervalo)
    })



    // observable (observável)
    let meuObservableTeste = Observable.create((observer: Observer<number>) => {
      observer.next(1)
      observer.next(2)
      observer.complete()
    })

    // observable (observador)
    this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
      (resultado: number) => console.log(resultado + 10),
      (erro: string) => console.log(erro),
      () => console.log("A stream foi finalizada")
    )

    */


  }


  ngOnDestroy(): void {
    //this.meuObservableTesteSubscription.unsubscribe()
    //this.tempoObservableSubscription.unsubscribe()
  }


  public adicionarItemCarrinho(): void {
    this.carrinhoService.incluirItem(this.oferta)

    console.log(this.carrinhoService.exibirItens())
  }


}
