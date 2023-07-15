<script setup>
definePageMeta({
  middleware: ["auth"],
  layout: "custom",
});

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const url = ref("");

onMounted(async () => {
  const { data, error } = await supabase
    .from("user")
    .select("url")
    .eq(  "id", user.value.id);

  url.value = data[0].url;
})
</script>

<template>
  <div>
    <div class="grid grid-cols-2 gap-4">
      <ClickDashboard v-if="url" v-bind:url="url"/>
    </div>
  </div>
</template>