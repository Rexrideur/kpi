<script setup>
definePageMeta({
  middleware: ["auth"],
});

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const email = ref(null);
const password = ref(null);
const errorLogin = ref(null);
const modal = ref(true)
const emailRegister = ref(null);
const passwordRegister = ref(null);
const passwordConfirmRegister = ref(null);
const errorRegister = ref(null);
const successRegister = ref(false);
const firstName = ref(null);
const lastName = ref(null);
const kbis = ref(null);
const companyName = ref(null);
const websiteUrl = ref(null);

onMounted(async () => {
  watchEffect(async () => {
    if (user.value) {
      await navigateTo("/dashboard")
    }
  });
});

async function login() {
  const {user, error} = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (error) {
    errorLogin.value = error.message;
  }
}

async function register() {
  if (!emailRegister.value || !passwordRegister.value || !passwordConfirmRegister.value || !firstName.value || !lastName.value || !kbis.value || !companyName.value || !websiteUrl.value) {
    errorRegister.value = "Veuillez remplir tous les champs";
    return;
  }

  if (passwordRegister.value !== passwordConfirmRegister.value) {
    errorRegister.value = "Les mots de passe ne correspondent pas";
    return;
  }

  await $fetch('/api/user/new', {
    method: 'post',
    body: {
      name: lastName.value,
      firstname: firstName.value,
      url: websiteUrl.value,
      kbis: kbis.value,
      companyName: companyName.value,
      email: emailRegister.value,
      password: passwordRegister.value,
    }
  });

  successRegister.value = true;
}
</script>

<template>
  <div class="flex justify-center items-center h-screen w-full">
    <div class="card w-96 bg-base-100 shadow-xl" v-show="modal">
      <form class="card-body" @submit.prevent="login">
        <h2 class="card-title">Connexion</h2>
        <input v-model="email" type="email" placeholder="Email" class="input input-bordered w-full max-w-xs"/>
        <input v-model="password" type="password" placeholder="Mot de passe"
               class="input input-bordered w-full max-w-xs mt-2"/>
        <button type="submit" class="btn btn-outline btn-primary mt-5">Se connecter</button>
        <p class="mt-2 underline cursor-pointer" @click="modal = false">S'inscrire</p>
      </form>
      <p class="text-red-500 text-center">{{ errorLogin }}</p>
    </div>

    <div class="card w-6/12 bg-base-100 shadow-xl" v-show="!modal">
      <div class="alert alert-success" v-show="successRegister">
        <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span>Un email de confirmation vous a été envoyé</span>
      </div>
      <form class="card-body" @submit.prevent="register">
        <h2 class="card-title">Inscription</h2>
        <input v-model="emailRegister" type="email" placeholder="Email" class="input input-bordered w-full"/>

        <div class="flex justify-between gap-8">
          <input v-model="firstName" type="text" placeholder="Prénom"
                 class="input input-bordered w-full mt-2"/>
          <input v-model="lastName" type="text" placeholder="Nom"
                 class="input input-bordered w-full mt-2"/>
        </div>
        <div class="flex justify-between gap-8">
          <input v-model="kbis" type="text" placeholder="KBIS"
                 class="input input-bordered w-full mt-2"/>
          <input v-model="companyName" type="text" placeholder="Nom de l'entreprise"
                 class="input input-bordered w-full mt-2"/>
        </div>
        <input v-model="websiteUrl" type="text" placeholder="Url du site" class="input input-bordered w-full mt-2"/>

        <div class="flex justify-between gap-8">
          <input v-model="passwordRegister" type="password" placeholder="Mot de passe"
                 class="input input-bordered w-full mt-2"/>
          <input v-model="passwordConfirmRegister" type="password" placeholder="Confirmation mot de passe"
                 class="input input-bordered w-full mt-2"/>
        </div>
        <button type="submit" class="btn btn-outline btn-primary mt-5">S'inscrire</button>
        <p class="mt-2 underline cursor-pointer" @click="modal = true">Se connecter</p>
      </form>
      <p class="text-red-500 text-center">{{ errorRegister }}</p>
    </div>
  </div>
</template>