class TimeZoneFinderService
  attr_accessor :time_zone_offset

  def initialize(attributes = {})
    @time_zone_offset = attributes[:time_zone_offset].to_i
  end

  def call
    ActiveSupport::TimeZone[(time_zone_offset * 60).minutes]&.tzinfo&.name ||
      Visitor::DEFAULT_TIME_ZONE
  end
end
