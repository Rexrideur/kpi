import {navigateTo} from "#app";

export default defineNuxtRouteMiddleware((to, from) => {
    const user = useSupabaseUser();

    if (!user.value && to.path !== '/') {
        return navigateTo('/');
    }else if(user.value && to.path === '/'){
        return navigateTo('/dashboard');
    }
});