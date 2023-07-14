<template>
    <div>
        <h1>Gestion des clés secrètes</h1>

        <div v-if="!appSecret">
            <p>Aucune clé secrète n'a été générée.</p>
            <button @click="generateSecret">Générer une clé secrète</button>
        </div>

        <div v-else>
            <p>Clé secrète actuelle : {{ appSecret }}</p>
            <button @click="deleteSecret">Supprimer la clé secrète</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const appSecret = ref(null);

const deleteSecret = () => {
    appSecret.value = null;

    $fetch('/api/webmaster/deleteSecret', {
        method: 'delete',
    });
};

const generateSecret = async () => {
    appSecret.value = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const data = await $fetch('/api/webmaster/generateSecret', {
        method: 'post',
        body: JSON.stringify({
            app_secret: appSecret.value,
        }),
    });
};
</script>
