# frozen_string_literal: true

class ConversationsController < ApplicationController
  before_action :set_conversation, only: :show
  before_action :container_fluid

  def index
    @conversations = current_account.conversations.latest.includes(:starter, :last_message_sender)
    @conversation = @conversations.first
  end

  def show
    respond_to do |format|
      format.html do
        @conversations = current_account.conversations.latest.includes(:starter, :last_message_sender)
      end

      format.js do
        render json: {
          html: (render_to_string partial: "show", locals: {visitor: false})
        }
      end
    end
  end

  private

  def set_conversation
    @conversation = current_account.conversations.find(params[:id])
  end

  def container_fluid
    @container_fluid = true
  end
end
