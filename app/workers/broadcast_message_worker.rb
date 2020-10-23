# frozen_string_literal: true

class BroadcastMessageWorker < ApplicationWorker
  def perform(message_id)
    message = Message.find(message_id)

    html = ApplicationController.render(
      partial: "messages/message",
      locals: {
        message: message,
        user: nil
      }
    )

    ActionCable.server.broadcast(
      "conversation_channel_#{message.conversation.uuid}",
      {
        html: html,
        sender_identifier: message.sender_identifier
      }
    )
  end
end
