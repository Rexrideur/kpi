import {serverSupabaseClient} from '#supabase/server';

export default defineEventHandler(async (event) => {
    const supabase = serverSupabaseClient(event);
    const body = await readBody(event);

    await supabase.auth.signUp({
        email: body.email,
        password: body.password,
    }).then(async (res) => {
        if (res.error) {
            console.log(res.error);
            return 'Error';
        } else {
            const userData = {
                lastname: body.name,
                firstname: body.firstname,
                validated: 0,
                kbis: body.kbis,
                company_name: body.companyName,
                url: body.url,
                role: 'CLIENT',
                email: body.email,
                id: res.data.user?.id
            };

            const {data: newDataUser, error: newErrorUser} = await supabase
                .from('user')
                .insert([userData]);

            if (newErrorUser) {
                console.log(newErrorUser);
                return 'Error';
            }
            console.log('ldnjanidizanidnd');
            return 'Success';
        }
    }).catch((err) => {
        throw err;
    });
    return 'Success';
});