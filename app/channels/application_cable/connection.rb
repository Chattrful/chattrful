# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user, :current_visitor

    def connect
      if verified_user
        self.current_user = verified_user
      elsif verified_visitor
        self.current_visitor = verified_visitor
      else
        reject_unauthorized_connection
      end
    end

    private

    def verified_visitor
      @verified_visitor ||= Visitor.find_by(id: cookies.encrypted[:visitor_id])
    end

    def verified_user
      warden_user_data = cookies.encrypted[:_chattrful_session]["warden.user.user.key"]

      if warden_user_data
        user_id = warden_user_data[0].first
        user_partial_encrypted_password = warden_user_data[1]
        user = User.find(user_id)

        if user && user.encrypted_password[0, 29] == user_partial_encrypted_password
          user
        end
      end
    end
  end
end
