<template>
    <div class="card-container">
        <div v-for="(letter, index) in wordArray" :key="index">
            <p :class="getClassLetter(attempts[attempts.length - 1].result[index])">{{ letter }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Attempt, Feedback } from '@/classes/WordleClass';
import { ref, watch } from 'vue';

const props = defineProps<{
    initialAttempts: Attempt[]
}>()

const wordArray = ref<string[]>([]);

const attempts = ref(props.initialAttempts);

watch(attempts, () => {
    console.log('test');
    wordArray.value = attempts.value[attempts.value.length - 1].guess.split('');
}, {
    deep: true,
    immediate: true
})

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
.card-container {
    display: flex;
    font-size: 40px;
    font-weight: bold;
    text-transform: capitalize;
    width: 300px;
    justify-content: space-around;
    margin-bottom: 25px;
}

.correct-letter {
    color: #37C869;
    border-bottom: 1px solid #37C869;
    font-style: italic;
}

.present-letter {
    color: #F76408;
    border-bottom: 1px solid #F76408;
}

.absent-letter {
    color: #858679;
    border-bottom: 1px solid #858679;
}
</style>