class AddLastMessageSenderToConversations < ActiveRecord::Migration[6.0]
  def change
    add_column :conversations, :last_message_sender_type, :string
    add_column :conversations, :last_message_sender_id, :bigint

    add_index :conversations, :last_message_sender_type
    add_index :conversations, :last_message_sender_id
  end
end
