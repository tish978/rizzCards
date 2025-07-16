import { supabase } from '../lib/supabase';
import type { Database } from '../lib/database.types';

type PickupLine = Database['public']['Tables']['pickup_lines']['Row'];
type InsertPickupLine = Database['public']['Tables']['pickup_lines']['Insert'];

export const pickupLineService = {
  async getAll() {
    const { data, error } = await supabase
      .from('pickup_lines')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('pickup_lines')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  },

  async create(pickupLine: InsertPickupLine) {
    const { data, error } = await supabase
      .from('pickup_lines')
      .insert(pickupLine)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async toggleLike(pickupLineId: string, userId: string) {
    // First, check if the user has already liked this pickup line
    const { data: existingLike } = await supabase
      .from('user_likes')
      .select('*')
      .eq('pickup_line_id', pickupLineId)
      .eq('user_id', userId)
      .single();

    // Get current likes count
    const { data: currentLine } = await supabase
      .from('pickup_lines')
      .select('likes_count')
      .eq('id', pickupLineId)
      .single();

    if (!currentLine) throw new Error('Pickup line not found');
    const currentLikes = currentLine.likes_count;

    if (existingLike) {
      // Unlike: Remove the like and decrement likes_count
      const { error: deleteError } = await supabase
        .from('user_likes')
        .delete()
        .eq('pickup_line_id', pickupLineId)
        .eq('user_id', userId);

      if (deleteError) throw deleteError;

      const { error: updateError } = await supabase
        .from('pickup_lines')
        .update({ likes_count: currentLikes - 1 })
        .eq('id', pickupLineId);

      if (updateError) throw updateError;

      return false; // Indicates the pickup line is now unliked
    } else {
      // Like: Add the like and increment likes_count
      const { error: insertError } = await supabase
        .from('user_likes')
        .insert({
          pickup_line_id: pickupLineId,
          user_id: userId
        });

      if (insertError) throw insertError;

      const { error: updateError } = await supabase
        .from('pickup_lines')
        .update({ likes_count: currentLikes + 1 })
        .eq('id', pickupLineId);

      if (updateError) throw updateError;

      return true; // Indicates the pickup line is now liked
    }
  },

  async getUserLikes(userId: string) {
    const { data, error } = await supabase
      .from('user_likes')
      .select('pickup_line_id')
      .eq('user_id', userId);

    if (error) throw error;
    return data.map(like => like.pickup_line_id);
  }
}; 