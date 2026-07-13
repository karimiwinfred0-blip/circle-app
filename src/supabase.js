import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pbbvymieffgesymwnhbv.supabase.co";
const supabaseKey = "sb_publishable_2Z37BmvJmcJyLXf_e4G13A_y7NprTYt";

export const supabase = createClient(supabaseUrl, supabaseKey);