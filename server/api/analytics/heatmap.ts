import {serverSupabaseClient} from '#supabase/server';

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);
    const body = await readBody(event);


    const getData = {
       data: body.butdataton,
       date: body.date,
        path: body.path

    };

    const {data, error} = await supabase
        .from('heatmap_analytics')
        .insert([getData]);

    if (error) {
        return 'Error';
    }
    return 'Success';
        
   
});