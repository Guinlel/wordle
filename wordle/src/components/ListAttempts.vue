<template>
    <div>
        <h3>Historique des essais</h3>
        <div class="letter-container" v-for="(attempt, index) in arrayAttempts" :key="index">
            <p :class="getClassLetter(attempt.result[indexLetter])" v-for="(letter, indexLetter) in attempt.letter"
                :key="indexLetter">{{ letter }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Attempt, Feedback } from '@/classes/WordleClass';
import { ref, watch } from 'vue';

interface ArrayWord {
    letter: string[],
    result: Feedback[]
}

const props = defineProps<{
    initialAttempts: Attempt[]
}>();

const attempts = ref(props.initialAttempts)

const arrayAttempts = ref<ArrayWord[]>([]);

watch(attempts, () => {
    // On reset la tableau a chaque fois pour éviter les doublons
    arrayAttempts.value.length = 0;

    attempts.value.map((a) => {
        const letter = a.guess.split('');
        arrayAttempts.value.push({
            letter: letter,
            result: a.result
        })
    })
},
    {
        deep: true,
        immediate: true
    }
)

function getClassLetter(state: Feedback) {
    if (state === 'correct') {
        return 'correct-letter';
    } else if (state === 'present') {
        return 'present-letter';
    } else {
        return 'absent-letter'
    }
}

</script>

<style>
.letter-container {
    display: flex;
    font-size: 20px;
    font-weight: bold;
    text-transform: capitalize;
    width: 150px;
    justify-content: space-around;
    margin-bottom: 25px;
}
</style>