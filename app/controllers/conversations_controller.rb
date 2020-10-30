# frozen_string_literal: true

class ConversationsController < ApplicationController
  before_action :set_conversation, only: :show

  def index
    @conversations = current_account.conversations.latest.includes(:starter, :last_message_sender)
    @conversation = @conversations.first
    @container_fluid = true
  end

  def show
    @conversations = current_account.conversations.latest.includes(:starter, :last_message_sender)
    @container_fluid = true
  end

  private

  def set_conversation
    @conversation = current_account.conversations.find(params[:id])
  end
end
