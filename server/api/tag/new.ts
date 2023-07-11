import {serverSupabaseClient} from '#supabase/server';

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);
    const body = await readBody(event);

    const { data: { user } } = await supabase.auth.getUser(event.context._token)


    const tagData = {
       comment: body.comment,
       user_id: user!.id
    };

    const {data, error} = await supabase
        .from('tag')
        .insert([tagData]);

    if (error) {
        return 'Error';
    }
    return 'Success';
        
   
});