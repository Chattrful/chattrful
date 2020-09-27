FactoryBot.define do
  factory :message do
    participant { nil }
    conversation { nil }
    body { "MyText" }
  end
end
