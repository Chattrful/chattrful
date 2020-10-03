RSpec.describe "Authentication", type: :system, js: true do
  it "can visit metronic" do
    visit metronic_path
  end
end
