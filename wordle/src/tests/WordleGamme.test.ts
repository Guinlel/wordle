import { describe, it, expect, beforeEach } from 'vitest';
import WordleGameClass from '@/classes/wordleClass';

describe('WordleValidator',()=>{
    let game: WordleGameClass;

    beforeEach(()=>{
        game = new WordleGameClass(null);
    })

    describe('isWordValid',()=>{
        it('Accepte les mots de 5 lettres',()=>{
            expect(game.isValidWord('actor')).toBe(true);
        })

        it('Refuse les mots de moins de 5 lettres',()=>{
            expect(game.isValidWord('act')).toBe(false);
        })

        it('Refuse les mots de plus de 5 lettres',()=>{
            expect(game.isValidWord('actors')).toBe(false);
        })

        it('Refuse les mots ne contenant pas que des lettres',()=>{
            expect(game.isValidWord('ac1or')).toBe(false);
        })
    })
})

describe('GameLogic',()=>{
    let game : WordleGameClass;

    beforeEach(()=>{
        game = new WordleGameClass('atlas');
    })

    describe('CheckGuess',()=>{
        it('Identifie que toutes les lettres sont correcte',()=>{
            const result = game.checkGuess('atlas');
            expect(result).toEqual(['correct','correct','correct','correct','correct']);
            expect(game.isWinner()).toBe(true);
        })

        it('Identifie les lettres mal placés',()=>{
            const result = game.checkGuess('laast');
            expect(result).toEqual(['present','present','present','present','present']);
        })

        it('Identifie les lettres non présente',()=>{
            const result = game.checkGuess('xxxxx');
            expect(result).toEqual(['absent','absent','absent','absent','absent'])
        })

        it('Gére les lettres en double',()=>{
            const result = game.checkGuess('agama');
            expect(result).toEqual(['correct','absent','present','absent','absent']);
        })
    })
})

describe('GameState',()=>{
    let game: WordleGameClass;

    beforeEach(()=>{
        game = new WordleGameClass('apple');
    })

       it("Met à jour les tentatives restantes", () => {
      game.checkGuess('angle');
      expect(game.getAttempts().length).toBe(1);
      expect(game.remainingAttempts()).toBe(5);
    });

    it("Arrête d'accepter les tentatives après la limite", () => {
      for (let i = 0; i < 6; i++) {
        game.checkGuess('wrong');
      }
      expect(game.getAttempts().length).toBe(6);
    });

    it('Détecte la fin de la partie', () => {
      for (let i = 0; i < 6; i++) {
        game.checkGuess('wrong');
      }
      expect(game.isGameOver()).toBe(true);
      expect(game.isWinner()).toBe(false);
    });

    it("Détecte quand le joueur gagne", () => {
      game.checkGuess('apple');
      expect(game.isWinner()).toBe(true);
    });

    it("Reset le nombre d'essaie",()=>{
      for (let i = 0; i < 6; i++) {
        game.checkGuess('wrong');
      }
      game.resetAttempts();
      expect(game.getAttempts().length).toBe(0)

    })
})