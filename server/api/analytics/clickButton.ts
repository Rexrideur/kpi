import {serverSupabaseClient} from '#supabase/server';

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);
    const body = await readBody(event);


    const getData = {
       button_name: body.button,
       user_id: body.id,
       date: body.date,
       ip: event.node.req.headers['x-forwarded-for'],
       url:event.node.req.headers["origin"]

    };

    const {data, error} = await supabase
        .from('button_analytics')
        .insert([getData]);

    if (error) {
        return 'Error';
    }
    return 'Success';
        
   
});