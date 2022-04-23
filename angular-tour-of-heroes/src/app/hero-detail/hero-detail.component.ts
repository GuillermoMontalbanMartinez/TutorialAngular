import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { Poderes } from '../poderes';
import { FormGroup, FormBuilder } from '@angular/forms';
import { catchError, Observable, tap } from 'rxjs';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  //hero: Hero | undefined;
  hero = {} as Hero;
  poderes: Poderes[] = [];
  formulario!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {
    this.createFormulario();
  }

  ngOnInit(): void {
    this.getHero();
  }

  createFormulario() {
    this.formulario = this.formBuilder.group({
      nombre: '',
      tipo: '',
      valor: 0,
    });
  }

  /**
  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }
  */

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => {
        this.hero = hero;
        fetch(`http://gateway.marvel.com/v1/public/characters?name=${this.hero.name}&ts=1000&apikey=22f44441f9044ca5c2c491e69712d634&hash=9b726f002a9a8f6d0a06382cbfe3bb83`)
        .then(response => response.json())
        .then(json =>{
          var path= json.data.results[0].thumbnail.path;
          var extension = json.data.results[0].thumbnail.extension;
          this.hero.image = path + "." + extension;
    });
      });

  }



  goBack(): void {
    this.location.back();
  }

  removerPower(power: Poderes) {
    if (!this.hero) return;
    const i = this.hero.poder.indexOf(power);
    this.hero.poder.splice(i, 1);
  }

  addPower() {
    this.hero?.poder.push(this.formulario.value);
  }

  save(): void {
    if(this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }
}
