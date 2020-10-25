# frozen_string_literal: true

module Ajax
  class MessagesController < ApplicationController
    before_action :conversation

    def index
      @messages =
        if params[:last_message_id]
          @conversation.messages.includes(:sender).previous_50(params[:last_message_id])
        else
          @conversation.messages.includes(:sender).limit(50)
        end

      respond_to do |format|
        format.js
      end
    end

    def create
      @message = @conversation.messages.new(message_params)
      @message.save
      @timestamp = params[:timestamp]

      respond_to do |format|
        format.js
      end
    end

    private

    def conversation
      @conversation ||= Conversation.find_by_uuid(params[:conversation_id])
    end

    def message_params
      params.require(:message).permit(:content).merge(sender: current_visitor)
    end
  end
end
