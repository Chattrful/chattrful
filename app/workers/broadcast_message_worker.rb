# frozen_string_literal: true

class BroadcastMessageWorker < ApplicationWorker
  def perform(message_id)
    message = Message.find(message_id)
    conversation = message.conversation
    account = conversation.account

    html = ApplicationController.render(
      partial: "messages/message",
      locals: {
        message: message,
        user: nil
      }
    )

    ActionCable.server.broadcast(
      "conversation_channel_#{conversation.uuid}",
      {
        html: html,
        sender_identifier: message.sender_identifier
      }
    )

    list_item_html = ApplicationController.render(
      partial: "conversations/conversation",
      locals: {
        conversation: conversation,
        current_user: nil
      }
    )

    ActionCable.server.broadcast(
      "conversation_list_channel_#{account.id}",
      {
        html: list_item_html
      }
    )
  end
end
