# frozen_string_literal: true

class BroadcastMessageWorker < ApplicationWorker
  def perform(message_id)
    message = Message.find(message_id)
    conversation = message.conversation
    account = conversation.account
    conversations = account.conversations.latest.includes(:starter, :last_message_sender)

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

    account.users.each do |user|
      list_html = ApplicationController.render(
        partial: "conversations/conversation",
        collection: conversations,
        locals: {
          current_user: user
        },
        cached: true
      )

      ActionCable.server.broadcast(
        "conversation_list_channel_#{user.id}",
        {
          html: list_html
        }
      )
    end
  end
end
