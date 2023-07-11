<template>

    <div class="p-10">
        <div class="flex justify-end">
            <button class="btn">Créer un tag</button>
        </div>

        <div class="mt-10 overflow-x-auto">
            <table class="table">
                <!-- head -->
                <thead>
                <tr>
                    <th></th>
                    <th>Commentaire</th>
                 
                </tr>
                </thead>
                <tbody>
                <!-- row 1 -->
                <tr v-for="tag in tags" :key="tag.id">
                    <th>{{tag.id}}</th>
                    <td>{{tag.comment}}</td>
                    
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>

definePageMeta({
  middleware: ["auth"],
});
const tags = ref({});

async function getTags(){

    const data = await $fetch('/api/tag/getTags', {
        method: 'get',
    });

  if (data !== 'Error') {
      tags.value = data; 
  }
}

onMounted( async () => {

    getTags();

})

</script>