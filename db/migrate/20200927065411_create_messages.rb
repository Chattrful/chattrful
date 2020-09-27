class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.bigint  :sender_id
      t.string  :sender_type
      t.belongs_to :conversation, foreign_key: true
      t.text :content

      t.timestamps
    end
  end
end
