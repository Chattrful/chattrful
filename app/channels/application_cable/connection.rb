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
      env["rack.session"] = cookies.encrypted[Rails.application.config.session_options[:key] || raise("No cookies key in config")]
      puts "User: #{Warden::SessionSerializer.new(env).fetch(:user).id}"
      puts "_" * 50

      Rails.logger.debug "Rails logger User: #{Warden::SessionSerializer.new(env).fetch(:user).id}"
      Rails.logger.debug "Rails logger: #{"_" * 50}"
      Warden::SessionSerializer.new(env).fetch(:user)
    end
  end
end
