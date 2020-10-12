# frozen_string_literal: true

class ConversationChannel < ApplicationCable::Channel
  def subscribed
    return unless params[:conversation_id]

    stream_from "conversation_channel_#{params[:conversation_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
