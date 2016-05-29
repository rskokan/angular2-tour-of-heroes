import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';

import { Hero } from './hero';
import { HeroService } from './hero.service';

@Component({
    selector: 'my-hero-detail',
    templateUrl: '/app/hero-detail.component.html',
    styleUrls: ['app/hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;
    @Output() close = new EventEmitter();
    navigated: boolean;
    error: any;

    constructor(
        private heroService: HeroService,
        private routeParams: RouteParams
    ) { }

    ngOnInit() {
        if (this.routeParams.get('id') !== null) {
            let id = +this.routeParams.get('id'); // + is to convert string to number
            this.navigated = true;
            this.heroService.get(id)
                .then(hero => this.hero = hero);
        } else {
            this.navigated = false;
            this.hero = new Hero();
        }
    }

    save() {
        this.heroService.save(this.hero)
            .then(hero => {
                this.hero = hero;
                this.goBack();
            })
            .catch(error => this.error = error); //TODO: Display error msg
    }

    goBack(savedHero: Hero = null) {
        this.close.emit(savedHero);
        window.history.back();
    }
}