# frozen_string_literal: true

module Ajax::Profile
  class TimeZonesController < ApplicationController
    def create
      time_zone = TimeZoneFinderService.new(time_zone_offset: params[:time_zone_offset]).call

      if current_user.time_zone != time_zone
        current_user.update(time_zone: time_zone)
      end
    end
  end
end
