import { SUPABASE_URL, SUPABASE_KEY } from './env.js';
$(document).ready(async function(){
    const supabasejs = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    var userCount = 0;
    var downloadCountForBhaktimala = 0;
    var ratingCountForBhaktimala = 0;

    $('#downloadcounter_bm').text(downloadCountForBhaktimala);
    // $('#ratingcounter_bm').text(ratingCountForBhaktimala);
    $('#visitedusercount').text(userCount);
    await showUserCount();
    
    if (!localStorage.getItem("visited")) {
        await updateVisitedUserCount();
        localStorage.setItem("visited", "true");
        await showUserCount();
    }
    
    
    await loadsBhaktiMalaDownloadCounts();

    $("#bm_dn_btn_cta").on('click', async function(){
        if (!localStorage.getItem("downloaded")) {
            await updateBhaktiMalaDownloadCounts();
            localStorage.setItem("downloaded", "true");
            await loadsBhaktiMalaDownloadCounts();
        }
    });


    async function showUserCount(){
        try{
            let { data: savitech_webstore_analytics, error } = await supabasejs
            .from('savitech_webstore_analytics')
            .select('*').eq('id', 1).single();

            if(error){
                throw error;
            }

            if(savitech_webstore_analytics)
            {
                var users = savitech_webstore_analytics.visitors;
                userCount = users;
                $('#visitedusercount').text(userCount);
            }
        }
        catch(ex)
        {
            console.log("Show user count: "+ex.message);
        }
    }

    async function updateVisitedUserCount(){
        try{
            userCount = userCount + 1;
            const { data, error } = await supabasejs
                .from('savitech_webstore_analytics')
                .update({ visitors: userCount })
                .eq('id', 1)
                .select();

            if(error){
                throw error;
            }
        }
        catch(ex)
        {
            console.log("updateVisitedUserCount: "+ex.message)
        }
    }

    async function loadsBhaktiMalaDownloadCounts() {
        try{
            let { data: savitech_webstore_analytics, error } = await supabasejs
            .from('savitech_webstore_analytics')
            .select('*').eq('appname', 'BhaktiMala').single();

            if(error){
                throw error;
            }    

            if(savitech_webstore_analytics)
            {
                var downloadCountForBhaktimalaVal = savitech_webstore_analytics.downloads;
                downloadCountForBhaktimala = downloadCountForBhaktimalaVal;
                $('#downloadcounter_bm').text(downloadCountForBhaktimala);
            }
        }
        catch(ex)
        {
            console.log("loadsBhaktiMalaDownloadCounts: "+ex.message)
        }
    }

     async function updateBhaktiMalaDownloadCounts(){
        try{
            downloadCountForBhaktimala = downloadCountForBhaktimala + 1;
            const { data, error } = await supabasejs
                .from('savitech_webstore_analytics')
                .update({ downloads: downloadCountForBhaktimala })
                .eq('appname', 'BhaktiMala')
                .select();

            if(error){
                throw error;
            }
        }
        catch(ex)
        {
            console.log("loadsBhaktiMalaDownloadCounts: "+ex.message)
        }
    }
});
