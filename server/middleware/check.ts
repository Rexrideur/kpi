import {serverSupabaseUser} from '#supabase/server';
export default defineEventHandler(async (event) => {
    const path = getRequestPath(event);
    const splitPath = path.split('/');

    if (splitPath[1] === 'api' && splitPath[2] !== 'middleware' && splitPath[2] !== '_supabase') {
        const currentUser =await serverSupabaseUser(event);

        if (currentUser) {
            const userData = await $fetch('/api/middleware/get?id=' + currentUser.id, {
                method: 'get',
            });

            if (userData) {
                event.context.auth = {user: userData[0]}
            }
        }
    }
})