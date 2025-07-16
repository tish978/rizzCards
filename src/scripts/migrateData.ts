import { createClient } from '@supabase/supabase-js';
import { pickupLines } from '../data/pickupLines';
import type { Database } from '../lib/database.types';
import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

async function migratePickupLines() {
  console.log('Starting migration of pickup lines...');
  
  try {
    // Transform the data to match the database schema
    const pickupLinesToInsert = pickupLines.map(line => ({
      text: line.text,
      category: line.category,
      difficulty: line.difficulty || null,
      style: line.style || null,
      tags: line.tags || [],
      likes_count: 0
    }));

    // Insert the data into Supabase
    const { data, error } = await supabase
      .from('pickup_lines')
      .insert(pickupLinesToInsert)
      .select();

    if (error) {
      throw error;
    }

    console.log(`Successfully migrated ${data.length} pickup lines!`);
    console.log('Migration complete!');
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

// Run the migration
migratePickupLines(); 