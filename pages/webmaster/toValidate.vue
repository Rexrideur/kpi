<template>
    <div class="p-10">
        <div class="mt-10 overflow-x-auto">
            <table class="table">
                <!-- head -->
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Email</th>
                    <th>Nom de la société</th>
                    <th>KBIS</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="webmaster in webmasters" :key="webmaster.id">
                        <th>{{webmaster.lastname}}</th>
                        <td>{{webmaster.firstname}}</td>
                        <td>{{webmaster.email}}</td>
                        <td>{{webmaster.company_name}}</td>
                        <td>{{webmaster.kbis}}</td>
                        <td><button class="btn">Valider</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>

const webmasters = ref({});

async function getWebmasterToValidate(){

    const data = await $fetch('/api/webmaster/toValidate', {
        method: 'get',
    });

    if (data !== 'Error') {
        webmasters.value = data; 
    }
}

onMounted( () => {
    getWebmasterToValidate();
})
</script>