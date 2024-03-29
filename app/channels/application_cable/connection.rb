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
      @verified_user ||= env["warden"].user(:user)
    end
  end
end
