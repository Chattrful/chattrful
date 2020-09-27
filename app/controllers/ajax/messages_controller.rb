# frozen_string_literal: true

module Ajax
  class MessagesController < AjaxController
    before_action :conversation
    before_action :visitor

    def create
      @message = @conversation.messages.new(message_params)

      respond_to do |format|
        format.js
      end
    end

    private

    def conversation
      @conversation ||= Conversation.find(session[:conversation_id])
    end

    def visitor
      @visitor ||= Visitor.find(session[:visitor_id])
    end

    def message_params
      params.require(:message).permit(:content).merge(sender: @visitor)
    end
  end
end
