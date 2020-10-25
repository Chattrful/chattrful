class AddLastMessageReceivedAtToConversations < ActiveRecord::Migration[6.0]
  def change
    add_column :conversations, :last_message_received_at, :datetime
  end
end
