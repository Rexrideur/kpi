import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {

    const supabase = serverSupabaseServiceRole(event);

    const {data, error} = await supabase
        .from('user')
        .select('*')
        .eq('validated', 1)
        .eq('role', 'WEBMASTER');

    if(error) {
        return 'Error';
    }

    return data;
});