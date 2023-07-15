import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {


    const supabase = serverSupabaseServiceRole(event);
    const body = await readBody(event);

    const { data: newDataUser, error: newErrorUser } = await supabase
        .from('user')
        .update({
            token: null
        })
        .eq('id', body.id);

    if (newErrorUser) {
        return newErrorUser;
    }

    return 'Success';

});