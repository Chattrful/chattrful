class RemoveUnnecessaryColumnsFromConversations < ActiveRecord::Migration[6.0]
  def change
    remove_column :conversations, :starter_id
    remove_column :conversations, :starter_type
    remove_column :conversations, :last_message_content
    remove_column :conversations, :last_message_sender_id
    remove_column :conversations, :last_message_sender_type
    remove_column :conversations, :first_message_id
  end
end
