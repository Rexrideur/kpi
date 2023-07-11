import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {

    const supabase = serverSupabaseServiceRole(event);

    const {data, error} = await supabase
        .from('tag')
        .select('*')

    if(error) {
        return 'Error';
    }

    return data;
});