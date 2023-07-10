import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {

    const supabase = serverSupabaseServiceRole(event);
    const query = await getQuery(event);

    const {data, error} = await supabase
        .from('user')
        .select('*')
        .eq('auth_id', query.id);

    if(error) {
        return 'Error';
    }

    return data;
});