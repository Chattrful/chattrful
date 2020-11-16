class AddConversationTypeToConversations < ActiveRecord::Migration[6.0]
  def change
    add_column :conversations, :conversation_type, :int, default: 0
  end
end
