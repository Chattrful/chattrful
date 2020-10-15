# frozen_string_literal: true

module Ajax
  class VisitorsController < AjaxController
    def create
      time_zone = ActiveSupport::TimeZone::MAPPING.value?(params[:time_zone]) ? params[:time_zone] : "Etc/UTC"
      Visitor.find(session[:visitor_id]).update_columns(time_zone: time_zone)
    end
  end
end
