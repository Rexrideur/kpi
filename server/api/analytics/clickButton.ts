import {serverSupabaseClient} from '#supabase/server';

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);
    const body = await readBody(event);


    const getData = {
       button_name: body.button,
       user_id: body.id,
       date: body.date

    };

    const {data, error} = await supabase
        .from('button_analytics')
        .insert([getData]);

    if (error) {
        return 'Error';
    }
    return 'Success';
        
   
});