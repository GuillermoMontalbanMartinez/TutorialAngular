import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { Poderes } from '../poderes';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;
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

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe((hero) => (this.hero = hero));
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
}
