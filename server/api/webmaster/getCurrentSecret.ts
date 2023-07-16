import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {

    const supabase = serverSupabaseServiceRole(event);
    const query = getQuery(event);

    const { data, error } = await supabase
        .from('user')
        .select('*')
        .eq('id', query.id);

    if (error) {
        return 'Error';
    }

    return data;
});