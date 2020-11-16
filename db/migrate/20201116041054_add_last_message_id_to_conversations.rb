class AddLastMessageIdToConversations < ActiveRecord::Migration[6.0]
  def change
    add_column :conversations, :last_message_id, :bigint
    add_index :conversations, :last_message_id

    Conversation.all.each do |conversation|
      message = conversation.messages.first

      if message
        conversation.update(last_message_id: message.id)
      end
    end
  end
end
