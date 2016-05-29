import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Hero } from './hero';

@Injectable()
export class HeroService {
    constructor(
        private http: Http
    ) { }

    private heroesUrl = 'app/heroes';

    getAll(): Promise<Hero[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data)
            .catch(this.handleError);
    }

    get(id: number) {
        return this.getAll()
            .then(heroes => heroes.filter(hero => hero.id === id)[0]);
    }

    save(hero: Hero): Promise<Hero> {
        if (hero.id) {
            return this.update(hero);
        }
        return this.add(hero);
    }

    add(hero: Hero): Promise<Hero> {
        return this.http.post(this.heroesUrl, JSON.stringify(hero), { headers: this.appJsonHeader() })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    update(hero: Hero) {
        return this.http.put(this.heroUrl(hero), JSON.stringify(hero), { headers: this.appJsonHeader() })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    delete(hero: Hero) {
        return this.http.delete(this.heroUrl(hero), this.appJsonHeader())
            .toPromise()
            .catch(this.handleError)
    }

    private heroUrl(hero: Hero) {
        return `${this.heroesUrl}/${hero.id}`;
    }

    private appJsonHeader() {
        return new Headers({
            'Content-Type': 'application/json'
        });
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
