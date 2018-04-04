import { Component, OnInit } from '@angular/core';
import { OfertasService } from '../ofetas.service';
import { Oferta } from '../shared/oferta.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import '../util/rxjs.extensions'


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  public subjectPesquisa: Subject<String> = new Subject<String>()

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa // retorno Oferta[]
      .debounceTime(1000) // Execulta depois de 1 segundo
      .distinctUntilChanged() // Executa apenas para termos distintos
      .switchMap((termo: String) => {

        if (termo == undefined || termo.trim() === '') {
          // Retornar um observable de array de ofertas vazio
          return Observable.of<Oferta[]>([])
        }

        return this.ofertasService.pesquisaOfertas(termo)
      })
      .catch((err: any) => {
        console.log(err)
        return Observable.of<Oferta[]>([])
      })

  }

  public pesquisa(termoDaBusca: String): void {
    this.subjectPesquisa.next(termoDaBusca)
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next()
  }

}
