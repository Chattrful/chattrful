# frozen_string_literal: true

class ConversationsController < ApplicationController
  def index
    @conversations = current_account.conversations.latest
    @conversation = @conversations.first
  end
end
