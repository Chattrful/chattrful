# frozen_string_literal: true

module Ajax::Visitor
  class MessagesController < VisitorController
    before_action :conversation
    before_action :set_user

    def index
      @messages =
        if params[:last_message_id]
          @conversation.messages.includes(:sender).previous_50(params[:last_message_id])
        else
          @conversation.messages.includes(:sender).limit(50)
        end

      respond_to do |format|
        format.js do
          render json: {
            html: (render_to_string partial: "messages/message", collection: @messages, cached: true),
            last_message_id: @messages.last&.id,
            previous_last_message_id: params[:last_message_id]
          }
        end
      end
    end

    def create
      @message = @conversation.messages.new(message_params)
      @message.save
      @timestamp = params[:timestamp]

      respond_to do |format|
        format.js { render "ajax/messages/create.js.erb" }
      end
    end

    private

    def conversation
      @conversation ||= current_account.conversations.find_by_uuid(params[:conversation_id])
    end

    def message_params
      params.require(:message).permit(:content).merge(sender: current_visitor)
    end

    def set_user
      @user = current_visitor
    end
  end
end
