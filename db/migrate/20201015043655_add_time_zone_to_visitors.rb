class AddTimeZoneToVisitors < ActiveRecord::Migration[6.0]
  def change
    add_column :visitors, :time_zone, :string
  end
end
