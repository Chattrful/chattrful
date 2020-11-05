# frozen_string_literal: true

class ConversationListChannel < ApplicationCable::Channel
  def subscribed
    stream_from "conversation_list_channel_#{current_user.account_id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
