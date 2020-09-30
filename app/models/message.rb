# frozen_string_literal: true

class Message < ApplicationRecord
  belongs_to :sender, polymorphic: true
  belongs_to :conversation

  validates :content, presence: true

  after_commit :broadcast_message

  private

  def broadcast_message
    BroadcastMessageWorker.perform_async(id)
  end
end
