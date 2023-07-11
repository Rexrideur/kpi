import {serverSupabaseClient} from '#supabase/server';

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);
    const body = await readBody(event);


    const tagData = {
       comment: body.comment
    };

    const {data, error} = await supabase
        .from('tag')
        .insert([tagData]);

    if (error) {
        return 'Error';
    }
    return 'Success';
        
   
});