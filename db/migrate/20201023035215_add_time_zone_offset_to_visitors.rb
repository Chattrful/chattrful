class AddTimeZoneOffsetToVisitors < ActiveRecord::Migration[6.0]
  def change
    add_column :visitors, :time_zone_offset, :integer
  end
end
