# frozen_string_literal: true

module Ajax
  class MessagesController < AjaxController
    before_action :conversation
    before_action :visitor
    helper_method :current_user

    def index
      @messages = @conversation.messages.includes(:sender).previous_50(params[:last_message_id])

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

    def visitor
      @visitor ||= Visitor.find(session[:visitor_id])
    end

    def message_params
      params.require(:message).permit(:content).merge(sender: @visitor)
    end

    def current_user
      @visitor
    end
  end
end
