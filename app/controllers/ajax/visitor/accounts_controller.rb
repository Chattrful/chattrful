# frozen_string_literal: true

module Ajax::Visitor
  class AccountsController < VisitorController
    include ConversationHelper
    include VisitorHelper
    include UserHelper

    def create
      visitor_account = VisitorAccountService.new(
        time_zone_offset: permitted_params[:time_zone_offset],
        account: current_account,
        visitor_id: visitor_id,
        conversation_id: conversation_id
      )

      session[:conversation_id] = visitor_account.conversation.id
      session[:visitor_id] = visitor_account.visitor.id
      cookies.encrypted[:visitor_id] = visitor_account.visitor.id

      respond_to do |format|
        format.js do
          render json: {
            chattrful_session: visitor_account.chattrful_session,
            conversation_id: visitor_account.conversation.uuid,
            identifier: visitor_account.visitor.identifier,
            avatars: conversation_avatars(conversation: visitor_account.conversation),
            messages_path: ajax_visitor_account_conversation_messages_path(
              current_account,
              visitor_account.conversation.uuid,
              format: :js
            )
          }
        end
      end
    end

    private

    def permitted_params
      params.permit(:id, :chattrful_session, :time_zone_offset)
    end

    def decrypted_chattrful_session_json
      @decrypted_chattrful_session_json =
        begin
          JSON.parse(Encryptor.decrypt(permitted_params[:chattrful_session]))
        rescue
          {}
        end
    end

    def visitor_id
      session[:visitor_id] || decrypted_chattrful_session_json["visitor_id"]
    end

    def conversation_id
      session[:conversation_id] || decrypted_chattrful_session_json["conversation_id"]
    end
  end
end
