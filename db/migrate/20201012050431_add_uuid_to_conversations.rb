class AddUuidToConversations < ActiveRecord::Migration[6.0]
  def change
    add_column :conversations, :uuid, :string
    add_index :conversations, :uuid

    Conversation.all.each do |conversation|
      conversation.update(uuid: SecureRandom.uuid)
    end
  end
end
