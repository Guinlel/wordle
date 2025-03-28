<template>
    <div class="header">
        <div class="sub-header">
            <h1>Wordle</h1>
            <p>Devinez le mot de 5 lettres en 6 essais</p>
        </div>
    </div>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: center;
}

.sub-header {
    display: flex;
    justify-content: space-around;
    align-items: baseline;
    width: 40%;
}

h1 {
    font-size: 40px;
    font-style: italic;
}

p {
    font-size: 20px;
    font-style: oblique;
}
</style>