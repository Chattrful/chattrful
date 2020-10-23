# frozen_string_literal: true

module Ajax
  class VisitorsController < AjaxController
    def create
      time_zone_offset = params[:time_zone_offset].to_i
      time_zone = ActiveSupport::TimeZone[(time_zone_offset * 60).minutes]&.tzinfo&.name

      Visitor.find(session[:visitor_id]).update_columns(
        time_zone: time_zone || Visitor::DEFAULT_TIME_ZONE,
        time_zone_offset: time_zone_offset
      )
    end
  end
end
