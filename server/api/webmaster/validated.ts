import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {

    const supabase = serverSupabaseServiceRole(event);
    const query = await getQuery(event);
    console.log('tes')

    const {data, error} = await supabase
        .from('user')
        .update({
            validated : 1
        })
        .eq('id', query.id)
     

    if(error) {
        return 'Error';
    }

    return data;
});