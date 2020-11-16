class AddFirstMessageIdToConversations < ActiveRecord::Migration[6.0]
  def change
    add_column :conversations, :first_message_id, :bigint
    add_index :conversations, :first_message_id

    Conversation.all.each do |conversation|
      message = conversation.messages.last

      if message
        conversation.update(first_message_id: message.id)
      end
    end
  end
end
