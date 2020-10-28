class RemoveTimeZoneOffsetFromVisitors < ActiveRecord::Migration[6.0]
  def change
    remove_column :visitors, :time_zone_offset, :integer
  end
end
