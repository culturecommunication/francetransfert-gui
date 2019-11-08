import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators'
import { Auteur } from '../interfaces/auteur.interface';

@Injectable()
export class AuteursService {

    private auteursBehaviorSubject = new BehaviorSubject<Auteur[] | null>([])

    auteurs$ = this.auteursBehaviorSubject.asObservable()

    // auteurs: Auteur[] = []
    constructor(private http: HttpClient) { }

    /**
     * Mettre à jour la liste des auteurs
     */
    updateListeAuteurs(): void {
        this.http.get<Auteur[]>('api/auteurs')
            .subscribe(data => { this.auteursBehaviorSubject.next(data) },
                (error) => {
                    console.error(error)
                })
    }

    /**
     * Retourner la liste des auteurs
     */
    getAuteurs(): Observable<Auteur[]> {
        return this.http.get<Auteur[]>('api/auteurs')
    }

    /**
     * Ajouter un auteur.
     * 
     * @param auteur Auteur
     */
    addAuteur(auteur: Auteur): Observable<Auteur> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<Auteur>('api/auteurs', auteur, { headers: headers })
            .pipe(tap(() => this.updateListeAuteurs()))
    }

    /**
     * Supprimer un auteur.
     * 
     * @param id Identifiant de l'auteur 
     */
    deleteAuteur(id: number): void {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        const url: string = 'api/auteurs/' + id;
        this.http.delete(url, { headers: headers })
            .subscribe(() => {
                this.updateListeAuteurs()
            },
                (error) => {
                    console.error(error)
                })
    }
}