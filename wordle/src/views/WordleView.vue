<template>
    <div>
        <HeaderWordle />
        <div class="main-container">
            <div>
                <CardWord v-if="attempts.length > 0" :initial-attempts="attempts" />
                <div class="input-btn-container">
                    <input class="input-word" placeholder="Devinez le mot secret" type="text" v-model="testWord">
                    <div class="button" @click="handleTestWord">Entrée</div>
                </div>
                <div v-if="isGameOver || isWinner" @click="resetAttempt" class="retry-button">Essayer un nouveau mot
                </div>
                <div v-if="remainingAttempts !== 0 && !isWinner">Il vous reste {{ remainingAttempts }} essais</div>
                <div v-if="isWinner">Bravo vous avez trouvé le mot avec succés</div>
                <div v-if="isGameOver">Aie ... Vous avez épuisé toute vos tentatives</div>
                <div v-if="errorMessage">{{ errorMessage }}</div>
                <div v-if="isGameOver">Le mot a deviner étais :
                    <p class="target-word">{{ targetWord }}</p>
                </div>
            </div>
            <ListAttempts :initial-attempts="attempts" />
        </div>

    </div>
</template>

<script setup lang="ts">
import WordleClassGame, { type Attempt } from '@/classes/WordleClass'
import { ref, watchEffect } from 'vue';
import CardWord from '@/components/CardWord.vue';
import ListAttempts from '@/components/ListAttempts.vue';
import HeaderWordle from '@/components/HeaderWordle.vue';

const game: WordleClassGame = new WordleClassGame(null);

const attempts = ref<Attempt[]>([]);

const testWord = ref<string>('')

const isWinner = ref<boolean>(false);

const isGameOver = ref<boolean>(false);

const remainingAttempts = ref<number>(6);

const errorMessage = ref<string | null>(null);

const targetWord = ref<string>('');

function handleTestWord() {
    if (!game.isValidWord(testWord.value)) {
        errorMessage.value = "Le mot renseigné n'est pas valide, il doit faire 5 lettres"
    } else {
        targetWord.value = game.getTargetWord();
        game.checkGuess(testWord.value);
        const attempedsGame = game.getAttempts();
        // Clear du tableau pour éviter l'accumulation
        attempts.value.length = 0;
        attempedsGame.forEach((a: Attempt) => {
            attempts.value.push(a)
        })
        remainingAttempts.value = game.remainingAttempts();

        if (game.isWinner()) {
            isWinner.value = game.isWinner();
        }

        if (remainingAttempts.value === 0 && !game.isWinner()) {
            isGameOver.value = true;
        }

        errorMessage.value = null;
    }
}

function resetAttempt() {
    game.resetAttempts();
    remainingAttempts.value = game.remainingAttempts();
    testWord.value = "";
    isWinner.value = game.isWinner();
    isGameOver.value = game.isGameOver();
    attempts.value.length = 0;
}

</script>

<style scoped>
.main-container {
    display: flex;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    justify-content: space-around;
}

.button {
    background-color: #88777C;
    width: 100px;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    font-weight: bold;
    text-transform: capitalize;
    letter-spacing: 1px;
    margin-left: 5px;
    text-align: center;
    align-items: center;
}

.button:hover {
    cursor: pointer;
    zoom: 110%
}

.input-btn-container {
    display: flex
}

.input-word {
    border-radius: 7px;
    height: 30px;
    border: 1px solid grey;
}

.input-word:focus {
    border: 1px solid aqua
}

.retry-button {
    background-color: #689597;
    width: 250px;
    border-radius: 7px;
    display: flex;
    justify-content: center;
    font-weight: 600;
    text-transform: capitalize;
    letter-spacing: 1px;
    margin-left: 5px;
    text-align: center;
    align-items: center;
    margin-top: 15px;
}

.retry-button:hover {
    cursor: pointer;
    zoom: 102%
}

.target-word {
    font-weight: 700;
    font-size: 20px;
    text-decoration: #37C869 underline;
}
</style>