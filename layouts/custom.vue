<script setup>
async function logout() {
  const supabase = useSupabaseClient();

  await supabase.auth.signOut();
  await navigateTo("/");
}
</script>

<template>
  <header>
    <div class="navbar bg-base-100">
      <NuxtLink href="/dashboard" class="btn btn-ghost normal-case text-xl">Accueil</NuxtLink>
      <button @click="logout" class="btn btn-ghost normal-case text-xl">Déconnexion</button>
    </div>
  </header>
  <main class="container mx-auto">
    <slot/>
  </main>
</template>