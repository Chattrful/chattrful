# frozen_string_literal: true

class Message < ApplicationRecord
  SALT = "f11dc03acc9780eb90fd71f5650aacc912b04644998e12ca0c91be0dfba8dbf374708d33c0dc7810a20af797cf798e5a141b4e1e232c93f0fc392b54752eea40"

  scope :previous_50, ->(id) {
    where("id < ?", id).limit(50)
  }

  belongs_to :sender, polymorphic: true
  belongs_to :conversation

  validates :content, presence: true

  after_create :touch_conversation
  after_commit :broadcast_message

  def sender_identifier
    Digest::SHA256.hexdigest("#{SALT}#{sender_type}#{sender_id}")
  end

  private

  def broadcast_message
    BroadcastMessageWorker.perform_async(id)
  end

  def touch_conversation
    conversation.update(
      last_message_received_at: created_at,
      last_message_content: content,
      last_message_sender_type: sender_type,
      last_message_sender_id: sender_id
    )
  end
end
