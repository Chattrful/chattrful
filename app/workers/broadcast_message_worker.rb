# frozen_string_literal: true

class BroadcastMessageWorker
  include Sidekiq::Worker
  sidekiq_options queue: 'default'

  def perform(message_id)
    message = Message.find(message_id)

    html = ApplicationController.render(
      partial: 'messages/message',
      locals: { message: message }
    )

    ActionCable.server.broadcast "conversation_channel_#{message.conversation.id}", html: html, message_id: message.id
  end
end