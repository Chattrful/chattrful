# frozen_string_literal: true

class ConversationsController < ApplicationController
  layout 'chat_widget'

  def index
    @account = Account.find_or_create_by({})
    @converation = Conversation.find_or_create_by(account: @account)
  end
end
