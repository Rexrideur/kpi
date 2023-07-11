<template>

    <div class="p-10">
        <div class="flex justify-end">
            <button class="btn" onclick="modal_tag.showModal()">Créer un tag</button>
        </div>

        <dialog id="modal_tag" class="modal">
            <form method="dialog" class="modal-box" @submit.prevent="handleSubmit">
                <h3 class="font-bold text-lg">Créer un tag</h3>

                <div class="mt-5">
                    <input v-model="comment" type="text" placeholder="Commentaire..." class="input input-bordered w-full" />
                    <button type="submit" class="btn mt-5">Enregistrer</button>
                </div>
            </form>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>

        <div class="mt-10 overflow-x-auto">
            <table class="table">
                <!-- head -->
                <thead>
                <tr>
                    <th></th>
                    <th>Commentaire</th>
                    <th></th>
                 
                </tr>
                </thead>
                <tbody>
                <!-- row 1 -->
                <tr v-for="tag in tags" :key="tag.id">
                    <th>{{tag.id}}</th>
                    <td>{{tag.comment}}</td>
                    <td><button class="btn">Editer</button></td>
                    
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
const comment = ref("");

async function getTags(){

    const data = await $fetch('/api/tag/getTags', {
        method: 'get',
    });

  if (data !== 'Error') {
      tags.value = data; 
  }
}

const handleSubmit = async () => {
   
   const data = await $fetch('/api/tag/new', {
        method: 'post',
         body: {
            comment: comment.value,
        }
    });

    comment.value = "";

    getTags();

}

onMounted( async () => {
    getTags();
})

</script>