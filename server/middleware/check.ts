import {serverSupabaseUser} from '#supabase/server';
export default defineEventHandler(async (event) => {
    const path = getRequestPath(event);
    const splitPath = path.split('/');

    if (splitPath[1] === 'api' && splitPath[2] !== 'middleware' && splitPath[2] !== '_supabase' && (splitPath[splitPath.length -2] !== 'new' && splitPath[splitPath.length -1] !== 'new')) {
        const currentUser =await serverSupabaseUser(event);

        const userData = await $fetch('/api/middleware/get?id=' + currentUser.id, {
            method: 'get',
        });

        if (userData) {
            event.context.auth = { user: userData[0] }
        }
    }
})