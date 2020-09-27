FactoryBot.define do
  factory :message do
    sender { nil }
    conversation { nil }
    body { "MyText" }
  end
end
