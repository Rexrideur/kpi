import {serverSupabaseClient} from '#supabase/server';

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);
    const body = await readBody(event);


    const getData = {
       path: body.path,
       language: body.language,
       user_agent: body.userAgent,
       user_id: body.id,
       date: body.date,
       ip: event.node.req.headers['x-forwarded-for'],
       url:event.node.req.headers["origin"]

    };

    const {data, error} = await supabase
        .from('page_analytics')
        .insert([getData]);

    if (error) {
        return 'Error';
    }
    return 'Success';
        
   
});