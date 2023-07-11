import { serverSupabaseServiceRole } from '#supabase/server';

export default defineEventHandler(async (event) => {

    const supabase = serverSupabaseServiceRole(event);

    const { data: { user } } = await supabase.auth.getUser(event.context._token)

    const {data, error} = await supabase
        .from('tag')
        .select('*')
        .eq('user_id', user!.id);

    if(error) {
        return 'Error';
    }

    return data;
});