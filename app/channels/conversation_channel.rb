# frozen_string_literal: true

class ConversationChannel < ApplicationCable::Channel
  def subscribed
    return unless params[:conversation_id]

    conversation_id = Conversation.decrypt_conversation_id(params[:conversation_id])
    stream_from "conversation_channel_#{conversation_id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
