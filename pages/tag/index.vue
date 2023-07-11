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
                <tr class="bg-base-200">
                    <th>1</th>
                    <td>Cy Ganderton</td>
                    
                </tr>
                <!-- row 2 -->
                <tr>
                    <th>2</th>
                    <td>Hart Hagerty</td>
                   
                </tr>
                <!-- row 3 -->
                <tr>
                    <th>3</th>
                    <td>Brice Swyre</td>
                   
                </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>

// definePageMeta({
//   middleware: ["auth"],
// });

</script>