const WORD_LENGTH = 5;
const MAX_ATTEMPT = 6;

const DICTIONARRY_WORD = [
  'table', 'chose', 'serre', 'piano', 'louve',
  'morce', 'vache', 'fleur', 'jouer', 'plage',
  'noble', 'corde', 'voler', 'sable', 'ombre',
  'rival', 'crane', 'photo', 'glace', 'plume',
  'porte', 'livre', 'jaune', 'rouge', 'noire',
  'boite', 'chute', 'arbre', 'pomme', 'pluie'
];


export interface Attempt {
  guess: string;
  result: Feedback[];
}

export type Feedback = 'correct' | 'present' | 'absent';

export default class WordleGameClass{

    private newWord: string;
    private attempts: Attempt[];

    constructor(newWord: string | null){
      if (newWord && newWord.length !== WORD_LENGTH) {
        throw new Error(`Le mot cible doit faire ${WORD_LENGTH} lettres.`);
      }

      // Si un mot a été décidé
      if(newWord){
          this.newWord = newWord.toLowerCase();
          this.attempts = [];
      } else {
        // Sinon on prend un mot aléatoire du dictionnaire
        
        this.newWord = this.generateWord().toLowerCase();
        this.attempts = [];
      }
    }

    // Vérifie si le mot proposé est valide - ne contient que des lettres majuscules ou miniscules
    isValidWord(word: string): boolean {
        return word.length === WORD_LENGTH && /^[a-zA-Z]+$/.test(word);
    }

    // Test d'un essai en retour d'un Feeback pour aider l'utilisateur
    checkGuess(guess: string) : Feedback[]{

        if (!this.isValidWord(guess)){
            throw new Error(`Le mot doit contenir ${WORD_LENGTH} lettres`)
        }

        if(this.isGameOver()){
            throw new Error("Vous n'avez plus d'essais disponible")
        }

        // Transformation en minuscule pour éviter la casse
        guess = guess.toLowerCase();
        const result : Feedback[] = Array(WORD_LENGTH).fill('absent')

        // On "disséque" les mots pour pouvoir vérifier leur correspondance
        const targetArray: (string | null)[] = this.newWord.split('');
        const guessArray: string[] = guess.split('');
        
        //Vérification des lettres
        for (let i = 0; i < WORD_LENGTH; i++) {
            if (guessArray[i] === targetArray[i]) {
                result[i] = 'correct';
                targetArray[i] = null; // Suppression de la lettre de la target pour éviter le double comptage
            }
        }

        //Vérification sur la lettre est présente dans le mot
         // Vérifie les lettres mal placées ('present')
        for (let i = 0; i < WORD_LENGTH; i++) {
            if (result[i] === 'absent' && targetArray.includes(guessArray[i])) {
                result[i] = 'present';
                targetArray[targetArray.indexOf(guessArray[i])] = null;
            }
        }

        this.attempts.push({guess,result})

        return result
    }

  // Vérifie si la partie est terminée
  isGameOver(): boolean {
    return this.attempts.length >= MAX_ATTEMPT || this.isWinner();
  }

  // Vérifie si le joueur a gagné
  isWinner(): boolean {
    return this.attempts.some(attempt => attempt.result.every(r => r === 'correct'));
  }

  // Récupère les essais effectués
  getAttempts(): Attempt[] {
    return this.attempts;
  }

  getTargetWord(): string {
    return this.newWord;
  }

  // Nombre de tentatives restantes
  remainingAttempts(): number {
    return MAX_ATTEMPT - this.attempts.length;
  }

  resetAttempts():void{
    this.attempts = [];
    this.newWord = this.generateWord().toLowerCase();
  }

  generateWord() : string {
      const randNumber = Math.floor(Math.random() * (DICTIONARRY_WORD.length - 1))
      const selectedWord = DICTIONARRY_WORD[randNumber];
      return selectedWord;
  }

}