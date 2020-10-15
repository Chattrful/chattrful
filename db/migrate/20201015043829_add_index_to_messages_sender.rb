class AddIndexToMessagesSender < ActiveRecord::Migration[6.0]
  def change
    add_index :messages, :sender_id
    add_index :messages, :sender_type
  end
end
