import { Injectable, signal, Signal, WritableSignal } from '@angular/core';
import { Character, RickAndMorti } from '../models/character';
import { of, Observable, throwError } from 'rxjs';
import { httpResource } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CharacterDataService {
  private baseurl = 'https://rickandmortyapi.com/api';
  private mockCharacters: Map<number, Character> = new Map([
    [
      1,
      {
        id: 1,
        name: 'Aragorn',
        description: 'Heir of Isildur and King of Gondor.',
      },
    ],
    [
      2,
      {
        id: 2,
        name: 'Legolas',
        description: 'Elven prince and skilled archer.',
      },
    ],
    [
      3,
      {
        id: 3,
        name: 'Gimli',
        description: 'Dwarf warrior and son of Glóin.',
      },
    ],
  ]);

  get charactersArray(): Character[] {
    return Array.from(this.mockCharacters.values());
  }

  characters: WritableSignal<Character[]> = signal(this.charactersArray);

  getCharacters(): Observable<Character[]> {
    const characters: Character[] = this.charactersArray;
    return of(characters);
  }

  getCharacterById(id: number) {
    return this.mockCharacters.get(id);
  }

  addCharacter(character: Character) {
    this.mockCharacters.set(character.id, character);
    this.characters.set(this.charactersArray);
    return of(character);
  }

  updateCharacter(character: Character): Observable<Character> {
    if (!this.mockCharacters.has(character.id)) {
      return throwError(() => 'Character not found');
    }

    this.mockCharacters.set(character.id, { ...character });
    this.characters.set(this.charactersArray);
    return of(character);
  }

  deleteCharacter(id: number): Observable<Character> {
    const deletedCharacter = this.mockCharacters.get(id);
    if (!deletedCharacter) {
      return throwError(() => 'Character not found');
    }
    this.mockCharacters.delete(id);
    this.characters.set(this.charactersArray);
    return of(deletedCharacter);
  }

  getNextId(): number {
    return this.mockCharacters.size > 0
      ? Math.max(...Array.from(this.mockCharacters.keys())) + 1
      : 1;
  }

  getCharacterWithSignal(id: Signal<number>) {
    return httpResource<RickAndMorti>(
      () => `${this.baseurl}/character/${id()}`
    );
  }
}
