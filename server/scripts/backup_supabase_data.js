const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// --- CONFIGURATION ---
// IMPORTANT: Since we don't have the keys in ENV, please PASTE them here temporarily
// or set them in your terminal before running. I'll include placeholders.
const SUPABASE_URL = process.env.SUPABASE_URL || 'YOUR_SUPABASE_URL';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || 'YOUR_SERVICE_KEY';

if (SUPABASE_URL === 'YOUR_SUPABASE_URL') {
    console.error('❌ ERROR: Missing Supabase URL. Please set SUPABASE_URL in environment or script.');
    console.log('Usage: set SUPABASE_URL=https://xyz.supabase.co && set SUPABASE_SERVICE_ROLE_KEY=ey... && node backup_data.js');
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const TABLES_TO_BACKUP = [
    'profiles',
    'usage_logs',
    'student_progress'
    // Add other tables as needed. Only public schema tables accessible via API.
];

async function backupTable(tableName) {
    console.log(`⏳ Backing up table: ${tableName}...`);
    const { data, error } = await supabase
        .from(tableName)
        .select('*');

    if (error) {
        console.error(`❌ Error backing up ${tableName}:`, error.message);
        return null;
    }

    if (!data || data.length === 0) {
        console.log(`⚠️ Table ${tableName} is empty.`);
        return [];
    }

    const filePath = path.join(__dirname, `backup_${tableName}_${Date.now()}.json`);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log(`✅ ${tableName} saved to ${filePath} (${data.length} records)`);
    return data;
}

async function runBackup() {
    console.log('🚀 Starting Emergency Backup...');

    if (!fs.existsSync('backups')) fs.mkdirSync('backups');

    for (const table of TABLES_TO_BACKUP) {
        await backupTable(table);
    }

    console.log('🏁 Backup process completed.');
}

runBackup();
