import { Injectable } from '@angular/core';
import { Character } from '../models/character';

@Injectable({
  providedIn: 'root',
})
export class CharacterDataService {
  mockCharacters: Character[] = [
    {
      id: 1,
      name: 'Aragorn',
      description: 'Heir of Isildur and King of Gondor.',
    },
    {
      id: 2,
      name: 'Legolas',
      description: 'Elven prince and skilled archer.',
    },
    { id: 3, name: 'Gimli', description: 'Dwarf warrior and son of Glóin.' },
  ];

  getCharacters() {
    const characters: Character[] = this.mockCharacters;
    return Promise.resolve(characters);
  }

  getCharacterById(id: number) {
    return this.mockCharacters.find((character) => character.id === id);
  }

  addCharacter(character: Character) {
    // Generate a new id (incremental)
    const newId =
      this.mockCharacters.length > 0
        ? Math.max(...this.mockCharacters.map((c) => c.id)) + 1
        : 1;
    const newCharacter = { ...character, id: newId };
    this.mockCharacters.push(newCharacter);
    return newCharacter;
  }

  updateCharacter(updatedCharacter: Character) {
    const index = this.mockCharacters.findIndex(
      (c) => c.id === updatedCharacter.id
    );
    if (index !== -1) {
      this.mockCharacters[index] = { ...updatedCharacter };
      return this.mockCharacters[index];
    }
    return null;
  }
}
