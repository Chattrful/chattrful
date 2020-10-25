class Account < ApplicationRecord
  has_many :conversations, dependent: :destroy
  scope :latest_conversations, -> do
    conversations
      .where.not(last_message_received_at: nil)
      .order(last_message_received_at: :desc)
  end
end
