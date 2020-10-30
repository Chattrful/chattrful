class AddStarterToConversations < ActiveRecord::Migration[6.0]
  def change
    add_column :conversations, :starter_id, :bigint
    add_column :conversations, :starter_type, :string

    add_index :conversations, :starter_id
    add_index :conversations, :starter_type
  end
end
