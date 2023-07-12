<template>
  <header>
    <div class="navbar bg-base-100">
      <NuxtLink href="/dashboard" class="btn btn-ghost normal-case text-xl">Accueil</NuxtLink>
    </div>
  </header>
  <main class="container mx-auto">
    <slot/>
  </main>
</template>