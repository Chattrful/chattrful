# frozen_string_literal: true

class ConversationsController < ChatWidgetController
  def index
    @messages = @conversation.messages.order(created_at: :desc).reverse
  end
end
