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

const supabase = useSupabaseClient();

const user = await supabase.auth.getUser();

const id = user.data.user.id;

const appSecret = ref(null);

async function getCurrentSecret() {

    const data = await $fetch('/api/webmaster/getCurrentSecret?id=' + id, {
        method: 'get',
    });

    if (data !== 'Error') {
        appSecret.value = data[0].token
    }
}

onMounted(() => {
    getCurrentSecret();
});

const deleteSecret = () => {
    appSecret.value = null;

    $fetch('/api/webmaster/deleteSecret', {
        method: 'post',
        body: JSON.stringify({
            id: id
        }),
    });
};

function generate_token(length) {
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890$£/+=;,?°".split("");
    var b = [];
    for (var i = 0; i < length; i++) {
        var j = (Math.random() * (a.length - 1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

const generateSecret = async () => {
    appSecret.value = generate_token(64);

    const data = await $fetch('/api/webmaster/generateSecret', {
        method: 'post',
        body: JSON.stringify({
            app_secret: appSecret.value,
            id: id
        }),
    });
};
</script>
