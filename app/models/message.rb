# frozen_string_literal: true

class Message < ApplicationRecord
  scope :previous_50, ->(id) {
    where("id < ?", id).order(created_at: :desc).limit(50)
  }

  belongs_to :sender, polymorphic: true
  belongs_to :conversation

  validates :content, presence: true

  after_commit :broadcast_message

  private

  def broadcast_message
    BroadcastMessageWorker.perform_async(id)
  end
end
