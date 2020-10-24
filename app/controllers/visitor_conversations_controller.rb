# frozen_string_literal: true

class VisitorConversationsController < ApplicationController
  layout "chat_widget"

  before_action :set_account
  helper_method :current_account

  before_action :set_visitor
  helper_method :current_visitor

  def show

  end

  private

  def set_account
    @account ||= Account.find_by_id(params[:account_id] || params[:id])
  end

  def current_account
    @account
  end

  def set_visitor
    @visitor ||= Visitor.find_by_id(session[:visitor_id])
  end

  def current_visitor
    @visitor
  end
end
